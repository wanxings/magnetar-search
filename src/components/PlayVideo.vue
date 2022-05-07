<template>
  <Modal :value="status" width="750" @on-visible-change="close">
    <p slot="header" style="text-align: center">
      <span>预览视频</span>
    </p>
    <div slot="footer"></div>
    <div id="dplayer" v-if="status">
      <d-player ref="player" id="player" :options="pvideooptions"></d-player>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "PlayVideo",
  components: {},
  data() {
    return {
      status: false,
      pvideooptions: {},
    };
  },
  methods: {
    play(video) {
      console.log(video)
      this.status = true;
      this.pvideooptions = {
        container: document.getElementById("player"), //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        lang: "zh-cn",
        loop: false, // 是否自动循环
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.01, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        video: {
          quality: [
            {
              name: "720p",
              url: video.dmb,
              type: "auto",
            },
          ],
          defaultQuality: 0, // 默认是720p高清
        },
        contextmenu: [
          {
            text: "Magnetar",
            link: "https://magnetar.cc",
          },
        ],
      };
    },
    close(val) {
      if (!val) {
        console.log("关闭播放器");
        this.status = false;
        this.pvideooptions = {};
      }
      // this.$emit("closePlayer", val);
    },
  },
  mounted: function () {},
};
</script>

<style>
</style>
