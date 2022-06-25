<template>
  <Card v-if="data" class="javitem TabCard Card-theme-dark">
    <div class="previewcard" @click="goJavsubject(data.id)">
      <div class="cover">
        <img v-lazy="data.pic" alt />
        <div
          style="position: fixed; bottom: 80px; right: 10px; z-index: 8"
        ></div>
      </div>
      <dl>
        <p>
          {{ data.code }}
        </p>
        <dt>
          <strong>{{ data.score }}</strong>
        </dt>
        <dt>{{ formatTime(data.rdate, "yyyy-MM-dd") }}</dt>
        <dt><Tag v-if="data.magnetic" color="blue">磁链</Tag></dt>
      </dl>
    </div>
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { formatTime } from "@/utils/format";
export default {
  props: {
    data: Object,
  },
  components: {},
  computed: {},
  methods: {
    translateTitle,
    formatTime,
    goJavsubject(id) {
      let routeData = this.$router.resolve({
        path: `/jav/subject`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
  },
};
</script>

<style>
.previewcard {
  text-align: center;
  height: auto;
  color: var(--txt-b-pure);
}
.previewcard dt {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 92%;
}
.javitem {
  cursor: pointer;
  width: auto;
}
.javitem strong {
  color: #e09015;
  font-weight: unset;
}
.javitem p {
  color: #37a;
}
.javitem .ivu-card-body {
  padding: 8px;
}
.javitem img {
  width: 100%;
  object-fit: contain;
  height: 100%;
}
.javitem dl {
  padding: 7px 0px;
}
.cover {
  margin: 0 auto;
  max-width: 147px;
  height: 200px;
}
</style>
