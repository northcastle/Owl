
<!-- 
    展示键盘的组件
 -->
<template>
    <div class="key-board-view">
        <el-row>
            <!-- 左侧的案例内容 -->
            <el-col :span="12">
                <div class="text-box-left">
                    <el-card style="width: 100%;height: 100%;" shadow="hover">
                        <template #header>
                            <div class="content-header">
                                <span>Card name</span>
                            </div>
                        </template>

                        <el-scrollbar height="450px">
                            <p v-for="o in 400" :key="o" class="text item">{{ 'List item ' + o }}</p>
                        </el-scrollbar>
                       
                    </el-card>
                </div>
            </el-col>
            <!-- 右侧的输入内容 -->
            <el-col :span="12" >
                <div class="text-box-right">asdadf</div>
            </el-col>
            <!-- 下面的键盘 -->
            <el-col :span="24">
                <div class="keyboard-area"> <OwlKeyBoard /></div>
            </el-col>
        </el-row>

        
    </div>
</template>

<script setup lang="ts">

import OwlKeyBoard from '../components/owlkeyboard/OwlKeyBoard.vue'

</script>



<style scoped>

.key-board-view{
    border: 0px solid red;
    /* height: 400px; */
    /* width: 1200px; */
}

.text-box-left{
    border: 1px solid green;
    background-color: rgb(240, 236, 12);
    height: 470px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
}

.text-box-right{
    border: 1px solid green;
    height: 470px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
}

.keyboard-area{
    border: 1px solid rgb(90, 242, 9);
    
    height: 330px;
    padding-left: 150px;
    padding-top: 10px;
    border-radius: 10px 10px 10px 10px;
}

</style>
