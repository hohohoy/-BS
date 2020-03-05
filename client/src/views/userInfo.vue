<template>
    <div class="userInfo">
        <userinfo></userinfo>
    </div>
</template>
<script>
import userinfo from "./userPage/user_info.vue";
export default {
    name:"userInfo",
    components:{
        userinfo
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods:{

    }
}
</script>
<style scoped>

</style>