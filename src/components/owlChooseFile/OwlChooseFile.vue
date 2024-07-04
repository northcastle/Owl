<!-- 
选择文件的组件 
accept=".xlsx,.xls"
-->
<template>
   <el-upload ref="uploadFileC" class="upload-component" drag
    v-model:file-list="fileList" accept=".ico,.png"
    :disabled="false" :multiple="false" :limit="1" :auto-upload="false"
    :before-remove="beforeRemove"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed" >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      <!-- Drop file here or <em>click to upload</em> -->
       文件拖进来 or <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <ul>
          <li>啊手动阀手动阀撒旦发射点发射点发射点发射点发</li>
          <li>啊手动阀手动阀撒旦发射点发射点发射点发射点发</li>
          <li>啊手动阀手动阀撒旦发射点发射点发射点发射点发</li>
        </ul>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type {UploadInstance, UploadProps, UploadUserFile } from 'element-plus'


const uploadFileC = ref<UploadInstance>()

const fileList = ref<UploadUserFile[]>([])

/**
 * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
 * @param uploadFile 
 * @param uploadFiles 
 */
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // 这里可以做一个文件大小的限制
  if (uploadFile.size && uploadFile.size > 1024 * 1024 * 2) {
    ElMessage.warning({
      message:`文件大小不能超过 2MB`,
      duration: 5000,
      showClose: true,
    })
    // 清空文件列表
    uploadFileC.value?.clearFiles()
    fileList.value = []
    return ;
  }
}

/**
 * 点击选中的文件时触发
 * @param uploadFile 
 */
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
}

/**
 * 删除之前的动作
 * @param uploadFile 
 * @param uploadFiles 
 */
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定移出当前文件 ${uploadFile.name} ?`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(
    () => true,
    () => false
  )
}
/**
 * 删除文件
 * @param file 
 * @param uploadFiles 
 */
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
}

/**
 * 超出文件个数限制
 * @param files 
 * @param uploadFiles 
 */
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning({
    message:`每次最多上传 ${uploadFiles.length} 个文件，当前文件个数 ${files.length} 个，已达到文件个数上限！ `,
    duration: 5000,
    showClose: true,
  })
}

</script>

<style scoped>

.upload-component{
  border: 1px solid rgb(193, 186, 186);
  padding: 10px;
  border-radius: 5px;
}
.el-upload__text{
  font-size: 1.2rem;
}

.el-upload__tip{
  font-size: 1rem;
  color: rgb(255, 255, 255);
}
</style>