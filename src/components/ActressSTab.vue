<template>
  <Card v-if="data" class="javitem TabCard Card-theme-dark">
    <div class="previewcard">
      <div class="cover" @click="goActressWork(data.id)">
        <img v-lazy="data.avatar" alt />
        <div
          style="position: fixed; bottom: 80px; right: 10px; z-index: 8"
        ></div>
      </div>
      <dl>
        <p> 
          {{ data.actname }}({{ data.acname_zh }})
        </p>
      </dl>
    </div> 
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { formatDate } from "@/utils/format";
export default {
  props: {
    data: Object,
  },
  components: {},
  computed: {},
  methods: {
    translateTitle,
    formatDate,
    goActressWork(id) {
      let routeData = this.$router.resolve({
        path: `/javActress/works`,
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
