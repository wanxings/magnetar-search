<template>
  <Card id="javdetail" class="TabCard Card-theme-dark" v-if="javData">
    <p slot="title" style="text-align: center">
      <font v-html="javData.title" style="font-size: 14px">无</font>
    </p>
    <div>
      <Row type="flex" justify="center" style="margin-bottom: 30px">
        <i-col class="msks" span="24">
          <Row type="flex" justify="center">
            <i-col class="msks" :xs="24" :sm="17" :md="17" :lg="17">
              <div style="">
                <div class="b_img_div">
                  <div class="detailheadimgdiv">
                    <img
                      v-if="javData.headimg"
                      class="detailheadimg"
                      :src="javData.headimg.bimg"
                    />
                  </div>
                </div>
              </div>
            </i-col>
            <i-col class="msks" :xs="24" :sm="7" :md="7" :lg="7">
              <List :split="false" size="small" style="margin: 12px">
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("识别码") }}:
                    </span>
                    <font v-html="javData.code" style="font-size: 14px">
                      无
                    </font>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("发布日期") }}:
                    </span>
                    {{ formatTime(javData.rdate, "yyyy-MM-dd") }}
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("视频时间") }}:
                    </span>
                    {{ javData.length }} {{ translateTitle("分钟") }}
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("所处分类") }}:
                    </span>
                    <Tag
                      v-for="(item, genreindex) in javData.avgenre"
                      :key="genreindex"
                      color="primary"
                    >
                      {{ item.name }}
                    </Tag>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("相关演员") }}:
                    </span>
                    <a
                      v-for="(item, avactressindex) in javData.avactress"
                      :key="avactressindex"
                    >
                      <Tag @click.native="goActress(item.id)" color="primary">{{
                        item.actname
                      }}</Tag>
                    </a>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <span style="font-weight: 700"
                      >{{ translateTitle("修订人员") }}:
                    </span>
                    <Tag color="primary">管理员</Tag>
                    <Tag
                      v-for="(item, revisedindex) in javData.revised"
                      :key="revisedindex"
                      color="primary"
                    >
                      {{ item.username }}
                    </Tag>
                  </div>
                </ListItem>
                <ListItem>
                  <Select
                    v-model="favoritesselectId"
                    placeholder="选择或输入名字创建收藏夹"
                    filterable
                    allow-create
                    @on-create="handleCreateFavorites"
                  >
                    <Option
                      v-for="item in favoritesData"
                      :value="item.value"
                      :key="item.value"
                    >
                      {{ item.label }}
                    </Option>
                  </Select>
                  <Button @click="handleSelectFavorites">加入收藏夹</Button>
                </ListItem>
              </List>
            </i-col>
          </Row>
        </i-col>
      </Row>
      <Row id="simgid" type="flex" justify="center" :gutter="12">
        <i-col
          v-for="(item, index) in javData.detailimg"
          :key="index"
          style="margin-bottom: 10px"
        >
          <div>
            <div class="detailsimg" @click="previewImg(index)">
              <!-- <img
              :src="item.s_img_source"
              :large="item.b_img_source"
              preview="1"
              :preview-text="detail.orginal_title"
            /> -->
              <img :src="item.simg" :large="item.bimg" />
            </div>
          </div>
        </i-col>
      </Row>
      <Row type="flex" justify="start">
        <i-col span="24">
          <Tabs :animated="false">
            <TabPane label="磁链">
              <div v-for="item in btSearchData" :key="item.hash">
                <BtTab :infodata="item" />
              </div>
            </TabPane>
            <TabPane label="评论">
              <Form
                ref="commentItem"
                :model="commentFormItem"
                label-position="left"
                :label-width="60"
              >
                <FormItem label="评分">
                  <Rate
                    show-text
                    allow-half
                    icon="ios-heart"
                    v-model="commentFormItem.score"
                  >
                  </Rate>
                </FormItem>
                <FormItem label="评价">
                  <i-input
                    v-model="commentFormItem.content"
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    placeholder="评价可以留空，与影片无关评价或不适当的评价被举报成功可能会被封禁账号！"
                  ></i-input>
                </FormItem>
                <FormItem>
                  <Button @click="commentSubmit('commentItem')">提交</Button>
                </FormItem>
              </Form>
              <List item-layout="vertical">
                <ListItem v-for="item in commentData" :key="item.id">
                  <p>
                    <Avatar :src="item.avatar" />
                    <span style="padding: 0 10px"> {{ item.username }}</span>
                    <Rate
                      disabled
                      show-text
                      allow-half
                      icon="ios-heart"
                      :value="parseFloat(item.score)"
                    >
                      <span style="color: #808695"> {{ item.time }}</span>
                    </Rate>
                  </p>
                  <div class="comment">
                    <p>{{ item.content }}</p>
                  </div>
                  <template slot="action">
                    <li>
                      <Icon type="md-thumbs-up" @click="likes(item.id)" />
                      {{ item.likes }}
                    </li>
                    <li>
                      <Icon
                        title="举报"
                        @click="report(item.id)"
                        color="#ed4014"
                        type="md-warning"
                      />
                    </li>
                  </template>
                </ListItem>
              </List>
            </TabPane>
            <TabPane label="相关收藏夹">开发中</TabPane>
          </Tabs>
        </i-col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { formatTime } from "@/utils/format";
import { mapActions } from "vuex";
import { Spin, Message, Modal } from "view-design";
import { translateTitle } from "@/utils/i18n";
import BtTab from "@/components/BtTab.vue";
export default {
  name: "MovieDetail",
  components: {
    BtTab,
  },
  props: {
    // moviedetailstatus: Boolean,
  },
  data() {
    return {
      status: false,
      javData: null,
      btSearchData: null,
      commentData: null,
      commentFormItem: {
        javid: null,
        score: 0,
        content: "",
      },
      addFavorites: true,
      favoritesselectId: null,
      favoritesData: [],
    };
  },
  computed: {},
  created() {
    this.fetchData(this.$route.query.id);
  },
  methods: {
    formatTime,
    translateTitle,
    ...mapActions("search", {
      getJavSubject: "getJavSubject",
      submitComments: "submitComments",
      reportComment: "reportComment",
      likesComment: "likesComment",
    }),
    ...mapActions("jav", {
      addJavToFavorites: "addJavToFavorites",
      createFavorites: "createFavorites",
    }),
    goActress(id) {
      let routeData = this.$router.resolve({
        path: `/jav/actress`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
    async fetchData(id) {
      Spin.show({
        render: (h) => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18,
              },
            }),
            h("div", "加载中"),
          ]);
        },
      });
      console.log(id);
      const { javData, btSearchData, commentData, favoritesData } =
        await this.getJavSubject(id);
      this.javData = javData;
      this.btSearchData = btSearchData;
      this.commentData = commentData;
      this.favoritesData = favoritesData;
      Spin.hide();
      if (javData) document.title = `${this.javData.code}`;
    },
    commentSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const subminInMsg = Message.loading({
            content: this.translateTitle("提交中"),
            duration: 0,
          });
          this.commentFormItem.javid = this.javData.id;
          await this.submitComments(this.commentFormItem);
          subminInMsg();
          Message.success(this.translateTitle("提交成功"));
        } else {
          Message.error({
            background: true,
            content: "表单错误",
          });
        }
      });
    },
    async likes(cid) {
      const msg = this.$Message.loading({
        content: "提交中...",
        duration: 0,
      });
      await this.likesComment(cid);
      msg();
      Message.success(this.translateTitle("点赞成功"));
    },
    async handleCreateFavorites(val) {
      const msg = Message.loading({
        content: "创建中...",
        duration: 0,
      });
      console.log("handleCreateFavorites", val);
      const { favoritesData } = await this.createFavorites(val);
      msg();
      this.favoritesData = favoritesData;
      this.favoritesselectId = null;
      Message.success(this.translateTitle("创建成功"));
    },
    async handleSelectFavorites() {
      if (!this.favoritesselectId) {
        Message.warning(this.translateTitle("请选择收藏夹"));
        return;
      }
      const msg = Message.loading({
        content: "收藏中...",
        duration: 0,
      });
      await this.addJavToFavorites({
        javid: this.javData.id,
        fid: this.favoritesselectId,
      });
      msg();
      Message.success(this.translateTitle("收藏成功"));
    },
    report(cid) {
      Modal.confirm({
        title: "提示",
        content:
          "<p>举报审核后会删除评论或封禁该用户，恶意举报会封禁你的账号</p>",
        okText: "确认举报",
        onOk: async () => {
          await this.reportComment(cid);
          Message.success({
            background: true,
            content: "举报成功,等待管理员审核",
          });
        },
        onCancel: () => {
          return;
        },
      });
    },
    previewImg(index) {
      console.log(index);
      var urlData = this.javData.detailimg
        .map((item) => {
          return item.bimg;
        })
        .join(",")
        .split(",");
      console.log(urlData);
      this.$hevueImgPreview({
        multiple: true,
        closeBtn: false,
        clickMaskCLose: true,
        nowImgIndex: index,
        imgList: urlData,
      });
    },
  },
};
</script>

<style>
.detailsimg {
  /* width: 140px; */
  overflow: hidden;
  cursor: pointer;
}
.b_img_div {
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
.vertical-center-modal .ivu-modal-content {
  background: transparent;
  background-color: unset;
  box-shadow: unset;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.detailheadimg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 600px;
}
.detailheadimgdiv {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#javdetail {
  box-shadow: none;
}
#javdetail .ivu-tabs-tabpane {
  padding: 10px 2px;
}
#simgid .ivu-card-body {
  padding: 2px;
}
#javdetail img {
  border-radius: 6px;
}
#javdetail .ivu-card-body {
  padding: 10px;
}
#javdetail .ivu-card-bordered {
  background: none;
  border: none;
}
#javdetail .ivu-rate-star-chart {
  font-size: 16px;
}
#javdetail .ivu-rate-star-chart.ivu-rate-star-half .ivu-rate-star-first {
  opacity: 1;
  color: #ed4014;
}
#javdetail .ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-first,
.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-second {
  color: #ed4014;
}
#javdetail .comment {
  padding: 6px 0;
}
/* #javdetail .ivu-rate-star-chart:before {
    color: #ed4014 !important;
  
}
#javdetail .ivu-rate-star-second {
    color: #ed4014 ;
} */
@media (min-width: 992px) {
  #javdetail {
    margin-left: 180px;
    max-width: 1380px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1121px) {
  #javdetail {
    margin-left: 40px;
  }
}

/* #detail .ivu-card:hover {
  -webkit-box-shadow: none;
  -ms-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
} */
#javdetail .ivu-card-body {
  padding: 9px;
}
</style>
