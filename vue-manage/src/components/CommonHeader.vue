<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown size="mini" trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>