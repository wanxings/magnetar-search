<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <RadioGroup
            @on-change="changeFilterForm"
            style="padding: 10px"
            v-model="filterForm.type"
            size="small"
          >
            <Radio label="all">所有</Radio>
            <Radio label="video">视频</Radio>
            <Radio label="img">图片</Radio>
            <Radio label="compress">压缩</Radio>
            <Radio label="music">音乐</Radio>
            <Radio label="program">程序</Radio>
            <Radio label="document">文档</Radio>
            <Radio label="other">其他</Radio>
          </RadioGroup>
          <br />
          <RadioGroup
            @on-change="changeFilterForm"
            style="padding: 10px"
            v-model="filterForm.sort"
            size="small"
          >
            <Radio label="time">更新时间</Radio>
            <Radio label="seeders">做种数</Radio>
            <Radio label="leechers">水蛭数</Radio>
            <Radio label="ratio">健康度</Radio>
          </RadioGroup>
        </Row>
        <div v-for="item in list" :key="item.id">
          <BtTab :infodata="item" />
        </div>
        <Row class="code-row-bg">
          <i-col
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            class="marleft"
            style="text-align: center; max-width: 652px"
            ><Page
              v-if="total > 0"
              :page="filterForm.page"
              :total="total"
              @nextpage="nextpage"
            />
          </i-col>
        </Row>
        <div style="width: 100%; height: 10px"></div>
      </i-col>
      <i-col id="right-panl" :xs="{ span: 24 }" :lg="{ span: 6 }">
        <!-- <Notice /> -->
        <!-- <Polytab v-if="token" />
        <SearchRank v-if="token" /> -->
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
import BtTab from "@/components/BtTab.vue";
import Page from "@/components/Page.vue";
import { setBtListFilterForm, getBtListFilterForm } from "@/utils/app";
import { formatTime } from "@/utils/format";

export default {
  name: "Home",
  components: {
    Page,
    BtTab,
  },
  data() {
    return {
      filterForm: {},
      searchDone: false,
      loadingtext: this.translateTitle("加载中"),
      loadingmsg: {},
      noKeyword: "",
      list: [],
      total: 0,
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
  created() {
    if (!getBtListFilterForm())
      setBtListFilterForm({
        page: 1,
        type: "all",
        sort: "seeders",
      });
    this.filterForm = getBtListFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
    formatTime,
    ...mapActions("search", {
      getBt: "getBt",
    }),
    goJavsubject(id) {
      let routeData = this.$router.resolve({
        path: `/jav/subject`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
    nextpage(val) {
      this.filterForm.page = val;
      this.fetchData();
    },
    changeFilterForm() {
      this.filterForm.page = 1;
      this.fetchData();
    },
    async fetchData() {
      scrollTo(0, 0);
      setBtListFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await this.getBt(this.filterForm);
      this.list = list;
      this.total = total;
      loadingMsg();
    },
  },
};
</script>


