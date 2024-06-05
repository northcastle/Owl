
<!-- 打包更新 帮助工具 -->
<template>

    <el-row style="border: 0px solid red;margin-top: 30px;">
      <el-col :span="24">
        <el-button type="primary" @click="showOpenFileDialog">Open &nbsp;<el-icon><FolderOpened /></el-icon></el-button>
        <el-button type="warning" @click="resetTreeData">Reset &nbsp;<el-icon><Refresh /></el-icon></el-button>
        <el-button type="success" @click="showSaveFileDialog">Save &nbsp;<el-icon><Finished /></el-icon></el-button>
      </el-col>
    </el-row>

    <el-divider border-style="dashed"></el-divider>

    <el-row>
      <!-- 展示的文件树 -->
      <el-col :span="11" >
        <el-card class="card-container card-container-1">
          <template #header>
            <span class="card-header-left">待选择的文件树</span>
            <el-button type="primary" size="small" :icon="DArrowRight"   style="margin-left: 55%;" @click="changeTreeLeft"/>
          </template>
          <div class="el-tree-box">
            <el-input v-model="filterTextLeft" clearable style="width: 100%;" placeholder="Filter keyword" />
            <el-scrollbar max-height="600px">
              <el-tree ref="filesTree" empty-text="暂无数据" :data="filesTreeData" :props="treeProps" 
                    node-key="id" show-checkbox  default-expand-all class="tree-class" 
                    :filter-node-method="filterNodeLeft" >
                
                <!-- node : 当前的节点对象；data : 当前节点的数据 -->
                <template #default="{ node, data }">
                  <span class="node-data-class">
                    <el-image v-if="data.isDir":src="folderIcon" style="height: 20px;"/>
                    <el-image v-else :src="fileIcon" style="height: 14px;"/>
                    <span>
                      {{ node.label }} 
                      <!-- - {{ data.$treeNodeId }} -->
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
            <el-button type="warning" size="small" :icon="DArrowLeft" @click="changeTreeRight" style="margin-right: 55%;"/>
            <span class="card-header-right">已选中的文件树</span>
          </template>

          <div class="el-tree-box">
            <el-input v-model="filterTextRight" clearable style="width: 100%;" placeholder="Filter keyword" />
            <el-scrollbar max-height="600px">
              <el-tree ref="filesTreeChoosed" empty-text="暂未选中数据" :data="filesTreeDataChoosed" :props="treeProps" 
                  node-key="id" show-checkbox  default-expand-all class="tree-class"
                  :filter-node-method="filterNodeRight" >
                <!-- node : 当前的节点对象；data : 当前节点的数据 -->
                <template #default="{ node, data }">
                    <span class="node-data-class">
                      <el-image v-if="data.isDir":src="folderGreenIcon" style="height: 20px;"/>
                      <el-image v-else :src="fileGreenIcon" style="height: 14px;"/>
                      <span>
                        {{ node.label }} 
                        <!-- - {{ data.$treeNodeId }} -->
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

  import { ref,reactive,toRaw,watch } from 'vue';

  import { ElTree,ElMessage,ElNotification } from 'element-plus'

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
  const filterTextLeft = ref('')
  // 右侧的已经选中的树对象
  const filesTreeChoosed = ref<InstanceType<typeof ElTree>>()
  const filterTextRight = ref('')

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
   
    if(chooseFilePath){
      // 先清空一下原来的数据
      filesTreeData.splice(0,filesTreeData.length)
      filesTreeDataChoosed.splice(0,filesTreeDataChoosed.length)
      // 然后再放入新的数据
      chooseFilePath.forEach(item => {
       filesTreeData.push(item)
      })
    }
    // console.log('filesTreeData :',filesTreeData)
  }

  /**
   * 左侧树的过滤操作
   */
  watch(filterTextLeft, (val) => {
    filesTree.value!.filter(val)
  })
  /**
   * 右侧树的过滤操作
   */
  watch(filterTextRight, (val) => {
    filesTreeChoosed.value!.filter(val)
  })
  /**
   * 左侧树的搜索过滤方法
   * @param value 
   * @param data 
   */
  const filterNodeLeft = (value:string,data:TreeNode) => {
    if(!value){
     return true
    }
    return data.label.includes(value)
  }

  /**
   * 右侧树的搜索过滤方法
   * @param value 
   * @param data 
   */
  const filterNodeRight = (value:string,data:TreeNode) => {
    if(!value){
     return true
    }
    return data.label.includes(value)
  }

  /**
   * 左侧的树的数据修改
   */
  const changeTreeLeft = () =>{
    confirmChooseFiles(filesTree,filesTreeChoosed)
  }

  /**
   * 右侧的树的数据修改
   */
  const changeTreeRight = () =>{
    confirmChooseFiles(filesTreeChoosed,filesTree)
  }

  /**
   * 确定选中的文件 
   * @param treeFrom : 选中节点的树
   * @param treeTo : 节点要转移过去的树
   */
  const confirmChooseFiles = (treeFrom:any,treeTo:any) => {
    //if(filesTreeData.length > 0){
      // 先清空一下原来的数据 - 不用清空数据了
      // filesTreeDataChoosed.splice(0,filesTreeDataChoosed.length)
      // 获取选中的文件数组（包含顶层的根节点）
      let choosedFilesList:TreeNodeData[] = treeFrom.value!.getCheckedNodes(false, true)
      //console.log('选中的文件列表 :',choosedFilesList)
      // 处理选中的文件列表
      if(choosedFilesList && choosedFilesList.length > 0){
        // 创建新的右侧的数据列表
        // let rootData =  choosedFilesList.splice(0,1)[0]
        // console.log('根目录数据 :',rootData)
        // console.log('剩余目录数据 :',choosedFilesList)

        // createTreeNew(rootData,choosedFilesList,filesTreeDataChoosed)
        refreshTreeNodesAdd(treeTo,choosedFilesList)
        //console.log('创建后的树 :',filesTreeDataChoosed)

        // 刷新左侧的待选列表，剔除已经选中的数据
        refreshTreeNodesDelete(treeFrom,choosedFilesList)

      }
    //}
  }

  /**
   * 根据数组形式的数据，创建树 - 这个方法就用不到了
   * @param rootData 根节点
   * @param choosedList 选中的节点
   */
  const createTreeNew = (rootData:TreeNodeData,choosedList:TreeNodeData[],targetTreeNodeData:TreeNode[])=>{
      if(rootData){

        //console.log(rootData.fullPath + "    --begin--")
        let nodeData:TreeNode = {
          id: rootData.id, // 主键值
          label: rootData.label, // 节点名称
          parentId: rootData.id,
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
                createTreeNew(element,filterList,nodeData.children)
              }else{ // 是文件的时候,直接放进去
                  //console.log('file : ',element)
                  if(element.parentPath == nodeData.fullPath){
                    // 匹配成功，添加到children中
                    nodeData.children.push({
                      id: element.id, // 主键值
                      label: element.label, // 节点名称
                      parentId:nodeData.id, // 父节点的id
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

  /**
   * 刷新树的数据 ： 将选中的数据剔除掉
   * @param tree 树对象
   * @param choosedNodeData 选中的节点数据
   */
  const refreshTreeNodesDelete = (tree:any,choosedList:TreeNodeData[])=>{
    // 目录节点(剔除顶层的根节点)
    let dirNodeList:TreeNodeData[] = choosedList.filter(item => item.isDir && item.parentId != '')
    // 文件节点
    let fileNodeList:TreeNodeData[] = choosedList.filter(item => !item.isDir)
    
    // 遍历所有的选中的文件节点，将匹配的节点剔除
    fileNodeList.forEach(element => {
      tree.value?.remove(element)
    });
    // 遍历所有的选中的目录节点，将匹配的节点剔除 : 需要倒叙遍历
    dirNodeList.reverse().forEach(element => {
      //console.log('dirnode : ' ,element)
      // 子节点数组是空的时候，顺便剔除这个节点
      if(element.children.length == 0){
        tree.value?.remove(element)
      }

      //console.log('------')
      
    });

    // 如果树中只有最顶层的节点了，则剔除掉
    // console.log('节点删除后的剩余的数据 ： ',tree.value)
    if (tree.value.data.length === 1 && tree.value.data[0].parentId === '' && tree.value.data[0].children.length === 0) {
      tree.value?.remove(tree.value.data[0])
    }
  }

  /**
   * @param tree 树
   * @param choosedList 选中的节点数据
   */
  const refreshTreeNodesAdd = (tree:any,choosedList:TreeNodeData[])=>{
    //console.log('添加选中的节点-树对象的数据 :',tree.value.data)
    //console.log('添加选中的节点-选中的节点数组 :',choosedList)

     // 目录节点
     let dirNodeList:TreeNodeData[] = choosedList.filter(item => item.isDir)
    // 文件节点
    let fileNodeList:TreeNodeData[] = choosedList.filter(item => !item.isDir)

    // 先添加目录节点
    dirNodeList.forEach(element => {
      let elementId = element.id; // 节点id
      let elementParentId = element.parentId; // 父节点的id
      if(elementParentId === ''){ // 根节点目录
        let rootNode = tree.value?.getNode(elementId)
        //console.log('添加选中的节点 -目录- 根节点 :',rootNode)
        if(rootNode){ // 已经存在根节点了就不需要加进去了
          //console.log('添加选中的节点 -目录- 根节点 已经存在了')
        }else{
          //console.log('添加选中的节点 -目录- 根节点 不存在，需要添加进来')
          let rootData:TreeNode = {
            id: element.id, // 主键值
            label: element.label, // 节点名称
            parentId: element.parentId,
            parentPath:element.parentPath,// 父节点路径
            fullPath: element.fullPath, // 节点路径
            isDir: element.isDir, // 是否是文件夹
            children: [], // 子节点集合
          }
          // 放到目标的树中
          // tree.value?.data.push(rootData)
          tree.value?.append(rootData,null)
        }
      }else{ // 非根节点目录
         //console.log('tree.value.data : ',tree.value.data)
         let elementNode = tree.value?.getNode(elementId)
         //console.log('添加选中的节点 -目录- 非根节点 :',elementNode,'parentId : ',elementParentId)
        if(elementNode){ // 已经存在了，就不需要加进去了
        }else{
          let elementNodeParent = tree.value?.getNode(elementParentId)
          //console.log('添加选中的节点 -目录- 非根节点 - 父节点 :',elementNodeParent)
          let folderData:TreeNode = {
            id: element.id, // 主键值
            label: element.label, // 节点名称
            parentId: element.parentId,
            parentPath:element.parentPath,// 父节点路径
            fullPath: element.fullPath, // 节点路径
            isDir: element.isDir, // 是否是文件夹
            children: [], // 子节点集合
          }
          tree.value?.append(folderData,elementNodeParent)
        }
      }

     //console.log('------')
    });

    // 再添加文件节点 : 直接循环，获取父级的节点，然后添加进去即可
    fileNodeList.forEach(element => {
      let elementId = element.id; // 节点id
      let elementParentId = element.parentId; // 父节点的id
      let elementNode = tree.value?.getNode(elementId)
      if(elementNode){ // 节点已经存在了，无需重复添加

      }else{ // 节点不存在，添加进去
        let elementNodeParent = tree.value?.getNode(elementParentId)
        let fileData:TreeNode = {
            id: element.id, // 主键值
            label: element.label, // 节点名称
            parentId: element.parentId,
            parentPath:element.parentPath,// 父节点路径
            fullPath: element.fullPath, // 节点路径
            isDir: element.isDir, // 是否是文件夹
            children: [], // 子节点集合
          }
          tree.value?.append(fileData,elementNodeParent)
      }

    });


  }

  /**
   * 重置树数据
   */
  const resetTreeData = () =>{
    filesTreeData.splice(0,filesTreeData.length)
    filesTreeDataChoosed.splice(0,filesTreeDataChoosed.length)
  }

  /**
   * 点击保存按钮，弹出文件保存的对话框
   */
  const showSaveFileDialog = async () =>{
    // 存在数据的时候，才会去保存
    if(filesTreeDataChoosed.length > 0){
      // 重新赋值一遍这个树数据，否则将会是一个代理对象
      let choosedDataList : TreeNode[] = toRaw(filesTreeDataChoosed);
      let saveRes = await window.OwlAPI.openFileSaveDialog(choosedDataList)
      //console.log('vue : saveRes : ',saveRes)
    
      if(saveRes && saveRes.code == 200){
        // ElMessage({
        //   message: '文件成功保存至【'+saveRes.data+'】目录下！',
        //   type: 'success',
        // })

        let btnIndex = await window.OwlAPI.openSuccessDialog('成功','文件成功保存至【'+saveRes.data+'】目录下！')
         console.log('btnIndex : ',btnIndex) // 很奇怪，没有拿到，不知道为什么
        if(btnIndex){
          // 重置数据
          resetTreeData()
        }else{
          // 应该是程序出现异常了
          resetTreeData()
        }

        

      }else{
        ElMessage({
          message: '文件保存失败！',
          type: 'error',
        })
      }
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

/* 搜索框的样式 */
:deep(.el-input){
  --el-input-text-color: rgb(4, 208, 244);
  --el-input-bg-color: rgba(16, 16, 16, 0.078);
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