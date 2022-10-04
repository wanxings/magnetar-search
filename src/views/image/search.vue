<template>
  <div class="Search" id="Search" style="">
    <Row>

    </Row>

    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <!-- <Noresult /> -->
        <Noresult
          v-if="searchDone && total == 0"
          :keyword="noKeyword"
          :image="true"
        />
        <Row type="flex" justify="space-between">
          <i-col
            :xs="{ span: 12 }"
            :lg="{ span: 6 }"
            v-for="item in acList"
            :key="item.id"
          >
            <ActressSTab :data="item" />
          </i-col>
        </Row>
        <Row type="flex" justify="space-between">
          <i-col
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            v-for="item in javList"
            :key="item.id"
          >
            <JavBTab :data="item" />
          </i-col>
        </Row>
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
import { mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import Page from "@/components/Page.vue";
import JavBTab from "@/components/JavBTab.vue";
import ActressSTab from "@/components/ActressSTab.vue";
import { search } from "@/api/visual";
export default {
  name: "imageIndex",
  components: {
    Page,
    JavBTab,
    ActressSTab,
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
    if (this.$route.query.id) {
      this.getImageSearch(this.$route.query.id);
    } else {
      this.$router.push({
        path: `/image/upload`,
      });
    }
  },
  methods: {
    translateTitle,
    async getImageSearch(id) {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      this.searchDone = false; //初始化搜索进度
      const imageSearchMsg = Message.loading({
        content: this.translateTitle("搜索中"),
        duration: 0,
      });
      const { actressList, javList } = await search({ id });
      imageSearchMsg();
      this.searchDone = true; //搜索完成
      this.noKeyword = "该图像"; //初始化无结果组件关键词
      this.acList = actressList;
      this.javList = javList;
      console.log("图像搜索完成");
    },
  },
};
</script>
