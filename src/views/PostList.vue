<template>
  <div class="postlist">
    <!-- 分页组件 -->
    <div class="pagenation">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagesizes"
        :page-size="cursize"
        :total="totalsize"
        :current-page="curpage"
      ></el-pagination>
    </div>
    <!-- 显示文章列表 -->
    <div class="postList">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop label="缩略图" width="220">
          <template slot-scope="scoped">
            <img width="214" height="146" :src="scoped.row.cover[0].url | fixUrl" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者">
          <template slot-scope="scoped">{{scoped.row.user.nickname}}</template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <el-button type="primary" slot-scope="scoped" @click="editPostInfo(scoped.row.id)">编辑</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <div class="pagenation">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagesizes"
        :page-size="cursize"
        :total="totalsize"
        :current-page="curpage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagesizes: [2, 4, 6, 8],
      totalsize: 0,
      cursize: 4,
      curpage: 1,
    };
  },
  filters: {
    //  图片url过滤器
    fixUrl(url) {
      const reg = /^http/;
      if (reg.test(url)) {
        return url;
      } else {
        return "http://127.0.0.1:3000" + url;
      }
    },
  },
  watch: {
    //   监听当前页的变化
    currentPage(val) {
      //   console.log("当前页:" + val);
    },
  },
  methods: {
    // 改变每页显示多少条处理函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.cursize = val;
      this.curpage = 1;
      this.loadPost();
    },
    // 翻页触发的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.curpage = val;
      this.loadPost();
    },
    // 加载文章信息
    loadPost() {
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          pageIndex: this.curpage,
          pageSize: this.cursize,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
        this.totalsize = res.data.total;
      });
    },
    // 编辑文章信息方法
    editPostInfo(postId) {
      console.log("编辑的文章id为：" + postId);
      // 跳转到发布文章页面，并将id传过去
      this.$router.push({
        path: "/home/editinfo",
        query: {
          id: postId,
        },
      });
    },
  },
  mounted() {
    // 一进入页面加载第一页文章数据，渲染文章列表
    this.loadPost();
  },
};
</script>

<style lang="less" scoped>
.pagenation {
  margin: 10px 0;
}
</style>