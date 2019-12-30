<template>
  <div class="cell-wrapper" @click="$emit('click')">
    <div class="cell-title">
      <img :src="user.avatar" >
      <span>{{user.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "usercell",
  props: {
    user: Object
  }
};
</script>
