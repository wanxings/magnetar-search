<template>
  <Card v-if="data" class="javitem TabCard Card-theme-dark">
    <div class="previewcard">
      <div class="cover" @click="goJavsubject(data.id)">
        <img v-lazy="data.cover.s_pic" alt />
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
        <dt>{{ formatDate(data.rdate) }}</dt>
        <dt><Tag v-if="data.magnetic_time" color="blue">含磁链</Tag></dt>
        <dt v-if="isdelete">
          <Button type="error" @click="deleteAction" ghost long>删除</Button>
        </dt>
      </dl>
    </div> 
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { Modal } from "view-design";
import { formatDate } from "@/utils/format";
export default {
  props: {
    data: Object,
    isdelete: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  computed: {},
  methods: {
    translateTitle,
    formatDate,
    goJavsubject(id) {
      let routeData = this.$router.resolve({
        path: `/jav/subject`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
    deleteAction() {
      Modal.confirm({
        title: "确认删除",
        content: "<p>确定从收藏夹移除此番号吗？</p>",
        onOk: () => {
          this.$emit("deleteAction");
        },
        onCancel: () => {
          return;
        },
      });
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
