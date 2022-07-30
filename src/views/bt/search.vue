<template>
  <div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics
          v-if="searchDone"
          :timeCost="timeCost"
          :total="total"
        />
        <div style="float: right; color: var(--txt-b-tip)">
          <BtSrotSelect
            v-model="filterForm.m"
            @change="changeSort"
          ></BtSrotSelect>
        </div>
        <div style="float: right; color: var(--txt-b-tip)">
          <BtTypeSelect
            v-model="filterForm.t"
            @change="changeType"
          ></BtTypeSelect>
        </div>
      </i-col>
    </Row>

    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Alert v-if="searchDone && polyLicenseId" show-icon
          ><a @click.prevent="activationPoly">{{
            translateTitle("获取聚合搜索结果")
          }}</a></Alert
        >
        <Alert v-if="searchDone && !token" type="warning" show-icon>
          <Tooltip
            placement="top"
            max-width="200"
            :content="translateTitle('已滤除含露骨内容的搜索结果')"
            >{{ translateTitle("部分搜索结果未予显示") }}
          </Tooltip></Alert
        >
        <!-- <div v-for="item in movieSearchData" :key="item.id">
          <MovieTab :data="item" />
        </div> -->
        <!-- <div v-for="item in acSearchData" :key="item.id">
          <ActressTab :data="item" Tagvalue="女优" :Jump="true" />
        </div> -->
        <Noresult v-if="searchDone && total == 0" :keyword="noKeyword" />
        <div v-for="item in btList" :key="item.hash">
          <BtTab :infodata="item" />
        </div>
        <div v-for="(item, index) in btPolyList" :key="index">
          <BtPolyTab :infodata="item" />
        </div>
        <Row class="code-row-bg">
          <i-col
            v-if="searchDone && total > 20 && !ispoly"
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            class="marleft"
            style="text-align: center; max-width: 652px"
            ><Page
              :page="Number(filterForm.p)"
              :total="total"
              @nextpage="nextpage"
            />
          </i-col>
        </Row>
        <div style="width: 100%; height: 10px"></div>
      </i-col>
      <i-col id="right-panl" :xs="{ span: 24 }" :lg="{ span: 6 }">
        <!-- <Notice /> -->
        <Polytab v-if="token && searchPageComponent.polyList === 'on'" />
        <RelatedKeywords
          v-if="token && searchPageComponent.relatedSearch === 'on'"
          :keywordList="relatedKeywordList"
        />
        <SearchRank v-if="token && searchPageComponent.hotSearch === 'on'" />
      </i-col>
    </Row>

    <div style="width: 100%; height: 150px" />
    <Backtop />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapState } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import BtTab from "@/components/BtTab.vue";
import RelatedKeywords from "./components/RelatedKeywords.vue";
// import MovieTab from "@/components/MovieTab.vue";
import BtPolyTab from "@/components/BtPolyTab.vue";
// import Notice from "@/components/Notice.vue";
import Polytab from "@/components/Polytab.vue";
import Page from "@/components/Page.vue";
import Backtop from "@/components/Backtop.vue";
import Noresult from "@/components/Noresult.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import SearchRank from "./components/SearchRank.vue";
import BtSrotSelect from "./components/BtSrotSelect.vue";
import BtTypeSelect from "./components/BtTypeSelect.vue";
import { setBtSearchFilterForm, getBtSearchFilterForm } from "@/utils/app";
import {} from "@/utils/app";
export default {
  name: "Home",
  components: {
    BtTab,
    RelatedKeywords,
    BtPolyTab,
    Polytab,
    Page,
    Backtop,
    BtSrotSelect,
    BtTypeSelect,
    SearchStatistics,
    SearchRank,
    Noresult,
  },
  data() {
    return {
      filterForm: {
        m: "correla",
        t: "video",
        p: 1,
      },
      searchDone: false,
      ispoly: false,
      loadingtext: this.translateTitle("加载中"),
      noKeyword: "",
      avInfo: {},
      polyLicenseId: null,
      btList: [],
      btPolyList: [],
      relatedKeywordList: [],
      loadingmsg: {},
      total: 0,
      timeCost: "0.00",
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
    if (!getBtSearchFilterForm())
      setBtSearchFilterForm({
        m: "correla",
        t: "video",
        p: 1,
      });
    this.filterForm = getBtSearchFilterForm();
    this.filterForm.p = 1;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("BT-beforeRouteUpdate");
    next();
  },
  methods: {
    translateTitle,
    ...mapActions("search", {
      btSearch: "btSearch",
      getPolySearchData: "getPolySearchData",
    }),
    nextpage(val) {
      this.filterForm.p = val;
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
      const { btList, total, timeCost, polyLicenseId, relatedKeywordList } =
        await this.btSearch(this.filterForm);

      this.total = total;
      this.btList = btList;
      this.timeCost = timeCost;
      this.polyLicenseId = polyLicenseId;
      this.relatedKeywordList = relatedKeywordList;
      searchMsg();
      this.searchDone = true;
    },
    async activationPoly() {
      //提交聚合任务
      this.searchDone = false; //初始化搜索进度
      this.btList = []; //初始化搜索结果
      let pid = this.polyLicenseId;
      const polySearchMsg = Message.loading({
        content: this.translateTitle("聚合搜索耗时较长,12秒内返回结果"),
        duration: 0,
      });
      const { btPolyList, total, timeCost } = await this.getPolySearchData(pid);
      this.polyLicenseId = null; //初始化聚合搜索id
      this.total = total;
      this.btPolyList = btPolyList;
      this.timeCost = timeCost;
      this.ispoly = true;
      this.searchDone = true;
      polySearchMsg();
    },
    changeSort() {
      //切换排序方式
      this.filterForm.p = 1;
      this.fetchData();
      // this.filterForm.p = 1;
      // this.$router.push({
      //   path: "/bt/search",
      //   query: { q: this.keyword, ...this.filterForm },
      // });
    },
    changeType() {
      //切换文件类型
      this.filterForm.p = 1;
      this.fetchData();
      // this.filterForm.p = 1;
      // this.$router.push({
      //   path: "/bt/search",
      //   query: { q: this.keyword, ...this.filterForm },
      // });
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
  /* border: 1px solid var(--b-alpha-10) !important; */
  /* border: none; */
  /* box-shadow: 0 1px 4px var(--b-alpha-10); */
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
