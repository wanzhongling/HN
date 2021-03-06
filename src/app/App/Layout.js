import React from 'react';
import { Link } from 'react-router';
import List from '../../component/View.js'; // List
import Utils from '../../utils/index.js';


const App = React.createClass({
  getInitialState() {
    return {
      user:'world'
    }
  },

  logOut(){
    Utils.checkLogin(function(){
      localStorage.removeItem('user');
      location.reload();
    },function(){})
  },

  render() {
    let { children, params } = this.props,
        content = children,
        logContent = [];
    const _this = this;

    Utils.checkLogin(function(user){
      logContent.push(<span key="logout" className="log-btnbox">hello {user}  <a href="javascript:;" className="link" onClick={_this.logOut}>logout</a></span>);
    },function(){
      logContent.push(<span key="login" className="log-btnbox"><Link to="login" className="link">logIn</Link></span>);
    });

    return (
      <div key="app">
        <nav key="nav" className="nav">Logo
          <Link key="listlink" to="list" className="link nav-link">list</Link>
          {logContent}
        </nav>
        {content}
      </div>
    )
  }
})

export default App
