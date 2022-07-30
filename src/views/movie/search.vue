<style  scoped>
.ivu-form-item {
  margin-bottom: 10px;
  vertical-align: top;
  zoom: 1;
}
</style>
<template>
  <div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft">
        <SearchStatistics :timeCost="timeCost" :total="total" />
      </i-col>
    </Row>

    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <CheckboxGroup
            v-model="filterForm.include"
            @on-change="changeFilterForm"
            style="padding: 10px"
            size="small"
          >
            <Checkbox label="magnetic"> 含磁链</Checkbox>
            <Checkbox label="cloud"> 含网盘</Checkbox>
          </CheckboxGroup>
        </Row>
        <div v-for="item in list" :key="item.id">
          <MovieTab :data="item" />
        </div>
        <Row class="code-row-bg">
          <i-col
            v-if="searchDone && total > 20 "
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
import { mapGetters, mapActions } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import MovieTab from "@/components/MovieTab.vue";
import Page from "@/components/Page.vue";
import Backtop from "@/components/Backtop.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import { setMovieSearchFilterForm, getMovieSearchFilterForm } from "@/utils/app";
export default {
  name: "Home",
  components: {
    MovieTab,
    Page,
    Backtop,
    SearchStatistics,
  },
  data() {
    return {
      filterForm: {},
      searchDone: false,
      loadingtext: this.translateTitle("搜索中"),
      loadingmsg: {},
      noKeyword: "",
      list: [],
      total: 0,
      timeCost: "0.00",
    };
  },
  computed: {
    ...mapGetters("app", {
      title: "title",
      language: "language",
    }),
  },
  // mounted: function () {
  //   this.getdata();
  // },
  created() {
    if (!getMovieSearchFilterForm())
      setMovieSearchFilterForm({
        include: [],
        page: 1,
      });
    this.filterForm = getMovieSearchFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
    ...mapActions("search", {
      movieSearch: "movieSearch",
    }),
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
      this.searchDone = false;
      setMovieSearchFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total, timeCost } = await this.movieSearch(this.filterForm);
      this.list = list;
      this.total = total;
      this.timeCost = timeCost;
      this.searchDone = true;
      loadingMsg();
    },
  },
};
</script>


