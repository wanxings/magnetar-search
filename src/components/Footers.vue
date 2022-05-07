<style scoped>
#indexfooter .ivu-layout-footer {
  background: none;
  position: fixed;
  bottom: 10px;
  left: calc(50% - 128px);
  width: 256px;
  font-size: 12px;
  text-align: center;
  padding: 0;
}
#indexfooter .ivu-layout-footer > span > a {
  color: var(--txt-b-tip);
}

.links {
  text-decoration: none;
  color: skyblue;
  cursor: pointer;
  transition: all 0.25s;
}

.footerBox {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style> 
<template>
  <div id="indexfooter">
    <Footer class="footers">
      <span class="footerBox">
        <a href="/" title="Magnetar" target="_blank" class="links"
          >© 2021 {{title}} {{ version }}</a
        >
      </span>
      <br />
      <span class="footerBox">
        <a href="https://support.qq.com/products/261083"  target="_blank">{{translateTitle("建议反馈")}}
</a>
        -
        <a href="https://cixing.io"  target="_blank">{{translateTitle("浏览器扩展")}}</a>
        -
        <a title="1007807225" href="https://jq.qq.com/?_wv=1027&amp;k=5Prj8pt"  target="_blank">{{translateTitle("QQ群")}}</a>
        <!-- <a href="/" class="links">{{translateTitle("友情链接")}}:</a> -->
      </span>
    </Footer>
  </div> 
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      version: "app/version",
      title: "app/title",
    }),
  },
  methods: {
    translateTitle,
  },
};
</script>



