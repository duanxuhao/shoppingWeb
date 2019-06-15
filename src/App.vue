<template>
  <div id="app" class="hello">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* #hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.hello[data-v-6d4d796e] {
  text-align: center;
}
.hello a[data-v-6d4d796e] {
  display: inline-block;
}
.input-add,
.input-sub {
  min-width: 40px;
  height: 100%;
  border: 0;
  color: #605f5f;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
  background: #f0f0f0;
}
.item-quantity .select-self-area {
  background: none;
  border: 1px solid #f0f0f0;
}
.item-quantity .select-self-area .select-ipt {
  display: inline-block;
  padding: 0 3px;
  width: 30px;
  min-width: 30px;
  text-align: center;
}
.header {
  width: 100%;
  background-color: #fff;
  font-family: moderat, sans-serif;
  font-size: 16px;
}
.navbar {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-line-pack: center;
  align-content: center;
  width: 100%;
  height: 70px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px;
}
.navbar,
.navbar-left-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.navbar-left-container {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: -20px;
}
.footer a,
.header a {
  color: #666;
  text-decoration: none;
}
a {
  transition: color 0.3s ease-out;
}
.navbar-right-container {
  display: none;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.navbar-menu-container,
.navbar-right-container {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.navbar-menu-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding-top: 10px;
}
.navbar-link {
  padding-left: 15px;
}
.navbar-cart-container {
  position: relative;
}
.navbar-cart-count {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  top: -9px;
  right: -11px;
  width: 20px;
  border-radius: 10px;
  color: #fff;
  background-color: #eb767d;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.navbar-cart-logo {
  width: 25px;
  height: 25px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.regi_form_input {
  position: relative;
  height: 42px;
  line-height: 42px;
  background: none;
  margin-bottom: 15px;
  font-size: 14px;
  overflow: hidden;
  border: 1px solid #ccc;
  padding-bottom: 0;
}
.regi_form_input .icon {
  display: inline-block;
  /* float: left; */
  width: 25px;
  height: 29px;
  margin: 6px 0 0 14px;
  background-position: 4px 5px;
  background-image: url(/static/icon.png);
  background-repeat: no-repeat;
}
.regi_form_input .IconPwd {
  background-position: -198px 3px;
}
.regi_form_input .regi_login_input {
  position: absolute;
  left: 45px;
  top: 0;
  padding: 9px 0 10px;
  width: 270px;
  font-size: 14px;
  zoom: 1;
  border: none;
  color: #333;
  line-height: 23px;
  background: 0 0 !important;
}
.md-title {
  position: absolute;
  top: 14px;
  line-height: 24px;
  padding: 8px 0;
  color: #333;
  font-size: 18px;
  font-weight: 400;
  font-style: normal;
}
.login-wrap {
  margin-top: 30px;
}
.md-content .btn-login {
  display: block;
  height: 38px;
  line-height: 38px;
  border: 2px solid #009de6;
  background: #009de6;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.btn-login:hover {
  background: #61b1ef;
  border: 2px solid #61b1ef;
}
.error-wrap .error {
  font-size: 12px;
  color: #d31723;
  visibility: hidden;
  display: block;
  padding: 0 0 7px 17px;
  line-height: 16px;
  height: 16px;
  text-align: left;
  background: url(/static/icon.png) 0 -100px no-repeat;
}
.md-content .error-wrap .error-show {
  visibility: visible;
  height: auto;
}
.btn-wrap div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.price-count-wrap {
  margin-bottom: 35px;
}
</style>
