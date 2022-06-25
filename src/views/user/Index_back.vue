<template>
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider hide-trigger>
        <Menu :theme="theme2">
          <MenuItem name="1">
            <Icon type="ios-paper" />
            内容管理
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
          </MenuItem>
        </Menu>
      </Sider>
      <Content><div id="home">
    <router-link :to="{ path: '/user/edit' }">
      <span id="btnBox">
        <span id="btnSettings" title="资料设置"
          ><Icon type="md-settings"
        /></span>
      </span>
    </router-link>

    <div style="padding: 20px">
      <div style="position: relative; text-align: center">
        <img
          style="border-radius: 50%; cursor: pointer"
          title="修改头像"
          @click="showuploadheadimg"
          :src="userinfo.userheadimg"
        />
        <h3 style="">{{ userinfo.username }}</h3>
        <p style="font-size: 12px; padding-bottom: 10px">
          {{ userinfo.signature }}
        </p>
      </div>
    </div>

    <router-view></router-view>

    <Uploadheadimg ref="uploadheadimgmodal" />
  </div></Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
  
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import Uploadheadimg from "@/components/Uploadheadimg.vue";
export default {
  name: "user",
  components: {
    Uploadheadimg,
  },
  data() {
    return {
      keyword: "",
      searchtype: "magnetar",
      userinfoItem: {
        qq: "",
        email: "",
        username: "",
        signature: "",
      },
    };
  },
  computed: {
    ...mapState("user", {
      userinfo: (state) => state.userinfo,
    }),
  },
  filters: {
    proxymodetotype: function (value) {
      if (value) {
        return "info";
      } else {
        return "default";
      }
    },
  },
  methods: {
    showuploadheadimg() {
      this.$refs.uploadheadimgmodal.show(this.userinfo.userheadimg);
    },
  },
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
#home {
  height: 600px;
  width: 375px;
  margin: 0 auto;
}
#btnSettings {
  right: 0;
  position: relative;
  background-color: transparent;
  font-size: 22px;
  cursor: pointer;
}
#btnBox {
  position: fixed;
  top: calc(var(--body-top) + 20px);
  right: 10px;
  padding: 10px;
  z-index: 8;
}
#fsearchinput .ivu-input-group-prepend {
  background-color: transparent;
}
</style>
