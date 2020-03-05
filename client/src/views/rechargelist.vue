<template>
    <div class="rechargelist">
        <div class="content">
            <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="username"
            label="用户名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="cardid"
            label="卡号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="money"
            label="充值金额">
        </el-table-column>
        <el-table-column
            prop="time"
            label="充值时间">
            <!-- <template slot-scope="scope">
                <span :class="scope.row.time  | timeFilter(scope.row.time) "></span>
            </template> -->
        </el-table-column>
        </el-table>
        </div>
    </div>
</template>
<script>
import {getTime} from '../assets/js/common'
export default {
    name:'rechangelist',
    data(){
        return{
            tableData:[]
        }
    },
    created(){
        this.$axios.post('/api/users/getRechargeList',{username:this.$store.getters.user.name})
        .then(res=>{
            console.log(res.data)
            this.tableData=res.data
            for(let i=0;i<this.tableData.length;i++){
                console.log(getTime(this.tableData[i].time))
                this.tableData[i].time=getTime(this.tableData[i].time)
            }
        })
    },
    filters:{
        timeFilter(val){
            // console.log(getTime(val))
            // let time=getTime(val);
            // return time;
        }
    },
    methods:{
        rewardStatusData(val,row){
            console.log(val)
        }
    }
}
</script>>
<style lang="less" scoped>
    .rechargelist{
        width: 100%;
        display: flex;
        justify-content: center;
        .content{
            width: 75%;
            height: 450px;
            overflow: auto;
        }
    }
</style>