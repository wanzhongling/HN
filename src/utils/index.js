"use strict";
export default class Utils {
  static checkLogin(onLogined,onNotLogin) {
    let user = localStorage.getItem('user');
    if(user){
      onLogined && onLogined(user);
    }else{
      onNotLogin && onNotLogin();
    }
  }

  static get xx() {
    return {};
  }
}
