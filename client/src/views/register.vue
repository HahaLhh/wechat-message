<template>
  <div class="register">
    <div class="header">
      <!-- 返回上一步 -->
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账户</div>
      <div class="conent">
        <!-- 表单 -->
        <form>
          <inputGroup label="昵称" placeholder="请填写昵称" v-model="user.name"></inputGroup>
          <inputGroup label="邮箱" placeholder="请填写邮箱" v-model="user.email"></inputGroup>
          <inputGroup label="密码" placeholder="请填写密码" v-model="user.password" type="password"></inputGroup>
          <inputGroup label="确认密码" placeholder="请再次填写密码" v-model="user.password1" type="password"></inputGroup>
        </form>
      </div>
      <div class="btn_wrap">
        <yButton :disabled="isDisabled" @click="registerClick">注册</yButton>
      </div>
    </div>
  </div>
</template>
<script>
import inputGroup from "../components/inputGroup";
import yButton from "../components/yButton";
import qs from 'qs'
export default {
  name: "rgister",
  components: { inputGroup, yButton },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password1: ""
      }
    };
  },
  methods: {
    registerClick: function() {}
  },
  computed: {
    
    isDisabled() {
      if (
        this.user.name &&
        this.user.email &&
        this.user.password &&
        this.user.password1
      )
        return false;
      else return true;
    }
  },
  methods: {
    registerClick: function() {
      //验证
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return;
      }
      if (this.user.password !== this.user.password1) {
        alert("密码输入不一致");
        return
      }
      // var params = new URLSearchParams();
      // params.append('name',this.user.name)
      // params.append('email',this.user.email)
      // params.append('password',this.user.password)
      // params.append('password1',this.user.password1)

      this.$axios.post("/api/users/register",this.user)
      .then(response=>{
          //注册成功
          alert('注册成功')
          this.$router.push('/login')
      });
    }
  }
};
</script>
<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0px 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.container .title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>