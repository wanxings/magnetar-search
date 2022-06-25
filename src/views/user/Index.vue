<template>
  <div id="userIndex">
    <Row style="padding-top: 10px;">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <Card>
          <div style="text-align: center">
            <img
              src="https://api.cixing.io/uploads/20210727/a7461c33694b683b60c8b54e2a8a1669.png"
            />
            <h3>Admin</h3>
            <p>积分：14123</p>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row style="padding-top: 10px;">
      <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
        <Card>
          <div style="">
            <Tabs size="small">
              <TabPane label="搜索历史">
                <SearchHistory />
              </TabPane>
              <TabPane label="我的收藏">
                <MyCollection />
              </TabPane>
              <TabPane label="个人资料">
                <Material />
              </TabPane>
            </Tabs>
            <div style="height:200px;"></div>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import SearchHistory from "./components/SearchHistory.vue";
import MyCollection from "./components/MyCollection.vue";
import Material from "./components/Material.vue";
export default {
  name: "userIndex",
  components: {
    SearchHistory,
    MyCollection,
    Material,
  },
  data() {
    return {
      keyword: "",
      searchtype: "magnetar",
      userinfoItem: {
        qq: "",
        email: "",
        username: "",
        signature: "",
      },
    };
  },
  computed: {
    ...mapState("user", {
      userinfo: (state) => state.userinfo,
    }),
  },
  filters: {},
  methods: {},
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
