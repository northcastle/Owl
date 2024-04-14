
<!-- 
    整体的键盘
 -->
<template>
    <div class="key-board-panel">
        <!-- F数字行 -->
        <OwlKeyBoardItem  key-text="Esc" :key-code="27" :width-value="75"/>
        <OwlKeyBoardItem  key-text="F1" :key-code="112"/>
        <OwlKeyBoardItem  key-text="F2" :key-code="113"/>
        <OwlKeyBoardItem  key-text="F3" :key-code="114"/>
        <OwlKeyBoardItem  key-text="F4" :key-code="115"/>
        <OwlKeyBoardItem  key-text="F5" :key-code="116"/>
        <OwlKeyBoardItem  key-text="F6" :key-code="117"/>
        <OwlKeyBoardItem  key-text="F7" :key-code="118"/>
        <OwlKeyBoardItem  key-text="F8" :key-code="119"/>
        <OwlKeyBoardItem  key-text="F9" :key-code="120"/>
        <OwlKeyBoardItem  key-text="F10" :key-code="121"/>
        <OwlKeyBoardItem  key-text="F11" :key-code="122"/>
        <OwlKeyBoardItem  key-text="F12" :key-code="123"/>
        <OwlKeyBoardItem  key-text="🥇"/>
        <br>
        <!-- 数字行 -->
        <OwlKeyBoardItem  key-text="`~" :key-code="192" code="Backquote"/>
        <OwlKeyBoardItem  key-text="1 !" :key-code="49" code="Digit1"/>
        <OwlKeyBoardItem  key-text="2 @" :key-code="50" code="Digit2"/>
        <OwlKeyBoardItem  key-text="3 #" :key-code="51" code="Digit3"/>
        <OwlKeyBoardItem  key-text="4 $" :key-code="52" code="Digit4"/>
        <OwlKeyBoardItem  key-text="5 %" :key-code="53" code="Digit5"/>
        <OwlKeyBoardItem  key-text="6 ^" :key-code="54" code="Digit6"/>
        <OwlKeyBoardItem  key-text="7 &" :key-code="55" code="Digit7"/>
        <OwlKeyBoardItem  key-text="8 *" :key-code="56" code="Digit8"/>
        <OwlKeyBoardItem  key-text="9 (" :key-code="57" code="Digit9"/>
        <OwlKeyBoardItem  key-text="0 )" :key-code="48" code="Digit0"/>
        <OwlKeyBoardItem  key-text="- _" :key-code="189" code="Minus" />
        <OwlKeyBoardItem  key-text="= +" :key-code="187" code="Equal"/>
        <OwlKeyBoardItem  key-text="del" :key-code="8"  code="Backspace" :width-value="75" />
        <br>
        <!-- 第一行 -->
        <OwlKeyBoardItem  key-text="Tab" :key-code="9" code="Tab" :width-value="75"/>
        <OwlKeyBoardItem  key-text="Q" :key-code="81" code="KeyQ"/>
        <OwlKeyBoardItem  key-text="W" :key-code="87" code="KeyW"/>
        <OwlKeyBoardItem  key-text="E" :key-code="69" code="KeyE"/>
        <OwlKeyBoardItem  key-text="R" :key-code="82" code="KeyR"/>
        <OwlKeyBoardItem  key-text="T" :key-code="84" code="KeyT"/>
        <OwlKeyBoardItem  key-text="Y" :key-code="89" code="KeyY"/>
        <OwlKeyBoardItem  key-text="U" :key-code="85" code="KeyU"/>
        <OwlKeyBoardItem  key-text="I" :key-code="73" code="KeyI"/>
        <OwlKeyBoardItem  key-text="O" :key-code="79" code="KeyO"/>
        <OwlKeyBoardItem  key-text="P" :key-code="80" code="KeyP"/>
        <OwlKeyBoardItem  key-text="[ {" :key-code="219" code="BracketLeft"/>
        <OwlKeyBoardItem  key-text="] }" :key-code="221" code="BracketRight"/>
        <OwlKeyBoardItem  key-text="\ |" :key-code="220" code="Backslash"/>
        <br>

        <!-- 第二行 -->
        <OwlKeyBoardItem  key-text="Caps" :key-code="20" code="CapsLock" :width-value="95" :caps-flag="true"/>
        <OwlKeyBoardItem  key-text="A" :key-code="65" code="KeyA"/>
        <OwlKeyBoardItem  key-text="S" :key-code="83" code="KeyS"/>
        <OwlKeyBoardItem  key-text="D" :key-code="68" code="KeyD"/>
        <OwlKeyBoardItem  key-text="F" :key-code="70" code="KeyF" :fj-flag="true"/>
        <OwlKeyBoardItem  key-text="G" :key-code="71" code="KeyG"/>
        <OwlKeyBoardItem  key-text="H" :key-code="72" code="KeyH"/>
        <OwlKeyBoardItem  key-text="J" :key-code="74" code="KeyJ" :fj-flag="true"/>
        <OwlKeyBoardItem  key-text="K" :key-code="75" code="KeyK"/>
        <OwlKeyBoardItem  key-text="L" :key-code="76" code="KeyL"/>
        <OwlKeyBoardItem  key-text="; :" :key-code="186" code="Semicolon"/>
        <OwlKeyBoardItem  key-text="’ ”" :key-code="222" code="Quote"/>
        <OwlKeyBoardItem  key-text="Enter" :key-code="13" code="Enter" :width-value="73"/>
        <br>
        
        <!-- 第三行 -->
        <OwlKeyBoardItem  key-text="Shift" :key-code="16" code="ShiftLeft" :width-value="113"/>
        <OwlKeyBoardItem  key-text="Z" :key-code="90" code="KeyZ"/>
        <OwlKeyBoardItem  key-text="X" :key-code="88" code="KeyX"/>
        <OwlKeyBoardItem  key-text="C" :key-code="67" code="KeyC"/>
        <OwlKeyBoardItem  key-text="V" :key-code="86" code="KeyV"/>
        <OwlKeyBoardItem  key-text="B" :key-code="66" code="KeyB"/>
        <OwlKeyBoardItem  key-text="N" :key-code="78" code="KeyN"/>
        <OwlKeyBoardItem  key-text="M" :key-code="77" code="KeyM"/>
        <OwlKeyBoardItem  key-text=", <" :key-code="188" code="Comma"/>
        <OwlKeyBoardItem  key-text=". >" :key-code="190" code="Period"/>
        <OwlKeyBoardItem  key-text="/ ?" :key-code="191" code="Slash"/>
        <OwlKeyBoardItem  key-text="↑" :key-code="38" code="ArrowUp"/>
        <OwlKeyBoardItem  key-text="Shift" :key-code="16" code="ShiftRight" :width-value="55"/>
        <br>

        <!-- 第四行 -->
        <OwlKeyBoardItem  key-text="Fn"/>
        <OwlKeyBoardItem  key-text="Ctrl" :key-code="17" code="ControlLeft"/>
        <OwlKeyBoardItem  key-text="Alt" :key-code="18" code="AltLeft"/>
        <OwlKeyBoardItem  key-text="Win" :key-code="91" code="MetaLeft"/>
        <OwlKeyBoardItem  key-text="Space" :key-code="32" code="Space" :width-value="260" />
        <OwlKeyBoardItem  key-text="Com" :key-code="93" code="MetaRight"/>
        <OwlKeyBoardItem  key-text="Opt" :key-code="18" code="AltRight"/>
        <OwlKeyBoardItem  key-text="←" :key-code="37" code="ArrowLeft" :width-value="43"/>

        
        <OwlKeyBoardItem  key-text="↓" :key-code="40" code="ArrowDown"/>
        
        <OwlKeyBoardItem  key-text="→" :key-code="39" code="ArrowRight" :width-value="55"/>
      
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
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
    }


</style>