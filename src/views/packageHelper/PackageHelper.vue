
<!-- 打包更新 帮助工具 -->
<template>
    <el-button type="primary" @click="showOpenFileDialog">
      Open
      <el-icon><FolderOpened /></el-icon>
    </el-button>

    <br>

    <el-row>
      <!-- 展示的组件树 -->
      <el-col :span="12" >
        <el-scrollbar height="500px" style="border-radius: 10px;">
          <el-tree  :data="filesTreeData" :props="treeProps" :highlight-current="true" @node-click="handleNodeClick" class="tree-class" />
        </el-scrollbar>
      </el-col>
    </el-row>
    
</template>

<script setup lang="ts">

  import { reactive } from 'vue';

  // 树形组件的数据类型
  import type { TreeNode } from './PackageHelperType'

  // 树形组件的配置
  const treeProps = {
    children: 'children',
    label: 'label',
  }
  // 树形组件的数据
  let filesTreeData: TreeNode[] = reactive([])
  /**s
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
    const chooseFilePath:TreeNode[] = await window.OwlAPI.openFileDialog()
    // console.log('chooseFilePath :',chooseFilePath)
    // 先清空一下原来的数据
    filesTreeData.splice(0,filesTreeData.length)
    // 再放入新的数据
    if(chooseFilePath){
      chooseFilePath.forEach(item => {
       filesTreeData.push(item)
      })
    }
    // console.log('filesTreeData :',filesTreeData)
  }
  
</script>

<style scoped>

.tree-class{
  border: 1px solid rgba(138, 137, 137, 0.186);
  background-color: rgba(138, 137, 137, 0.186);
  color: white;
  font-weight: bold;
  font-size: 14px;
  height: 500px;
}

/* 设置默认的背景 */
/* :deep(.el-tree-node__content) {
  background-color: rgba(132, 129, 129, 0.929);
} */

/* 使用 :deep() 自定义鼠标滑过的样式 */
:deep(.el-tree-node__content:hover) {
  cursor:pointer;
  background-color: rgba(138, 137, 137, 0.186);
}

/* 自定义 el-tree 选中节点的样式 */
:deep(.el-tree-node.is-current > .el-tree-node__content) {
  /* 修改背景色 */
  background-color: rgba(138, 137, 137, 0.186);
  /* 修改字体的颜色 */
  color: aqua;
}


/* 自定义 el-tree 展开节点的样式 */
:deep(.el-tree-node.is-expanded > .el-tree-node__content) {
  /* 修改背景色 */
  background-color: rgba(138, 137, 137, 0.186);
}



</style>