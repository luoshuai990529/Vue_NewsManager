<template>
  <div class="home">
    <el-header>
      <div class="header">
        <div class="htitle">
          <h2>News后台管理系统</h2>
        </div>
        <div class="userMsg">
          <img v-if="headImg" :src="$axios.defaults.baseURL+headImg" alt />
          <span>{{username}}</span>
        </div>
      </div>
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
          <el-menu-item index="1" @click="showPostPage">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>

          <el-menu-item index="2" @click="showEditPage">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容列表显示 -->
      <el-main>
        <!-- 文章列表路由 -->
        <router-view name="PostListTemp"></router-view>
        <!-- 编辑发布文章路由 -->
        <router-view name="EditInfoTemp"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: JSON.parse(localStorage.getItem("userId")),
      headImg: "",
      username: "",
    };
  },
  methods: {
    // 显示编辑页面
    showEditPage() {
      if (this.$route.fullPath != "/home/editinfo") {
        this.$router.push("/home/editinfo");
      }
    },
    // 显示文章列表页面
    showPostPage() {
      if (this.$route.fullPath != "/home/postlist") {
        this.$router.push("/home/postlist");
      }
    },
  },
  mounted() {
    // 加载用户信息
    this.$axios({
      url: "/user/" + localStorage.getItem("userId"),
      method: "get",
    }).then((res) => {
      console.log(res.data.data);
      this.headImg = res.data.data.head_img;
      this.username = res.data.data.nickname;
    });
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
    padding: 0;
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
  }

  .el-container {
    min-height: 100vh;
  }
  .header {
    display: flex;

    .htitle {
      width: 200px;
    }

    .userMsg {
      text-align: right;
      padding-right: 40px;
      flex: 1;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span{
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }
}
</style>