<template>
  <Card class="poly-card">
    <p slot="title" style="color: var(--b-alpha-90)">
      {{ translateTitle("聚合列表") }}
    </p>
    <div justify="space-between">
      <a
        style="margin-bottom: 6px"
        v-for="(data, index) in polyStatusData"
        :key="index"
      >
        <Tag :color="data.status | statusType">{{ data.name }}</Tag>
      </a>
    
      <!-- <i-input search enter-button="申请收录" size="small" placeholder="目标站点" /> -->
    </div>
  </Card>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("app",{
      polyStatusData: "polyStatusData",
    }),
  },
  created() {
  },
  filters: {
    statusType: function (value) {
      return value == 1 ? "success" : "error";
    },
  },
  methods: {
    translateTitle
  },
};
</script>
<style scoped>
.poly-card {
  height: auto;
  color: var(--txt-b-tip);
  max-width: 368px;
  border: 1px solid var(--b-alpha-15);
  margin-bottom: 20px;
}
@media screen and (max-width: 996px) {
  .poly-card {
    max-width: unset;
  }
}
</style>