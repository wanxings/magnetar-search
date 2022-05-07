<template>
  <div>
    <Tabs
      @on-click="changeSearchEngine"
      :value="routename"
      size="small"
      :animated="false"
    >
      <TabPane
        icon="md-search"
        :label="translateTitle('磁力')"
        name="bt"
      ></TabPane>
      <!-- <TabPane
        icon="logo-youtube"
        :label="translateTitle('电影')"
        name="movie"
      ></TabPane> -->
      <TabPane
        icon="logo-youtube"
        :label="translateTitle('番号(Beta)')"
        name="jav"
      ></TabPane>
      <TabPane
        icon="md-images"
        :label="translateTitle('识图')"
        name="image"
      ></TabPane>
      <!-- <TabPane
        icon="md-analytics"
        :label="translateTitle('搜索历史')"
        name="history"
      ></TabPane> -->
      
    </Tabs>
  </div>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("app", {
      // title: "title",
      // language: "language",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
      imageQuery: "imageQuery",
    }),
    routename() {
      console.log("当前路由名称：%o", this.$route.name);
      if(this.$route.name == "jav" || this.$route.name == "javsubject"){
        return "jav";
      }
      return this.$route.name;
    },
  },
  methods: {
    translateTitle,
    ...mapMutations({}),
    changeSearchEngine(name) {
      console.log("changeSearchEngine:%o", name);
      var queryData = {};
      if(name == "bt"){
        queryData = { q: this.keyword };
      }
      if(name == "jav"){
        queryData = {}
      }
      if(name == "movie"){
        queryData = {}
      }
      if(name == "image"){
        queryData = { id: this.imageQuery.id };
      }
      this.$router.push({
        path: `/search/${name}`,
        query: queryData,
      });
    },
    serchHistory() {
      console.log(1);
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



