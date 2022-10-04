<style>
.btname {
  font-size: 14px;
  line-height: 1.3;
  color: var(--b-alpha-90);
  text-overflow: ellipsis;
  font-family: arial, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btname em {
  color: #ea4335;
  font-weight: normal;
  font-style: normal;
}
.hideO {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <Card class="TabCard" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag v-if="infodata.code == 0" color="success">{{
        infodata.searchEngine
      }}</Tag>
      <Tag v-else color="error"
        >{{ infodata.searchEngine }} 错误信息:{{ infodata.errorMsg }}</Tag
      >
    </p>
    <div v-for="i in infodata.results" :key="i.hash" style="padding: 0 10px">
      <p
        v-html="i.name"
        class="btname"
        style="height: 24px; padding: 7px 10px"
      ></p>
      <Row
        type="flex"
        justify="space-between"
        style="padding: 10px; color: var(--txt-b-tip)"
      >
        <i-col span="6">
          <Tooltip
            v-if="i.hash"
            placement="top"
            theme="light"
            :content="translateTitle('点击复制链接')"
          >
            <Icon color="var(--theme-color)" type="ios-link" size="18" />
            <a v-on:click="copylink(i.hash)" href="javascript:;">
              {{ translateTitle("磁力链接") }}
            </a>
          </Tooltip>
          <Tooltip
            v-if="i.detailsLink"
            placement="top"
            theme="light"
            :content="translateTitle('该网站搜索页面没有展现磁链，需要第二次进入详情页面抓取')"
          >
            <Icon color="var(--theme-color)" type="ios-link" size="18" />
            <a v-on:click="scrapelink(i.detailsLink)" href="javascript:;">
              {{ translateTitle("抓取磁链") }}
            </a>
          </Tooltip>
        </i-col>
        <i-col span="6" class="hideO">
          <Tooltip
            placement="top"
            theme="light"
            :content="translateTitle('更新时间')"
          >
            <Icon color="var(--theme-color)" type="md-time" size="18" />
            {{ delHtml(i.updatetime) }}
          </Tooltip>
        </i-col>
        <i-col span="6" class="hideO">
          <Tooltip
            placement="top"
            theme="light"
            :content="translateTitle('文件大小')"
          >
            <Icon
              color="var(--theme-color)"
              type="md-cloud-outline"
              size="18"
            />
            {{ delHtml(i.size) }}
          </Tooltip>
        </i-col>
      </Row>
    </div>
    <p
      v-if="!infodata.results"
      style="text-align: center; padding: 10px; font-size: 12px; color: #9ea7b4"
    >
      没有数据
    </p>
  </Card>
</template>
<script>
import { mapGetters } from "vuex";
import { translateTitle } from "@/utils/i18n";
import { Message, Modal } from "view-design";
import { delHtml } from "@/utils/format";
import { polySearchScrape } from "@/api/magnetic";
// import common from "@/components/Common.vue";
export default {
  props: {
    infodata: Object,
  },
  data() {
    return {
      treedata: [],
      status: true,
    };
  },
  computed: {
    ...mapGetters("app", {
      trackerList: "trackerList",
      autotracker: "autotracker",
    }),
  },
  methods: {
    translateTitle,
    delHtml,
    copylink(val) {
      if (this.autotracker === "on") {
        let data = this.trackerList;
        let trackerlist = data.split(/[\r\n]+/); // 根据换行或者回车进行识别
        trackerlist.forEach((item, index) => {
          // 删除空项
          if (!item) {
            trackerlist.splice(index, 1);
          }
        });
        trackerlist = Array.from(new Set(trackerlist)); // 去重
        trackerlist = trackerlist.join("&tr=");
        val = `${val}&tr=${trackerlist}`;
      }
      let message = `magnet:?xt=urn:btih:${val}`;
      this.$copyText(message).then(
        () => {
          Message.success({
            content: this.translateTitle("已复制到粘贴板"),
            background: true,
          });
        },
        () => {
          Message.error({
            content: `${this.translateTitle(
              "复制失败，可能浏览器不支持该功能，请手动复制"
            )}${message}`,
            background: true,
            duration: 10,
          });
        }
      );
    },
    async scrapelink(id) {
      const msg = Message.loading({
        content: this.translateTitle("抓取中"),
        duration: 0,
      });

      let data = await polySearchScrape({
        id,
      });
      msg();
      let modalContent = "";
      data.forEach((value, index) => {
        modalContent =
          modalContent + "<p>magnet:?xt=urn:btih:" + value + "</p>";
        console.log(value, index);
      });
      Modal.success({
        title: "抓取成功",
        content: modalContent,
        width: "500",
      });
    },
  },
};
</script>


