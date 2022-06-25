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
        <a href="/" :title="title" target="_blank" class="links"
          >© 2019-2022 {{ title }}
        </a>
        <a
          href="https://github.com/wanxings/magnetar-search"
          title="Github"
          target="_blank"
          ><Icon size="16" type="logo-github"
        /></a>
      </span>
      <br />
      <span v-if="token" class="footerBox">
        <a href="https://cixing.io" target="_blank">{{
          translateTitle("浏览器扩展")
        }}</a>
        -
        <a
          title="1007807225"
          href="https://jq.qq.com/?_wv=1027&amp;k=5Prj8pt"
          target="_blank"
          >{{ translateTitle("QQ群") }}</a
        >
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
    ...mapGetters("user", {
      token: "token",
    }),
  },
  methods: {
    translateTitle,
  },
};
</script>



