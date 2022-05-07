<template>
  <Card v-if="language=='zh'" class="notic-card">
    <p slot="title" style="color: var(--b-alpha-90)">公告</p>
    <div v-html="notic"></div>
  </Card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { 
    ...mapGetters({
      notic: "app/notic",
      language: "app/language",
    }),
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
