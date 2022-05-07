<template>
  <div>
    <Tabs
      @on-click="change"
      :value="searchparamet.t"
      size="small"
      :animated="false"
    >
      <TabPane icon="md-search" :label="translateTitle('所有')" name="all"></TabPane>
      <TabPane icon="logo-youtube" :label="translateTitle('视频')" name="video"></TabPane>
      <TabPane icon="md-images" :label="translateTitle('图片')" name="img"></TabPane>
      <TabPane icon="md-filing" :label="translateTitle('压缩')" name="compress"></TabPane>
      <TabPane icon="ios-musical-notes" :label="translateTitle('音乐')" name="music"></TabPane>
      <TabPane icon="md-code" :label="translateTitle('程序')" name="program"></TabPane>
      <TabPane icon="md-book" :label="translateTitle('文档')" name="document"></TabPane>
      <TabPane icon="md-more" :label="translateTitle('其他')" name="other"></TabPane>
    </Tabs>
  </div>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      searchparamet: "search/searchparamet",
    }),
  },
  methods: {
    translateTitle,
    ...mapMutations({
      SET_SEARCHPARAMET: "search/SET_SEARCHPARAMET",
    }),
    change: function (val) {
      console.log(val);
      this.SET_SEARCHPARAMET({
        t: val,
        p: 1,
      });
      this.$router.push({
        path: "/search",
        query: this.searchparamet,
      });
    },
  },
};
</script>
<style>
.ivu-tabs-bar {
  margin-bottom: 1px;
}

#sort .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  font-size: 16px;
}
.ivu-icon-ios-browsers-outline {
  font-weight: bold;
}
#sort .ivu-tabs-nav .ivu-tabs-tab-active {
  color: var(--theme-color);
}
#sort .ivu-tabs-mini .ivu-tabs-tab {
    padding: 8px 10px;
}
#sort .ivu-tabs-nav {
  color: var(--txt-b-pure);
}
#sort .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: var(--theme-color);
}

#sort .ivu-tabs-ink-bar {
  background-color: var(--theme-color);
}
.ivu-tabs-mini .ivu-tabs-tab {
  color: var(--txt-b-tip);
  font-size: 11px;
}
.ivu-tabs-bar {
  border-bottom: none;
}
</style>



