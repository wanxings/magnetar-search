<style>
#loginlayout {
  min-width: 375px;
  min-height: 600px;
  margin-top: 10%;
}
</style>
<template>
  <div id="loginlayout">
    <Row type="flex" justify="center">
      <div style="display: block; text-align: center">
        <a href="/" class="search-logo"><img src="/logo.png" class="logo" /></a>
      </div>
    </Row>
    <Row type="flex" justify="center">
      <div style="width: 300px; display: block">
        <Form
          ref="ResetItem"
          :model="ResetFrom"
          label-position="top"
          :rules="rules"
        >
          <FormItem prop="email"
                ><i-input
                  :placeholder="translateTitle('注册时的邮箱')"
                  v-model="ResetFrom.email"
                ></i-input
              ></FormItem>
              <FormItem prop="password"
                ><i-input
                  :placeholder="translateTitle('新密码')"
                  v-model="ResetFrom.password"
                  type="password"
                  password
                ></i-input
              ></FormItem>
              <FormItem prop="img_captcha">
                <Row>
                  <i-col span="17">
                    <i-input
                      :placeholder="translateTitle('图形验证码')"
                      v-model="ResetFrom.img_captcha"
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
                  v-model="ResetFrom.email_captcha"
                >
                  <Button slot="append" @click="sendEmailCaptcha"
                    >发送验证码</Button
                  >
                </i-input>
              </FormItem>
          <FormItem style="text-align: center; margin-left: 0px">
            <Button type="success" @click="resetSubmit('ResetItem')" long>{{
              translateTitle("重置密码")
            }}</Button></FormItem
          >
        </Form>
      </div>
    </Row>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import { Message } from "view-design";
import { mapActions, mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { getCaptcha, sendEmailCaptcha } from "@/api/app";
import { resetPwd } from "@/api/auth";
export default {
  data() {
    return {
      ResetFrom: {
        email: "",
        img_captcha: "",
        email_captcha: "",
        username: "",
        password: "",
        img_captcha_id: "",
      },
      captchaData: "",
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
  },
  computed: {
    ...mapGetters("app", {
      language: "language",
    }),
  },
  methods: {
    translateTitle,
    ...mapActions("user", {
      ResetPassword: "ResetPassword",
    }),
    async loadCaptcha() {
      let { b64s, id } = await getCaptcha();
      this.captchaData = b64s;
      this.ResetFrom.img_captcha_id = id;
    },
    async sendEmailCaptcha() {
      if (this.ResetFrom.img_captcha == "") {
        Message.error(this.translateTitle("请填写图片验证码"));
      } else {
        let { email, img_captcha, img_captcha_id } = this.ResetFrom;
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
    resetSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const logInMsg = Message.loading({
            content: this.translateTitle("提交中"),
            duration: 0,
          });
          await resetPwd(this.ResetFrom);
          logInMsg();
          Message.success(this.translateTitle("重置成功"));
          this.$router.push({ path: "/login" });
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
