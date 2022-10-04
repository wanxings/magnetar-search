<template>
  <Card class="TabCard" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag style="background: var(--theme-color)" color="primary">
        {{ getStyleStr(data.style) }}
      </Tag>
      <font v-html="data.title" class="btname"></font>
    </p>
    <Row
      type="flex"
      justify="start"
      style="padding: 10px; color: var(--txt-b-tip)"
    >
      <i-col span="6">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('点击跳转网盘链接')"
        >
          <Icon color="var(--theme-color)" type="ios-link" size="18" />
          <a
          target="_blank"
          :href="getStyleLink(data.style) + data.hash"
       

          >
            {{ translateTitle("网盘链接") }}
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
          {{ formatDate(data.create_time) }}
        </Tooltip>
      </i-col>
      <i-col span="7" v-if="data.pwd">
        <Tooltip
          placement="top"
          theme="light"
          :content="translateTitle('解压密码')"
        >
          <Icon color="var(--theme-color)" type="ios-lock-outline" size="18" />
          {{ data.pwd }}
        </Tooltip>
      </i-col>
    </Row>
  </Card>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { fileSize, formatDate } from "@/utils/format";
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
  computed: {},
  methods: {
    fileSize,
    formatDate,
    translateTitle,
    getStyleStr: function (value) {
      switch (Number(value)) {
        case 1:
          return "阿里云盘";
        case 2:
          return "夸克云盘";
        case 3:
          return "迅雷云盘";
        case 4:
          return "百度云盘";
        case 5:
          return "天翼云盘";
        case 6:
          return "115云盘";
        case 7:
          return "未知";
        default:
          break;
      }
    },
    getStyleLink: function (value) {
      switch (Number(value)) {
        case 1:
          return "https://www.aliyundrive.com/s/";
        case 2:
          return "https://pan.quark.cn/s/";
        case 3:
          return "https://pan.xunlei.com/s/";
        case 4:
          return "https://pan.baidu.com/s/1dDtG9vb";
        case 5:
          return "https://cloud.189.cn/t/";
        case 6:
          return "https://115.com/s/";
        case 7:
          return "https://baidu.com/";
        default:
          break;
      }
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


