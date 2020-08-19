<template>
  <div class="postlist">
    <!-- 显示文章列表 -->
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop label="缩略图" width="220">
        <template slot-scope="scoped">
          <img width="214" height="146" :src="scoped.row.cover[0].url" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="scoped">{{scoped.row.user.nickname}}</template>
      </el-table-column>
      <el-table-column prop="operate" label="操作"><el-button type="primary">编辑</el-button></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 一进入页面加载文章数据，渲染文章列表
    this.$axios({
      url: "/post",
      method: "get",
      params: {
        pageIndex: 1,
        pageSize: 10,
        //   category:8
      },
    }).then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
</style>