
<!-- 
    整体的键盘
 -->
<template>
    <div class="key-board-panel">
        <OwlKeyBoardItem  key-value="Q"/>
        <OwlKeyBoardItem  key-value="W"/>
        <OwlKeyBoardItem  key-value="E"/>
        <OwlKeyBoardItem  key-value="R"/>
        <OwlKeyBoardItem  key-value="T" :width-value="100" />
    </div>
</template>

<script setup lang="ts">

import OwlKeyBoardItem from './OwlKeyBoardItem.vue';

</script>



<style scoped>

    .key-board-panel{
        border: 0px solid rgb(18, 216, 71);
        height: 400px;
        width: 1200px;
        padding: 10px;
        background-color: white;
    }


</style>