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
            <Checkbox label="comment"> 含评论</Checkbox>
          </CheckboxGroup>
        </Row>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <i-col
            :xs="{ span: 12 }"
            :lg="{ span: 6 }"
            v-for="item in list"
            :key="item.id"
          >
          <JavSTab :data="item" />
          </i-col>
        </Row>
        <Row class="code-row-bg">
          <i-col
            v-if="searchDone && total > 20"
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
import { mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import JavSTab from "@/components/JavSTab.vue";
import Page from "@/components/Page.vue";
import Backtop from "@/components/Backtop.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import { setJavSearchFilterForm, getJavSearchFilterForm } from "@/utils/app";
import { search } from "@/api/jav";
export default {
  name: "Home",
  components: {
    JavSTab,
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
      timeCost: 0,
    };
  },
  computed: {
    ...mapGetters("app", {
      title: "title",
      language: "language",
      keyword: "keyword",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
    }),
  },
  // mounted: function () {
  //   this.getdata();
  // },
  created() {
    if (!getJavSearchFilterForm())
      setJavSearchFilterForm({
        include: [],
        page: 1,
      });
    this.filterForm = getJavSearchFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
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
      setJavSearchFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, pager, took } = await search({
        query: this.keyword,
        ...this.filterForm,
      });
      this.list = list;
      this.total = pager.total_rows;
      this.timeCost = took;
      this.searchDone = true;
      loadingMsg();
    },
  },
};
</script>


