<template>
  <div class="Search" id="Search" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics :timeCost="timeCost" :total="total" />
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
        <div v-for="(item, index) in acList" :key="'actress' + index">
          <ActressTab :data="item" Tagvalue="相似女优" :Jump="true" />
        </div>
        <div v-for="(item, index) in javList" :key="'javMovie' + index">
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
import { mapActions, mapGetters } from "vuex";
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
      acList: [],
      javList: [],
      searchDone: false,
      noKeyword: "",
      total: 0,
      timeCost: "0.00",
      loadingtext: this.translateTitle("加载中"),
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
  },
  watch: {},
  created() {
    // if(){

    // }
    this.getImageSearch();
  },
  methods: {
    translateTitle,
    ...mapActions("search", {
      imageSearch: "imageSearch",
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

      const imageSearchMsg = Message.loading({
        content: this.translateTitle("搜索中"),
        duration: 0,
      });
      const { acList, javList, total, timeCost,file } = await this.imageSearch();
      imageSearchMsg();
      this.total = total;
      this.timeCost = timeCost;
      this.searchDone = true; //搜索完成
      this.noKeyword = file; //初始化无结果组件关键词
      this.acList = acList;
      this.javList = javList;
      console.log("图像搜索完成");
    },
  },
};
</script>
