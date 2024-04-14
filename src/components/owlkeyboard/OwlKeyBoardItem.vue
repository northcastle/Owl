
<!-- 
    键盘的每个按键
 -->
<template>
    <div class="key-board-item" 
        :style="{width: widthValue + 'px',height:heightValue+'px',lineHeight:heightValue+'px'}"
        :class="{keyItemPress:keyItemPressFlag}">

        <div class="capsdot" v-if="capsShowFlag && capsFlag"></div>
        {{ keyText }}

        <div class="fjitem" v-if="fjFlag"></div>
       
        
    </div>
</template>

<script setup lang="ts">

    import { ref,onMounted,onBeforeUnmount } from 'vue';
    import type {Ref} from 'vue';

    import type {KeyItemProps} from './OwlKeyBoardType'

    
   const props =  defineProps<KeyItemProps>()

   // 键盘按键 按下的标识
   const keyItemPressFlag:Ref<boolean> = ref(false)

  // 大写的标识
  const capsShowFlag:Ref<boolean> = ref(false)

  // 标识 command 按下
  const commandPressFlag:Ref<boolean> = ref(false)


    /**
     * 监听 按键按下的事件
     * @param event 
     */
   const handleKeyDown = (event:any)=>{

    // 判断是否是 Caps 按键，如果是，则点亮小按钮
    if(event.keyCode == 20){
        capsShowFlag.value = !capsShowFlag.value;
    }

    // 判断是否是 ctrl/Command + s 组合按键
    // console.log(event.ctrlKey,event.metaKey)
    if ((event.ctrlKey || event.metaKey) && (event.code+'').startsWith('Key')) {
        // 阻止默认行为（保存网页）
        event.preventDefault();
    }

    if(event.metaKey){
        commandPressFlag.value = true;
    }


    // 判断键盘的值，对应的点亮某个按键
    if((event.keyCode == 16 && event.code == props.code) ||
        (event.keyCode == 18 && event.code == props.code) ||
        ((event.keyCode == props.keyCode) && event.keyCode != 16 && event.keyCode != 18) ||
        (event.keyCode == 229 && event.code == props.code)){
        keyItemPressFlag.value = true
        
    }


    // 最长亮1s，防止中断 keyUp 事件监听导致按键一直亮
    if(commandPressFlag.value){
        setTimeout(() => {
            keyItemPressFlag.value = false
            commandPressFlag.value = false
        }, 3000);
    }
   
    

   }

   /**
    * 监听 按键抬起的事件
    * @param event 
    */
   const handleKeyUp = (event:any) => {

        if((event.keyCode == 16 && event.code == props.code) ||
        (event.keyCode == 18 && event.code == props.code) ||
        ((event.keyCode == props.keyCode) && event.keyCode != 16 && event.keyCode != 18) ||
        (event.keyCode == 229 && event.code == props.code)){
        keyItemPressFlag.value = false
    }
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
        width: 40px;
        height: 40px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        color: black;
        border-radius: 8px;
        display: inline-block;
        margin-left: 10px;
        margin-top: 10px;
        box-shadow: 0px 0px 1px 2px rgb(242 233 226)

    }

    .capsdot{
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: greenyellow;
        display: inline-block;
        position: absolute;
        margin-top: 5px;
        margin-left: -23px;
    }
    .fjitem{
        width: 15px;
        height: 1.5px;
        border-radius: 10px;
        background-color: black;
        position: absolute;
        margin-top: -9px;
        margin-left: 12px;
    }

    .keyItemPress{
        color: white;
        box-shadow: 0px 0px 10px 0px rgb(6, 191, 197);
        background-image: radial-gradient(circle, #b878ea, #7d9eff, #13bcff, #00d4ff, #00e8ff, #00f1f6, #00f8e7, #00ffd3, #40ffb1, #70ff88, #9eff58, #ccfc00);
        /* background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); */
       
    }
</style>