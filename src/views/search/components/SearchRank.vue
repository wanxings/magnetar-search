
<template>
  <Card class="top-card">
    <p slot="title" style="color: var(--b-alpha-90)">{{ translateTitle("热门搜索") }}</p>
    <div justify="space-between">
      <a
        style="margin-bottom: 6px"
        v-for="(keyword, index) in searchRankingData"
        :key="index"
      >
        <Tag color="default" size="medium" @click.native="search(keyword)">{{
          keyword
        }}</Tag>
      </a>
    </div>
  </Card>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { translateTitle } from "@/utils/i18n";
export default {
  computed: {
    ...mapGetters({
      searchRankingData: "app/searchRankingData",
      searchparamet: "search/searchparamet",
    }),
  },
  methods: {
    translateTitle,
    ...mapMutations("search",{
      set_keyword: "set_keyword",
    }),
    search(val) { 
      this.set_keyword(val)
      this.$router.push({
        path: `/search`,
        query: { q: val },
      });
    },
  },
};
</script>
<style scoped>
.top-card {
  height: auto;
  color: var(--txt-b-tip);
  max-width: 368px;
  border: 1px solid var(--b-alpha-15);
  margin-top: 10px;
}
@media screen and (max-width: 996px) {
  .top-card {
    max-width: unset;
  }
}
</style>
