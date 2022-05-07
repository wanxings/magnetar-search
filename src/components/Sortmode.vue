<template>
  <div>
    <Select
      style="padding: 11px 0px 0px 10px"
      @on-select="changesort"
      size="small"
      :value="searchparamet.m"
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
import { mapGetters, mapMutations } from "vuex";
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
    ...mapGetters({
      searchparamet: "search/searchparamet",
    }),
  },

  methods: {
    translateTitle,
    ...mapMutations({
      SET_SEARCHPARAMET: "search/SET_SEARCHPARAMET",
    }),
    changesort(val) {
      this.SET_SEARCHPARAMET({
        m: val.value,
        p: 1,
      });
      this.$router.push({
        path: "/search",
        query: this.searchparamet,
      });
    },
  },
};
</script>
<style>
</style>
