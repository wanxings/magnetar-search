<template>
  <div class="layout" id="1">
    <Layout>
      <Header>
        <a aria-label="必应" href="/" h="ID=SERP,5035.1"
          ><img
            id="vs_bing_logo"
            role="presentation"
            alt="必应"
            class="rms_img"
            src="/logo.png"
            data-bm="6"
        /></a>
        <div id="vs_header_title">
          <a href="/visualsearch" h="ID=SERP,5037.1">人脸识别</a>
        </div>
        <HeaderTool />
      </Header>
      <Content>
        <Row type="flex" justify="center">
          <i-col :xs="{ span: 24 }" :lg="{ span: 12 }">
            <Upload
              type="drag"
              :action="faceimguploadlink"
              :show-upload-list="false"
              :format="formatlist"
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
                  {{ translateTitle("点击选择、拖拽图片到此处") }}
                </p>
                <p>
                  {{ translateTitle("— 或 —") }}
                </p>
              </div>
            </Upload>
            <Input search enter-button="识别" placeholder="远程图片地址" />
          </i-col>
        </Row>
        <Row type="flex" justify="center">
          <i-col :xs="{ span: 24 }" :lg="{ span: 16 }">
            <Card style="">
              <div style="text-align: center">
                <div v-for="(item, index) in uploadlist" :key="index">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                  </template>
                </div>
              </div>
            </Card>
          </i-col>
        </Row>
        <Row type="flex" justify="center">
          <i-col :xs="{ span: 24 }" :lg="{ span: 16 }">
            <Card style="">
              <p slot="title">模型预测为 ： {{ acname }}</p>
              <div style="text-align: center">
                <img :src="headimg" />
                <h3>女优资料</h3>
              </div>
            </Card>
          </i-col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTool from "@/components/HeaderTool.vue";
import { translateTitle } from "@/utils/i18n";
import API from "@/api/api_list";
export default {
  name: "Facesearch",
  components: {
    HeaderTool,
  },
  data() {
    return {
      acname: "",
      headimg: "",
      uploadlist: [],
      formatlist: ["png", "jpg", "jpeg"],
      faceuploadstatus: false,
      faceimguploadlink: API.API_BT_Faceimglink,
    };
  },
  computed: {},

  methods: {
    translateTitle,
    initdata() {},
    uploadsuccess(response) {
      // this.uploadlist = fileList
      // console.log(file)
      // console.log(fileList)
      switch (response.code) {
        case 200:
          // this.$Message.success({
          //   content: translateTitle("上传成功"),
          //   duration: 5,
          // });
          this.acname = response.data.predata;
          this.headimg = response.data.imgsrc;
          // this.conversionmagnet = response.data;
          break;
        case 500:
          this.$Message.error({
            content: response.msg,
            duration: 5,
          });
          break;
      }

      console.log(response);
    },
    uploaderror(error) {
      this.$Message.error({
        content: error,
        duration: 5,
      });
    },
    formaterror(file) {
      console.log(file);
      this.$Message.error({
        content: translateTitle("仅支持后缀为jpg、png格式的图片"),
        duration: 5,
      });
    },
    exceedederror(file) {
      console.log(file);
      this.$Message.error({
        content: translateTitle("图片不能大于5MB"),
        duration: 5,
      });
    },
  },
};
</script>
<style>
#vs_header_title {
  float: left;
  font-size: 18px;
  line-height: 70px;
  cursor: pointer;
}
#vs_bing_logo {
  float: left;
  height: 30px;
  margin: 20px 9px 20px 60px;
}
</style>
