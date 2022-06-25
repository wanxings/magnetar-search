<template>
  <Card v-if="data" class="TabCard" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag style="background: var(--theme-color)" color="primary">{{
        translateTitle(getTypeName(data.type))
      }}</Tag>
      <font v-html="data.subject_title" style="font-size: 14px"></font>
      <font style="font-size: 14px">({{ data.year }})</font>
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
                src: 'https://api.cixing.io/douban/normal/' + data.id + '.webp',
                error:
                  'https://api.cixing.io/douban/normal/' + data.id + '.jpg',
              }"
              style="width: auto; border-radius: 4px; max-width: 158px"
            />
          </div>
        </div>
      </i-col>
      <i-col :xs="24" :sm="18" :md="18" :lg="18" class="dbmovieinfo" style="">
        <p>
          <span>{{ data.year }}</span> | <span>{{ data.style }}</span>
          <a
            target="_blank"
            :href="
              'https://www.douyin.com/search/' +
              data.subject_title_source +
              '?publish_time=0&sort_type=0&source=switch_tab&type=video'
            "
          >
            {{ translateTitle("抖音") }}
          </a>
          <a
            target="_blank"
            :href="'https://movie.douban.com/subject/' + data.id + '/'"
          >
            {{ translateTitle("豆瓣") }}
          </a>
          <a
            v-if="data.imdb"
            target="_blank"
            :href="'https://www.imdb.com/title/' + data.imdb.trim() + '/'"
          >
            {{ translateTitle("IMDB") }}
          </a>
        </p>
        <p v-if="data.episode">
          <span>集数:{{ data.episode }}</span
          ><span> 时长:{{ data.episode_length }}</span>
        </p>
        <p v-else>
          <span>时长:{{ data.length }}</span>
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
            @click="showsynopsis(data.synopsis)"
          >
            <i-circle
              :size="35"
              :trail-width="4"
              :stroke-width="5"
              :percent="Number(data.score) * 10"
              stroke-linecap="square"
              stroke-color="#f5a623"
              style="float: left; margin-right: 8px"
            >
              <div class="demo-Circle-custom">
                <span>
                  {{ Number(data.score) }}
                </span>
              </div>
            </i-circle>

            <p v-if="!data.synopsis">暂无简介</p>
            <p v-html="data.synopsis"></p>
          </span>
        </p>
        <p>
          <span style="font-weight: 700">{{ translateTitle("导演") }}: </span>
          <span v-if="!data.directors">暂无</span>
          <span v-html="data.directors"></span>
        </p>
        <Tooltip max-width="300" :content="data.actors">
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
            <span style="font-weight: 700">{{ translateTitle("演员") }}: </span>
            <span v-if="!data.actors">暂无</span>
            <span v-html="data.actors"></span>
          </p>
        </Tooltip>
        <p>
          <span style="font-weight: 700"
            >{{ translateTitle("上映日期") }}:
          </span>
          <span v-html="data.release_date"></span>
        </p>
      </i-col>
    </Row>
    <Collapse simple>
      <Panel name="list"
        >{{ translateTitle("网盘列表") }} [ 0 ]
        <div slot="content">
          <div style="text-align: center; margin-bottom: 10px">
            <Button size="small" type="primary" icon="ios-add"
              >分享此资源</Button
            >
          </div>
          <div style="text-align: center; margin-bottom: 10px">
            <span v-if="!testList">暂无分享</span>
          </div>

          <!-- <div v-for="item in data.netDiskList" :key="item.hash"> -->
          <div v-for="item in testList" :key="item.url">
            <NetdiskTab :data="item" />
          </div>
        </div>
      </Panel>
    </Collapse>
    <PlayVideo ref="playVideo" />
    <JavDetail ref="javDetail" />
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import NetdiskTab from "@/components/NetdiskTab.vue";
import PlayVideo from "@/components/PlayVideo.vue";
import JavDetail from "@/components/JavDetail.vue";
import { formatTime } from "@/utils/format";
import { Modal } from "view-design";
export default {
  props: {
    data: Object,
    Tagvalue: {
      type: String,
      default: "番号",
    },
  },
  components: {
    NetdiskTab,
    PlayVideo,
    JavDetail,
  },
  data() {
    return {
      testList: [
        {
          type: 1,
          username: "管理员",
          url: "https://www.baidu.com",
          name: "演示数据",
          size: "1.5G",
          createTime: "2020-09-25 11:59:53",
          validityPeriod: "永久有效",
          extractionCode: "演示数据",
          compressedPwd: "演示数据",
          synopsis: "演示数据",
        },
      ],
    };
  },
  computed: {},
  methods: {
    translateTitle,
    formatTime,
    getTypeName: function (value) {
      switch (value) {
        case 1:
          return "电影";
        case 2:
          return "电视剧";
        case 3:
          return "综艺";
        case 4:
          return "记录片";
        case 5:
          return "短片";
        default:
          return "未知";
      }
    },
    showsynopsis(value) {
      Modal.info({
        title: "作品简介",
        content: value,
      });
    },
    playvideo(e, video) {
      e.stopPropagation(); //阻止冒泡
      this.$refs.playVideo.play(video);
      // this.$emit("showplayvideo", video);
    },
    showJavDetail() {
      this.$refs.javDetail.show(this.data);
    },
  },
};
</script>

<style>
.dbmovieinfo {
  padding-left: 10px;
  margin-top: 12px;
}
.dbmovieinfo p {
  padding-top: 5px;
}
.dbmovieinfo p a {
  float: right;
  padding: 0 4px;
}
</style>
