<template>
  <div class="welcome-container">
    
    <el-image  :src="imgUrl" style="width: 560px;" />

    <el-image  :src="projectNameImageUrl" style="margin-left: 150px;" />

    <el-image  :src="projectCreateImageUrl" style="margin-left: 300px;" />

  </div>
</template>

<script setup lang="ts">

  import {ref} from 'vue'

  // const imgUrl = ref('/owl_welcome_512.png')
  import imgUrl from '/owl_welcome_512.png'

  // const projectNameImageUrl = ref('/project_name.png')
  import projectNameImageUrl from '/project_name.png'

  // const projectCreateImageUrl = ref('/project_create.png')
  import projectCreateImageUrl from '/project_create.png'

</script>

<style scoped>

.welcome-container{
  border: 0px solid red;
  border-radius: 0px 10px 10px 0px;
  width: calc(100% + 10px + 10px);
  margin-left: -10px;
  height: 100%;
  text-align: center;
  background-image: radial-gradient(circle, #65faff, #6df0ff, #83e5ff, #9cdaff, #b2ceff, #b0ceff, #aecfff, #accfff, #92dbff, #74e7ff, #5ef2ff, #5ffbf1);
}
</style>
