import React from 'react';
import Utils from '../../utils/index.js';

const Login = React.createClass({
  getInitialState() {
    return {
      user:'world'
    }
  },

  componentDidMount() {
    const _this = this;
    Utils.checkLogin(function(){
      _this.onLogined();
    },function(){
    });
  },

  onLogined(){
    window.location.href=location.pathname+'#/list';
  },

  notLogin(){
    let flag = true;
    if(document.getElementById('Name').value == ''){
      alert('please enter Name');
      flag = false;
      return;
    }
    if(document.getElementById('Pwd').value == ''){
      alert('please enter password');
      flag = false;
      return;
    }
    if(flag){
      localStorage.setItem('user',this.state.user);
      window.location.reload();
    }
  },

  onChange(e){
    var user = this.state.user;
    this.setState({user:e.target.value});
  },

  handleSubmit(e){
    e.preventDefault();
    const _this = this;
    Utils.checkLogin(function(){
      _this.onLogined();
    },function(){
      _this.notLogin();
    });
  },
  
  render() {
    return (
      <div key="loginapp" className="app">
        <header className="header">login</header>
        <section className="content">
          <form className="form">
            <label><input ref="username" id="Name" type="text" value={this.state.user} placeholder="username" onChange={this.onChange}/></label>
            <label><input ref="pass" id="Pwd" type="password" placeholder="password1" /></label>
            <button type="submit" onClick={this.handleSubmit}>login</button>
          </form>
        </section>
      </div>
      
    )
  }

})

export default Login
