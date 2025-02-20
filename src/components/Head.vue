<template>
  <div
    class="header"
    :class="showFixHeader ? 'stop header-span' : ''"
  >
    <!-- 左边头部栏 -->
    <div
      class="header-left"
      style="margin-left: 20px; cursor: pointer;"
    >

      <div
        class="entry-title"
        @click="goHead"
        style="display: flex; align-items: center;"
      >
        <img
          :src="showFixHeader ? 'src/assets/img/icon/shouye_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/shouye_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        />
        <span
          :style="showFixHeader ? 'color:black' : 'color:white'"
          style="margin-left: 4px;"
        >首页</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>番剧</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>直播</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>游戏中心</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>会员购</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>漫画</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
      >
        <span>赛事</span>
      </div>
      <div
        class="default-entry"
        @click="noPage"
        style="display: flex; align-items: center;"
      >
        <img
          :src="showFixHeader ? 'src/assets/img/icon/xiazai_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/xiazai_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span style="margin-left: 4px;">下载客户端</span>
      </div>
    </div>

    <!-- 中间搜索栏 -->
    <div
      class="header-middle"
      style="margin-top: 10px;"
    >
      <div class="search-container">
        <div class="search-body">
          <el-input
            v-model="searchInput"
            placeholder="请输入需要搜索的内容..."
            class="search-input"
            @focus="isComposite = true"
            @blur="isComposite = false"
            @clear="handleClear"
          />
          <div
            class="search-clean"
            :style=" searchInput == '' ? 'display: none;' : '' "
            @click.stop="searchInput = ''"
          >
            <el-icon size="16">
              <CircleCloseFilled />
            </el-icon>
          </div>
          <div class="search-btn"> <el-button>
              <el-icon color="black">
                <Search />
              </el-icon>
            </el-button></div>
        </div>
      </div>

    </div>

    <!-- 右边头部栏 -->
    <div
      class="header-right"
      style="margin-top: 15px;"
    >
      <!-- 未登录时出现登录按钮 -->
      <Login class="login-btn"></Login>
      <div
        class="default-entry entry-layout"
        @click="noPage"
      >
        <img
          :src="showFixHeader ? 'src/assets/img/icon/dahuiyuan_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/dahuiyuan_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span>大会员</span>
      </div>

      <div class="entry entry-layout">
        <img
          :src="showFixHeader ? 'src/assets/img/icon/xiaoxi_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/xiaoxi_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span :style="showFixHeader ? 'color:black' : 'color:white'">消息</span>
      </div>
      <div class="entry entry-layout">
        <img
          :src="showFixHeader ? 'src/assets/img/icon/dongtai_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/dongtai_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span :style="showFixHeader ? 'color:black' : 'color:white'">动态</span>
      </div>
      <div class="entry entry-layout">
        <img
          :src="showFixHeader ? 'src/assets/img/icon/shoucang_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/shoucang_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span :style="showFixHeader ? 'color:black' : 'color:white'">收藏</span>
      </div>
      <div class="entry entry-layout">
        <img
          :src="showFixHeader ? 'src/assets/img/icon/lishi_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/lishi_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span :style="showFixHeader ? 'color:black' : 'color:white'">历史</span>
      </div>

      <div
        class="right-entry--outside entry entry-layout"
        style="color: white;"
      >
        <img
          :src="showFixHeader ? 'src/assets/img/icon/chuangzuo_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/chuangzuo_normal.png?t=' + new Date().getTime()"
          :style="iconFont"
        >
        <span :style="showFixHeader ? 'color:black' : 'color:white'">创作中心</span>
      </div>

      <div class="upload-btn">
        <el-button style="background-color: #FF69B4; color: white;border: 0;">
          <img
            :src="showFixHeader ? 'src/assets/img/icon/tougao_change.png?t=' + new Date().getTime() : 'src/assets/img/icon/tougao_normal.png?t=' + new Date().getTime()"
            :style="iconFont"
          >
          <span style="margin-left: 5px;">投稿</span>
        </el-button>

      </div>
    </div>
  </div>
  <div style="height: 1200px;"></div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Login from "./Login.vue";

const isOpen = ref(false); // 首页是否展开频道
const searchInput = ref(""); // 需要搜索的内容
const isComposite = ref(false); // 是否正在输入中文
const matchingWord = ref([]); // 搜索推荐词
const isSearchPopShow = ref(false); // 是否显示搜索气泡框
const histories = ref([]); // 搜索历史
const isHistoryOpen = ref(false); // 是否展开搜索历史
const popoverDisplay = ref("none"); // 头像气泡框的显隐
const isPopoverShow = ref(false);
const dialogVisible = ref(false); // 登录框组件的显隐
const screenWidth = ref(window.innerWidth); // 屏幕宽度
// const isShowSearchInput = props.isShowSearchInput || true; // 是否显示搜索输入框
const router = useRouter();

const iconFont = ref({
  width: "18px",
  height: "18px",
  cursor: "pointer",
});

onMounted(() => {
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });
  window.addEventListener("scroll", scrollEvent);
});

const showFixHeader = ref(false);
/**
 * @description: 滚动事件
 */
const scrollEvent = () => {
  // 获取滚动高度
  var scrollTop = window.scrollY;
  if (scrollTop > 20) {
    showFixHeader.value = true;
  } else {
    showFixHeader.value = false;
  }
};

const goHead = () => {
  router.push("/");
};
const noPage = () => {
  ElMessage.error("该功能暂未开发！");
};
</script>
<style scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 1500px;
  height: 200px;
  transition: background-color 0.5s ease, color 0.5s ease;
}
.default-entry span {
  display: inline-block;
  position: relative;
  color: white;
  cursor: pointer;
}
.entry-title {
  font-size: 14px;
}
.header-span span {
  color: black;
}
.header-span img {
  color: black;
}
.header-left .default-entry {
  margin-left: 14px;
  font-size: 14px;
}
.header-right .default-entry,
.header-right .entry {
  margin-right: 18px;
  font-size: 14px;
}

.header-left,
.header-middle,
.header-right {
  margin-top: 20px;
  font-size: 100%;
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  display: flex;
  align-items: center;
  align-items: center;
  font-family: inherit;
  flex-shrink: 0; /*容器空间不足时不缩小，即固定大小*/
}
.header-left {
  margin-right: 10px;
}
.header-middle {
  flex-grow: 1;
  justify-content: center;
}
.header-right {
  justify-content: right;
  margin-left: 10px;
}
.entry-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}
.login-btn {
  margin-right: 20px;
}
.upload-btn {
  margin-right: 20px;
}

.search-body {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: background-color 0.5s ease;
}

.search-body:hover {
  background-color: rgba(255, 255, 255, 0.95);
}

.search-input /deep/ .el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 50px 5px 5px;
  border-radius: 8px;
}

.search-input /deep/ .el-input__inner {
  color: gray;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 8px;
  padding: 0 28px 0 15px;
  width: 400px;
  height: 30px;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.search-input /deep/ .el-input__inner:focus {
  color: black;
  background-color: rgba(202, 194, 194, 0.8);
}

.search-btn /deep/ .el-button {
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  left: 922px;
  top: 14px;
  height: 32px;
  width: 32px;
  border-radius: 8px;
  transition: background-color 0.5s ease;
}
.search-btn /deep/ .el-button:hover {
  background-color: rgba(202, 194, 194, 0.8);
}

.search-clean {
  position: absolute;
  left: 890px;
  top: 22px;
  cursor: pointer;
  color: black;
  opacity: 0.2;
}

.search-clean:hover {
  opacity: 0.6;
}

.stop {
  position: fixed;
  z-index: 1000;
  background-color: white;
}
</style>