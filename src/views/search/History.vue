<template>
  <div class="Search" id="Search" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics v-if="searchDone"  />
      </i-col>
    </Row>
 
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <!-- <Row class="code-row-bg">
          <i-col
            v-if="searchDone && total > 20"
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            class="marleft"
            style="text-align: center; max-width: 652px"
            ><Page :page="javQuery.p" :total="total" @nextpage="nextpage" />
          </i-col>
        </Row> -->
        <div style="width: 100%; height: 10px"></div>
      </i-col>
      <i-col id="right-panl" :xs="{ span: 24 }" :lg="{ span: 6 }">
        <!-- <Notice /> -->
        <Polytab v-if="token" />
        <SearchRank v-if="token" />
      </i-col>
    </Row>
    <div style="width: 100%; height: 150px" />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from 'view-design';
import Polytab from "@/components/Polytab.vue";
// import Page from "@/components/Page.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import SearchRank from "@/components/SearchRank.vue";
// import JavTab from "./components/JavTab.vue";
// import ActressTab from "./components/ActressTab.vue";
// import Noresult from "@/components/Noresult.vue";

export default {
  name: "Home",
  components: {
    Polytab,
    // Page,
    SearchStatistics,
    SearchRank,
    // JavTab,
    // Noresult,
    // ActressTab,
  },
  data() {
    return {
      searchDone: false,
      loadingtext: this.translateTitle("加载中"),
      loadingmsg: {},
      noKeyword:"",
    };
  },
  computed: {
    ...mapGetters("app", {
      title: "title",
      language: "language",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    ...mapGetters("search", {
      total: "total",
      keyword:"keyword",
      javQuery: "javQuery",
      javSearchData: "javSearchData",
      acSearchData: "acSearchData",
    }),
  },
  watch: {
    moviedetailstatus(val) {
      if (val) {
        console.log("添加回退监听");
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", () => {
          this.closemoviedetail();
        });
      } else {
        console.log("移除回退监听");
        window.removeEventListener("popstate", () => {
          this.closemoviedetail();
        });
      }
    },
  },
  mounted: function () {
    this.getdata();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("JAV-beforeRouteUpdate");
    // this.$store.commit("search/set_javQuery", to.query);
    next();
  },
  methods: {
    translateTitle,
    ...mapActions("search",{
      javSearch: "javSearch",
    }),
    ...mapMutations("search",{
      set_javQuery: "set_javQuery",
      init_searchdata: "init_searchdata",
    }),
    // nextpage(val){
    //   this.set_javQuery({
    //     p: val,
    //   });
    //   this.$router.push({
    //     path: "/search/jav",
    //     query: {q:this.keyword,...this.javQuery},
    //   });
    // },
    getdata() {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      this.searchDone = false; //初始化搜索进度
      this.noKeyword = this.keyword;//初始化无结果组件关键词
      this.init_searchdata(); //初始化搜索数据（time,total,btSearchData,javSearchData,polyLicenseId）
      this.loadingtext = this.translateTitle("加载中"); //初始化加载提示文字
      this.loadingmsg = Message.loading({
        render: (h) => {
          return h("span", [this.loadingtext]);
        },
        duration: 0,
      });
      document.title = `${this.keyword} - ${this.title} Search`;
      this.javSearch()
        .then(() => {
          this.loadingmsg();
          this.searchDone = true;
        })
        .catch((error) => {
          Message.error({
            content: error[this.language],
            duration: 5,
          });
        });
    },
  },
};
</script>
<style>

</style>
