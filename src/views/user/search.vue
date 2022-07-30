<template>
  <div>
    <Row style="padding-top: 10px">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <UserInfo />
      </i-col>
    </Row>
    <Row style="padding-top: 10px">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <Card class="TabCard Card-theme-dark">
          <div style="height: auto">
            <UserTab />
            <div style="padding-top: 10px">
              <div style="margin: 10px">
                <span style="padding-bottom: 10px; display: inline-block"
                  >Tip: 只能查看近一月的搜索历史</span
                >
                <br />
                搜索类型:
                <Radio-group
                  v-model="queryForm.type"
                  type="button"
                  size="small"
                  @on-change="changeSearchType"
                >
                  <Radio label="bt">磁力搜索</Radio>
                  <Radio label="poly">聚合搜索</Radio>
                  <Radio label="image">图像搜索</Radio>
                </Radio-group>
              </div>
              <Table
                :data="list"
                :columns="Columns"
                :loading="listLoading"
                height="360"
                border
                size="small"
              >
                <template slot-scope="{ row }" slot="thumb_src">
                  <img :src="row.thumb_src" />
                </template>
              </Table>
            </div>

            <div style="margin: 10px; overflow: hidden">
              <div style="float: right">
                <Page
                  :total="total"
                  :current="queryForm.pageNo"
                  :page-size="20"
                  @on-change="handleCurrentChange"
                ></Page>
              </div>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { getSearchHistory } from "@/api/user";
import UserTab from "./components/UserTab.vue";
import UserInfo from "./components/UserInfo.vue";
export default {
  name: "userSearch",
  components: {
    UserTab,
    UserInfo,
  },
  data() {
    return {
      listLoading: true,
      total: 0,
      queryForm: {
        type: "bt",
        pageNo: 1,
      },
      list: [],
      Columns: [],
      ColumnsMap: {
        bt: [
          {
            title: "关键词",
            key: "keyword",
            align: "center",
          },
          {
            title: "搜索时间",
            key: "createtime",
            align: "center",
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        let routeData = this.$router.resolve({
                          path: `/bt/search`,
                          query: { q: params.row.keyword },
                        });
                        window.open(routeData.href, "_blank"); //打开新标签
                      },
                    },
                  },
                  "搜索"
                ),
              ]);
            },
          },
        ],
        poly: [
          {
            title: "关键词",
            key: "keyword",
            align: "center",
          },
          {
            title: "返回结果",
            key: "total",
            align: "center",
          },
          {
            title: "搜索时间",
            key: "createtime",
            align: "center",
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        let routeData = this.$router.resolve({
                          path: `/bt/search`,
                          query: { q: params.row.keyword },
                        });
                        window.open(routeData.href, "_blank"); //打开新标签
                      },
                    },
                  },
                  "再次搜索"
                ),
              ]);
            },
          },
        ],
        image: [
          {
            title: "图像",
            slot: "thumb_src",
            align: "center",
          },
          {
            title: "返回结果",
            key: "total",
            align: "center",
          },
          {
            title: "搜索时间",
            key: "createtime",
            align: "center",
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        let routeData = this.$router.resolve({
                          path: `/image/search`,
                          query: { imageId: params.row.id },
                        });
                        window.open(routeData.href, "_blank"); //打开新标签
                      },
                    },
                  },
                  "查看快照"
                ),
              ]);
            },
          },
        ],
      },
    };
  },
  computed: {},
  filters: {},
  methods: {
    changePage() {},
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    changeSearchType() {
      this.fetchData();
    },
    async fetchData() {
      this.Columns = this.ColumnsMap[this.queryForm.type];
      this.listLoading = true;
      const { list, total } = await getSearchHistory(this.queryForm);
      this.list = list;
      this.total = total;
      this.listLoading = false;
    },
  },
  created: function () {
    this.fetchData();
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
