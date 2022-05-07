<template>
  <div  id="resultStats">
    {{ translateTitle("找到约") }} {{ total }} {{ translateTitle("条结果") }}
    <nobr>( {{ time }} {{ translateTitle("秒") }})&nbsp;</nobr>
  </div>
</template>  
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("search",{
      time: "time",
      total: "total",
    }),
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
