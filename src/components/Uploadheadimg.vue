<template>
  <Modal v-model="status" @on-visible-change="initdata">
    <p slot="header" style="text-align: center"><span>修改头像</span></p>
    <div style="width: auto">
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="24" style="text-align: center">
          <div
            class="show-preview"
            style="
              border-radius: 50%;
              width: 100px;
              height: 100px;
              overflow: hidden;
              margin: 0 auto;
            "
          >
            <img v-if="!isselect" :src="previews.url" :style="previews.img" />
            <img v-if="isselect" :src="userheadimg" />
          </div>
        </i-col>
      </Row>
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="24" style="text-align: center; margin-top: 10px">
          <Button size="small" @click="selects">选择图片</Button>

          <ButtonGroup v-if="!isselect">
            <Button
              size="small"
              @click="changeScale(2)"
              title="放大"
              icon="md-add"
            ></Button>
            <Button
              size="small"
              @click="changeScale(-2)"
              title="缩小"
              icon="md-remove"
            ></Button>
            <Button
              size="small"
              @click="rotateRight"
              title="左旋转"
              icon="md-return-left"
            ></Button>
            <Button
              size="small"
              @click="rotateLeft"
              title="右旋转"
              icon="md-return-right"
            ></Button>
          </ButtonGroup>
        </i-col>
      </Row>

      <input
        ref="filesdom"
        type="file"
        id="uploads"
        :value="imgFile"
        style="position: absolute; clip: rect(0 0 0 0)"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="22" style="text-align: center; margin-top: 10px">
          <div v-if="!isselect" class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vueCropper>
          </div>
        </i-col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" long @click="finish('blob')"
        >保存设置</Button
      >
    </div>
  </Modal>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { mapState } from "vuex";
import { Message } from "view-design";
export default {
  name: "Uploadheadimg",

  data() {
    return {
      status: false,
      isselect: true,
      headImg: "", //剪切图片上传
      userheadimg: "",
      crap: false,
      previews: {},

      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        canScale: true, //图片是否允许滚轮缩放
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        outputType: "png", //输出图片格式
        canMove: true, //能否拖动图片
        original: false, //上传图片是否显示原始宽高
        canMoveBox: true, //能否拖动截图框
        autoCrop: true, //是否自动生成截图框
        autoCropWidth: 100, //自动生成截图框的宽高
        autoCropHeight: 100, //自动生成截图框的宽高
        centerBox: true, //截图框是否被限制在图片里面
        fixedBox: true, //截图框固定大小
      },

      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",

      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
    };
  },
  computed: {
    ...mapState("user", {
      userinfo: (state) => state.userinfo,
    }),
  },

  components: {
    VueCropper,
  },

  methods: {
    show(userheadimg) {
      this.userheadimg = userheadimg;
      this.status = true;
    },
    initdata(val) {
      if (!val) {
        this.option.img = "";
        this.isselect = true;
      }
    },
    selects() {
      this.$refs.filesdom.dispatchEvent(new MouseEvent("click"));
    },
    //放大/缩小

    changeScale(num) {
      console.log("changeScale");

      num = num || 1;

      this.$refs.cropper.changeScale(num);
    }, //坐旋转

    rotateLeft() {
      console.log("rotateLeft");

      this.$refs.cropper.rotateLeft();
    }, //右旋转

    rotateRight() {
      console.log("rotateRight");

      this.$refs.cropper.rotateRight();
    }, //上传图片（点击上传按钮）

    finish(type) {
      console.log("finish");

      let formData = new FormData(); // 输出

      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("headimg", data, "headimg.png");
          this.axios
            .post(this.$api_uploadheadimg, formData)
            .then((response) => {
              if (response.data.code == 200) {
                this.userinfo.userheadimg = response.data.userheadimg;
                this.$store.commit("user/UPDATE_STATE", {
                  userinfo: this.userinfo,
                });
                this.$store.dispatch('user/save_token_userinfo_local')
                Message.success({
                  background: true,
                  content: response.data.msg,
                });

                this.status = false;
              } else {
                Message.error({
                  background: true,
                  content: response.data.msg,
                });
              }
            });
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数

    realTime(data) {
      console.log("realTime");

      this.previews = data;
    }, //下载图片

    down(type) {
      console.log("down");
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    }, //选择本地图片
    uploadImg(e, num) {
      this.isselect = false;
      console.log("uploadImg");
      var _this = this; //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        Message.error({
          background: true,
          content: "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
        });
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      }; // 转化为base64 // reader.readAsDataURL(file) // 转化为blob

      reader.readAsArrayBuffer(file);
    },

    imgLoad(msg) {
      console.log("imgLoad");

      console.log(msg);
    },
  },
};
</script>

<style>
.show-preview {
  background: transparent;
}
.preview {
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background: #cccccc;
}
.info {
  width: 720px;
  margin: 0 auto;
}
.oper-dv {
  height: 20px;
  text-align: right;
  margin-right: 100px;
}
.oper-dv a {
  ont-weight: 500;
}

.sel-img-dv {
  position: relative;
}
.sel-file {
  position: absolute;
  width: 90px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}
.sel-btn {
  position: absolute;
  cursor: pointer;
  z-index: 1;
}
.cropper-content {
}
.cropper {
  width: 100%;
  height: 300px;
}
</style>
