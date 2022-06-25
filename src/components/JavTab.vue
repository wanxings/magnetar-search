<template>
  <Card v-if="data" class="TabCard Card-theme-dark" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag style="background: var(--theme-color)" color="primary">{{
        translateTitle(Tagvalue)
      }}</Tag>
      <font v-html="data.code" style="font-size: 14px"></font>
      <font style="font-size: 14px"
        >({{ formatTime(data.rdate, "yyyy") }})</font
      >
    </p>
    <a href="#" slot="extra" @click.prevent="goJavsubject(data.id)">
      <Icon type="ios-loop-strong"></Icon>
      {{ translateTitle("详情") }}
    </a>

    <Row
      type="flex"
      justify="start"
      style="padding: 0px 10px 10px 10px; color: var(--txt-b-tip)"
    >
      <i-col :xs="24" :sm="6" :md="6" :lg="6">
        <div style="overflow: hidden; cursor: pointer; position: relative">
          <div style="overflow: hidden; text-align: center; margin-top: 12px">
            <img
              v-if="data.headimg"
              style="width: auto; border-radius: 4px; max-width: 158px"
              :src="data.headimg.simg"
            />
            <div
              style="position: absolute; bottom: 10px; right: 10px; z-index: 8"
            >
              <Button
                v-if="data.pvideo"
                @click="playvideo($event, data.pvideo)"
                icon="ios-play"
              ></Button>
            </div>
          </div>
        </div>
      </i-col>
      <i-col :xs="24" :sm="18" :md="18" :lg="18" class="dbJavinfo">
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
          >
            <i-circle
              :size="35"
              :trail-width="4"
              :stroke-width="5"
              :percent="Number(data.score).toFixed(1) * 10"
              stroke-linecap="square"
              stroke-color="#f5a623"
              style="float: left; margin-right: 8px"
            >
              <div class="demo-Circle-custom">
                <span>
                  {{ Number(data.score).toFixed(1) }}
                </span>
              </div>
            </i-circle>
            <p style="font-weight: 700" v-html="data.title"></p>
          </span>
        </p>
        <p>
          <span style="font-weight: 700">{{ translateTitle("演员") }}: </span>
          <span v-if="data.avactress.length === 0">暂无</span>
          <a
            v-for="(item, avactressindex) in data.avactress"
            :key="avactressindex"
          >
            <Tag @click.native="goActress(item.id)" color="primary">{{
              item.actname
            }}</Tag>
          </a>
        </p>

        <p>
          <span style="font-weight: 700"
            >{{ translateTitle("所处分类") }}:
          </span>
          <span v-if="data.avgenre.length === 0">暂无</span>
          <Tag
            v-for="(item, avgenreindex) in data.avgenre"
            :key="avgenreindex"
            color="primary"
            >{{ item.name }}</Tag
          >
        </p>
        <p>
          <span style="font-weight: 700"
            >{{ translateTitle("上映日期") }}:
          </span>
          <span>{{ formatTime(data.rdate, "yyyy-MM-dd") }}</span>
        </p>
      </i-col>
    </Row>
    <PlayVideo ref="playVideo" />
    <JavDetail ref="javDetail" />
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import PlayVideo from "@/components/PlayVideo.vue";
import JavDetail from "@/components/JavDetail.vue";
import { formatTime } from "@/utils/format";
export default {
  props: {
    data: Object,
    Tagvalue: {
      type: String,
      default: "番号",
    },
  },
  components: {
    PlayVideo,
    JavDetail,
  },
  computed: {},
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
    goActress(id) {
      let routeData = this.$router.resolve({
        path: `/jav/actress`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
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
.dbJavinfo {
  padding-left: 10px;
  margin-top: 12px;
}
.dbJavinfo p {
  padding-top: 5px;
}
</style>
