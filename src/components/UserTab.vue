<style scoped>
.sYP7qe {
  margin-bottom: 16px;
}
.UTWGce {
  color: #202124;
  font: 500 16px/24px "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
    sans-serif;
  letter-spacing: 0.1px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}
.DmBVvf.ZWVAt {
  color: #5f6368;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.2px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ZWVAt {
  color: #3c4043;
  font: 500 14px/20px "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
    sans-serif;
  letter-spacing: 0.25px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}
.evMTre,
.lwi2dd {
  display: inline-block;
  height: 80px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-align: center;
  width: 80px;
  white-space: nowrap;
}
</style>
<template>
  <div>
    <div style="width: 300px; display: block; text-align: center">
      <Form label-position="top">
        <FormItem></FormItem>

        <div class="evMTre Dh6YBc">
          <Avatar icon="ios-person" :size="80" :src="avatar" />
        </div>

        <div class="sYP7qe">
          <div class="UTWGce">{{ name }}</div>
          <Tag v-if="leave == 0" color="primary">管理员</Tag>
          <Tag v-else-if="leave == 100" color="primary">内测用户</Tag>
          <Tag v-else color="primary">普通用户</Tag>
          <div class="DmBVvf ZWVAt">{{ email }}</div>
        </div>

        <FormItem><Button @click="logOut">退出登录</Button></FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapActions, mapGetters } from "vuex";
import { Message } from "view-design";
export default {
  props: [""],
  components: {},
  data() {
    return {
      conversionstatus: false,
    };
  },
  computed: {
    ...mapGetters("user", {
      name: "name",
      email: "email",
      avatar: "avatar",
      leave: "leave",
      credits: "credits",
      token: "token",
    }),
  },
  methods: {
    translateTitle,
    ...mapActions("search", {
      hashToSeed: "hashToSeed",
    }),
    ...mapActions("user", {
      FedLogOut: "FedLogOut",
    }),
    logOut() {
      this.FedLogOut()
        .then(() => {
          Message.success({
            content: "退出成功",
            duration: 5,
          });
          this.$router.push({
            path: `/`,
          });
          location.reload()
        })
        .catch({});
    },
  },
};
</script>
<style>
</style>
