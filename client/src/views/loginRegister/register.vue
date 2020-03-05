<template>
  <div class="register">
    <el-form
      :model="registerUser"
      :rules="rules"
      ref="registerForm"
      label-width="80px"
      class="registerForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="registerUser.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="registerUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="支付密码" prop="payPWD">
        <el-input
          type="password"
          show-password
          v-model.trim="registerUser.payPWD"
          placeholder="请输入支付密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          show-password
          v-model.trim="registerUser.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" show-password prop="password2">
        <el-input type="password" v-model.trim="registerUser.password2" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("输入内容不能为空!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      // if (value === '') {
      //   callback(new Error('请再次输入密码'));
      // } else
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        username: "",
        email: "",
        password: "",
        password2: "",
        payPWD: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2-20个字符之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            require: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        payPWD: [
          { required: true, message: "支付密码不能为空", trigger: "blur" },
          { min: 6, max: 10, message: "长度在6-10个字符之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6-30之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6-30之间", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.$emit('getMessage','register');
  },
  created(){
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('submit!');
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              {
                if (res) {
                  this.$message({
                    message: "注册成功！ 200积分已到账,请进行登录",
                    type: "success"
                  });
                  // this.$router.go(-1);
                  this.$emit('getMessage','logins');
                  this.$router.push('/login/logins')
                } else {
                }
              }
            });
          // this.$router.push('/login')
        }
      });
    }
  }
};
</script>
<style scoped>
.registerForm {
  /* margin-top: 20px; */
  background-color: #fff;
  padding: 0px 40px 0px 20px;
  border-radius: 9px;
  /* box-shadow: 0px 5px 10px #cccc; */
  /* opacity: 0.9; */
}
.submit_btn {
  width: 80%;
  /* margin-top: 10px; */
  margin-left: 25px;
  padding-bottom: 5px;
  line-height: 22px;
}
.el-form-item {
  margin-left: 0;
  margin-bottom: 16px;
}
.el-form-item__content {
  text-align: center;
  margin: 0 auto;
}
</style>

