<template>
  <div class="maincontent">
    <div class="login">
      <h1>News后台管理系统</h1>
      <el-row type="flex" justify="center" align="middle" class="wrapper">
        <el-form :model="form" label-width="80px" class="wrapform">
          <el-form-item label="账号">
            <el-input v-model="form.username" required></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" required></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">登陆</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //   登录提交方法
    onSubmit() {
      let { username, password } = this.form;
      // 发送ajax请求
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username,
          password,
        },
      }).then((res) => {
        console.log(res);
        if (!res.data.statusCode) {
          // 存储token值
          this.$message({
            message: "登陆成功",
            type: "success",
          });
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userId", res.data.data.user.id);
          this.$router.push("/home/postlist");
        } else {
          this.$message({
            message: "账号或密码错误",
            type: "error",
          });
          this.resetForm();
        }
      });
    },
    // 重置表单数据方法
    resetForm() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>

<style lang="less" scoped>
.maincontent {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #556;
  background-image: linear-gradient(
      30deg,
      #445 12%,
      transparent 12.5%,
      transparent 87%,
      #445 87.5%,
      #445
    ),
    linear-gradient(
      150deg,
      #445 12%,
      transparent 12.5%,
      transparent 87%,
      #445 87.5%,
      #445
    ),
    linear-gradient(
      30deg,
      #445 12%,
      transparent 12.5%,
      transparent 87%,
      #445 87.5%,
      #445
    ),
    linear-gradient(
      150deg,
      #445 12%,
      transparent 12.5%,
      transparent 87%,
      #445 87.5%,
      #445
    ),
    linear-gradient(
      60deg,
      #99a 25%,
      transparent 25.5%,
      transparent 75%,
      #99a 75%,
      #99a
    ),
    linear-gradient(
      60deg,
      #99a 25%,
      transparent 25.5%,
      transparent 75%,
      #99a 75%,
      #99a
    );
  background-size: 80px 140px;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
}
.login {
  border: 1px solid transparent;
  background: rgb(2, 144, 200);
  //   box-shadow:5px 5px 12px 12px #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-width: 500px;
  max-width: 600px;
  width: 50%;
  border-radius: 20px;
  margin: 50px auto;
  h1 {
    text-shadow: 0 0 0.1em, 0 0 0.1em;
    color: #fdfdfd;
    text-align: center;
    padding-left: 40px;
    margin: 30px auto 30px;
  }

  /deep/ .el-form-item__label {
    color: rgb(245, 245, 245);
    font-weight: 700;
  }
}
</style>