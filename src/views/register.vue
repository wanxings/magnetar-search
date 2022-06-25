<template>
  <div id="loginlayout">
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
                  prefix="ios-contact-outline"
                ></i-input
              ></FormItem>
              <FormItem prop="email"
                ><i-input
                  :placeholder="translateTitle('接收验证邮件的邮箱')"
                  v-model="regItem.email"
                  prefix="ios-mail-outline"
                ></i-input
              ></FormItem>
              <FormItem prop="password"
                ><i-input
                  :placeholder="translateTitle('密码')"
                  v-model="regItem.password"
                  prefix="ios-lock-outline"
                  type="password"
                  password
                ></i-input
              ></FormItem>
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
export default {
  data() {
    return {
      regItem: {
        email: "",
        username: "",
        password: "",
      },
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
      },
    };
  },
  created() {
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
    regSubmit(name) {
      console.log("regSubmit");
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const registerMsg = Message.loading({
            content: this.translateTitle("注册中"),
            duration: 0,
          });
          await  this.Register(this.regItem);
          registerMsg();
          Message.success(this.translateTitle("注册成功,前往邮箱查看激活邮件"));
          this.$router.push({ path: this.$route.query.redirect || "/login" });
        } else {
          this.$Message.error({
            background: true,
            content: "Error",
          });
        }
      });
    },
  },
};
</script>

