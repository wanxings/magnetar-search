<template>
  <Page
    id="pages"
    size="small"
    :total="total"
    :page-size="pageSize"
    :current="page"
    @on-change="nextpage"
  />
</template>
<script>
import {
    pageSize,
} from '@/config'
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize:{
      type: Number,
      default: pageSize,
    }
  },
  computed: {
  },
  methods: {
    nextpage(val) {
      this.$emit("nextpage",val);
    },
  },
};
</script>
<style>
#pages .ivu-page-next,
.ivu-page-prev {
  background-color: transparent;
  border: none;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: var(--theme-color);
}
.ivu-page-item:hover a {
  color: var(--theme-color);
}
#pages .ivu-page-item-active {
  border-color: var(--theme-color);
}

#pages .ivu-page-item {
  background-color: transparent;
  border: none;
  border-color: var(--theme-color);
}
</style>
