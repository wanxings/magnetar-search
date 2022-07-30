<style scoped>
.ivu-form-item {
  margin-bottom: 5px;
}
</style>
<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <RadioGroup
            @on-change="changeFilterForm"
            v-model="filterForm.country"
            style="padding: 10px"
            type="button"
          >
            <Radio label="jp">日本</Radio>
            <Radio label="ea">欧美</Radio>
            <Radio label="cn">大陆</Radio>
          </RadioGroup>
          <Form label-position="right" :label-width="50">
            <FormItem label="罩杯">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.cup"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">A</Radio>
                <Radio label="B">B</Radio>
                <Radio label="B">C</Radio>
                <Radio label="B">D</Radio>
                <Radio label="B">E</Radio>
                <Radio label="B">F</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="年龄">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.age"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">升序</Radio>
                <Radio label="B">降序</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="身高">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.height"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">升序</Radio>
                <Radio label="B">降序</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="胸围">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.bust"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">升序</Radio>
                <Radio label="B">降序</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="腰围">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.waist"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">升序</Radio>
                <Radio label="B">降序</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="臀围">
              <RadioGroup
                @on-change="changeFilterForm"
                v-model="filterForm.hips"
                size="small"
              >
                <Radio label="none">不限</Radio>
                <Radio label="A">升序</Radio>
                <Radio label="B">降序</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Row>
        <div v-for="item in list" :key="item.id">
          <ActressTab :data="item" Tagvalue="女优" :Jump="true" />
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
import ActressTab from "@/components/ActressTab.vue";
import Page from "@/components/Page.vue";
import { setJavActressFilterForm, getJavActressFilterForm } from "@/utils/app";
import { formatTime } from "@/utils/format";

export default {
  name: "Home",
  components: {
    Page,
    ActressTab,
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
    if (!getJavActressFilterForm())
      setJavActressFilterForm({
        page: 1,
        country: "jp",
        cup: "none",
        age: "none",
        height: "none",
        bust: "none",
        waist: "none",
        hips: "none",
      });
    this.filterForm = getJavActressFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
    formatTime,
    ...mapActions("search", {
      getJavActress: "getJavActress",
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
      setJavActressFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await this.getJavActress(this.filterForm);
      this.list = list;
      this.total = total;
      loadingMsg();
    },
  },
};
</script>


