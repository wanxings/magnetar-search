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
                    :description="'创建于' + item.create_time"
                  />
                  <template slot="action">
                    <li>
                      <a href="javascript:;" @click="viewFavorites(item.id)"
                        >查看列表</a
                      >
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
import { getJavFavorites } from "@/api/user";
import { Message } from "view-design";
import { translateTitle } from "@/utils/i18n";
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
      loadingtext: this.translateTitle("加载中"),
      queryForm: {
        pageNo: 1,
      },
      list: [],
    };
  },
  computed: {},
  filters: {},
  methods: {
    translateTitle,
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    viewFavorites(id) {
      let routeData = this.$router.resolve({
        path: `/jav/favorites`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },

    async fetchData() {
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await getJavFavorites(this.queryForm);
      this.list = list;
      this.total = total;
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
