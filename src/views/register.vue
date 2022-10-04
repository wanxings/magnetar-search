<style scoped>
.slayout {
  min-width: 375px;
  min-height: 600px;
  margin-top: 10%;
}
</style>
<template>
  <div class="slayout">
    <Layout>
      <Content>
        <Row type="flex" justify="center">
          <div style="width: 300px; display: block; text-align: center">
            <a href="/" class="search-logo"
              ><img src="/logo.png" class="logo"
            /></a>
          </div>
        </Row>
        <Row type="flex" justify="center">
          <div style="width: 300px; display: block">
            <Form
              ref="regItem"
              :model="regItem"
              label-position="top"
              :rules="rules"
            >
              <FormItem prop="username"
                ><i-input
                  :placeholder="translateTitle('你的用户名')"
                  v-model="regItem.username"
                ></i-input
              ></FormItem>
              <FormItem prop="email"
                ><i-input
                  :placeholder="translateTitle('登陆和接收验证码的邮箱')"
                  v-model="regItem.email"
                ></i-input
              ></FormItem>
              <FormItem prop="password"
                ><i-input
                  :placeholder="translateTitle('密码')"
                  v-model="regItem.password"
                  type="password"
                  password
                ></i-input
              ></FormItem>
              <FormItem prop="img_captcha">
                <Row>
                  <i-col span="17">
                    <i-input
                      :placeholder="translateTitle('图形验证码')"
                      v-model="regItem.img_captcha"
                    ></i-input>
                  </i-col>
                  <i-col span="6" offset="1">
                    <img
                      style="width: 100%; vertical-align: middle"
                      v-if="captchaData"
                      :src="captchaData"
                      @click="loadCaptcha"
                    />
                  </i-col>
                </Row>
              </FormItem>
              <FormItem prop="email_captcha">
                <i-input
                  :placeholder="translateTitle('邮箱验证码')"
                  v-model="regItem.email_captcha"
                >
                  <Button slot="append" @click="sendEmailCaptcha"
                    >发送验证码</Button
                  >
                </i-input>
              </FormItem>

              <FormItem style="text-align: center; margin-left: 0px"
                ><Button type="success" @click="regSubmit('regItem')" long>{{
                  translateTitle("注册")
                }}</Button></FormItem
              >
              <FormItem style="text-align: center; margin-left: 0px">
                <p>
                  {{ translateTitle("已经拥有账户？") }}

                  <router-link :to="{ path: '/login' }">
                    {{ translateTitle("登录") }}
                  </router-link>
                </p>
              </FormItem>
            </Form>
          </div>
        </Row>
      </Content>
    </Layout>
  </div>
</template>
<script>
import { Message } from "view-design";
import { translateTitle } from "@/utils/i18n";
import { mapGetters, mapActions } from "vuex";
import { getCaptcha, sendEmailCaptcha } from "@/api/app";
import { register } from "@/api/auth";

export default {
  data() {
    return {
      regItem: {
        email: "",
        img_captcha: "",
        email_captcha: "",
        username: "",
        password: "",
        img_captcha_id: "",
      },
      captchaData: "",
      rules: {
        username: [
          {
            required: true,
            message: this.translateTitle("用户名不能为空"),
            trigger: "blur",
          },
          { type: "string", max: 18, message: "???", trigger: "blur" },
        ],
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
        img_captcha: [
          {
            required: true,
            message: this.translateTitle("图片验证码不能为空"),
            trigger: "blur",
          },
          { type: "string", max: 10, message: "???", trigger: "blur" },
        ],
        email_captcha: [
          {
            required: true,
            message: this.translateTitle("邮箱验证码不能为空"),
            trigger: "blur",
          },
          { type: "string", max: 10, message: "???", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.loadCaptcha();
    this.entersubmit();
  },
  computed: {
    ...mapGetters("app", {
      language: "language",
    }),
  },
  methods: {
    translateTitle,
    ...mapActions("user", {
      Register: "Register",
    }),
    entersubmit() {
      document.onkeydown = (e) => {
        if (e.keyCode === 13) {
          this.regSubmit("regItem");
        }
      };
    },
    async loadCaptcha() {
      let { b64s, id } = await getCaptcha();
      this.captchaData = b64s;
      this.regItem.img_captcha_id = id;
    },
    async sendEmailCaptcha() {
      if (this.regItem.img_captcha == "") {
        Message.error(this.translateTitle("请填写图片验证码"));
      } else {
        let { email, img_captcha, img_captcha_id } = this.regItem;
        await sendEmailCaptcha({
          email,
          img_captcha,
          img_captcha_id,
        });
        Message.success(
          this.translateTitle(
            "验证码发送成功，请前往邮箱查看(有可能在垃圾箱里面)"
          )
        );
      }
    },
    regSubmit(name) {
      console.log("regSubmit");
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const registerMsg = Message.loading({
            content: this.translateTitle("注册中"),
            duration: 0,
          });
          await register(this.regItem);
          registerMsg();
          Message.success(this.translateTitle("注册成功"));
          this.$router.push({ path: this.$route.query.redirect || "/login" });
        } else {
          this.$Message.error({
            background: true,
            content: "表单错误",
          });
        }
      });
    },
  },
};
</script>

