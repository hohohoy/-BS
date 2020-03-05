<template>
  <div class="addAdmin">
    <div class="breadcrumb_box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/admin">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/admin/superadmin">管理员列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="containners">
      <el-form class="addForm" :rules="rules" ref="addForm" :model="adminMsg" label-width="80px">
        <p style="font-size:17px;color:#b7b7b7;padding:0 0 30px 10px;">新增管理员</p>
        <el-form-item label="管理员名" prop="adminname">
          <el-input style="width:210px" v-model="adminMsg.adminname" placeholder="请输入管理员名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号身份">
          <el-select v-model="adminMsg.identity">
            <el-option label="管理员" value="shanghai"></el-option>
            <!-- <el-option label="超级管理员" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="立即开通">
          <el-switch style="margin-right:10px" v-model="adminMsg.status" active-text="是"></el-switch>
        </el-form-item>
        <!-- <el-form-item label="活动性质">
          <el-checkbox-group v-model="adminMsg.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('addForm')">立即创建</el-button>
          <el-button @click="reset('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
      <div class="bgBlock">
        <img src="../../assets/img/addAdmin_bg.png" width="100%" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addAdmin",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    return {
      adminMsg: {
        adminname:'',
        identity: "管理员",
        status: true,
        time:''
      },
      rules: {
        adminname: [
          { required: true, message: "管理员名不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3-20个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(addForm) {
        this.$refs[addForm].validate(valid => {
            if (valid) {
                this.adminMsg.time = new Date().getTime();
              console.log(this.adminMsg);
              this.$axios.post('/api/admin/toAddAdmin',this.adminMsg)
              .then(res=>{
                  if(res.status==200){
                      this.$alert(`管理员账号：${res.data.adminname} 密码：${res.data.pwd}`, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'success',
                            message: `管理员账号添加成功！`
                            });
                  } 
                })
              }
            })
            }else {
            console.log("error submit!!");
            return false;
            }
        });
    },
    reset(addForm) {
      this.$refs[addForm].resetFields();
    },
    
  }
};
</script>
<style lang="less" scoped>
.admin {
  .breadcrumb_box {
    margin: 30px 20px;
  }
  .containners {
    width: 70%;
    display: flex;
    padding: 2% 20px 4%;
    margin: 0 20px;
    // margin: 0 auto;
    background: rgb(248, 248, 248);
    box-shadow: 2px 2px 13px #ccc;
    .addForm {
      width: 60%;
    }
    .bgBlock {
      margin: auto 0;
      width: 40%;
    }
  }
}
</style>
<style scoped>
</style>