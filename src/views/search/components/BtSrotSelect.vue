<template>
  <div>
    <Select
      style="padding: 11px 0px 0px 10px"
      @on-select="changesort"
      size="small"
      :value="btQuery.m"
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    selectType() {
      return [
        {
          value: "correla",
          label: this.translateTitle("相关程度"),
        },
        {
          value: "time",
          label: this.translateTitle("更新时间"),
        },
        {
          value: "size",
          label: this.translateTitle("文件大小"),
        },
        {
          value: "repeat",
          label: this.translateTitle("文件热度"),
        },
      ];
    },
    ...mapGetters("search",{
      btQuery: "btQuery",
    }),
  },

  methods: {
    translateTitle,
    changesort(val) {
      this.$emit("change",val.value);
    },
  },
};
</script>
<style>
</style>
