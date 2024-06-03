
<!-- 打包更新 帮助工具 -->
<template>

    <el-row style="border: 0px solid red;margin-top: 30px;">
      <el-col :span="24">
        <el-button type="primary" @click="showOpenFileDialog">Open<el-icon><FolderOpened /></el-icon></el-button>
      </el-col>
    </el-row>
    
    <el-divider border-style="dashed"></el-divider>

    <el-row>
      <!-- 展示的文件树 -->
      <el-col :span="11" >
        <el-card class="card-container card-container-1">
          <template #header>
            <div class="card-header-left">待选择的文件树</div>
          </template>
          <div class="el-tree-box">
            <el-scrollbar max-height="600px">
              <el-tree  empty-text="暂无数据" :data="filesTreeData" :props="treeProps" @node-click="handleNodeClick" class="tree-class tree-class-1" />
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>

      <!-- 选中的文件树 -->
      <el-col :span="11" :offset="2" >
        <el-card class="card-container card-container-2" style="text-align: right;">
          <template #header>
            <div class="card-header-right">已选中的文件树</div>
          </template>

          <div class="el-tree-box">
            <el-scrollbar max-height="600px">
              <el-tree  empty-text="暂未选中数据" :data="filesTreeData" :props="treeProps" @node-click="handleNodeClick" class="tree-class tree-class-2" />
            </el-scrollbar>
          </div>
        </el-card>
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

.card-container{
  background-color: rgb(0, 0, 0);
  border: 2px solid rgb(94, 94, 94);
}

:deep(.card-container .el-card__header){
  border-bottom: 2px solid rgb(94, 94, 94);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 18px;
  }

:deep(.card-container .el-card__body){
  padding: 0;
}

:deep(.card-container-1 .el-card__header){
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
}
:deep(.card-container-2 .el-card__header){
  background-image: linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
}

.card-header-left{
  border: 1px solid rgb(198, 200, 25);
  border-radius: 5px;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgb(198, 200, 25);
  color: black;
  font-weight: bold;
}

.card-header-right{
  border: 1px solid rgb(97, 207, 33);
  border-radius: 5px;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgb(97, 207, 33);
  color: aliceblue;
  font-weight: bold;
  margin-right: 10px;
}

.el-tree-box{
  height: 600px;
  border: 1px solid rgb(87, 86, 86);
  border-radius: 10px;

}
.tree-class{
  border: 1px solid rgba(138, 137, 137, 0.186);
  background-color: rgba(138, 137, 137, 0.186);
  color: rgb(11, 10, 10);
  font-weight: bold;
  font-size: 14px;
  min-height: 600px;
}

.tree-class-1{
  background-image: linear-gradient(to right top, #dfa4e7, #cfa5ea, #bfa6ec, #aea7ec, #9da8eb, #90b0ef, #84b7f1, #7bbef0, #7ccdf2, #88dbf1, #9ae8f0, #b1f4ef);

}

.tree-class-2{
  background-image: linear-gradient(to left bottom, #dfa4e7, #cfa5ea, #bfa6ec, #aea7ec, #9da8eb, #90b0ef, #84b7f1, #7bbef0, #7ccdf2, #88dbf1, #9ae8f0, #b1f4ef);

}

/* 设置默认的背景 */
/* :deep(.el-tree-node__content) {
  background-color: rgba(132, 129, 129, 0.929);
} */

/* 使用 :deep() 自定义鼠标滑过的样式 */
:deep(.el-tree-node__content:hover) {
  cursor:pointer;
  background-color: rgb(7, 7, 7);
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
/* 自定义 el-tree 合并节点的样式，解决 鼠标移出后背景变亮的问题 */
:deep(.el-tree-node:not(.is-expanded) > .el-tree-node__content) {
  /* 修改背景色 */
  background-color: rgba(7, 7, 7, 0.186);
}



</style>