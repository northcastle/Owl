
<!-- 菜单栏组件  -->
<template>
    <el-scrollbar max-height="200px" >
      <el-menu   background-color="rgba(0,0,0,0)" text-color="#fff" default-active="2" :router="true" >
          <el-menu-item index="2">
            <el-icon><Menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
         

          <template v-for="menuItem in menuList">
              <el-menu-item :index="menuItem.routerPath">
                <el-icon><component :is="menuItem.icon"></component></el-icon>
                
                <span>{{ menuItem.text }}</span>
          </el-menu-item>
          </template>

        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">

import {reactive} from 'vue'

// 导入菜单对象的类型
import type { MenuObj } from './OwlMenuPanelType';

// 声明一些菜单元素
const menuList:Array<MenuObj> = reactive([
  {id:'a',text:'菜单1',icon:'Menu',routerPath:'/owlkeyboard'}
])



</script>

<style scoped>

/* 重写滚动条原来的颜色 */
.el-scrollbar {
    --el-scrollbar-bg-color: #959791;
}

/* 重写菜单原来的右侧边框 */
.el-menu{
  border-right: 0px solid red;
}

</style>