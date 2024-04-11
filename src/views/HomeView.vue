
<!--
  系统的主页面
-->

<template>

  <div class="home-view">
    <!-- 左侧的菜单栏 -->
    <div class="menu">
      <!-- 顶部的头像 -->
      <OwlAvatar :img-url="avatarUrl" nick-name="owl-Master"/>
      
      <!-- 菜单内容 -->
      <OwlMenuPanel />
      
    </div>
    <!-- 右侧的主要内容 -->
    <div class="content">
      <!-- <RouterView /> -->
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

import { RouterView } from 'vue-router'

// 头像组件
import OwlAvatar from '../components/owlAvatar/OwlAvatar.vue'

// 菜单组件
import OwlMenuPanel from '../components/owlMenuPanel/OwlMenuPanel.vue'


// 头像的图片地址
const avatarUrl = ref('/owl.png')

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
    border: 0px solid red;
    text-align: center;
  }
  .content{
    flex:9;
    border: 0px solid red;
    background-color: rgb(0, 0, 0);
  }

  .avatar-box{
    border: 0px solid red;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

</style>