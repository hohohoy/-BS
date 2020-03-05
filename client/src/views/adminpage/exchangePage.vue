<template>
  <div class="exchange">
    <div class="breadcrumb_box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/admin">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/admin/adminshoplist">兑换商城</el-breadcrumb-item>
        <el-breadcrumb-item>兑换商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header">
        <!-- <p style="font-size:16px;">输入用户名和兑换码进行兑换</p> -->
    </div>
    <div class="containner">
      <div class="bgBlock" style="width:36%">
        <img src="../../assets/img/addAdmin_bg.png" width="100%" alt />
      </div>
      <div class="exchange_container">
        <!-- <h3>兑换商品</h3> -->
        <el-form :rules="rules" ref="form" :model="exchangeinf" label-width="80px" style="display:flex;flex-direction:column;align-items:center">
          <el-form-item label="用户名" prop="name" style="margin-top:35px;">
            <!-- <el-col :span="12"> -->
              <el-input v-model.trim="exchangeinf.name" placeholder="请输入用户名"></el-input>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="兑换码" prop="code" >
            <!-- <el-col :span="12"> -->
              <el-input v-model.trim="exchangeinf.code" placeholder="请输入兑换码"></el-input>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item style="width:100%;display:flex;justify-content:center;margin-top:20px;">
            <el-button type="primary" @click="exchangeOp('form')">立即兑换</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "exchange",
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    return {
      exchangeinf: {
        name: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空!", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        code: [
          { required: true, message: "兑换码不能为空!", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    exchangeOp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/admin/exchangeGoods", this.exchangeinf).then(res => {
            if (res.status == 200) {
              const h = this.$createElement;
              this.$notify({
                title: "系统提示",
                message: h("i", { style: "color: teal" }, "商品已兑换")
              });
              this.reload();
            } else {
              this.$notify.error({
                title: "错误",
                message: "兑换失败，请稍后再试"
              });
            }
          });
        } else {
          new Error("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.exchange {
    .breadcrumb_box {
      border-bottom: 1px solid rgb(235, 230, 230);
      width: 100%;
      height: 50px;
      padding: 20px 0px;
    }
  .containner {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 8%;
    .exchange_container {
      width: 60%;
      margin-top: 15px;
    //   box-shadow: 2px 2px 13px #ccc;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>