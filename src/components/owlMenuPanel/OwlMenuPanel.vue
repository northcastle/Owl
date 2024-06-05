
<!-- 菜单栏组件  -->
<template>
    <el-scrollbar max-height="500px" >
      <el-menu   background-color="rgba(0,0,0,0)" text-color="#fff" :default-active="defaultMenu" :router="true"  >
          <template v-for="menuItem in menuList">
            <template  v-if="menuItem.isShow">
              <el-menu-item :index="menuItem.routerPath">
                <el-icon><component :is="menuItem.icon"></component></el-icon>
                <span>{{ menuItem.text }}</span>
              </el-menu-item>
            </template>
             
          </template>

        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">

import {ref} from 'vue'

import { useRoute } from 'vue-router';

// 导入菜单对象的类型
import type {MenuObjProps } from './OwlMenuPanelType';

// 声明默认的导航页面
const defaultMenu = ref('')

// 声明菜单的元素列表 : 支持从父组件传过来
const menu = defineProps<MenuObjProps>()

// 根据当前的路由地址来确定真实的导航页面
const currentRoute = useRoute()
defaultMenu.value = currentRoute.path

</script>

<style scoped>

/* 重写滚动条原来的颜色 */
.el-scrollbar {
    --el-scrollbar-bg-color: #959791;
    height: calc(100% - 120px)
}

/* 重写菜单原来的右侧边框 */
.el-menu{
  border-right: 0px solid red;
}

</style>