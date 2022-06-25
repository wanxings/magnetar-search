<template>
  <div class="Search" id="Search" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics v-if="searchDone" />
      </i-col>
    </Row>

    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <!-- <Noresult /> -->
        <Noresult
          v-if="searchDone && total == 0"
          :keyword="noKeyword"
          :image="true"
        />
        <div v-for="(item, index) in actressData" :key="'actress' + index">
          <ActressTab :data="item" Tagvalue="相似女优" :Jump="true" />
        </div>
        <div v-for="(item, index) in javMovieData" :key="'javMovie' + index">
          <JavTab :data="item" Tagvalue="相似影片" />
        </div>
        <Row class="code-row-bg">
          <i-col
            v-if="total > 20"
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            class="marleft"
            style="text-align: center; max-width: 652px"
            ><Page />
          </i-col>
        </Row>
        <div style="width: 100%; height: 10px"></div>
      </i-col>
    </Row>

    <div style="width: 100%; height: 150px" />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import Page from "@/components/Page.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import JavTab from "@/components/JavTab.vue";
import ActressTab from "@/components/ActressTab.vue";

export default {
  name: "imageIndex",
  components: {
    Page,
    SearchStatistics,
    JavTab,
    ActressTab,
  },
  data() {
    return {
      actressData: [],
      javMovieData: [],
      searchDone: false,
      noKeyword: "",
      // action: "start", //start,Being,over
      loadingtext: this.translateTitle("加载中"),
      // polysearchid: null,
      avInfo: {},
      loadingmsg: {},
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
      imageQuery: "imageQuery",
      total: "total",
    }),
  },
  watch: {},
  created() {
    this.getImageSearch();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id) {
      this.$store.commit("search/set_imageQuery", {
        id: to.query.id,
      });
      next();
    } else {
      this.$store.commit("search/set_uploadImageModalStatus", true);
      next();
    }
  },
  methods: {
    translateTitle,
    ...mapActions("search", {
      imageSearch: "imageSearch",
    }),
    ...mapMutations("search", {
      set_time: "set_time",
      set_total: "set_total",
      init_searchdata: "init_searchdata",
    }),
    searchImage() {
      this.$router.push({
        path: "/search/image",
        query: this.searchparamet,
      });
      console.log(1);
    },
    async getImageSearch() {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      this.searchDone = false; //初始化搜索进度
      this.noKeyword = this.imageQuery.file; //初始化无结果组件关键词
      this.init_searchdata(); //初始化搜索数据（time,total,btSearchData,javSearchData,polyLicenseId）
      // this.loadingtext = this.translateTitle("加载中"); //初始化加载提示文字
      if (this.imageQuery.id) {
        const imageSearchMsg = Message.loading({
          content: this.translateTitle("搜索中"),
          duration: 0,
        });
        const data = await this.imageSearch();
        imageSearchMsg();
        this.searchDone = true; //搜索完成
        this.actressData = data.acData;
        this.javMovieData = data.javData;
        console.log("图像搜索完成");
      }
    },
  },
};
</script>
