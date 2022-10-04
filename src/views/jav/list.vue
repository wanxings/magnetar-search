
<style scoped>
.ivu-form-item {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <div style="padding-top: 10px">
            <Form :model="filterForm" :label-width="50" label-position="right">
              <FormItem label="类型:">
                <RadioGroup
                  @on-change="changeFilterForm"
                  v-model="filterForm.category"
                  size="small"
                >
                  <Radio label="all">不限</Radio>
                  <Radio label="censored">有码</Radio>
                  <Radio label="uncensored">无码</Radio>
                  <Radio label="fc2">FC2</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="排序:">
                <RadioGroup
                  @on-change="changeFilterForm"
                  v-model="filterForm.sort"
                  size="small"
                >
                  <Radio label="magnetic">磁链更新时间</Radio>
                  <Radio label="rdate">发布日期</Radio>
                  <Radio label="comment">最近评论</Radio>
                  <Radio label="score">评分</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="附加:">
                <CheckboxGroup
                  v-model="filterForm.include"
                  @on-change="changeFilterForm"
                  size="small"
                >
                  <Checkbox label="magnetic"> 含磁力 </Checkbox>
                  <Checkbox label="comment"> 含评论 </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="年份:">
                <DatePicker
                  type="year"
                  size="small"
                  :value="Number(filterForm.year).toString() || ''"
                  @on-change="setYear"
                  placeholder="不限年份"
                  style="width: 120px"
                >
                </DatePicker>
              </FormItem>
              <FormItem label="时长:">
                <RadioGroup
                  v-model="filterForm.length"
                  type="button"
                  size="small"
                  @on-change="changeFilterForm"
                >
                  <Radio label="0">不限</Radio>
                  <Radio label="0-45">45分钟以下</Radio>
                  <Radio label="45-90">45-90分钟</Radio>
                  <Radio label="90-120">90-120分钟</Radio>
                  <Radio label="120">120分钟以上</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="分类:">
                <Select
                  v-model="filterForm.genre"
                  multiple
                  placeholder="不限分类"
                  filterable
                  @on-change="changeFilterForm"
                >
                  <OptionGroup label="场景">
                    <Option
                      v-for="item in genreList"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.label }}
                    </Option>
                  </OptionGroup>
                  <OptionGroup label="服装">
                    <Option
                      v-for="item in genreList"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.label }}
                    </Option>
                  </OptionGroup>
                  <OptionGroup label="动作">
                    <Option
                      v-for="item in genreList"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.label }}
                    </Option>
                  </OptionGroup>
                </Select>
              </FormItem>
              <FormItem label="大图:">
                <i-switch v-model="filterForm.previewMode" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Form>
          </div>
        </Row>
        <Row v-if="!filterForm.previewMode" type="flex" justify="space-between">
          <i-col
            :xs="{ span: 12 }"
            :lg="{ span: 6 }"
            v-for="item in list"
            :key="item.id"
          >
            <JavSTab :data="item" />
          </i-col>
        </Row>
        <Row v-else type="flex" justify="space-between">
          <i-col
            :xs="{ span: 24 }"
            :lg="{ span: 12 }"
            v-for="item in list"
            :key="item.id"
          >
            <JavBTab :data="item" />
          </i-col>
        </Row>
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
import { mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import JavSTab from "@/components/JavSTab.vue";
import JavBTab from "@/components/JavBTab.vue";
import Page from "@/components/Page.vue";
import { setJavFilterForm, getJavFilterForm } from "@/utils/app";
import { formatTime } from "@/utils/format";
import { getList } from "@/api/jav";
export default {
  name: "Home",
  components: {
    Page,
    JavSTab,
    JavBTab,
  },
  data() {
    return {
      filterForm: {
        category: "all",
        sort: "magnetic",
        include: ["magnetic"],
        length: "0",
        genre: [],
        year: "",
        previewMode:false,
        page: 1,
      },
      genreList: [
        {
          id: 1,
          label: "开发中",
        },
      ],
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
    if (!getJavFilterForm())
      setJavFilterForm({
        category: "censored",
        sort: "rdate",
        include: ["magnetic"],
        page: 1,
      });
    this.filterForm = getJavFilterForm();
    this.filterForm.page = 1;
    this.fetchData();
  },
  methods: {
    translateTitle,
    formatTime,
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
    setYear(format) {
      this.filterForm.year = Number(format);
      this.changeFilterForm();
    },
    async fetchData() {
      scrollTo(0, 0);
      setJavFilterForm(this.filterForm); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, pager } = await getList(this.filterForm);
      this.list = list;
      this.total = pager.total_rows;
      loadingMsg();
    },
  },
};
</script>


