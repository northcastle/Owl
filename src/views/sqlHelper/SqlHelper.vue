<template>
    <!-- 步骤条 -->
    <el-steps class="step-box"  :active="active" align-center  finish-status="success">
        <el-step title="选择文件" :icon="UploadFilled" />
        <el-step title="文件内容" :icon="Document" />
        <el-step title="生成SQL" :icon="Finished"/>
    </el-steps>
<!-- 
    临时保留一下这个步骤进度的值 ： {{ active }} <br>
 -->

    <el-divider border-style="dashed" />

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
       <div v-if="active == 3">  
            <el-row>
                <el-col :span="24">
                    <OwlTextPanel v-bind="textPanelForShowProps" />
                </el-col>
            </el-row>
       </div>
    </div>

    <!-- 下一步按钮 -->
    <div class="bottom-box">
        <el-button-group v-if="active != 3">
            <el-button type="primary" :icon="ArrowLeft" @click="last" :disabled="active == 0">上一步</el-button>
            <el-button type="primary"  @click="next" :disabled="active == 3">
                下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </el-button-group>

        <el-button-group v-else>
            <el-button type="primary" :icon="ArrowLeft" @click="last" >上一步</el-button>
            <el-button type="success" @click="done">
                完&nbsp;&nbsp;&nbsp;&nbsp;成 <el-icon class="el-icon--right"><CircleCheckFilled /></el-icon>
            </el-button>
        </el-button-group>

       
    </div>
    
</template>

<script lang="ts" setup>

import { ref,reactive } from 'vue'

import { UploadFilled,Document,Finished,ArrowLeft,ArrowRight,CircleCheckFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


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
    //console.log('自减前 ： ',active.value)
    if (active.value-- < 0) active.value = 0
    //console.log('自减后 ： ',active.value)
    //console.log('------')
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
 * 生成-栏位的类型片段
 * MySQL 支持多种数据类型，这些类型大致可以分为以下几类：

1. **整数类型（Integer Types）**:
   - TINYINT：非常小的整数，范围通常是从-128到127，或无符号的0到255。
   - SMALLINT：小整数，范围大约是-32,768到32,767，或无符号的0到65,535。
   - MEDIUMINT：中等大小的整数，通常表示范围与INT相似。
   - INT或INTEGER：常规大小的整数，范围大约是-2^31到2^31-1，或无符号的0到2^32-1。
   - BIGINT：大整数，范围极大，通常用于非常大的计数。
   - BIT：位字段类型，用于存储位数据，M范围为1到64，默认为1。

2. **浮点数类型（Floating-Point Types）**:
   - FLOAT：单精度浮点数，占用4个字节，精度较低。
   - DOUBLE或DOUBLE PRECISION：双精度浮点数，占用8个字节，精度较高。
   - DECIMAL或NUMERIC：定点数，提供固定的精度和标度，适合财务数据，存储为字符串，更加精确。

3. **字符串类型（String Types）**:
   - CHAR：固定长度字符串，分配空间与定义长度一致。
   - VARCHAR：可变长度字符串，空间按需分配，效率高但管理开销稍大。
   - TEXT：长文本数据，有不同大小的TEXT类型（TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT）。
   - ENUM：枚举类型，只能从预定义的一组字符串中选择。
   - SET：集合类型，可以从多个预定义的字符串中选择多个值。

4. **日期和时间类型（Date and Time Types）**:
   - DATE：仅日期，格式为YYYY-MM-DD。
   - TIME：仅时间，格式为HH:MM:SS。
   - DATETIME：日期和时间的组合，格式为YYYY-MM-DD HH:MM:SS。
   - TIMESTAMP：与DATETIME类似，但自动更新且有时间戳特性。
   - YEAR：仅年份，格式通常为YYYY或YY。

5. **二进制类型（Binary Types）**:
   - BINARY、VARBINARY：固定或可变长度的二进制字符串。
   - BLOB、TEXT的二进制版本，如TINYBLOB、MEDIUMBLOB、LONGBLOB等。

6. **特殊类型**:
   - JSON：用于存储JSON格式的数据。
   - GEOMETRY：用于存储地理空间数据，包括POINT、LINESTRING、POLYGON、MULTIPOINT、MULTILINESTRING、MULTIPOLYGON和GEOMETRYCOLLECTION等类型。

选择合适的类型对于优化存储空间、提升查询效率以及保证数据的准确性至关重要。
 */
const generateSqlAttributesTypeFragment = (fieldType:string,fieldLength:string) :string =>{
    let sqlFragment = '';
    switch (fieldType) {
       
        case 'tinyint': sqlFragment = ` tinyint `;break;
        case 'smallint':sqlFragment = ` smallint `;break;
        case 'mediumint':sqlFragment = ` mediumint `;break;
        case 'int': sqlFragment = ` int `;break;
        case 'integer': sqlFragment = ` integer `;break;
        case 'bigint':  sqlFragment = ` bigint `;break;

        case 'float': sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` float(${fieldLength}) ` : ` float `;break;
        case 'double':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` double(${fieldLength}) ` : ` double `;break;
        case 'decimal':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` decimal(${fieldLength}) ` : ` decimal `;break;
        case 'numeric':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` numeric(${fieldLength}) ` : ` numeric `;break;

        case 'char': sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` char(${fieldLength}) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ` : ` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;
        case 'varchar': sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` varchar(${fieldLength}) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ` : ` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;

        case 'tinytext':sqlFragment = ` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;
        case 'text':sqlFragment = ` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;
        case 'mediumtext':sqlFragment = ` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;
        case 'longtext':sqlFragment = ` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin `;break;

        case 'binary':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` binary(${fieldLength}) ` : ` binary(100) `;break;
        case 'varbinary':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` varbinary(${fieldLength}) ` : ` varbinary(100) `;break;
        
        case 'tinyblob':sqlFragment = ` tinyblob `;break;
        case 'blob':sqlFragment = ` blob `;break;
        case 'mediumblob':sqlFragment = ` mediumblob `;break;
        case 'longblob':sqlFragment = ` longblob `;break;

        case 'date':sqlFragment = ` date `;break;
        case 'time':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` time(${Number(fieldLength) > 6 ? 6 : fieldLength}) ` : ` time `;break;
        case 'datetime':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` datetime(${Number(fieldLength) > 6 ? 6 : fieldLength}) ` : ` datetime `;break;
        case 'timestamp':sqlFragment = (fieldLength != null && fieldLength.trim() != '') ?  ` timestamp(${Number(fieldLength) > 6 ? 6 : fieldLength}) ` : ` timestamp `;break;


        
        case 'datetime':
            sqlFragment = `datetime`;
            break;
        case 'text':
            sqlFragment = `text`;
            break;
        default:
            sqlFragment =`varchar(${fieldLength})`;
    }
    return sqlFragment;
}

/**
 * 生成创建数据表的sql
 */
const generateCreateTableSql = () => {
    let sqlTextBegin:string = `CREATE TABLE 'tableName' ( \n`;
    let sqlAttrubites:string = '';
    let sqlKeys:string = '';
    let sqlTextEnd:string = `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    
    tableProps.tableDataList.forEach(dataItem => {
        //console.log(dataItem)
        // tableHeaderList:['序号','字段描述','字段名称','类型','长度','是否必填（Y/N）','主键（Y/N）','备注'],
        let fieldName:string = dataItem['字段名称'];
        let fieldType:string = dataItem['类型'];
        let fieldLength:string = dataItem['长度'];
        let fieldIsRequired:string = dataItem['是否必填（Y/N）'];
        let fieldIsPrimaryKey:string = dataItem['主键（Y/N）'];
        let fieldBz:string = dataItem['备注'];
        let fieldDesc:string = dataItem['字段描述'];

        let bzStr:string = '' ;
        if(fieldDesc && fieldDesc.trim() != ''){
            bzStr = ` COMMENT '${fieldDesc} `
        }
        if(bzStr.trim() != ''){ 
            if(fieldBz && fieldBz.trim() != ''){
                bzStr += ` ${fieldBz} `
            } 
          
        }else{
            if(fieldBz && fieldBz.trim() != ''){
                bzStr = ` COMMENT '${fieldBz} `
            } 
        }
        if(bzStr && bzStr.trim() != ''){
            bzStr += `'`
        }
        
        // 这地方应该是根据不同的数据类型进行不同的拼接 - 再优化一下
        if(fieldName && fieldName.trim() != ''){ // 属性名称不为空的时候才进行拼接
            fieldName = "`"+fieldName.trim()+"`"
            sqlAttrubites += `    ${fieldName} ${fieldType}`+ (fieldLength != null ? `(${fieldLength})` : '') +  ` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ${fieldIsRequired == 'Y' ? 'NOT NULL' : ''} ${bzStr ? bzStr : ''}, \n`
        }
        
        // 只拼接第一个主键的字符串
        if(sqlKeys.trim() === '' && fieldIsPrimaryKey == 'Y'){
            sqlKeys = `    PRIMARY KEY(`+`${fieldName}`+`) \n`
        }


    });

    //sqlAttrubites = sqlAttrubites.substring(0,sqlAttrubites.length - 3) + '\n';
        
    textPanelProps.text = sqlTextBegin + sqlAttrubites + sqlKeys + sqlTextEnd;
    textPanelForShowProps.text = sqlTextBegin + sqlAttrubites + sqlKeys + sqlTextEnd;

}
/**
 * 下一步
 */
const next = () => {

    //console.log('自增前 ： ',active.value)
    if (active.value == 0 && uploadFileProps.fileList.length == 0) {
        showWarningMsg('请选择目标文件后再执行下一步！')
       return;
    }
    
    if (active.value == 1 ) {
        if(tableProps.tableDataList.length == 0){
            showWarningMsg(`未读取到文件内容，请检查文件内容是否正确！`);
            return;
        }else{
            // 组装文件内容
            generateCreateTableSql();
        }
    }

    if(active.value == 2  ) {

        if(textPanelProps.text.trim() == ''){
            showWarningMsg('请生成SQL后再执行下一步！')
            return;
        }
       
    }

    if (active.value++ > 2) active.value = 0
    //console.log('自增后 ： ',active.value)
    //console.log('----')
    
}

/**
 * 点击完成按钮
 */
const done = () => {
    active.value = 0
    uploadFileProps.fileList = []

    tableProps.fileList = []
    tableProps.tableDataList = []

    textPanelProps.text = ''
    textPanelForShowProps.text = ''

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