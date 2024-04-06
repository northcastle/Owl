
<!-- 
    键盘的每个按键
 -->
<template>
    <div class="key-board-item" 
        :style="{width: widthValue + 'px'}"
        :class="{keyItemPress:keyItemPressFlag}">
        {{ keyValue }}
    </div>
</template>

<script setup lang="ts">

    import { ref,onMounted,onBeforeUnmount } from 'vue';
    import type {Ref} from 'vue';

    // 先定义一个接口
    interface KeyItemProps{
        keyValue?:string, // 键盘按键的值
        widthValue?:number, // 键盘按键的宽度，默认是 50px
        
    }
   const props =  defineProps<KeyItemProps>()

   // 键盘按键 按下的标识
   const keyItemPressFlag:Ref<boolean> = ref(false)

    /**
     * 监听 按键按下的事件
     * @param event 
     */
   const handleKeyDown = (event:any)=>{
    console.log(event.keyCode,props.keyValue)
    if(event.keyCode == 81 && props.keyValue == 'Q'){
        keyItemPressFlag.value = true
    }
   }

   /**
    * 监听 按键抬起的事件
    * @param event 
    */
   const handleKeyUp = (event:any) => {
    keyItemPressFlag.value = false
   }


   onMounted(()=>{
        window.addEventListener('keydown',handleKeyDown)
        window.addEventListener('keyup',handleKeyUp)
   })

   onBeforeUnmount(()=>{
        window.removeEventListener('keydown',handleKeyDown)
        window.removeEventListener('keyup',handleKeyUp)
   })

   

</script>



<style scoped>

    .key-board-item{
        border: 1px solid rgb(11, 10, 10);
        width: 50px;
        height: 50px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        color: black;
        border-radius: 10px;
        display: inline-block;
        margin-left: 16px;
        box-shadow: 0px 0px 5px 2px rgb(239, 219, 202);

    }

    .keyItemPress{
        background-color: aqua;
        box-shadow: 0px 0px 10px 0px rgb(6, 191, 197);
    }
</style>