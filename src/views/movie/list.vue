<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <RadioGroup
            @on-change="changeFilterForm"
            style="padding: 10px"
            v-model="filterForm.category"
            size="small"
          >
            <Radio label="0">全部</Radio>
            <Radio label="1">电影</Radio>
            <Radio label="2">电视剧</Radio>
            <Radio label="3">综艺</Radio>
            <Radio label="4">动漫</Radio>
            <Radio label="5">纪录片</Radio>
            <Radio label="6">短片</Radio>
          </RadioGroup>
          <br />
          <RadioGroup
            @on-change="changeFilterForm"
            style="padding: 10px"
            v-model="filterForm.sort"
            size="small"
          >
            <Radio label="magnetic">磁链更新时间</Radio>
            <Radio label="cloud">云盘更新时间</Radio>
            <Radio label="year">电影年份</Radio>
            <Radio label="score">评分</Radio>
          </RadioGroup>
          <CheckboxGroup
            style="padding: 10px"
            v-model="filterForm.include"
            @on-change="changeFilterForm"
            size="small"
          >
            <Checkbox label="magnetic"> 含磁力</Checkbox>
            <Checkbox label="cloud"> 含云盘</Checkbox>
          </CheckboxGroup>
        </Row>
        <div v-for="item in list" :key="item.id">
          <MovieTab :data="item" />
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
import MovieTab from "@/components/MovieTab.vue";
import Page from "@/components/Page.vue";
import { setMovieListFilterForm, getMovieListFilterForm } from "@/utils/app";
import { formatTime } from "@/utils/format";

export default {
  name: "Home",
  components: {
    Page,
    MovieTab,
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
    if (!getMovieListFilterForm())
      setMovieListFilterForm({
        category: "0",
        sort: "year",
        include: [],
        page: 1,
      });
    this.filterForm = getMovieListFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
    formatTime,
    ...mapActions("search", {
      getMovie: "getMovie",
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
      setMovieListFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await this.getMovie(this.filterForm);
      this.list = list;
      this.total = total;
      loadingMsg();
    },
  },
};
</script>


