
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
      <OwlMenuPanel :default-menu="defaultMenuRouter" :menu-list="menuList"/>
      
    </div>
    <!-- 右侧的主要内容 -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

import { RouterView } from 'vue-router'


// 头像组件
import OwlAvatar from '../../components/owlAvatar/OwlAvatar.vue'

// 菜单组件
import OwlMenuPanel from '../../components/owlMenuPanel/OwlMenuPanel.vue'

// 菜单的数据
import {defaultMenuRouter,menuList} from './SysMenu'

// 头像的图片地址
const avatarUrl = ref('/owl.png')


</script>

<style scoped>

  .home-view{
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgb(187, 184, 184);
    width: 1200px;
    height: 800px;
    display: flex;

  }

  .menu{
    flex: 1;
    border: px solid red;
    text-align: center;
    background-color: rgb(22, 21, 21);
    border-radius: 10px 0px 0px 10px;
  }
  .content{
    flex:9;
    border: 0px solid red;
    border-radius: 0px 10px 10px 0px;
    background-color: rgb(0, 0, 0);
    padding-left: 10px;
    padding-right: 10px;
  }

  .avatar-box{
    border: 0px solid red;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

</style>