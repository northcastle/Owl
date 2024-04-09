
<!-- 
    整体的键盘
 -->
<template>
    <div class="key-board-panel">
        <!-- F数字行 -->
        <OwlKeyBoardItem  key-value="Esc" :width-value="75"/>
        <OwlKeyBoardItem  key-value="F1"/>
        <OwlKeyBoardItem  key-value="F2"/>
        <OwlKeyBoardItem  key-value="F3"/>
        <OwlKeyBoardItem  key-value="F4"/>
        <OwlKeyBoardItem  key-value="F5"/>
        <OwlKeyBoardItem  key-value="F6"/>
        <OwlKeyBoardItem  key-value="F7"/>
        <OwlKeyBoardItem  key-value="F8"/>
        <OwlKeyBoardItem  key-value="F9"/>
        <OwlKeyBoardItem  key-value="F10"/>
        <OwlKeyBoardItem  key-value="F11"/>
        <OwlKeyBoardItem  key-value="F12"/>
        <OwlKeyBoardItem  key-value="🥇"/>
        <br>
        <!-- 数字行 -->
        <OwlKeyBoardItem  key-value="`~"/>
        <OwlKeyBoardItem  key-value="1 !"/>
        <OwlKeyBoardItem  key-value="2 @"/>
        <OwlKeyBoardItem  key-value="3 #"/>
        <OwlKeyBoardItem  key-value="4 $"/>
        <OwlKeyBoardItem  key-value="5 %"/>
        <OwlKeyBoardItem  key-value="6 ^"/>
        <OwlKeyBoardItem  key-value="7 &"/>
        <OwlKeyBoardItem  key-value="8 *"/>
        <OwlKeyBoardItem  key-value="9 ("/>
        <OwlKeyBoardItem  key-value="0 )"/>
        <OwlKeyBoardItem  key-value="- _"/>
        <OwlKeyBoardItem  key-value="= +"/>
        <OwlKeyBoardItem  key-value="del" :width-value="75"/>
        <br>
        <!-- 第一行 -->
        <OwlKeyBoardItem  key-value="Tab" :width-value="75"/>
        <OwlKeyBoardItem  key-value="Q"/>
        <OwlKeyBoardItem  key-value="W"/>
        <OwlKeyBoardItem  key-value="E"/>
        <OwlKeyBoardItem  key-value="R"/>
        <OwlKeyBoardItem  key-value="T"/>
        <OwlKeyBoardItem  key-value="Y"/>
        <OwlKeyBoardItem  key-value="U"/>
        <OwlKeyBoardItem  key-value="I"/>
        <OwlKeyBoardItem  key-value="O"/>
        <OwlKeyBoardItem  key-value="P"/>
        <OwlKeyBoardItem  key-value="[ {"/>
        <OwlKeyBoardItem  key-value="] }"/>
        <OwlKeyBoardItem  key-value="\ |"/>
        <br>

        <!-- 第二行 -->
        <OwlKeyBoardItem  key-value="Caps" :width-value="95"/>
        <OwlKeyBoardItem  key-value="A"/>
        <OwlKeyBoardItem  key-value="S"/>
        <OwlKeyBoardItem  key-value="D"/>
        <OwlKeyBoardItem  key-value="F"/>
        <OwlKeyBoardItem  key-value="G"/>
        <OwlKeyBoardItem  key-value="H"/>
        <OwlKeyBoardItem  key-value="J"/>
        <OwlKeyBoardItem  key-value="K"/>
        <OwlKeyBoardItem  key-value="L"/>
        <OwlKeyBoardItem  key-value="; :"/>
        <OwlKeyBoardItem  key-value="’ ”"/>
        <OwlKeyBoardItem  key-value="Enter" :width-value="73"/>
        <br>
        
        <!-- 第三行 -->
        <OwlKeyBoardItem  key-value="Shift" :width-value="113"/>
        <OwlKeyBoardItem  key-value="Z"/>
        <OwlKeyBoardItem  key-value="X"/>
        <OwlKeyBoardItem  key-value="C"/>
        <OwlKeyBoardItem  key-value="V"/>
        <OwlKeyBoardItem  key-value="B"/>
        <OwlKeyBoardItem  key-value="N"/>
        <OwlKeyBoardItem  key-value="M"/>
        <OwlKeyBoardItem  key-value=", <"/>
        <OwlKeyBoardItem  key-value=". >"/>
        <OwlKeyBoardItem  key-value="/ ?"/>
        <OwlKeyBoardItem  key-value="↑"  />
        <OwlKeyBoardItem  key-value="Shift" :width-value="55"/>
        <br>

        <!-- 第四行 -->
        <OwlKeyBoardItem  key-value="Fn"/>
        <OwlKeyBoardItem  key-value="Ctrl"/>
        <OwlKeyBoardItem  key-value="Alt"/>
        <OwlKeyBoardItem  key-value="Win"/>
        <OwlKeyBoardItem  key-value="Space" :width-value="260"/>
        <OwlKeyBoardItem  key-value="Com"/>
        <OwlKeyBoardItem  key-value="Opt" />
        <OwlKeyBoardItem  key-value="←" :width-value="43"/>

        
        <OwlKeyBoardItem  key-value="↓"  />
        
        <OwlKeyBoardItem  key-value="→" :width-value="55"/>
      
    </div>
</template>

<script setup lang="ts">

import OwlKeyBoardItem from './OwlKeyBoardItem.vue';

</script>



<style scoped>

    .key-board-panel{
        border: 0px solid rgb(18, 216, 71);
        height: 310px;
        width: 750px;
        min-width: 750px;
        min-height: 310px;
        padding: 0px;
        background-color: white;
        border-radius: 10px;
    }


</style>