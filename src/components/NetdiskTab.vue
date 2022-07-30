<style scoped>
.ivu-form-item {
    margin-bottom: 0px;
}
</style>
<template>

  <Row
      type="flex"
      justify="space-between"
      style="padding: 10px; color: var(--txt-b-tip)"
    >
      <i-col span="24">
        <Form label-position="left" :label-width="80">
          <FormItem label="分享用户:">
            {{ data.username }}
          </FormItem>
          <FormItem label="网盘链接:">
            <a :href="data.url">{{ data.url }}</a>
          </FormItem>
          <FormItem label="分享时间:">
            {{ data.createTime }}
          </FormItem>
          <FormItem label="有效时间:">
            {{ data.validityPeriod }}
          </FormItem>
          <FormItem label="提取密码:">
            {{ data.extractionCode }}
          </FormItem>
          <FormItem label="解压密码:">
            {{ data.compressedPwd }}
          </FormItem>
          <FormItem label="资源说明:">
            {{ data.synopsis }}
          </FormItem>
        </Form>
      </i-col>
    </Row>
</template>
<script>
import { mapGetters } from "vuex";
import { Message } from "view-design";
import { translateTitle } from "@/utils/i18n";
import { fileSize, formatTime } from "@/utils/format";
// import common from "@/components/Common.vue";
export default {
  props: {
    data: {
      type: Object,
    },
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
    fileSize,
    formatTime,
    translateTitle,
    getTypeName: function (value) {
      switch (value) {
        case 0:
          return "其他网盘";
        case 1:
          return "阿里云盘";
        case 2:
          return "夸克云盘";
        case 3:
          return "百度网盘";
        default:
          break;
      }
    },
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
            duration:10,
          });
        }
      );
    },
  },
};
</script>
<style>
#nd-tab .ivu-form-item {
  margin-bottom: 10px;
}
</style>


