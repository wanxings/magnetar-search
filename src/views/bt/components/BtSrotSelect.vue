<template>
  <div>
    <Select
      style="padding: 11px 0px 0px 10px"
      @on-select="changesort"
      size="small"
      :value="sortValue"
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
    prop: 'sortValue', 
    event: 'changeValue'
  },
  props: {
    sortValue: {
      type: String,
      default: 'correlation'
    }
  },
  data() {
    return {};
  },
  computed: {
    selectType() {
      return [
        {
          value: "correlation",
          label: this.translateTitle("相关程度"),
        },
        {
          value: "time",
          label: this.translateTitle("收录时间"),
        },
        {
          value: "length",
          label: this.translateTitle("文件大小"),
        },
        {
          value: "weights",
          label: this.translateTitle("文件热度"),
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
</style>
