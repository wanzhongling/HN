import React from 'react';
import List from './List';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 900
  },
  title: {
    flexBasis: 500,
    alignSelf: 'center',
    padding: 10
  },
  filter: {
    flexBasis: 400,
    alignSelf: 'center'

  },
  stories: {
    flexBasis: 900,
    alignSelf: 'center'
  }
};

const App = React.createClass({
  getInitialState(){
    return {
      stories: [],
      filterText: '',
      count:20,
      idArray:[],
      cur:0,
      loading:true,
      hasData:false
    }
  },

  filterStories() {
    const filterText = this.state.filterText.toLowerCase();
    return this.state.stories.filter(story => {
      return !filterText ||
        story.title.toLowerCase().indexOf(filterText) !== -1 ||
        story.by.toLowerCase().indexOf(filterText) !== -1
        ;
    });
  },

  componentDidMount() {
    const _this = this;
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => res.json())
    .then(ids => {
      const idArray = _this.state.idArray;
      for(var i=0,len=ids.length;i<len;i+=_this.state.count){
         idArray.push(ids.slice(i,i+_this.state.count));
      }
      _this.setState({idArray});
      _this.renderList();
    });
  },

  renderList(cur){
    const _this = this;
    let thisIdArray = _this.state.idArray[cur ? cur : 0];
    _this.setState({hasData:false,loading:true});
    thisIdArray.forEach((id, index) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(res => res.json())
      .then(story => {
        story.rank = _this.state.cur*_this.state.count + index + 1;
        this.setState({
          stories: _this.state.stories.concat([story]).sort((a,b) => a.rank - b.rank)
        });
      })
      .then(()=>{
        if(index == thisIdArray.length-1){
          let hasData = (thisIdArray.length<_this.state.count) ? false : true;
          _this.setState({hasData:hasData,loading:false})
        }
      });
    });
  },

  clickMore(){
    if(this.state.hasData){
      this.setState({cur:this.state.cur+1})
      this.renderList(this.state.cur+1);
    }
  },

  render() {
    let moreClass = '',
        moreText = '';
    if(this.state.loading){
      moreClass = ' show',
      moreText = '加载ing';
    }else if(this.state.hasData){
      moreClass = ' show',
      moreText = '加载更多';
    }else if(!this.state.hasData){
      moreClass = '',
      moreText = '加载完毕';
    }
    console.log(this.state.hasData,this.state.loading)
    return (
      <div style={style.root}>
        <div style={style.title}>
          <h1>HN</h1>
        </div>
        <div style={style.stories}>
          <List stories={this.filterStories()} />
          <a href="javascript:;" className={`hide${moreClass}`} onClick={this.clickMore}>{moreText}</a>
        </div>
      </div>
    )
  }
});

export default App;
