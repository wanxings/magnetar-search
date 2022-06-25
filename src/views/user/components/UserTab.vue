<template>
  <Tabs @on-click="changeTab" :value="routename" size="small" :animated="false">
    <TabPane :label="translateTitle('搜索历史')" name="Search"> </TabPane>
    <TabPane :label="translateTitle('我的收藏')" name="Favorites"> </TabPane>
    <!-- <TabPane :label="translateTitle('个人资料')" name="Material"> </TabPane> -->
  </Tabs>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { mapState } from "vuex";
export default {
  name: "UserTab",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("user", {
      userinfo: (state) => state.userinfo,
    }),
    routename() {
      console.log("UserTab当前路由名称：%o", this.$route.name);
      return this.$route.name;
    },
  },
  filters: {},
  methods: {
    translateTitle,
    changeTab(name) {
      console.log("changeUserTabRoute:%o", name);
      this.$router.push({
        path: `./${name.toLowerCase()}`,
      });
    },
  },
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
