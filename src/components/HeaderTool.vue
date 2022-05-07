<template>
  <div>
    <div id="btnBoxPc">
      <!-- <Icon type="md-menu" /> -->
      <Setting />
      <!-- <Poptip trigger="hover" placement="bottom-end">
      <span class="btnBox_span"><Icon type="md-apps" /></span>
      <div slot="content">
        <Conversion />
      </div>
    </Poptip> -->
      <Poptip v-if="token" trigger="hover" placement="bottom-end">
        <span class="btnBox_span"><Avatar :src="avatar" /></span>
        <div slot="content">
          <UserTab></UserTab>
        </div>
      </Poptip>
      <span v-else class="btnBox_span"
        ><Button @click="toLogin" type="text">{{
          translateTitle("登录")
        }}</Button></span
      >
    </div>
    <div id="btnBoxMb">
      <!-- <Icon type="md-menu" /> -->
      <div class="headleft">
        <Setting />
      </div>
      <div class="headright">
        <Poptip v-if="token" trigger="hover" placement="bottom-end">
          <span class="btnBox_span"><Avatar :src="avatar" /></span>
          <div slot="content">
            <UserTab></UserTab>
          </div>
        </Poptip>
        <span v-else class="btnBox_span"
          ><Button @click="toLogin" type="text">{{
            translateTitle("登录")
          }}</Button></span
        >
      </div>
      <!-- <Poptip trigger="hover" placement="bottom-end">
      <span class="btnBox_span"><Icon type="md-apps" /></span>
      <div slot="content">
        <Conversion />
      </div>
    </Poptip> -->
    </div>
  </div>
</template>
<script>
// import Conversion from "@/components/Conversion.vue";
import { mapGetters } from "vuex";
import Setting from "@/components/Setting.vue";
import { translateTitle } from "@/utils/i18n";
import UserTab from "@/components/UserTab.vue";
// import themedata from '@/assets/theme.json';
export default {
  props: [""],
  components: {
    // Conversion,
    Setting,
    UserTab,
  },
  data() {
    return {};
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
    toLogin() {
      this.$router.push({
        path: "/user/login",
        query: { redirect: this.$router.currentRoute.fullPath },
      });
    },
  },
};
</script>
<style>
/* .topen {
  color: var(--theme-color);
} */

.ivu-modal-content {
  background-color: var(--bg-w-pure) !important;
  color: var(--txt-b-pure) !important;
}

.ivu-modal-content > div > p {
  color: var(--txt-b-pure) !important;
}
.ivu-modal-confirm-head-title {
  color: var(--txt-b-pure) !important;
}
.ivu-modal-confirm-body {
  color: var(--txt-b-pure) !important;
}


.btnBox_span {
  right: 0;
  line-height: 46px;
  position: relative;
  display: inline-block;
  background-color: transparent;
  padding: 0 10px;
  cursor: pointer;
}
.headleft {
  position: absolute;
  left: 0px;
}
.headright {
  position: absolute;
  right: 0px;
}

#btnBoxPc {
  position: absolute;
  right: 20px;
  font-size: 24px;
  z-index: 8;
}
#btnBoxMb {
  display: none;
}
@media screen and (max-width: 991px) {
  #btnBoxPc {
    display: none !important;
  }
  #btnBoxMb {
    display: unset !important;
  }
  .btnBox_span {
    line-height: 59px;
  }
}
</style>
