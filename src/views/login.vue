<style>
#loginlayout {
  min-width: 375px;
  min-height: 600px;
  margin-top: 10%;
}
</style>
<style scoped>
.title {
  font-size: 20px;
  line-height: 28px;
  color: #000;
  margin: 16px 0 6px;
}
.qlogin_tips {
  color: #000;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  position: relative;
  margin-bottom: 16px;
  zoom: 1;
}
</style>
<template>
  <div id="loginlayout">
    <Row type="flex" justify="center">
      <div style="display: block; text-align: center">
        <div class="title" style="display: block">
          {{ hasExtensionsAccount ? "快捷登录" : "密码登录" }}
        </div>
        <div class="qlogin_tips" style="display: block">
          {{
            hasExtensionsAccount
              ? "使用扩展程序授权登录"
              : "推荐使用扩展程序授权登录"
          }}
        </div>
      </div>
    </Row>
    <Row v-if="hasExtensionsAccount" type="flex" justify="center">
      <div style="width: 300px; display: block; text-align: center">
        <Form label-position="top">
          <FormItem>
            <Avatar
              icon="ios-person"
              size="large"
              :src="ExtensionsAccount.avatar"
            />
          </FormItem>
          <FormItem>
            <Tag color="default">{{ ExtensionsAccount.email }}</Tag>
          </FormItem>
          <FormItem>
            <Button type="success" @click="quickLogin" long>
              {{ translateTitle("授权登录") }}
            </Button>
          </FormItem>
          <FormItem style="text-align: center; margin-left: 0px">
            <a @click="switchAccounts">
              {{ translateTitle("使用密码登录") }}
            </a>
          </FormItem>
        </Form>
      </div>
    </Row>
    <Row v-else type="flex" justify="center">
      <div style="width: 300px; display: block">
        <Form
          ref="loginItem"
          :model="loginItem"
          label-position="top"
          :rules="rules"
        >
          <FormItem prop="email"
            ><i-input
              :placeholder="translateTitle('邮箱')"
              v-model="loginItem.email"
              prefix="ios-mail-outline"
            ></i-input
          ></FormItem>
          <FormItem prop="password"
            ><i-input
              :placeholder="translateTitle('密码')"
              v-model="loginItem.password"
              prefix="ios-lock-outline"
              type="password"
              password
            ></i-input
          ></FormItem>
          <FormItem>
            <Radio v-model="remember">{{ translateTitle("记住密码") }}</Radio>
          </FormItem>
          <FormItem style="text-align: center; margin-left: 0px">
            <Button type="success" @click="loginSubmit('loginItem')" long>{{
              translateTitle("登录")
            }}</Button></FormItem
          >
          <FormItem style="text-align: center; margin-left: 0px">
            <p>
              {{ translateTitle("尚未拥有账户？") }}

              <router-link
                :to="{
                  path: '/register',
                  query: { redirect: this.$route.query.redirect || '/' },
                }"
                >{{ translateTitle("注册") }}
              </router-link>
              /
              <router-link
                :to="{
                  path: '/resetpwd',
                  query: { redirect: this.$route.query.redirect || '/' },
                }"
                >{{ translateTitle("找回密码") }}
              </router-link>
            </p>
          </FormItem>
        </Form>
      </div>
    </Row>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import { Message } from "view-design";
import { mapActions, mapGetters } from "vuex";
import {
  setToken,
  getRememberAccount,
  setRememberAccount,
  removeRememberAccount,
} from "@/utils/auth";
import { translateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
      loginItem: {
        email: "",
        password: "",
      },
      hasExtensionsAccount: false,
      ExtensionsAccount: null,
      remember: false,
      Accountdata: null,
      rules: {
        email: [
          {
            required: true,
            message: this.translateTitle("邮箱不能为空"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.translateTitle("邮箱格式不正确"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.translateTitle("密码不能为空"),
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            max: 18,
            message: this.translateTitle("密码6~18位"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (getRememberAccount()) {
      this.loginItem = getRememberAccount();
      this.Accountdata = getRememberAccount();
      this.remember = true;
    }
    let extensionsAccount = JSON.parse(
      localStorage.getItem("Magnetar-Extensions-User")
    );
    if (extensionsAccount) {
      this.hasExtensionsAccount = true;
      this.ExtensionsAccount = extensionsAccount;
    }
  },
  computed: {
    ...mapGetters("app", {
      language: "language",
    }),
  },
  methods: {
    translateTitle,
    ...mapActions("user", {
      Login: "Login",
    }),
    ...mapActions("app", {
      getConfig: "getConfig",
    }),
    switchAccounts() {
      this.hasExtensionsAccount = false;
    },
    async quickLogin() {
      let tokenObj = JSON.parse(
        window.atob(this.ExtensionsAccount.token.match(/\.(.*?)\./)[1])
      );
      console.log(Date.now())
      console.log(tokenObj.exp)
      if (Date.now()/1000 > tokenObj.exp) {
        Message.error("登录失败 请在扩展程序内重新登录账号再刷新此页面");
      } else {
        setToken(this.ExtensionsAccount.token);
        location.href = this.$route.query.redirect;
        this.$router.push({ path: this.$route.query.redirect || "/" });
      }
    },
    loginSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const logInMsg = Message.loading({
            content: this.translateTitle("登录中"),
            duration: 0,
          });
          const data = await this.Login(this.loginItem);
          logInMsg();
          console.log(data);
          Message.success(this.translateTitle("登录成功"));
          this.remember
            ? setRememberAccount({ ...this.loginItem, avatar: data.avatar })
            : removeRememberAccount();
          // await this.getConfig();
          this.$router.push({ path: this.$route.query.redirect || "/" });
        } else {
          Message.error({
            background: true,
            content: "表单错误",
          });
        }
      });
    },
  },

  mounted: function () {
    // console.log(this.$router.query.redirect)
    // this.getcaptcha();
  },
};
</script>
