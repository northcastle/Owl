<!-- 
选择文件的组件 
accept=".xlsx,.xls"
-->
<template>

   <el-upload ref="uploadFileC" class="upload-component" drag
    v-model:file-list="fileList" :accept="props.acceptTypes"
    :disabled="props.disalbedFlag" :multiple="props.multipleFlag" :limit="props.limitNum" :auto-upload="props.autoUploadFlag"
    :before-remove="beforeRemove"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed" >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
       文件拖进来 or <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <ul>
          <li v-for="tipItem in props.tipList">{{ tipItem }}</li>
        </ul>
        <div style="text-align: right;" v-if="props.templateDownloadFlag">
          <el-button type="primary" text @click="downloadTemplete">{{ props.templateDownloadBtnText }}</el-button>
        </div>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type {UploadInstance, UploadProps, UploadUserFile } from 'element-plus'

import type { OwlChooseFileProps } from './OwlChooseFileType'

// 组件实例
const uploadFileC = ref<UploadInstance>()

// 组件接受父组件传过来的值
const props = defineProps<OwlChooseFileProps>()

// 给父组件发送事件
const emitsEventList = defineEmits<{
  (eventName: 'addFile', file:any): void,
  (eventName: 'removeFile', file:any): void,
}>()
// 选中的文件列表
const fileList = ref<UploadUserFile[]>([])
// 如果传递过来的属性值种的fileList有值，则赋值
if(props.fileList && props.fileList.length > 0){
  fileList.value = props.fileList
} 


/**
 * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
 * @param uploadFile 
 * @param uploadFiles 
 */
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // 这里可以做一个文件大小的限制
  if (uploadFile.size && uploadFile.size > 1024 * 1024 * props.fileSize) {
    ElMessage.warning({
      message:`文件大小不能超过 ${props.fileSize}MB`,
      duration: 5000,
      showClose: true,
    })
    // 清空文件列表,需要剔除新上传上来的文件
    // console.log('handleChange- warning : ',uploadFile)
    // console.log('handleChange-warning : ',uploadFiles)
    // console.log('handleChange-warning : ',fileList.value)
    //uploadFileC.value?.clearFiles()
    //fileList.value = []
    if(fileList.value && fileList.value.length > 0){
      // 剔除最后一个元素
      fileList.value.pop()
    }
    return ;
  }

  // console.log('handleChange-uploadFile : ',uploadFile)
  // console.log('handleChange-uploadFiles : ',uploadFiles)
  // console.log('handleChange-fileList : ',fileList.value) // 这个时候这地方是还没有放进来,比较奇怪
  // fileList.value.push(uploadFile)
  // 通知父组件把这个文件放进来
  emitsEventList('addFile',uploadFile)

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
  // console.log('handleRemove-file : ',file)
  // console.log('handleRemove-uploadFiles : ',uploadFiles)
  // console.log('handleRemove-fileList : ',fileList.value)
  // 这里也需要发送事件给父组件
  //uploadFileC.value?.clearFiles()
  emitsEventList('removeFile',file)
}

/**
 * 超出文件个数限制
 * @param files 
 * @param uploadFiles 
 */
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning({
    message:`每次最多上传 ${props.limitNum} 个文件，当前文件个数 ${files.length} 个，已达到文件个数上限！ `,
    duration: 5000,
    showClose: true,
  })
}

/**
 * 下载模板
 */
const downloadTemplete = () => {



  // 创建隐藏的可下载链接
  const link = document.createElement('a');
  // 构建文件的完整URL，注意使用绝对路径，从 public 开始
  link.href = props.templateDownloadFileUrl;
  link.style.display = 'none'; // 隐藏链接
  document.body.appendChild(link);

  // 设置下载的文件名（对于某些浏览器可能不是必需的，因为它们会默认使用链接中的文件名）
  link.download = props.templateDownloadFileName;

  // 触发点击
  link.click();

  // 清理
  document.body.removeChild(link);
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