<template>
  <div id="app">
    <router-view :key="key" />
    <Footers></Footers>
    <!-- <Tips></Tips> -->
  </div>
</template>

<script>
import Footers from "./components/Footers.vue";
// import Tips from "./components/Tips.vue";
import { getToken } from "@/utils/auth";
import { Message } from "view-design";
import { mapActions, mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
// localStorage.setItem('themeColor', val);
export default {
  name: "app",
  components: {
    Footers,
    // Tips,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapGetters("app", {
      darkmode: "darkmode",
      language: "language",
    }),
    key() {
      return this.$router.path + Math.random();
    },
  },
  created() {
    this.darkmode === "off" || document.body.classList.add("dark");
    this.initInfo();
  },
  methods: {
    translateTitle,
    ...mapActions({
      getConfig: "app/getConfig",
      GetInfo: "user/GetInfo",
    }),
    search() {
      this.$router.push({
        path: "/Search",
        query: {
          q: this.keyword,
        },
      });
    },
    async initInfo() {
      await this.getConfig();
      if (getToken()) {
        const asyncUserMsg = Message.loading({
          content: this.translateTitle("同步用户信息"),
          duration: 0,
        });
        //有token，获取用户信息
        asyncUserMsg();
        await this.GetInfo();
      }
      
    },
  },
  mounted: function () {
    // this.getConfig()
    //   .then(() => {
    //     console.log("获取网络配置成功");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log(this.language);
    //     Message.error({
    //       content: error[this.language],
    //       duration: 5,
    //     });
    //   });
    // console.log(this.$route);

    // if (getToken()) {
    //   //有token，获取用户信息
    //   this.GetInfo()
    //     .then(() => {})
    //     .catch((error) => {
    //       Message.error({
    //         content: error[this.language],
    //         duration: 5,
    //       });
    //     });
    // }
    // this.darkmode === "off" || document.body.classList.add("dark");
  },
};
</script>

<style>
body {
  font-size: 14px;
  font-family: Google Sans, arial, sans-serif !important;
}

:root {
  --theme-color-blue: #5ca1ff;
  --theme-color-hover-blue: #5390e6;
  --theme-color-active-blue: #4578bf;
  --theme-searchFix-box-shadow-hover: 0 2px 8px 1px rgb(64 60 67 / 24%);
  --theme-searchFix-background-color: transparent;
  --theme-divider-color: #ebebeb;
  --selection-color-blue: rgba(92, 161, 255, 0.35);
  --search-input-border-color: #dfe1e5;
  --w-alpha-5: rgba(255, 255, 255, 0.05);
  --w-alpha-10: rgba(255, 255, 255, 0.1);
  --w-alpha-20: rgba(255, 255, 255, 0.2);
  --w-alpha-30: rgba(255, 255, 255, 0.3);
  --w-alpha-50: rgba(255, 255, 255, 0.5);
  --w-alpha-60: rgba(255, 255, 255, 0.6);
  --w-alpha-70: rgba(255, 255, 255, 0.7);
  --w-alpha-80: rgba(255, 255, 255, 0.8);
  --w-alpha-90: #fff;
  --bg-w-235: rgb(235, 235, 235);
  --bg-w-pure: white;
  --txt-w-pure: white;
  --txt-b-pure: black;
  --txt-b-tip: rgba(0, 0, 0, 0.8);
  --b-alpha-5: rgba(0, 0, 0, 0.05);
  --b-alpha-10: rgba(0, 0, 0, 0.1);
  --b-alpha-15: rgba(0, 0, 0, 0.15);
  --b-alpha-20: rgba(0, 0, 0, 0.2);
  --b-alpha-30: rgba(0, 0, 0, 0.3);
  --b-alpha-35: rgba(0, 0, 0, 0.35);
  --b-alpha-40: rgba(0, 0, 0, 0.4);
  --b-alpha-50: rgba(0, 0, 0, 0.5);
  --b-alpha-60: rgba(0, 0, 0, 0.6);
  --b-alpha-70: rgba(0, 0, 0, 0.7);
  --b-alpha-80: rgba(0, 0, 0, 0.8);
  --b-alpha-90: #202124;
}

.dark {
  --theme-searchFix-box-shadow-hover: 0 4px 12px rgb(23 23 23 / 90%);
  --theme-searchFix-background-color: #303134;
  --theme-divider-color: #3c4043;
  --search-input-border-color: #5f6368;
  --w-alpha-5: rgba(0, 0, 0, 0.05);
  --w-alpha-10: rgba(0, 0, 0, 0.1);
  --w-alpha-20: rgba(0, 0, 0, 0.2);
  --w-alpha-30: rgba(0, 0, 0, 0.3);
  --w-alpha-50: rgba(30, 30, 30, 0.5);
  --w-alpha-60: rgba(0, 0, 0, 0.6);
  --w-alpha-70: rgba(30, 30, 30, 0.7);
  --w-alpha-80: rgba(30, 30, 30, 0.8);
  --w-alpha-90: #202124;
  --bg-w-235: rgb(30, 30, 30);
  --bg-w-pure: rgb(30, 30, 30);
  --txt-w-pure: black;
  --txt-b-pure: white;
  --txt-b-tip: rgba(255, 255, 255, 0.5);
  --b-alpha-5: rgba(255, 255, 255, 0.05);
  --b-alpha-10: rgba(255, 255, 255, 0.1);
  --b-alpha-15: rgba(255, 255, 255, 0.15);
  --b-alpha-20: rgba(255, 255, 255, 0.2);
  --b-alpha-30: rgba(255, 255, 255, 0.3);
  --b-alpha-35: rgba(255, 255, 255, 0.35);
  --b-alpha-40: rgba(255, 255, 255, 0.4);
  --b-alpha-50: rgba(255, 255, 255, 0.5);
  --b-alpha-60: rgba(255, 255, 255, 0.6);
  --b-alpha-70: rgba(255, 255, 255, 0.7);
  --b-alpha-80: rgba(255, 255, 255, 0.8);
  --b-alpha-90: #bdc1c6;
}
#app .ivu-layout-header {
  background: none;
}

#app .ivu-layout {
  background: none;
}

/* 视频的层级 */
body .hevue-imgpreview-wrap {
  z-index: 999999 !important;
}

body .ivu-select-dropdown {
  max-height: 230px;
}
body .ivu-select-selection {
  background-color: transparent;
  border: none;
}
body .ivu-select-visible .ivu-select-selection {
  border: none;
  box-shadow: none;
}
body .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  color: #70757a;
}
body .ivu-select-arrow {
  color: #70757a;
}
body .ivu-select-dropdown {
  background-color: var(--w-alpha-90);
}
body .ivu-select-item:hover {
  background: var(--b-alpha-5);
}
body .ivu-select-item {
  color: #70757a;
}
body .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
body .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 13px;
  color: #70757a;
}
body .ivu-select-item {
  font-size: 13px !important;
  color: #70757a;
}
body .ivu-select-item-focus {
  background: var(--b-alpha-10);
}
</style>
