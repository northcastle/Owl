
<!-- 
    头像组件
 -->
 <template>
    <div class="owl-avatar-box">
        <el-avatar size="large" :src="imgUrl" />
        <div v-if="nickName" class="nick-name-item">{{ nickName }}</div>
    </div>
</template>

<script setup lang="ts">

    import type {OwlAvatarProps} from './OwlAvatarType'

   const props =  defineProps<OwlAvatarProps>()

</script>



<style scoped>

    .owl-avatar-box{
        width: 100%;
        border: 0px solid green;
        padding-top: 20px;
        padding-bottom: 10px;
        text-align: center;
    }

    .nick-name-item{
        font-weight: bold;
        color: white;
    }


</style>