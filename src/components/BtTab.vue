<template>
  <Card class="TabCard" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag
        v-if="!infodata.searchname"
        style="background: var(--theme-color)"
        color="primary"
        >{{ translateTitle(getdhttype(infodata.style)) }}</Tag
      >
      <Tag v-else style="background: var(--theme-color-rose)" color="primary">{{
        infodata.searchname
      }}</Tag>
      <font v-html="infodata.name" class="btname"></font>
    </p>
    <Row
      type="flex"
      justify="space-between"
      style="padding: 10px; color: var(--txt-b-tip)"
    >
      <i-col span="6">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('点击复制链接')"
        >
          <Icon color="var(--theme-color)" type="ios-link" size="18" />
          <a v-on:click="copylink(infodata.hash)" href="javascript:;">
            {{ translateTitle("磁力链接") }}
          </a>
        </Tooltip>
      </i-col>
      <i-col span="7">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('收录时间')"
        >
          <Icon color="var(--theme-color)" type="md-time" size="18" />
          {{ formatDate(infodata.create_time) }}
        </Tooltip>
      </i-col>
      <i-col span="6">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('文件大小')"
        >
          <Icon color="var(--theme-color)" type="md-cloud-outline" size="18" />
          {{ fileSize(infodata.length) }}
        </Tooltip>
      </i-col>
      <i-col span="4" title="">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('文件热度')"
        >
          <Icon color="var(--theme-color)" type="ios-flash" size="18" />
          {{ infodata.weights }}
        </Tooltip>
      </i-col>
    </Row>
    <Collapse
      v-if="infodata.id"
      simple
      @on-change="getfilelist(infodata.id, infodata.files)"
    >
      <Panel name="1"
        >{{ translateTitle("文件列表") }} [ {{ infodata.files }} ]
        <p slot="content"><Tree empty-text=" " :data="treedata"></Tree></p>
      </Panel>
    </Collapse>
  </Card>
</template>
<script>
import { mapGetters } from "vuex";
import { Message } from "view-design";
import { translateTitle } from "@/utils/i18n";
import { fileSize, formatDate } from "@/utils/format";
import { getFileList } from "@/api/magnetic";
export default {
  props: {
    infodata: {
      type: Object,
      default: function () {
        return {
          tid: 0,
          dhttype: "",
          name: "",
          hash: "",
          updatetime: "",
          size: "",
          fire: "",
          files: "",
        };
      },
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
    formatDate,
    translateTitle,
    getdhttype: function (value) {
      switch (Number(value)) {
        case 0:
          return "其他";
        case 1:
          return "视频";
        case 2:
          return "图片";
        case 3:
          return "文档";
        case 4:
          return "音乐";
        case 5:
          return "程序";
        case 6:
          return "压缩";
        case 7:
          return "其他";
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
            duration: 10,
          });
        }
      );
    },
    async getfilelist(id, files) {
      if (this.status == true) {
        if (files < 2) {
          Message.info(this.translateTitle("唯一的文件就是名字哦"));
          return;
        }
        this.status = false;
        const msg = Message.loading({
          content: this.translateTitle("加载中"),
          duration: 0,
        });

        const list = await getFileList({ id });
        this.treedata = this.listToTree(list);
        msg();
      }
    },
    listToTree(arr) {
      var ret = [];
      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; ++i) {
          var path = arr[i]["path"];
          var _ret = ret;
          for (var j = 0; j < path.length; ++j) {
            var name = path[j];
            var obj = null;
            for (var k = 0; k < _ret.length; ++k) {
              var _obj = _ret[k];
              if (_obj.title === name) {
                obj = _obj;
                break;
              }
            }
            if (!obj) {
              obj = {
                title: name,
              };
              if (name.indexOf(".") < 0) {
                obj.children = [];
              }
              _ret.push(obj);
            }
            if (obj.children) {
              _ret = obj.children;
            }
          }
        }
      }
      return ret;
    },
  },
};
</script>
<style>
.btname {
  font-size: 14px;
  line-height: 1.3;
  color: var(--b-alpha-90);
  text-overflow: ellipsis;
  font-family: arial, sans-serif;
}
.btname em {
  color: #ea4335;
  font-weight: normal;
  font-style: normal;
}
</style>


