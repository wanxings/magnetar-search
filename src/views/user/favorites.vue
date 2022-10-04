<template>
  <div>
    <Row style="padding-top: 10px">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <UserInfo />
      </i-col>
    </Row>
    <Row style="padding-top: 10px">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <Card>
          <div style="height: auto">
            <UserTab />
            <div style="padding-top: 10px">
              <List v-if="list.length">
                <ListItem v-for="(item, index) in list" :key="index">
                  <ListItemMeta
                    :title="item.name"
                    :description="'创建于' + formatDate(item.create_time)"
                  />
                  <template slot="action">
                    <li>
                      <a href="javascript:;" @click="viewFavorites(item.id)">
                        查看列表
                      </a>
                      <a
                        href="javascript:;"
                        style="color: red"
                        @click="deleteFavorites(item.id)"
                      >
                        删除
                      </a>
                    </li>
                  </template>
                </ListItem>
              </List>
              <p v-else>暂无数据</p>
            </div>

            <div style="margin: 10px; overflow: hidden">
              <div style="float: right">
                <Page
                  :total="total"
                  :current="queryForm.page"
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
import { getFavoritesJavList, deleteFavorites } from "@/api/user";
import { Message, Modal } from "view-design";
import { translateTitle } from "@/utils/i18n";
import UserTab from "./components/UserTab.vue";
import { formatDate } from "@/utils/format";
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
      loadingtext: this.translateTitle("加载中"),
      queryForm: {
        page: 1,
      },
      list: [],
    };
  },
  computed: {},
  filters: {},
  methods: {
    translateTitle,
    formatDate,
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.fetchData();
    },
    viewFavorites(id) {
      let routeData = this.$router.resolve({
        path: `/jav/favorites`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
    deleteFavorites(fid) {
      Modal.confirm({
        title: "确认删除",
        content: "<p>确定删除此收藏夹以及收藏夹内的番号吗?</p>",
        onOk: async () => {
          const loadingMsg = Message.loading({
            content: "正在删除",
            duration: 0,
          });
          await deleteFavorites({ fid });
          loadingMsg();
          this.fetchData();
        },
        onCancel: () => {
          return;
        },
      });
    },
    async fetchData() {
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, pager } = await getFavoritesJavList(this.queryForm);
      this.list = list;
      this.total = pager.total_rows;
      loadingMsg();
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
