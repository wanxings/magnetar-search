<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
       
        <Row type="flex" justify="space-between" class="code-row-bg">
          <i-col
            :xs="{ span: 12 }"
            :lg="{ span: 6 }"
            v-for="item in list"
            :key="item.id"
          >
            <JavSTab :data="item" :isdelete="true" @deleteAction="deleteFromFavorites(item.id)"/>
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
              :page="queryForm.pageNo"
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
import { getFavoritesJavList } from "@/api/jav";
import { deleteJavFromFavorites } from "@/api/jav";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import Page from "@/components/Page.vue";
import JavSTab from "@/components/JavSTab.vue";
import { formatTime } from "@/utils/format";

export default {
  name: "JavFavorites",
  components: {
    Page,
    JavSTab,
  },
  data() {
    return {
      queryForm: {
        id: "",
        pageNo: 1,
      },
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
  watch: {},
  created() {
    if (this.$route.query.id) {
      this.queryForm.id = this.$route.query.id;
    } else {
      this.$router.push({
        path: `/`,
      });
    }
    this.queryForm.pageNo = 1;
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
    async deleteFromFavorites(javaId) {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: "正在删除",
        duration: 0,
      });
      let deleteForm = {
        javid: javaId,
        fid: this.queryForm.id,
      };
      await deleteJavFromFavorites(deleteForm);
      loadingMsg();
      this.fetchData();
    },
    nextpage(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    async fetchData() {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await getFavoritesJavList(this.queryForm);
      this.list = list;
      this.total = total;
      loadingMsg();
    },
  },
};
</script>


