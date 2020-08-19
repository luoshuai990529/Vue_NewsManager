<template>
  <div id="appindex">
    <!-- 首页 -->
    <router-view name="HomeTemp" />
    <!-- 登录路由 -->
    <router-view name="LoginTemp" />
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
* {
  margin: 0px;
  padding: 0px;

  /* 1.移动端元素都是内减模型 */
  // box-sizing: border-box;
}

body {
  /* 2.移动端字体一般14px  / 12px */
  font-size: 14px;
}

li {
  list-style: none;
}

img {
  vertical-align: middle;
  /* 图片居中 */
}

a {
  color: #000;
  /* 取消a标签默认下划线 */
  text-decoration: none;
}

input {
  border: 0 none;
  outline-style: none;
  /*取消内边框*/
}

/* 清除浮动，解决margin-top塌陷 */
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.celarfix {
  zoom: 1;
}

.appindex {
  position: relative;
  margin: auto;
}
</style>
