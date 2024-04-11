
<!-- 菜单栏组件 -->
<template>
     <el-menu background-color="rgba(0,0,0,0)"  text-color="#fff" default-active="2">
        <el-menu-item index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <el-icon><Menu /></el-icon>
          <!-- <el-icon><MessageBox /></el-icon> -->
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>