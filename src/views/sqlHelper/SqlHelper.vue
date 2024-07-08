<template>
    <!-- 步骤条 -->
    <el-steps class="step-box"  :active="active" align-center  finish-status="success">
        <el-step title="选择文件" :icon="UploadFilled" />
        <el-step title="文件内容" :icon="Document" />
        <el-step title="生成SQL" :icon="Finished"/>
    </el-steps>

    临时保留一下这个步骤进度的值 ： {{ active }} <br>

    读取表格的属性 ： {{ tableProps  }} <br>

    生成的文本框的值 ： {{  textPanelProps }}
    <!-- 中间内容 -->
    <div class="content-box">
       <div v-if="active == 0"> 
        <el-row>
            <el-col :span="12" :offset="6" >
                <OwlChooseFile v-bind="uploadFileProps" @add-file="addFile" @remove-file="removeFile"/> 
            </el-col>
        </el-row>
        
        </div>
       
        <div v-if="active == 1"> 
            <el-row>
                <el-col :span="24">
                    <OwlShowTable v-bind="tableProps" @excel-data-list-read-success="excelDataListReadSuccess"/>
                </el-col>
            </el-row>
        </div>
        <div v-if="active == 2"> 
            <el-row>
                <el-col :span="24">
                    <OwlTextPanel v-bind="textPanelProps" @text-for-use-changed="textForUseChanged" />
                </el-col>
            </el-row>
        </div>
       <div v-if="active == 3"> 生成的sql展示页面 </div>
    </div>

    <!-- 下一步按钮 -->
    <div class="bottom-box">
        <el-button-group v-if="active != 3">
            <el-button type="primary" :icon="ArrowLeft" @click="last" :disabled="active == 0">上一步</el-button>
            <el-button type="primary"  @click="next" :disabled="active == 3">
                下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </el-button-group>

        <el-button type="success" :icon="CircleCheckFilled" v-if="active == 3" @click="done">完成</el-button>
    </div>
    
</template>

<script lang="ts" setup>

import { ref,reactive } from 'vue'

import { UploadFilled,Document,Finished,ArrowLeft,ArrowRight,CircleCheckFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'


import  OwlChooseFile  from '../../components/owlChooseFile/OwlChooseFile.vue'
import OwlShowTable from '../../components/owlShowTable/OwlShowTable.vue'
import OwlTextPanel from '../../components/owlTextPanel/OwlTextPanel.vue'

import type { OwlChooseFileProps } from '@/components/owlChooseFile/OwlChooseFileType'
import type { OwlShowTableType } from '@/components/owlShowTable/OwlShowTableType'
import type { OwlTextPanelType } from '@/components/owlTextPanel/OwlTextPanelType'



/**
 * 步骤条索引状态描述：
 * 0 选择文件中
 * 1 文件选择完成，展示文件内容中
 * 2 文件内容展示完成，生成sql中
 * 3 生成sql完成
 */
const active = ref(0)


/**
 * 上传文件组件的属性
 */
const uploadFileProps : OwlChooseFileProps = reactive({
   disalbedFlag:false,
   autoUploadFlag:false,
   multipleFlag:false,
   limitNum:1,
   acceptTypes:'.xlsx,.xls',
   fileSize:10,
   fileList:[],
   tipList:[
    '当前支持xlsx、xls格式',
    '文件大小不超过10M',
    '可点击下载模板文件，并参照模板格式进行文件内容修改'
   ],
   templateDownloadFlag:true,
   templateDownloadFileUrl:'/excelTemplete/表结构设计模板.xlsx',
   templateDownloadFileName:'表结构设计模板.xlsx',
   templateDownloadBtnText:'下载模板文件',

})

/**
 * 展示读取到的表格 使用的属性
 */
const tableProps: OwlShowTableType = reactive({
    fileList:[],
    tableHeaderList:['序号','字段描述','字段名称','类型','长度','是否必填（Y/N）','主键（Y/N）','备注'],
    tableDataList:[],
})

/**
 * 展示sql 使用的属性
 */
const textPanelProps: OwlTextPanelType = reactive({
    text:'',
    placeholder: '自动生成的SQL',
    rowsNum: 28,
    autoSizeFlag:false,
    resizeEnum:'none',
    disabledFlag:false,
    
})

/**
 * 展示sql 使用的属性
 */
const textPanelForShowProps: OwlTextPanelType = reactive({
    text:'',
    placeholder: '自动生成的SQL',
    rowsNum: 28,
    autoSizeFlag:false,
    resizeEnum:'none',
    disabledFlag:true, // 禁用了这个值
    
})




/**
 * 接收到子组件传递过来的-添加文件
 * @param file
 */
const addFile = (file:any) => {
    uploadFileProps.fileList.push(file)
    tableProps.fileList.push(file)
}
/**
 * 接收到子组件传递过来的-剔除文件
 * @param file 
 */
const removeFile = (file:any) => {
    uploadFileProps.fileList.splice(uploadFileProps.fileList.indexOf(file),1)
    tableProps.fileList.splice(tableProps.fileList.indexOf(file),1)
}

/**
 * 接收到子组件传递过来的-excel数据读取成功
 * @param dataList 
 */
const excelDataListReadSuccess = (dataList:Array<JSON>) => {
    tableProps.tableDataList?.splice(0,tableProps.tableDataList.length)
    dataList.forEach((item:any) => {
        tableProps.tableDataList?.push(item)
    })
}

/**
 * 对生成的sql进行了编辑
 * @param text 
 */
const textForUseChanged = (text:string) => {
    textPanelProps.text = text
    // 展示用的文本值也一并更新一下
    textPanelForShowProps.text = text
}

/**
 * 上一步
 */
const last = () => {
    console.log('自减前 ： ',active.value)
    if (active.value-- < 0) active.value = 0
    console.log('自减后 ： ',active.value)
    console.log('------')
}

/**
 * 提示警告信息
 * @param msg 
 */
const showWarningMsg = (msg:string) => {
    ElMessage.warning({
        message: msg,
        duration: 5000,
        showClose: true,
    })
}
/**
 * 下一步
 */
const next = () => {

    console.log('自增前 ： ',active.value)
    if (active.value == 0 && uploadFileProps.fileList.length == 0) {
        showWarningMsg('请选择目标文件后再执行下一步！')
       return;
    }
    
    if (active.value == 1 && tableProps.tableDataList.length == 0) {
        showWarningMsg(`未读取到文件内容，请检查文件内容是否正确！`);
       return;
    }else{
        // 组装文件内容
        let sqlTextBegin:string = `create table 'tableName' ( \n`;
        let sqlAttrubites:string = '';
        let sqlKeys:string = '';
        let sqlTextEnd:string = `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
        
        console.log('拼接核心的sql了 ： ',tableProps.tableDataList)

       
          tableProps.tableDataList.forEach(dataItem => {
            console.log(dataItem)
            // tableHeaderList:['序号','字段描述','字段名称','类型','长度','是否必填（Y/N）','主键（Y/N）','备注'],
             
            console.log(dataItem['字段描述'])
            
          });
        



        textPanelProps.text = sqlTextBegin + sqlAttrubites + sqlKeys + sqlTextEnd;
        textPanelForShowProps.text = sqlTextBegin + sqlAttrubites + sqlKeys + sqlTextEnd;
    }

    if (active.value++ > 2) active.value = 0
    console.log('自增后 ： ',active.value)
    console.log('----')
    
}

const done = () => {
   active.value = 0
   uploadFileProps.fileList = []

}

</script>

<style scoped>

.step-box{
    border: 0px solid red;
    height: 90px;
    padding-top: 15px;
    background-color: white;
    border-radius: 10px;
}

.content-box{
    border: 0px solid rgb(26, 255, 0);
    max-height: 650px;
    margin-top: 10px;
}

.bottom-box{
    margin-top: 10px;
    text-align: center;
}
</style>