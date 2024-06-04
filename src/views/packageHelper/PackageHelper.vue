
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
            <span class="card-header-left">待选择的文件树</span>
            <el-button type="primary" size="small" :icon="DArrowRight"   style="margin-left: 55%;" @click="confirmChooseFiles"/>
          </template>
          <div class="el-tree-box">
            <el-scrollbar max-height="600px">
              <el-tree ref="filesTree" empty-text="暂无数据" :data="filesTreeData" :props="treeProps" 
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
            <el-button type="warning" size="small" :icon="DArrowLeft"   style="margin-right: 55%;"/>
            <span class="card-header-right">已选中的文件树</span>
          </template>

          <div class="el-tree-box">
            <el-scrollbar max-height="600px">
              <el-tree  empty-text="暂未选中数据" :data="filesTreeDataChoosed" :props="treeProps" 
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

  import { ref,reactive } from 'vue';

  import { ElTree } from 'element-plus'

  import { DArrowRight,DArrowLeft } from '@element-plus/icons-vue'


  import folderIcon from '/folder.svg'
  import fileIcon from '/file.svg'

  import folderGreenIcon from '/foldergreen.svg'
  import fileGreenIcon from '/filegreen.svg'

  // 树形组件的数据类型
  import type { TreeNode } from './PackageHelperType'
import type { TreeNodeData } from 'element-plus/es/components/tree-v2/src/types.mjs';

  // 左侧的待选择的树对象
  const filesTree = ref<InstanceType<typeof ElTree>>()

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

  /**
   * 确定选中的文件
   */
  const confirmChooseFiles = () => {
    if(filesTreeData.length > 0){
      // 先清空一下原来的数据
      filesTreeDataChoosed.splice(0,filesTreeDataChoosed.length)
      // 获取选中的文件数组
      let choosedFilesList:TreeNodeData[] = filesTree.value!.getCheckedNodes(false, true)
      console.log('选中的文件列表 :',choosedFilesList)
      // 遍历选中的文件列表
      if(choosedFilesList && choosedFilesList.length > 0){
        // 创建新的右侧的数据列表
        let rootData =  choosedFilesList.splice(0,1)[0]
        console.log('根目录数据 :',rootData)
        console.log('剩余目录数据 :',choosedFilesList)

        createTreeWhichChoosed(rootData,choosedFilesList,filesTreeDataChoosed)
        console.log('创建后的树 :',filesTreeDataChoosed)

      }
    }
  }

  /**
   * 创建右侧选中的新的树
   * @param rootData 根节点
   * @param choosedList 选中的节点
   */
  const createTreeWhichChoosed = (rootData:TreeNodeData,choosedList:TreeNodeData[],targetTreeNodeData:TreeNode[])=>{
      if(rootData){

        //console.log(rootData.fullPath + "    --begin--")
        let nodeData:TreeNode = {
          id: rootData.id, // 主键值
          label: rootData.label, // 节点名称
          parentPath:rootData.parentPath,// 父节点路径
          fullPath: rootData.fullPath, // 节点路径
          isDir: rootData.isDir, // 是否是文件夹
          children: [], // 子节点集合
        }

        if(choosedList && choosedList.length > 0){ // 循环子节点进行递归创建
          choosedList.forEach(element => {
            if(element.parentPath == rootData.fullPath){ // 是直接子集的时候，才可以进行数据组装
              if(element.isDir){ // 是目录的时候继续递归
                //console.log('folder : ',element)
                // 过滤掉当前的节点
                const filterList = choosedList.filter(item => item.id !== element.id)
                createTreeWhichChoosed(element,filterList,nodeData.children)
              }else{ // 是文件的时候,直接放进去
                  //console.log('file : ',element)
                  if(element.parentPath == nodeData.fullPath){
                    // 匹配成功，添加到children中
                    nodeData.children.push({
                      id: element.id, // 主键值
                      label: element.label, // 节点名称
                      parentPath:element.parentPath,// 父节点路径
                      fullPath: element.fullPath, // 节点路径
                      isDir: element.isDir, // 是否是文件夹
                      children: [], // 子节点集合
                    })
                  }
              }
            }
          });
        }
        // 最后把根节点放进来
        targetTreeNodeData.push(nodeData);

        //console.log(rootData.fullPath + "    --end--")
      }
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
  margin-right: 5px;
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