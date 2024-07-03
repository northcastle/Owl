<!-- 
选择文件的组件 
-->
<template>
   <el-upload class="upload-component" drag
    :multiple="false" :limit="1"
  >
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

import type { UploadProps, UploadUserFile } from 'element-plus'


const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

</script>

<style scoped>

.upload-component{
  width: 50%;
  margin-left: 25%;
}
.el-upload__text{
  font-size: 1.2rem;
}

.el-upload__tip{
  font-size: 1rem;
  color: rgb(255, 255, 255);
}
</style>