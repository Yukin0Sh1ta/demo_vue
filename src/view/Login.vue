<template>
  <div>
    <el-button
      plain
      @click="dialogFormVisible = true"
    >
      登录
    </el-button>

    <el-dialog
      v-model="dialogFormVisible"
      width="750"
      :style="{ height: dialogHeight }"
    >
      <el-row
        :gutter="0"
        justify="center"
      >
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
          <el-text
            class="qrcode selectNone"
            size="large"
            :style="{color:normalColor}"
          >
            扫描二维码登录
          </el-text>
          <vue-qrcode
            :value="qrCodeValue"
            :width="200"
            :type="'square'"
            draggable="false"
            :color="{ dark: '#000000', light: '#ffffff' }"
            class="selectNone"
          />

          <el-text class="selectNone"> &emsp;&emsp;&emsp;请使用 <span
              style="color: #409EFF;"
              class="pointer"
            >奶哩奶哩客户端</span>&ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;扫码登录或扫码下载app
          </el-text>
        </el-col>

        <el-col :span="12">
          <div class="grid-content ep-bg-purple" />
          <div class="he">
            <el-text
              class="pwd"
              size="large"
              @click="pwdChange"
              :style="{color:pwdColor}"
            >
              密码登录
            </el-text>
            <el-text
              size="large"
              class="selectNone"
            >|
            </el-text>
            <el-text
              class="phone"
              size="large"
              @click="phoneChange"
              :style="{color:phoneColor}"
            >
              短信登录
            </el-text>
          </div>

          <el-form
            :model="form"
            v-if="pwdNum === 1"
            :hide-required-asterisk="true"
            :rules="rules"
            ref="formRef"
            @submit.prevent="submitForm"
          >
            <el-form-item
              label="账号"
              prop="name"
              :label-width="formLabelWidth"
              class="selectNone"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入账号"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :label-width="formLabelWidth"
              class="selectNone"
            >
              <el-input
                v-model="form.password"
                autocomplete="off"
                show-password
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <div class="form-button">
                <el-button
                  @click="phoneChange"
                  class="reg-button"
                >注册
                </el-button>
                <!-- @click="dialogFormVisible = false" -->
                <el-button
                  type="primary"
                  class="pwd-button"
                  @click="submitForm"
                >登录
                </el-button>
              </div>
            </el-form-item>
          </el-form>

          <el-form
            :hide-required-asterisk="true"
            :model="form"
            v-if="phoneNum === 1"
            :rules="rules"
          >
            <el-form-item
              label="+86"
              :label-width="formLabelWidth"
              prop="phone"
              class="selectNone"
            >
              <el-input
                v-model.number="form.phone"
                autocomplete="off"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item
              label="验证码"
              :label-width="formLabelWidth"
              prop="code"
              class="selectNone"
            >
              <el-input
                v-model="form.code"
                autocomplete="off"
                show-password
                placeholder="请输入验证码"
              />
            </el-form-item>
            <el-form-item>
              <div class="form-button">
                <el-button
                  type="primary"
                  @click="dialogFormVisible = false"
                  class="phone-button"
                >登录/注册
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <div>
            <el-text class="other selectNone">其他方式登录</el-text>
            <div class="qq pointer selectNone">
              <el-image
                src="src/assets/img/qq.png"
                alt="qq"
                fit="contain"
                style="width: 22px; height: 22px"
                draggable="false"
              />
              <el-text style="color: #909399;">QQ登录</el-text>
            </div>
            <div class="wechat selectNone">
              <el-image
                src="src/assets/img/wechat.png"
                alt="wechat"
                fit="contain"
                style="width: 25px; height: 25px"
                draggable="false"
                class="pointer"
              />
              <el-text
                style="color: #909399;"
                class="pointer"
              >微信登录
              </el-text>
            </div>

          </div>
        </el-col>
      </el-row>

      <div class="image-left-bottom selectNone">
        <el-image
          src="src/assets/img/nailong1.jpg"
          alt="dragon"
          fit="contain"
          style="width: 150px; height: 150px"
          draggable="false"
        />
      </div>

      <el-text
        class="tip"
        style="color: #909399;"
      >未注册过哔哩哔哩的手机号，我们将自动帮你注册账号登录或完成注册即代表你同意
        <span
          style="color: #409EFF;"
          class="pointer"
        > 用户协议 </span>和
        <span
          style="color: #409EFF;"
          class="pointer"
        > 隐私政策</span></el-text>

      <div class="image-right-bottom selectNone">
        <el-image
          src="src/assets/img/nailong2.jpg"
          alt="dragon"
          fit="contain"
          style="width: 150px; height: 150px"
          draggable="false"
        />
      </div>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, nextTick, toRaw } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const pwdNum = ref(1);
const phoneNum = ref(0);
const pwdColor = ref("#409EFF");
const phoneColor = ref("#303133");
const normalColor = ref("#303133");
const qrCodeValue = ref(
  "https://www.bilibili.com/video/BV1Fg1WYWEUp/?vd_source=d8ff08395c7692fb40b14e9b43b6cb95"
);
const qrCodeSize = ref(200);
const dialogHeight = ref("400px");
const formRef = ref(null);

const form = ref({
  name: "",
  phone: "",
  password: "",
  code: "",
});

// const { name, password, phone, code } = form.value;

//el表单基本验证
const rules = ref({
  password: [{ required: true, message: "密码不能为空！" }],
  name: [{ required: true, message: "账号不能为空！" }],
  phone: [
    { required: true, message: "手机号不能为空！" },
    { type: "number", message: "手机号不符合规则！" },
  ],
  code: [{ required: true, message: "验证码不能为空！" }],
});

const pwdChange = () => {
  pwdNum.value = 1;
  phoneNum.value = 0;
  pwdColor.value = "#409EFF";
  phoneColor.value = "#303133";
};

const phoneChange = () => {
  pwdNum.value = 0;
  phoneNum.value = 1;
  pwdColor.value = "#303133";
  phoneColor.value = "#409EFF";
};

//用户登录表单验证
const submitForm = async () => {
  try {
    console.log(
      "用户输入账号：" +
        form.value.name +
        " 用户输入密码：" +
        form.value.password
    );

    const valid = await formRef.value.validate();
    if (valid) {
      const result = await axios.get(
        `http://localhost:8080/user/list/${form.value.name}`
      );

      const jsonString = JSON.stringify(result.data);
      const jsonArray = JSON.parse(jsonString);
      const userName = jsonArray?.userName;
      const userPwd = jsonArray?.userPwd;

      console.log("账号：" + userName + " 密码：" + userPwd);

      if (userName !== form.value.name) {
        ElMessage.error("该账号不存在！");
      } else if (
        form.value.name === userName &&
        form.value.password !== userPwd
      ) {
        ElMessage.error("密码错误！");
      } else if (
        form.value.name === userName &&
        form.value.password === userPwd
      ) {
        ElMessage.success("登录成功！欢迎用户" + form.value.name);
      }
    }
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data?.message || "系统出错，请稍后再试";
      ElMessage.error(`请求失败: ${err.response.status} - ${errorMessage}`);
    } else {
      ElMessage.error("请求失败，请检查网络连接！");
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  min-height: 10px;
}
.qrcode {
  text-align: center;
  margin-left: 38px;
  font-weight: 500;
  font-size: 18px;
}
.he {
  text-align: center;
  margin: 20px 0 20px 50px;
  font-weight: 500;
}
.pwd {
  margin-right: 15px;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
}
.phone {
  margin-left: 15px;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
}
.pwd-button,
.reg-button {
  width: 140px;
}
.phone-button {
  width: 300px;
}
.form-button {
  text-align: center;
  margin-left: 60px;
}
.phone-form {
  display: none;
}
.image-left-bottom,
.image-right-bottom {
  position: absolute;
  bottom: 0px;
}
.image-left-bottom {
  left: -25px;
}
.image-right-bottom {
  right: -25px;
}
.tip {
  display: block;
  max-height: 3em;
  line-height: 1.5em;
  word-wrap: break-word;
  max-width: 340px;
  text-align: center;
  margin-left: 200px;
  user-select: none;
}
.qq .el-image,
.wechat .el-image {
  bottom: -45px;
}
.qq .el-text {
  position: absolute;
  width: 70px;
  bottom: -41px;
}
.wechat .el-text {
  position: absolute;
  width: 70px;
  bottom: -38px;
}
.qq {
  position: absolute;
  left: 410px;
}
.wechat {
  position: absolute;
  left: 510px;
}
.other {
  position: absolute;
  bottom: 40px;
  left: 460px;
  font-size: 13px;
}
.selectNone {
  user-select: none;
}
.pointer {
  cursor: pointer;
}
</style>