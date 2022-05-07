<style scoped>
</style> 
<template>
  <div id="tips">
    <Modal v-model="tipStatus" width="360" @on-visible-change="changeTips">
      <p slot="header" style="color: #19be6b; text-align: center">
        <span>网站公告</span>
      </p>
      <div style="">
        <p>
          搜索少于10个结果时可使用聚合搜索,
          聚合搜索使用频率限制为3次/分钟,
          如果有优质的BT搜索网站(cf5秒盾或访问需要验证码的除外)、网站bug、建议添加的功能等可在网站底部 建议反馈
          处提交。
        </p>
        <Checkbox style="margin-top: 10px" v-model="showAgain"
          >网站下次更新前不再显示此公告</Checkbox
        >
      </div>
      <div slot="footer">
        <Button size="large" long @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getTips, setTips } from "@/utils/app";
export default {
  data() {
    return {
      tipStatus: false,
      showAgain: true,
    };
  },
  created() {
    if (getTips()) this.tipStatus = true;
  },
  methods: {
    close() {
      this.tipStatus = false;
    },
    changeTips(val) {
      if (!val && this.showAgain) setTips(false);
    },
  },
};
</script>



