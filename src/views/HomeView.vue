
<!--
  系统的主页面
-->

<template>

  <div class="home-view">
    <!-- 左侧的菜单栏 -->
    <div class="menu">
      <div class="avatar-box">
        <el-avatar size="large" src="/owl.png" />
        <br>
        <span>Owl - User</span>
        <br>

      </div>
      

      键盘战士
    </div>
    <!-- 右侧的主要内容 -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">

import { RouterView } from 'vue-router'

</script>

<style scoped>

  .home-view{
    border: 1px solid red;
    width: 1200px;
    height: 800px;
    display: flex;

  }

  .menu{
    flex: 1;
    border: 1px solid red;
    text-align: center;
  }
  .content{
    flex:6;
    border: 1px solid red;
  }

  .avatar-box{
    border: 0px solid red;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

</style>