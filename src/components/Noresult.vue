<template>
  <div style="font-size: medium; color: var(--txt-b-tip)">
    {{ translateTitle("您的搜索") }}- {{ keyword }} -{{
      translateTitle("没有匹配的结果")
    }}.
    <p
    v-if="!image"
      style="
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      "
    >
      {{ translateTitle("建议") }}:
    </p>
    <ul v-if="!image" style="margin-left: 1.3em; margin-bottom: 2em">
      <li>{{ translateTitle("确保所有单词拼写正确") }}.</li>
      <li>{{ translateTitle("关键词用空格等隔开") }}.</li>
      <li>{{ translateTitle("减少关键词数量") }}.</li>
    </ul>
  </div>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
export default {
  props: {
    keyword: String,
    image:{
      type: Boolean,
      // 对象或数组默认值必须从一个工厂函数获取
      default: false
    },
  },
  methods: {
    translateTitle,
  },
};
</script>
<style>
.notic-card {
  height: auto;
  color: var(--txt-b-tip);
  max-width: 368px;
  border: 1px solid var(--b-alpha-15);
}
@media screen and (max-width: 996px) {
  .notic-card {
    max-width: unset;
  }
}
@media screen and (min-width: 992px) and (max-width: 1121px) {
  #right-panl {
    margin-left: 40px !important;
  }
}
</style>
