<template>

    <el-empty description="暂无数据" :image-size="200" v-if="dataEmptyFlag" class="empty-box"/>

    <!-- :header-row-style="{ fontWeight:'bold'}" -->
    <el-table v-else :data="excelDataList" stripe :border="true" max-height="550" 
        style="border-radius: 5px;"
        :header-cell-style="{fontWeight:'bold',color:'black',textAlign:'center'}" 
        :cell-style="{textAlign:'center'}">
        <template v-for="headerItem in props.tableHeaderList">
            <el-table-column :prop="headerItem" :label="headerItem" show-overflow-tooltip></el-table-column>
        </template>
    </el-table>
    
</template>

<script setup lang="ts">

import * as XLSX from 'xlsx'

import { ref } from 'vue'

// 传入进来的文件组件对象
import type { OwlShowTableType } from './OwlShowTableType'; 

// 组件接受父组件传过来的值
const props = defineProps<OwlShowTableType>()

// 发送事件出去
// const emitsEventList = defineEmits(['excelDataListRreadSuccess'])
const emitsEventList = defineEmits<{
    (event: 'excelDataListReadSuccess', excelDataList: Array<JSON>): void
}>()

// 文件数据是否为空
const dataEmptyFlag = ref(true)

// 解析Excel文件得到的json数据
const excelDataList = ref<Array<JSON>>([])

// 解析Excel文件
const parseExcel = (file:File) => {
    // 创建一个读取器
    const reader = new FileReader()
    // 读取完成
    reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:0}) as Array<JSON>;

        // 如果没有数据，则证明文件读取失败
        if(sheetData.length == 0){
            dataEmptyFlag.value = true
        }else{
            dataEmptyFlag.value = false
            excelDataList.value.splice(0,excelDataList.value.length)
            for(let i = 0;i < sheetData.length;i++){
                excelDataList.value.push(sheetData[i])
            }
            // 读取成功，把读取到的数据通过事件的形式发送出去
            emitsEventList('excelDataListReadSuccess',excelDataList.value)
        }

        // 在这里处理解析后的Excel数据

    }
    reader.readAsArrayBuffer(file);
}

// 解析Excel文件
parseExcel(props.fileList[0].raw)




</script>

<style lang="css" scoped>
.empty-box{
    border: 1px solid rgb(244, 241, 241);
    border-radius: 10px;
    background-color: aliceblue;
}


</style>
