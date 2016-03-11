import React from 'react';
import { Link } from 'react-router';
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
      logContent.push(<span className="log-btnbox">hello {user}  <a href="javascript:;" className="link" onClick={_this.logOut}>logout</a></span>);
    },function(){
      logContent.push(<span className="log-btnbox"><Link to="login" className="link">logIn</Link></span>);
    });

    return (
      <div>
        <nav className="nav">Logo
          <Link to="list" className="link nav-link">list</Link>
          {logContent}
        </nav>
        {content}
      </div>
    )
  }
})

export default App
