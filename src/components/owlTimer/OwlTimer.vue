<!-- 计时器 -->
<template>
    <div class="owl-timer-container">

        <el-icon size="1.5rem" color="black" style="position: absolute;margin-top: 4px;"><AlarmClock /></el-icon>
        <span class="time-text">
           
            Time ：{{ formatTimeText(timeUseNum) }}
        </span>

        <el-button v-if="(!isActiveFlag || isPauseFlag) && !isStopFlag"  type="success" size="small" :icon="VideoPlay" style="font-size: 1.5rem;padding:10px" circle @click="startTimer" />
        <el-button v-if="isActiveFlag" type="warning" size="small" :icon="VideoPause" style="font-size: 1.5rem;" circle @click="pauseTimer"/>
        <el-button v-if="isActiveFlag || isPauseFlag" type="danger" size="small" :icon="SwitchButton" style="font-size: 1.5rem;" circle @click="stopTimer"/>
        <el-button v-if="isPauseFlag || isStopFlag" type="primary" size="small" :icon="Refresh" style="font-size: 1.5rem;" circle @click="reStartTimer"/>
    </div>
</template>

<script setup lang="ts">

    import {ref,watch} from 'vue'

    import type {Ref} from 'vue'

    import { VideoPlay,VideoPause,SwitchButton,Refresh } from '@element-plus/icons-vue'

    import { useIntervalFn } from '@vueuse/core'


    // 用时
    const timeUseNum = ref(36000)

    // 是否开始的标识位
    const isActiveFlag:Ref<boolean> = ref(false)

    // 是否暂停标识位
    const isPauseFlag:Ref<boolean> = ref(false)

    // 是否停止的标识位
    const isStopFlag:Ref<boolean> = ref(false)

    

    // 创建一个定时器
    const { pause, resume, isActive }  = useIntervalFn(() => {
       timeUseNum.value++
    }, 1000,{immediate:false})


    // 监听定时器的状态
    watch(isActive,(newValue:boolean,oldValue:boolean)=>{
        isActiveFlag.value = newValue
    })

    // 开始
    const startTimer = ()=>{
        // 如果是从停止状态再到了开始的话，需要重置一下初始值
        if(isStopFlag.value){
            timeUseNum.value = 0
        }
        resume()
        isPauseFlag.value = false;
        isStopFlag.value = false;
        
    }
    // 暂停
    const pauseTimer = ()=>{
        pause()
        isPauseFlag.value = true;
        isStopFlag.value = false;
    }

    //直接停止
    const stopTimer = ()=>{
        pause();
        isPauseFlag.value = false;
        isStopFlag.value = true;
      
    }

    // 重新开始
    const reStartTimer = ()=>{
        timeUseNum.value = 0
        isPauseFlag.value = false;
        isStopFlag.value = false
        startTimer()

 
    }

    // 格式化时间
    const formatTimeText = (timenum:number):string=>{
        let timeText = '';

        if(timenum < 60){ // 1分钟之内
            return timenum+'秒'
        }else if(timenum > 59 && timenum < 60*60){ // 1小时之内
            let minute = Math.floor(timenum / 60);
            let second = timenum % 60;
            return minute+'分钟 '+second+'秒'
        }else if(timenum > 3599 && 60*60*24){ // 1天之内
            let hour = Math.floor(timenum / 3600)
            let minute = Math.floor( (timenum % 3600 ) / 60 )
            let second = timenum % 60;
            return hour+'小时 '+minute+'分钟 '+second+'秒'
        }

        return timeText;
    }

</script>

<style scoped>

.owl-timer-container{
    border: 0px solid rgb(0, 0, 0);
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    /* background-image: linear-gradient(to bottom, #65faff, #57ecff, #56ddff, #61ceff, #71bef8, #6ebef8, #6cbff8, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); */
    /* background-image: linear-gradient(to bottom, #65faff, #6ffaff, #77fbff, #7ffbff, #87fbff, #86fbfe, #86fbfd, #85fbfc, #7cfbfa, #73fbf7, #69fbf4, #5ffbf1); */
    background-image: linear-gradient(to right top, #65faff, #6df0ff, #83e5ff, #9cdaff, #b2ceff, #b0ceff, #aecfff, #accfff, #92dbff, #74e7ff, #5ef2ff, #5ffbf1);

}


.time-text{
    display: inline-block;
    border: 0px solid red;
    color: rgb(0, 0, 0);
    font-size: 1.3rem;
    font-weight: bold;
    margin-right: 20px;
    margin-left: 30px
}
</style>