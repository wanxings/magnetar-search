<template>
  <Tooltip :content="translateTitle('女优人脸识别')" placement="left">
    <span class="btnBox_span" @click="faceuploadstatus = true"
      ><Icon size="24" type="md-camera"
    /></span>
    <Modal
      v-model="faceuploadstatus"
      @on-visible-change="initdata"
      width="360"
      :mask-closable="false"
      id="settings"
    >
      <p slot="header" style="text-align: center">
        <span>{{ translateTitle("女优人脸识别") }}</span>
      </p>
      <div>
        <Card class="conversion-card">
          <div style="text-align: center">
            <Row style="">
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
                    {{ translateTitle("点击选择或者拖拽图片到此处") }}
                  </p>
                </div>
                
              </Upload>
            </Row>
            <Row v-if="conversionmagnet">
                  <Input v-model="conversionmagnet" type="textarea" placeholder=""/>
                  <div style="margin-top: 5px">
                    <Button @click="copylink">{{
                      translateTitle("远程")
                    }}</Button>
                  </div>
                </Row>
          </div>
        </Card>
      </div>
      <div slot="footer"></div>
    </Modal>
  </Tooltip>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import API from "@/api/api_list";
export default {
  props: [""],
  components: {},
  data() {
    return {
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
      switch (response.code) {
        case 200:
          this.$Message.success({
            content: translateTitle("上传成功"),
            duration: 5,
          });
          this.conversionmagnet = response.data;
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
</style>
