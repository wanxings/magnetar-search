<style>
#uploadpane {
  min-width: 375px;
  min-height: 600px;
  margin-top: 10%;
}
#uploadpane {
  text-align: center;
}
#uploadpane .sbitit {
  font-size: 16px;
  margin-bottom: 4px;
}
#uploadpane .sbisubtit {
  margin-bottom: 4px;
}
.n-result {
  color: var(--n-text-color);
  line-height: var(--n-line-height);
  font-size: var(--n-font-size);
  transition: color 0.3s var(--n-bezier);
}
.n-result .n-result-header .n-result-header__title {
  margin-top: 16px;
  font-weight: var(--n-title-font-weight);
  transition: color 0.3s var(--n-bezier);
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
  <div id="uploadpane">
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
        <div class="sbitit">{{ translateTitle("图像搜索") }}</div>
        <div class="sbisubtit">
          {{ translateTitle("使用图像进行搜索，识别女优或者番号") }}
        </div>
        <Upload
          type="drag"
          :action="UploadImageAction"
          :headers="headers"
          :show-upload-list="true"
          :format="UploadImageFormatList"
          accept="image/png, image/jpeg"
          :max-size="5120"
          :on-error="uploaderror"
          :on-success="uploadsuccess"
          :on-format-error="formaterror"
          :on-exceeded-size="exceedederror"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="30"
              style="color: #3399ff"
            ></Icon>
            <p>
              {{ translateTitle("点击选择或拖拽图片到此处") }}
            </p>
            <p>
              {{ translateTitle("— 或 —") }}
            </p>
          </div>
        </Upload>
        <i-input
          search
          disabled
          :enter-button="translateTitle('搜索')"
          :placeholder="translateTitle('远程图片链接')"
          @on-search="remotedownload"
        />
      </div>
    </Row>
  </div>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";
import { baseURL, version } from "@/config";
import { Message } from "view-design";
export default {
  name: "UploadImage",
  components: {},
  data() {
    return {
      UploadImageFormatList: ["png", "jpg", "jpeg"],
      UploadImageAction: `${baseURL}/search/${version}/image/uploadSearchimg`,
    };
  },
  computed: {
    ...mapGetters("user", {
      token: "token",
    }),
    headers() {
      return { token: this.token };
    },
  },
  filters: {},
  methods: {
    translateTitle,
    uploadsuccess(response, file) {
      console.log("imageUploadsuccess:%o", file);
      switch (response.code) {
        case 0:
          this.$router.push({
            path: "/image/search",
            query: { imageId: response.data.id },
          });
          break;
        case 500:
          Message.error({
            content: response.msg,
            duration: 5,
          });
          break;
      }

      console.log(response);
    },
    uploaderror() {
      Message.error({
        content: this.translateTitle("服务器异常"),
        duration: 5,
      });
    },
    formaterror(file) {
      console.log(file);
      Message.error({
        content: translateTitle("仅支持后缀为jpg、png格式的图片"),
        duration: 5,
      });
    },
    exceedederror(file) {
      console.log(file);
      Message.error({
        content: translateTitle("图片不能大于5MB"),
        duration: 5,
      });
    },
    remotedownload(value) {
      console.log(value);
    },
  },
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
