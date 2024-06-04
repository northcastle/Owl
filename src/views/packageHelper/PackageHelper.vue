
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
              <el-tree  empty-text="暂无数据" :data="filesTreeData" :props="treeProps" 
                    node-key="id" show-checkbox  default-expand-all class="tree-class" >
                
                <!-- node : 当前的节点对象；data : 当前节点的数据 -->
                <template #default="{ node, data }">
                  <span class="node-data-class">
                    <el-image v-if="data.isDir":src="folderIcon" style="height: 20px;"/>
                    <el-image v-else :src="fileIcon" style="height: 14px;"/>
                    <span>
                      {{ node.label }}
                    </span>
                  </span>
                </template>
              </el-tree>
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
              <el-tree  empty-text="暂未选中数据" :data="filesTreeData" :props="treeProps" 
                  node-key="id" show-checkbox  default-expand-all class="tree-class">
                <!-- node : 当前的节点对象；data : 当前节点的数据 -->
                <template #default="{ node, data }">
                    <span class="node-data-class">
                      <el-image v-if="data.isDir":src="folderGreenIcon" style="height: 20px;"/>
                      <el-image v-else :src="fileGreenIcon" style="height: 14px;"/>
                      <span>
                        {{ node.label }}
                      </span>
                    </span>
                  </template>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>

    </el-row>
    
</template>

<script setup lang="ts">

  import { reactive } from 'vue';

  import folderIcon from '/folder.svg'
  import fileIcon from '/file.svg'

  import folderGreenIcon from '/foldergreen.svg'
  import fileGreenIcon from '/filegreen.svg'

  // 树形组件的数据类型
  import type { TreeNode } from './PackageHelperType'



  // 树形组件的配置
  const treeProps = {
    children: 'children',
    label: 'label',
  }
  // 树形组件的数据
  let filesTreeData: TreeNode[] = reactive([])

  // 选中的节点数据
  let filesTreeDataChoosed: TreeNode[] = reactive([])

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
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 14px;
  min-height: 600px;
}


/* 设置默认的背景 */
:deep(.el-tree-node__content) {
  border: 0px solid red;
  /* background-color: rgba(132, 129, 129, 0.929); */
}

/* 使用 :deep() 自定义鼠标滑过的样式 */
:deep(.el-tree-node__content:hover) {
  cursor:pointer;
  background-color: rgb(98, 97, 97);
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

/* 复选框的背景颜色 */
:deep(.el-checkbox__inner){
  background-color: rgb(35, 35, 35);
}

.node-data-class{
  display: flex; /* 水平居中 */
  align-items: center; /* 垂直居中 */ 
  gap: 10px; /* 节点之间的间距 */
}


</style>