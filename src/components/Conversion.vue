<template>
  <Tooltip :content="translateTitle('磁力链种子互转')" placement="left">
    <span class="btnBox_span" @click="conversionstatus = true"
      ><Icon size="24" type="md-swap"
    /></span>
    <Modal
      v-model="conversionstatus"
      @on-visible-change="initdata"
      width="360"
      :mask-closable="false"
      id="settings"
    >
      <p slot="header" style="text-align: center">
        <span>{{ translateTitle("转换工具") }}</span>
      </p>
      <div>
        <Tabs>
          <TabPane :label="translateTitle('磁力链转种子')" name="1">
            <Card class="conversion-card">
              <div style="text-align: center">
                <Row style="">
                  <Input
                    v-model="magnet"
                    type="textarea"
                    :rows="4"
                    :placeholder="translateTitle('磁力链接或者40位哈希值')"
                  />
                </Row>
                <Row>
                  <div style="margin-top: 5px">
                    <Button @click="getseed">{{
                      translateTitle("获取种子文件")
                    }}</Button>
                  </div>
                </Row>
              </div>
            </Card>
          </TabPane>
          <TabPane :label="translateTitle('种子转磁力链')" name="2">
            <Card class="conversion-card">
              <div style="text-align: center">
                <Row style="">
                  <Upload
                    type="drag"
                    :action="torronuploadlink"
                    :show-upload-list="false"
                    :format="formatlist"
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
                        {{ translateTitle("点击选择或者拖拽种子文件到此处") }}
                      </p>
                    </div>
                  </Upload>
                </Row>
                <Row v-if="conversionmagnet">
                  <Input v-model="conversionmagnet" type="textarea" />
                  <div style="margin-top: 5px">
                    <Button @click="copylink">{{
                      translateTitle("点击复制链接")
                    }}</Button>
                  </div>
                </Row>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer"></div>
    </Modal>
  </Tooltip>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { baseURL, version } from "@/config";
import { mapActions } from "vuex";

export default {
  props: [""],
  components: {},
  data() {
    return {
      conversionstatus: false,
      conversionmagnet: "",
      magnet: "",
      formatlist: ["torrent"],
      torronuploadlink:
        baseURL + "/tool/" + version + ".conversionbt/seedtolink",
    };
  },
  computed: {},
  methods: {
    translateTitle,
    ...mapActions({
      hashToSeed: "search/hashToSeed",
    }),
    getseed() {
      var reg = new RegExp(
        /(^magnet:\?xt=urn:btih:|^)([0-9a-fA-F]{40})(&.*|$)/
      );
      console.log();
      if (reg.test(this.magnet)) {
        this.hashToSeed(this.magnet.match(reg)[2])
          .then((data) => {
            window.open(data);
          })
          .catch((err) => {
            this.$Message.error({
              content: err,
              background: true,
            });
          });
      } else {
        this.$Message.error({
          content: translateTitle("无效的磁力链或者哈希值"),
          duration: 5,
        });
      }
    },
    initdata(status) {
      if (!status) {
        this.magnet = "";
        this.conversionmagnet = "";
      }
    },
    copylink() {
      this.$copyText(this.conversionmagnet).then(
        () => {
          this.$Message.success({
            content: translateTitle("已复制到粘贴板"),
            background: true,
          });
        },
        () => {
          this.$Message.error({
            content: `${translateTitle(
              "复制失败，可能浏览器不支持该功能，请手动复制"
            )}${this.conversionmagnet}`,
            background: true,
            duration:10,
          });
        }
      );
    },
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
        content: translateTitle("无效的种子文件"),
        duration: 5,
      });
    },
    exceedederror(file) {
      console.log(file);
      this.$Message.error({
        content: translateTitle("种子文件大于5MB"),
        duration: 5,
      });
    },
  },
};
</script>
<style>
.conversion-card {
  height: auto;
  color: var(--txt-b-tip);
  max-width: 368px;
  border: none !important;
  background: none;
  border-radius: 4px;
  box-shadow: unset !important;
}
.conversion-card .ivu-upload-drag {
  background: none;
}
.conversion-card .ivu-input {
  background: none;
}
</style>
