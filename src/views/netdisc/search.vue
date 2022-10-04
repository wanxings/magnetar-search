<template>
  <div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics :timeCost="timeCost" :total="total" />
      </i-col>
    </Row>

    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Noresult v-if="searchDone && total == 0" :keyword="noKeyword" />
        <div v-for="item in netdiscList" :key="item.hash">
          <Netdisc :data="item" />
        </div>
        <Row class="code-row-bg">
          <i-col
            v-if="searchDone && total > 20 && !ispoly"
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            class="marleft"
            style="text-align: center; max-width: 652px"
            ><Page
              :page="Number(filterForm.page)"
              :total="total"
              @nextpage="nextpage"
            />
          </i-col>
        </Row>
        <div style="width: 100%; height: 10px"></div>
      </i-col>
    </Row>

    <div style="width: 100%; height: 150px" />
    <Backtop />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters, mapState } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import Netdisc from "@/components/NetdiscTab.vue";
import Page from "@/components/Page.vue";
import Backtop from "@/components/Backtop.vue";
import Noresult from "@/components/Noresult.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import {} from "@/utils/app";
import { search } from "@/api/netdisc";
export default {
  name: "Home",
  components: {
    Netdisc,
    Page,
    Backtop,
    SearchStatistics,
    Noresult,
  },
  data() {
    return {
      filterForm: {
        mode: "precise",
        page: 1,
      },
      searchDone: false,
      ispoly: false,
      loadingtext: this.translateTitle("加载中"),
      noKeyword: "",
      avInfo: {},
      netdiscList: [],
      loadingmsg: {},
      total: 0,
      timeCost: 0,
    };
  },
  computed: {
    ...mapGetters("app", {
      title: "title",
      language: "language",
    }),
    ...mapState("app", {
      searchPageComponent: "searchPageComponent",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
    }),
  },
  created() {
    this.filterForm.page = 1;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Netdisc-beforeRouteUpdate");
    next();
  },
  methods: {
    translateTitle,
    // ...mapActions("search", {
    //   btSearch: "btSearch",
    //   getPolySearchData: "getPolySearchData",
    // }),
    nextpage(val) {
      this.filterForm.page = val;
      this.fetchData();
    },
    async fetchData() {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      this.searchDone = false; //初始化搜索进度
      this.ispoly = false; //初始化是否聚合搜索
      this.noKeyword = this.keyword; //初始化无结果组件关键词
      document.title = `${this.keyword} - ${this.title} Search`;
      const searchMsg = Message.loading({
        content: this.translateTitle("搜索中"),
        duration: 0,
      });
      const { list, pager, took } = await search({
        query: this.keyword,
        ...this.filterForm,
      });

      this.total = pager.total_rows;
      this.netdiscList = list;
      this.timeCost = took;
      searchMsg();
      this.searchDone = true;
    },
  },
};
</script>
<style>
#resultStats {
  line-height: 43px;
  font-size: 13px;
  color: var(--txt-b-tip);
  float: left;
}
#Search .ivu-layout-header {
  background: none;
}
#Search {
  min-width: 1300px;
}
#Search .ivu-layout-header {
  background: none;
  line-height: 0px;
}
#Search .ivu-layout {
  background: none;
}
#Search .ivu-card {
  /* background-color: var(--b-alpha-10); */
  background: none;
  border: 1px solid var(--theme-divider-color);
  border-radius: 8px;
}
#right-panl .ivu-card-head {
  border-bottom: 1px solid var(--b-alpha-15);
  border: none;
}
#right-panl {
  margin-left: 100px;
}
.mhide {
  display: flex;
  height: 122px;
  align-items: center;
  justify-content: center;
}
.code-row-bg {
  margin-top: 20px;
}
.ivu-message-info .ivu-icon,
.ivu-message-loading .ivu-icon {
  color: var(--theme-color) !important;
}
.ivu-spin {
  color: var(--theme-color) !important;
}
.searchmini {
  margin-top: 20px;
  position: relative;
}
.ivu-modal-footer {
  border: none;
}
.ivu-modal-header {
  border: none;
}

.ivu-tree-title {
  color: var(--txt-b-tip);
}
.ivu-tree-title:hover {
  background-color: var(--b-alpha-10);
}
.ivu-tree-title-selected,
.ivu-tree-title-selected:hover {
  background-color: var(--b-alpha-10);
}
.ivu-alert-warning {
  border: none;
  background-color: var(--b-alpha-5);
  color: var(--txt-b-tip);
}
</style>
