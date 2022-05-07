<style>
.imageEngineblock {
  background: none;
  display: flex;
  flex: 0 0 auto;
}
.searchThumbnail {
  background: #d9e7fe;
  border: 1px solid #9cb0d8;
  border-radius: 24px;
  color: #444;
  display: flex;
  margin: 1px;
  outline: none;
  overflow: hidden;
  padding-left: 14px;
}
.searchThumbnail img {
  flex: 0 0 auto;
  align-self: center;
  object-fit: cover;
}
.file_text {
  font-size: 13px;
  font-weight: bold;
  margin: auto;
  padding-left: 4px;
  padding-right: 21px;
}
.deleteImage {
  flex: 1;
  align-self: center;
  padding: 0 7px;
  color: #aeb8cb;
  cursor: pointer;
  font: 21px arial, sans-serif;
  line-height: inherit;
}
.minidiv .gsfi{
    height: 34px !important;
    margin: 10px 0 0 !important;
    box-shadow: none !important;
    border: 1px solid var(--search-input-border-color) !important;
    border-radius: 16px !important;
}
.minidiv .gLFyf input{
    height: 32px !important;
    border-radius: 16px !important;
    font-size: 14px !important;
}
.minidiv  i{
    font-size: 20px !important;
    height: 34px !important;
    line-height: 34px !important;
}
.minidiv .slogo img {
    margin: 12px auto !important;
}
</style>
<template>
  <div id="searchfix">
    <i-input
      size="large"
      class="gLFyf gsfi"
      v-model="inputKeyword"
      :disabled="imageEngine"
      :placeholder="imageSearchTip"
      @on-enter="search"
    >
      <div
        v-if="imageEngine && imageQuery.id"
        slot="prefix"
        class="imageEngineblock"
      >
        <a class="searchThumbnail"
          ><img
            :alt="imageQuery.file"
            height="42"
            :src="imageQuery.src"
            width="auto"
            data-atf="1"
            data-frt="0"
          />
          <div class="file_text">{{ imageQuery.file }}</div>
        </a>
      </div>

      <Icon
        title="上传图片"
        @click="showUploadpane"
        type="md-qr-scanner"
        slot="suffix"
      />
      <Icon title="搜索" @click="search" type="ios-search" slot="suffix" />
    </i-input>
    <Modal v-model="modalstatus" width="360" id="uploadpane">
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
          <Icon type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
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
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Message } from "view-design";
import { baseURL, version } from "@/config";
export default {
  name: "SearchFix",
  components: {},
  data() {
    return {
      UploadImageFormatList: ["png", "jpg", "jpeg"],
      UploadImageAction: `${baseURL}/search/${version}/image/uploadSearchimg`,
    };
  },
  computed: {
    ...mapGetters("app", {
      // title: "title",
      language: "language",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
      imageQuery: "imageQuery",
      uploadImageModalStatus: "uploadImageModalStatus",
    }),
    modalstatus: {
      get() {
        return this.uploadImageModalStatus;
      },
      set(val) {
        this.set_uploadImageModalStatus(val);
      },
    },
    headers() {
      return { token: this.token };
    },
    imageEngine() {
      return this.$route.name == "image" ? true : false;
    },
    imageSearchTip() {
      return !this.imageQuery.id && this.$route.name == "image"
        ? this.translateTitle("上传图片进行搜索")
        : "";
    },
    inputKeyword: {
      get() {
        // return this.$route.name == "image" ? "" : this.keyword;
        return this.keyword;
      },
      set(val) {
        // this.$route.name == "image" ? true : this.set_keyword(val);
        this.set_keyword(val);
      },
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("search", {
      sugrec: "sugrec",
    }),
    ...mapMutations("search", {
      set_keyword: "set_keyword",
      set_imageQuery: "set_imageQuery",
      set_uploadImageModalStatus: "set_uploadImageModalStatus",
    }),
    translateTitle,
    handleScroll() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.width = window.innerWidth;
      if (this.scroll > 99 && this.width > 992) {
        document.getElementById("searchTop").style =
          "position: fixed;top: 0px;width: 100%;background-color: var(--w-alpha-90);z-index: 999;margin-top: 0px;height: 52px;box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);}";
        // document.getElementsByClassName("searchmini").style = "top: 0px";
        // document.getElementsByClassName("searchmini").style.position = "fixed";
        document.getElementById("searchTop").classList.add("minidiv");
      } else {
        document.getElementById("searchTop").style = "";
        document.getElementById("searchTop").classList.remove("minidiv");
      }
    },
    uploadsuccess(response, file) {
      console.log("imageUploadsuccess:%o", file);
      switch (response.code) {
        case 0:
          this.set_imageQuery({
            id: response.data.id,
            src: response.data.src,
            file: response.data.file,
          });
          this.set_uploadImageModalStatus(false);
          this.$emit("searchImage");
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
    showUploadpane() {
      if (!this.token) {
        Message.error({
          content: this.translateTitle("无权限"),
          duration: 5,
        });
      } else {
        this.set_uploadImageModalStatus(true);
      }
    },
    remotedownload(value) {
      console.log(value);
    },
    entersearch() {
      this.search();
    },
    search() {
      this.$emit("search");
    },
  },
};
</script>
<style >
#searchfix .ivu-input-suffix {
  width: 82px;
}
#searchfix .ivu-input-prefix,
.ivu-input-suffix {
  width: auto;
}
#searchfix .ivu-icon {
  cursor: pointer;
  font-size: 23px;
  height: 43px;
  line-height: 46px;
  padding: 0 4px;
  right: 6px;
  color: var(--theme-color);
}
#uploadpane .ivu-modal-footer {
  border: none;
}
#uploadpane .ivu-modal-body {
  padding: 20px;
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

#searchfix .ivu-input-large {
  font-size: 16px;
  padding: 6px 95px 6px 18px;
  height: 46px;
  border-radius: 22px;
}
#searchfix .ivu-input {
  background-color: var(--theme-searchFix-background-color);
  border-color: var(--search-input-border-color);
  color: var(--txt-b-tip);
  border: none;
  box-shadow: 0px 2px 5px 0px rgb(60 64 67 / 16%);
}
#searchfix .ivu-input:hover {
  box-shadow: var(--theme-searchFix-box-shadow-hover);
  border-color: rgba(223, 225, 229, 0);
}
.ivu-upload-drag {
  background: transparent;
}
@media screen and (max-width: 996px) {
  .search-col {
    max-width: none;
  }
  #searchfix .ivu-icon {
    height: 43px;
    line-height: 43px;
  }
  #searchfix .ivu-input-large {
    height: 43px;
  }
}
</style>
