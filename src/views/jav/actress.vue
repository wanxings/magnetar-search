<template>
  <div class="Search" id="Jav" style="">
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }" class="marleft" id="dhtcard">
        <Row>
          <ActressTab :data="actressInfo" Tagvalue="女优信息" />
        </Row>
        <Row>
          <RadioGroup
            @on-change="changeSelectFrom"
            style="padding: 10px"
            v-model="queryForm.sort"
            size="small"
          >
            <Radio label="magnetic">磁链更新时间</Radio>
            <Radio label="rdate">发布日期</Radio>
            <Radio label="comment">最近评论</Radio>
            <Radio label="score">评分</Radio>
          </RadioGroup>
          <CheckboxGroup
            style="padding: 10px"
            v-model="queryForm.include"
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
import { getActressJavList } from "@/api/jav";
import { translateTitle } from "@/utils/i18n";
import { Message } from "view-design";
import Page from "@/components/Page.vue";
import ActressTab from "@/components/ActressTab.vue";
import { formatTime } from "@/utils/format";

export default {
  name: "JavActerss",
  components: {
    Page,
    ActressTab,
  },
  data() {
    return {
      queryForm: {
        id: "",
        pageNo: 1,
        sort: "rdate",
        include: ["magnetic"],
      },
      loadingtext: this.translateTitle("加载中"),
      loadingmsg: {},
      list: [],
      actressInfo: {},
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
    nextpage(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    changeSelectFrom() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    async fetchData() {
      scrollTo(0, 0);
      Message.destroy(); //清空全部提示
      const loadingMsg = Message.loading({
        content: this.loadingtext,
        duration: 0,
      });
      const { actressInfo, list, total } = await getActressJavList(
        this.queryForm
      );
      this.list = list;
      this.total = total;
      this.actressInfo = actressInfo;
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


