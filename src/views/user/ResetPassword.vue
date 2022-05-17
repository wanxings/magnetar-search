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
          :model="ResetItem"
          label-position="top"
          :rules="rules"
        >
          <FormItem prop="email"
            ><i-input
              :placeholder="translateTitle('邮箱')"
              v-model="ResetItem.email"
              prefix="ios-mail-outline"
            ></i-input
          ></FormItem>
          <FormItem prop="password"
            ><i-input
              :placeholder="translateTitle('密码')"
              v-model="ResetItem.password"
              prefix="ios-lock-outline"
              type="password"
              password
            ></i-input
          ></FormItem>
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
export default {
  data() {
    return {
      ResetItem: {
        email: "",
        password: "",
      },
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
    resetSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const logInMsg = Message.loading({
            content: this.translateTitle("提交中"),
            duration: 0,
          });
          await this.ResetPassword(this.ResetItem);
          logInMsg();
          Message.success(this.translateTitle("前往邮箱查看密码重置链接"));
          this.$router.push({ path: "/user/login" });
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
