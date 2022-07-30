<template>
  <div>
    <Select
      style="padding: 11px 0px 0px 10px"
      @on-select="changesort"
      size="small"
      id="BtTypeSelect"
      :value="typeValue"
    >
      <Option
        v-for="item in selectType"
        :value="item.value"
        :key="item.value"
        >{{ item.label }}</Option
      >
    </Select>
  </div>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
export default {
  model: {
    prop: 'typeValue', 
    event: 'changeValue'
  },
  props: {
    typeValue: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {};
  },
  computed: {
    selectType() {
      return [
        {
          value: "all",
          label: this.translateTitle("所有"),
        },
        {
          value: "video",
          label: this.translateTitle("视频"),
        },
        {
          value: "img",
          label: this.translateTitle("图片"),
        },
        {
          value: "compress",
          label: this.translateTitle("压缩"),
        },
        {
          value: "music",
          label: this.translateTitle("音乐"),
        },
        {
          value: "program",
          label: this.translateTitle("程序"),
        },
        {
          value: "document",
          label: this.translateTitle("文档"),
        },
        {
          value: "other",
          label: this.translateTitle("其他"),
        },
      ];
    },
  },

  methods: {
    translateTitle,
    changesort(val) {
      this.$emit('changeValue', val.value)
      this.$emit("change",val.value);
    },
  },
};
</script>
<style>
#BtTypeSelect .ivu-select-dropdown {
  max-height: 270px;
}
</style>
