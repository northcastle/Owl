
<!-- 打包更新 帮助工具 -->
<template>
    <el-button type="primary" @click="showOpenFileDialog">
      Open
      <el-icon><FolderOpened /></el-icon>
    </el-button>

    <br>
    filePathChoosed : {{ filePathChoosed }}

    <br>

    
    <el-row>
      <!-- 展示的组件树 -->
      <el-col :span="12">
        <el-tree  :data="filesTreeData" :props="treeProps" @node-click="handleNodeClick" />
      </el-col>
    </el-row>
    
</template>

<script setup lang="ts">

  import { ref } from 'vue';

  const filePathChoosed = ref('xxxxx')

  // 树形组件的数据类型
  import type { TreeNode } from './PackageHelperType'

  // 树形组件的配置
  const treeProps = {
    children: 'children',
    label: 'label',
  }
  // 树形组件的数据
  const filesTreeData: TreeNode[] = [
  {
    label: 'Users',
    fullPath:'/Users',
    children: [
      {
        label: 'northcastle',
        fullPath:'/Users/northcastle',
        children: [
          {
            label: 'personalFiles',
            fullPath:'/Users/northcastle/personalFiles',
            children: [
              {
                label: '笔记',
                fullPath:'/Users/northcastle/personalFiles/笔记',
                children: [
                  {
                    label: 'node1.txt',
                    fullPath:'/Users/northcastle/personalFiles/笔记/node1.txt'
                  },
                  {
                    label: 'node2.txt',
                    fullPath:'/Users/northcastle/personalFiles/笔记/node2.txt'
                  },
                ],
              },
              {
                label: 'test2.txt',
                fullPath:'/Users/northcastle/personalFiles/test2.txt'
              },
            ],
          },
        ],
      },
    ],
  }
  ]
  /**
   * 树形组件的点击事件
   * @param data 
   */
   const handleNodeClick = (data: TreeNode) => {
    console.log('点击了某个文件 ： ',data)
  }

  /**
   * 发送打开目录的请求
   */
  const showOpenFileDialog =  async () => {
    const chooseFilePath = await window.OwlAPI.openFileDialog()
    console.log('chooseFilePath :',chooseFilePath)
    filePathChoosed.value = chooseFilePath
  }
  
</script>

<style scoped>




</style>