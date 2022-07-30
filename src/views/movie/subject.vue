<template>
    <div id="javdetail" v-if="movieData">
      <p style="text-align: left">
          <!-- <font v-html="movieData.title" style="font-size: 14px">无</font> -->
          <font style="font-size: 2.125rem;font-weight: 400;"> 黑客帝国：矩阵重启</font>
          <font style="font-size: 14px"> The Matrix Resurrections</font>
        </p>
      <Row
        type="flex"
        justify="start"
        style="padding: 0px 10px 10px 10px; color: var(--txt-b-tip)"
      >
        
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <div style="overflow: hidden; cursor: pointer; position: relative">
            <div style="overflow: hidden; text-align: center; margin-top: 12px">
              <img
                v-lazy="{
                  src:
                    'https://api.cixing.io/douban/large/' +
                    movieData.id +
                    '.webp',
                  error:
                    'https://api.cixing.io/douban/large/' +
                    movieData.id +
                    '.jpg',
                }"
                style="width: auto; border-radius: 4px; max-width: 158px"
              />
            </div>
          </div>
        </i-col>
        <i-col :xs="24" :sm="18" :md="18" :lg="18" class="dbmovieinfo" style="">
          <p>
            <span>
              <Tag color="cyan" v-if="movieData.magnetic">含磁链</Tag>
              <Tag color="cyan" v-if="movieData.cloud">含云盘</Tag>
            </span>
          </p>
          <p>
            <span>{{ movieData.year }}</span> |
            <span>{{ movieData.style }}</span>
            <a
              target="_blank"
              :href="
                'https://www.douyin.com/search/' +
                movieData.subject_title_source +
                '?publish_time=0&sort_type=0&source=switch_tab&type=video'
              "
            >
              {{ translateTitle("抖音") }}
            </a>
            <a
              target="_blank"
              :href="'https://movie.douban.com/subject/' + movieData.id + '/'"
            >
              {{ translateTitle("豆瓣") }}
            </a>
            <a
              v-if="movieData.imdb"
              target="_blank"
              :href="
                'https://www.imdb.com/title/' + movieData.imdb.trim() + '/'
              "
            >
              {{ translateTitle("IMDB") }}
            </a>
          </p>
          <p v-if="movieData.episode">
            <span>集数:{{ movieData.episode }}</span
            ><span> 时长:{{ movieData.episode_length }}</span>
          </p>
          <p v-else>
            <span>时长:{{ movieData.length }}</span>
          </p>
          <p>
            <span
              style="
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
              "
              @click="showsynopsis(movieData.synopsis)"
            >
              <i-circle
                :size="35"
                :trail-width="4"
                :stroke-width="5"
                :percent="Number(movieData.score) * 10"
                stroke-linecap="square"
                stroke-color="#f5a623"
                style="float: left; margin-right: 8px"
              >
                <div class="demo-Circle-custom">
                  <span>
                    {{ Number(movieData.score) }}
                  </span>
                </div>
              </i-circle>

              <p v-if="!movieData.synopsis">暂无简介</p>
              <p v-html="movieData.synopsis"></p>
            </span>
          </p>
          <p>
            <span style="font-weight: 700">{{ translateTitle("导演") }}: </span>
            <span v-if="!movieData.directors">暂无</span>
            <span v-html="movieData.directors"></span>
          </p>
          <Tooltip max-width="300" :content="movieData.actors">
            <p
              style="
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
              "
            >
              <span style="font-weight: 700"
                >{{ translateTitle("演员") }}:
              </span>
              <span v-if="!movieData.actors">暂无</span>
              <span v-html="movieData.actors"></span>
            </p>
          </Tooltip>
          <p>
            <span style="font-weight: 700"
              >{{ translateTitle("上映日期") }}:
            </span>
            <span v-html="movieData.release_date"></span>
          </p>
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

</template>

<script>
import { formatTime } from "@/utils/format";
import { mapActions } from "vuex";
// import { Spin, Message, Modal } from "view-design";
import { Spin } from "view-design";
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
      movieData: null,
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
      getMovieSubject: "getMovieSubject",
      // submitComments: "submitComments",
      // reportComment: "reportComment",
      // likesComment: "likesComment",
    }),
    ...mapActions("jav", {
      addJavToFavorites: "addJavToFavorites",
      createFavorites: "createFavorites",
    }),
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
      const { movieData, btSearchData, commentData, favoritesData } =
        await this.getMovieSubject(id);
      this.movieData = movieData;
      this.btSearchData = btSearchData;
      this.commentData = commentData;
      this.favoritesData = favoritesData;
      Spin.hide();
      if (movieData) document.title = `${this.movieData.code}`;
    },
    // commentSubmit(name) {
    //   this.$refs[name].validate(async (valid) => {
    //     if (valid) {
    //       const subminInMsg = Message.loading({
    //         content: this.translateTitle("提交中"),
    //         duration: 0,
    //       });
    //       this.commentFormItem.javid = this.javData.id;
    //       await this.submitComments(this.commentFormItem);
    //       subminInMsg();
    //       Message.success(this.translateTitle("提交成功"));
    //     } else {
    //       Message.error({
    //         background: true,
    //         content: "表单错误",
    //       });
    //     }
    //   });
    // },
    // async likes(cid) {
    //   const msg = this.$Message.loading({
    //     content: "提交中...",
    //     duration: 0,
    //   });
    //   await this.likesComment(cid);
    //   msg();
    //   Message.success(this.translateTitle("点赞成功"));
    // },
    // async handleCreateFavorites(val) {
    //   const msg = Message.loading({
    //     content: "创建中...",
    //     duration: 0,
    //   });
    //   console.log("handleCreateFavorites", val);
    //   const { favoritesData } = await this.createFavorites(val);
    //   msg();
    //   this.favoritesData = favoritesData;
    //   this.favoritesselectId = null;
    //   Message.success(this.translateTitle("创建成功"));
    // },
    // async handleSelectFavorites() {
    //   if (!this.favoritesselectId) {
    //     Message.warning(this.translateTitle("请选择收藏夹"));
    //     return;
    //   }
    //   const msg = Message.loading({
    //     content: "收藏中...",
    //     duration: 0,
    //   });
    //   await this.addJavToFavorites({
    //     javid: this.javData.id,
    //     fid: this.favoritesselectId,
    //   });
    //   msg();
    //   Message.success(this.translateTitle("收藏成功"));
    // },
    // report(cid) {
    //   Modal.confirm({
    //     title: "提示",
    //     content:
    //       "<p>举报审核后会删除评论或封禁该用户，恶意举报会封禁你的账号</p>",
    //     okText: "确认举报",
    //     onOk: async () => {
    //       await this.reportComment(cid);
    //       Message.success({
    //         background: true,
    //         content: "举报成功,等待管理员审核",
    //       });
    //     },
    //     onCancel: () => {
    //       return;
    //     },
    //   });
    // },
    // previewImg(index) {
    //   console.log(index);
    //   var urlData = this.movieData.detailimg
    //     .map((item) => {
    //       return item.bimg;
    //     })
    //     .join(",")
    //     .split(",");
    //   console.log(urlData);
    //   this.$hevueImgPreview({
    //     multiple: true,
    //     closeBtn: false,
    //     clickMaskCLose: true,
    //     nowImgIndex: index,
    //     imgList: urlData,
    //   });
    // },
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
