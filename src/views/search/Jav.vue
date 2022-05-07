<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <RadioGroup
            @on-change="changeSelectFrom"
            style="padding: 10px"
            v-model="selectFrom.category"
            size="small"
          >
            <Radio label="censored">有码</Radio>
            <Radio label="uncensored">无码</Radio>
            <Radio label="fc2">FC2</Radio>
          </RadioGroup>
          <br />
          <RadioGroup
            @on-change="changeSelectFrom"
            style="padding: 10px"
            v-model="selectFrom.sort"
            size="small"
          >
            <Radio label="magnetic">磁链更新时间</Radio>
            <Radio label="rdate">发布日期</Radio>
            <Radio label="comment">最近评论</Radio>
            <Radio label="score">评分</Radio>
          </RadioGroup>
          <CheckboxGroup
            style="padding: 10px"
            v-model="selectFrom.include"
            @on-change="changeSelectFrom"
            size="small"
          >
            <Checkbox label="magnetic"> 含磁力</Checkbox>
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
            <Card class="javitem">
              <div class="previewcard" @click="goJavsubject(item.id)">
                <div class="cover">
                  <img v-lazy="item.pic" alt />
                  <div
                    style="
                      position: fixed;
                      bottom: 80px;
                      right: 10px;
                      z-index: 8;
                    "
                  ></div>
                </div>
                <dl>
                  <p>
                    {{ item.code }} <strong>{{ item.score }}</strong>
                  </p>
                  <dt>{{ formatTime(item.rdate, "yyyy-MM-dd") }}</dt>
                  <dt><Tag v-if="item.magnetic" color="blue">磁链</Tag></dt>
                </dl>
              </div>
            </Card>
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
              :page="selectFrom.page"
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
import Page from "@/components/Page.vue";
import { setJavSelectFrom, getJavSelectFrom } from "@/utils/app";
// import Polytab from "@/components/Polytab.vue";
// import Page from "@/components/Page.vue";
// import SearchStatistics from "@/components/SearchStatistics.vue";
// import SearchRank from "@/components/SearchRank.vue";
import { formatTime } from "@/utils/format";

export default {
  name: "Home",
  components: {
    Page,
    // Polytab,
    // Page,
    // SearchStatistics,
    // SearchRank,
  },
  data() {
    return {
      selectFrom: {},
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
  watch: {
    moviedetailstatus(val) {
      if (val) {
        console.log("添加回退监听");
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", () => {
          this.closemoviedetail();
        });
      } else {
        console.log("移除回退监听");
        window.removeEventListener("popstate", () => {
          this.closemoviedetail();
        });
      }
    },
  },
  created() {
    if (!getJavSelectFrom())
      setJavSelectFrom({
        category: "censored",
        sort: "rdate",
        include: ["magnetic"],
        page: 1,
      });
    this.selectFrom = getJavSelectFrom();
    this.selectFrom.page = 1;
    this.fetchData();
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to.query);
  //   if (JSON.stringify(to.query) !== "{}") {
  //     setJavSelectFrom(to.query);
  //   } else {
  //     if (!getJavSelectFrom())
  //       setJavSelectFrom({
  //         category: "censored",
  //         sort: "rdate",
  //         include: ["magnetic"],
  //         page: 1,
  //       });
  //   }
  //   next();
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("JAV-beforeRouteUpdate");
  //   this.$store.commit("search/set_javQuery", {
  //     p: Number(to.query.p) ? Number(to.query.p) : 1,
  //   });
  //   // this.$store.commit("search/set_javQuery", to.query);
  //   next();
  // },
  methods: {
    translateTitle,
    formatTime,
    ...mapActions("search", {
      getJav: "getJav",
    }),
    goJavsubject(id) {
      let routeData = this.$router.resolve({
        path: `/search/javsubject`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
    nextpage(val) {
      this.selectFrom.page = val;
      this.fetchData();
    },
    changeSelectFrom() {
      this.selectFrom.page = 1;
      this.fetchData();
    },
    // nextpage(val){
    //   this.set_javQuery({
    //     p: val,
    //   });
    //   this.$router.push({
    //     path: "/search/jav",
    //     query: {q:this.keyword,...this.javQuery},
    //   });
    // },
    async fetchData() {
      scrollTo(0, 0);
      setJavSelectFrom(this.selectFrom); //保存条件
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { list, total } = await this.getJav(this.selectFrom);
      this.list = list;
      this.total = total;
      loadingMsg();
    },
  },
};
</script>
<style >
.previewcard {
  text-align: center;
  height: auto;
  color: var(--txt-b-pure);
}
.previewcard dt {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 92%;
}
.javitem {
  cursor: pointer;
  width: auto;
  float: left;
}
.javitem strong {
  color: #e09015;
  font-weight: unset;
}
.javitem p {
  color: #37a;
}
.javitem .ivu-card-body {
  padding: 8px;
}
.javitem img {
  width: 100%;
  object-fit: contain;
  height: 100%;
}
.javitem dl {
  padding: 7px 0px;
}
.cover {
  max-width: 147px;
  height: 200px;
}
</style>


