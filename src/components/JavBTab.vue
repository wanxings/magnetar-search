<style scoped>
.ivu-rate {
  font-size: 13px;
}
.ivu-tooltip {
  width: 100%;
}
</style>
<template>
  <Card v-if="data" class="javitem TabCard Card-theme-dark">
    <div class="previewcard">
      <div class="cover_b" @click="goJavsubject(data.id)">
        <img style="border-radius: 7px" v-lazy="data.cover.b_pic" alt />
        <div
          style="position: fixed; bottom: 80px; right: 10px; z-index: 8"
        ></div>
      </div>
      <dl>
        <p class="j_B_Tab_Title">
          <Tooltip max-width="320" :content="data.title">
            {{ data.title }}
          </Tooltip>
        </p>
        <p>
          {{ data.code }}
        </p>
        <dt>
          <Rate disabled show-text allow-half :value="data.score / 2">
            <span>
              <span style="color: #f5a623">
                {{ data.score.toFixed(1) || 0.0 }}
              </span>
              分
            </span>
          </Rate>
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
.previewcard_b {
  text-align: left;
  height: auto;
  color: var(--txt-b-pure);
}
.previewcard_b dt {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 92%;
}
.j_B_Tab_Title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cover_b {
  margin: 0 auto;
  height: 207px;
  max-width: 308px;
}
</style>
