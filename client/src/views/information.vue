<template>
  <div class="information">
    <Header title="详细信息" :is-left="true" btn_icon="ellipsis-h"/>
    <div class="container">
      <Cell :userInfo="targetUser"/>
    <div class="btn_wrapper">
      <Button @click="$router.push({name:'chatview',params:{user:targetUser}})">发消息</Button>
    </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Cell from "../components/infocell";
import Button from '../components/yButton'

export default {
  name: "information",
  computed: {},
  components: { Header, Cell,Button },
  methods: {},
  computed: {
    targetUser() {
      return this.$store.getters.targetUser;
    }
  }
};
</script>
<style scoped>
.information {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  background-color: #f1f1f1;
}

.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>

