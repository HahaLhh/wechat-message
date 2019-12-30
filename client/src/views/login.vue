<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="conent">
      <!-- 表单 -->
      <form>
        <inputGroup label="账号" placeholder="请填写邮箱" v-model="user.email"></inputGroup>
        <inputGroup label="密码" placeholder="请填写密码" v-model="user.password" type="password"></inputGroup>
      </form>
      <div class="btn_wrap">
        <yButton :disabled="isDisablead" @click="loginClick">登陆</yButton>
      </div>
    </div>
    <div class="footer_wrap">
      |
      <button class="register" @click="$router.push('/register')">注册账号</button>|
    </div>
  </div>
</template>
<script>
import inputGroup from "../components/inputGroup";
import yButton from "../components/yButton";
import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    inputGroup,
    yButton
  },
  computed: {
    isDisablead() {
      if (this.user.email && this.user.password) return false;
      else return true;
    }
  },
  methods: {
    loginClick: function() {
      //验证
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return;
      }
      //实现登陆
    this.$axios.post("/api/users/login",this.user)
      .then(response=>{
        // console.log(response);
        //存储token
        const{token} = response.data;
        //存储到ls 本地存储
        localStorage.setItem('wxToken',token)
        //解析token
        const decode = jwt_decode(token);
        console.log(decode)
        //存储到vuex中
        this.$store.dispatch("setUser",decode); //action
        //页面跳转
        this.$router.push("/");
        
        
      });
    },
    
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 80px;
  font-size: 22px;
  text-align: center;
}
.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
}
.footer_wrap .register {
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #7b8ca9;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>