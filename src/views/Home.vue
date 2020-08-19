<template>
  <div class="home">
    <el-header>
      <h2>News后台管理系统</h2>
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>

          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容列表显示 -->
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: JSON.parse(localStorage.getItem("userId")),
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  li.el-menu-item {
    width: 200px;
  }
  min-height: 100vh;
  .el-header,
  .el-footer {
    background-color: #333333;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #333333;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    min-height: 100vh;
  }
}
</style>