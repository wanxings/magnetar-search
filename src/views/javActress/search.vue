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
        <Row type="flex" justify="space-between">
          <i-col
            :xs="{ span: 12 }"
            :lg="{ span: 6 }"
            v-for="item in list"
            :key="item.id"
          >
            <ActressSTab :data="item" />
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
import ActressSTab from "@/components/ActressSTab.vue";
import Backtop from "@/components/Backtop.vue";
import SearchStatistics from "@/components/SearchStatistics.vue";
import { search } from "@/api/actress";
export default {
  name: "Home",
  components: {
    ActressSTab,
    Backtop,
    SearchStatistics,
  },
  data() {
    return {
      filterForm: {
        include: [],
        page: 1,
      },
      searchDone: false,
      loadingtext: this.translateTitle("搜索中"),
      loadingmsg: {},
      noKeyword: "",
      list: [],
      total: 0,
      timeCost: 0.0,
    };
  },
  computed: {
    ...mapGetters("app", {
      title: "title",
      language: "language",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
    }),
  },
  created() {
    this.fetchData();
  },
  methods: {
    translateTitle,
    changeFilterForm() {
      this.fetchData();
    },
    async fetchData() {
      scrollTo(0, 0);
      this.searchDone = false;
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


