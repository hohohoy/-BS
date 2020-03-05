<template>
  <div class="super">
    <div class="header" style="width: 90%;position:relative;display: flex;justify-content: flex-end;">
      <el-button @click="addAdmin" class="addbtn" style="padding:12px 30px">
            <i class="el-icon-circle-plus" style="margin-right:3px"></i>添加管理员
      </el-button>
      </div>
    <el-table ref="aa" :data="tableData" max-height="490" border style="width: 90%">
      <el-table-column prop="id" label="管理员序号" width="120"></el-table-column>
      <el-table-column prop="adminname" label="管理员名" width="150"></el-table-column>
      <el-table-column prop="time" label="创建账号时间" width="170"></el-table-column>
      <el-table-column prop="accountStatus" label="账号状态" width="120">
        <template slot-scope="scope">
          <span ref="bb">{{scope.row.accountStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch style="margin-right:10px" v-model="scope.row.btnName" @change="updateSta(scope.row.accountStatus,scope.row.adminname,scope.row.btnName)" active-text="冻结"></el-switch>
          <!-- <el-button class="statusBtn">{{scope.row.btnName}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getTime } from "../../assets/js/common";
export default {
  name: "super",
  inject:['reload'],
  data() {
    return {
      tableData: [],
      newAdmin: {
        adminname: "",
        pwd: "",
        identity: "管理员",
        time: ""
      },
    };
  },
  // watch:{
  //   'scope.row.btnName':{
  //     handle(newStatus,oldStatus){
  //       console.log(newStatus,oldStatus)
  //     },
  //     immediate: true,
  //     deep: true,
  //   }
  // },
  created() {
    this.$axios.get("/api/admin/getadminlist").then(res => {
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].time = getTime(res.data[index].time);
        if (res.data[index].accountStatus == 1) {
          res.data[index].accountStatus = "正常";
          res.data[index].btnName = false;
        } else {
          res.data[index].accountStatus = "已冻结";
          res.data[index].btnName = true;
        }
      }
      this.tableData = res.data;
    });
  },
  methods: {
    //添加管理员
    addAdmin() {
        this.$router.push('/admin/addAdmin')
    },
    updateSta(sta,name,status){
      this.$axios.post('/api/admin/freezeOperation',{adminname:name,accountStatus:status})
      .then(res=>{
        if(res.status==200){
          this.reload();
            // console.log(this.$refs.bb.value); 
            //  this.$nextTick(function() {
            //     this.$refs.aa.refresh(); 
            //  })
          status=status?'冻结':'解冻';
          const h = this.$createElement;
          this.$message({
          message: h('p', { style: 'font-size:16px' }, [
            h('span', { style: 'font-size:16px' }, '账号 '),
            h('i', { style: 'color: teal;font-size:16px' }, name),
            h('span', { style: 'font-size:16px' }, '已'+status)
          ])
        });
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>