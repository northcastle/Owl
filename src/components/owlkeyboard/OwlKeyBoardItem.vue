
<!-- 
    键盘的每个按键
 -->
<template>
    <div class="key-board-item" 
        :style="{width: widthValue + 'px',height:heightValue+'px',lineHeight:heightValue+'px'}"
        :class="{keyItemPress:keyItemPressFlag}">

        <div class="capsdot" v-if="capsShowFlag && capsFlag"></div>
        {{ keyValue }}

       
        
    </div>
</template>

<script setup lang="ts">

    import { ref,onMounted,onBeforeUnmount } from 'vue';
    import type {Ref} from 'vue';

    import type {KeyItem,KeyItemProps} from './OwlKeyBoardType'

    
   const props =  defineProps<KeyItemProps>()

   // 键盘按键 按下的标识
   const keyItemPressFlag:Ref<boolean> = ref(false)

  // 大写的标识
  const capsShowFlag:Ref<boolean> = ref(false)

    // 键盘按键的基本数据对象
    // interface KeyItem{
    //     keyCode:number,
    //     keyValue:string | number
    // }

    let keyItemList:KeyItem[] = [

        
        {keyCode:192,keyValue :'`~'},
        {keyCode:49,keyValue :'1 !'},
        {keyCode:50,keyValue :'2 @'},
        {keyCode:51,keyValue :'3 #'},
        {keyCode:52,keyValue :'4 $'},
        {keyCode:53,keyValue :'5 %'},
        {keyCode:54,keyValue :'6 ^'},
        {keyCode:55,keyValue :'7 &'},
        {keyCode:56,keyValue :'8 *'},
        {keyCode:57,keyValue :'9 ('},
        {keyCode:48,keyValue :'0 )'},
        {keyCode:189,keyValue :'- _'},
        {keyCode:187,keyValue :'= +'},
        {keyCode:8,keyValue :'del'},
        

        {keyCode:65,keyValue :'A'},{keyCode:66,keyValue :'B'},{keyCode:67,keyValue :'C'},{keyCode:68,keyValue :'D'},{keyCode:69,keyValue :'E'},
        {keyCode:70,keyValue :'F'},{keyCode:71,keyValue :'G'},{keyCode:72,keyValue :'H'},{keyCode:73,keyValue :'I'},{keyCode:74,keyValue :'J'},
        {keyCode:75,keyValue :'K'},{keyCode:76,keyValue :'L'},{keyCode:77,keyValue :'M'},{keyCode:78,keyValue :'N'},{keyCode:79,keyValue :'O'},
        {keyCode:80,keyValue :'P'},{keyCode:81,keyValue :'Q'},{keyCode:82,keyValue :'R'},{keyCode:83,keyValue :'S'},{keyCode:84,keyValue :'T'},
        {keyCode:85,keyValue :'U'},{keyCode:86,keyValue :'V'},{keyCode:87,keyValue :'W'},{keyCode:88,keyValue :'X'},{keyCode:89,keyValue :'Y'},
        {keyCode:90,keyValue :'Z'},

        {keyCode:27,keyValue :'Esc'},
        {keyCode:112,keyValue :'F1'},
        {keyCode:113,keyValue :'F2'},
        {keyCode:114,keyValue :'F3'},
        {keyCode:115,keyValue :'F4'},
        {keyCode:116,keyValue :'F5'},
        {keyCode:117,keyValue :'F6'},
        {keyCode:118,keyValue :'F7'},
        {keyCode:119,keyValue :'F8'},
        {keyCode:120,keyValue :'F9'},
        {keyCode:121,keyValue :'F10'},
        {keyCode:122,keyValue :'F11'},
        {keyCode:123,keyValue :'F12'},

       
        
       
        {keyCode:9,keyValue :'Tab'},
        {keyCode:13,keyValue :'Enter'},
        {keyCode:16,keyValue :'Shift'},
        {keyCode:20,keyValue :'Caps'},
        {keyCode:17,keyValue :'Ctrl'},
        {keyCode:1800000,keyValue :'Alt'},
        {keyCode:1800000,keyValue :'Opt'},
        {keyCode:9100000,keyValue :'Win'},
        {keyCode:9100000,keyValue :'Com'},
        {keyCode:32,keyValue :'Space'},

        {keyCode:219,keyValue :'[ {'},
        {keyCode:221,keyValue :'] }'},
        {keyCode:220,keyValue :'\\ |'},
        {keyCode:186,keyValue :'; :'},
        {keyCode:222,keyValue :'’ ”'},
        {keyCode:188,keyValue :', <'},
        {keyCode:190,keyValue :'. >'},
        {keyCode:191,keyValue :'/ ?'},
        
        
        {keyCode:37,keyValue :'←'},
        {keyCode:38,keyValue :'↑'},
        {keyCode:39,keyValue :'→'},
        {keyCode:40,keyValue :'↓'},
    
    ]

    /**
     * 监听 按键按下的事件
     * @param event 
     */
   const handleKeyDown = (event:any)=>{

    // console.log(event.keyCode,props.keyValue)

    // 判断是否是 Caps 按键，如果是，则点亮小按钮
    if(event.keyCode == 20){
        capsShowFlag.value = !capsShowFlag.value;
    }

    // 判断键盘的值，对应的点亮某个按键
    for(let i = 0;i < keyItemList.length;i++){
        let item = keyItemList[i];
        if(item.keyCode == event.keyCode && item.keyValue == props.keyValue){
            keyItemPressFlag.value = true
            break;
        }
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

    .keyItemPress{
        color: white;
        box-shadow: 0px 0px 10px 0px rgb(6, 191, 197);
        background-image: radial-gradient(circle, #b878ea, #7d9eff, #13bcff, #00d4ff, #00e8ff, #00f1f6, #00f8e7, #00ffd3, #40ffb1, #70ff88, #9eff58, #ccfc00);
        /* background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); */
       
    }
</style>