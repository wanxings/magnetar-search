<style>
#layout404 {
  min-width: 375px;
  min-height: 600px;
  margin-top: 10%;
}
.n-result {
    color: var(--n-text-color);
    line-height: var(--n-line-height);
    font-size: var(--n-font-size);
    transition: color .3s var(--n-bezier);
}
.n-result .n-result-header .n-result-header__title {
    margin-top: 16px;
    font-weight: var(--n-title-font-weight);
    transition: color .3s var(--n-bezier);
    text-align: center;
    color: var(--n-title-text-color);
    font-size: var(--n-title-font-size);
}
.n-result .n-result-header .n-result-header__description {
    margin-top: 4px;
    text-align: center;
    font-size: var(--n-font-size);
}
.n-result .n-result-footer {
    margin-top: 24px;
    text-align: center;
}
</style>
<template>
  <div id="layout404">
    <Row type="flex" justify="center">
      <div
        class="n-result"
        style="
          --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
          --n-font-size: 14px;
          --n-icon-size: 80px;
          --n-line-height: 1.6;
          --n-text-color: rgb(51, 54, 57);
          --n-title-font-size: 32px;
          --n-title-font-weight: 500;
          --n-title-text-color: rgb(31, 34, 37);
        "
      >
        <div class="n-result-header">
          <div class="n-result-header__title">404 资源不存在</div>
          <div class="n-result-header__description">可能问题：页面已升级、访问了不存在的链接、安全模式限制</div>
        </div>
        <!---->
        <div class="n-result-footer">
            <Button to="/">前往首页</Button>
        </div>
      </div>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  name: "NotFound",
  components: {},
  data() {
    return {};
  },
  filters: {},
  methods: {},
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
