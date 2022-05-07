<template>
  <Modal
    :value="status"
    :styles="{ border: '1px solid #dcdee2' }"
    fullscreen
    footer-hide
    @on-visible-change="close"
  >
    <div id="detail" v-if="status">
      <p slot="header" style="text-align: center">
        <font v-html="data.title" style="font-size: 14px">无</font>
      </p>
      <Row type="flex" justify="center" style="margin-bottom: 30px">
        <i-col
          class="msks"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="15"
          :xxl="15"
        >
          <Row type="flex" justify="center">
            <i-col class="msks" :xs="24" :sm="17" :md="17" :lg="17">
              <Card style="">
                <div class="b_img_div">
                  <div class="detailheadimgdiv">
                    <img
                      v-if="data.headimg"
                      class="detailheadimg"
                      :src="data.headimg.bimg"
                    />
                  </div>
                </div>
              </Card>
            </i-col>
            <i-col class="msks" :xs="24" :sm="7" :md="7" :lg="7">
              <List :split="false" size="small" style="margin: 12px">
                <ListItem
                  ><div>
                    <span style="font-weight: 700">{{translateTitle("识别码")}}: </span>
                    <font v-html="data.code" style="font-size: 14px">无</font>
                  </div></ListItem
                >
                <ListItem
                  ><div>
                    <span style="font-weight: 700">{{translateTitle("发布日期")}}: </span>
                    {{ formatTime(data.rdate, "yyyy-MM-dd") }}
                  </div></ListItem
                > 
                <ListItem
                  ><div>
                    <span style="font-weight: 700">{{translateTitle("视频时间")}}: </span>
                    {{ data.length }} {{translateTitle("分钟")}}
                  </div></ListItem
                >
                <ListItem
                  ><div>
                    <span style="font-weight: 700">{{translateTitle("所处分类")}}: </span>
                    <Tag
                      v-for="(item, genreindex) in data.avgenre"
                      :key="genreindex"
                      color="primary"
                      >{{ item.name }}</Tag
                    >
                  </div></ListItem
                >
                <ListItem
                  ><div>
                    <span style="font-weight: 700">{{translateTitle("相关演员")}}: </span>
                    <Tag
                      v-for="(item, actressindex) in data.avactress"
                      :key="actressindex"
                      color="primary"
                      >{{ item.actname }}</Tag
                    >
                  </div></ListItem
                >
              </List>
            </i-col>
          </Row>
        </i-col>
      </Row>
      <Row id="simgid" type="flex" justify="center" :gutter="12">
        <i-col
          v-for="(item, index) in data.detailimg"
          :key="index"
          style="margin-bottom: 10px"
        >
          <div>
            <div class="detailsimg" @click="previewImg(index)">
              <!-- <img
              :src="item.s_img_source"
              :large="item.b_img_source"
              preview="1"
              :preview-text="detail.orginal_title"
            /> -->
              <img :src="item.simg" :large="item.bimg" />
            </div>
          </div>
        </i-col>
      </Row>
    </div> 
  </Modal>
</template>

<script>
import { formatTime } from "@/utils/format";
import { translateTitle } from "@/utils/i18n";
export default {
  name: "MovieDetail",
  components: {},
  props: {
    // moviedetailstatus: Boolean,
  },
  data() {
    return {
      status: false,
      data: {},
    };
  },
  computed: {},
  methods: {
    formatTime,
    translateTitle,
    previewImg(index) {
      console.log(index);
      var urlData = this.data.detailimg
        .map((item) => {
          return item.bimg;
        })
        .join(",")
        .split(",");
      console.log(urlData);
      this.$hevueImgPreview({
        multiple: true,
        closeBtn: false,
        clickMaskCLose: true,
        nowImgIndex: index,
        imgList: urlData,
      });
    },
    show(data) {
      this.data = data;
      this.status = true;
      console.log("添加回退监听");
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", () => {
        this.status = false;
      });
    },
    close(val) {
      if (!val) {
        this.data = {};
        this.status = false;
        console.log("移除回退监听");
        window.removeEventListener("popstate", () => {
          this.status = false;
        });
      }
    },
  },
};
</script>

<style>
.detailsimg {
  /* width: 140px; */
  overflow: hidden;
  cursor: pointer;
}
.b_img_div {
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
.vertical-center-modal .ivu-modal-content {
  background: transparent;
  background-color: unset;
  box-shadow: unset;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.detailheadimg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.detailheadimgdiv {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
#simgid .ivu-card-body {
  padding: 2px;
}
#detail .ivu-card-body {
  padding: 10px;
}
#detail .ivu-card-bordered {
  background: none;
  border: none;
}
/* #detail .ivu-card:hover {
  -webkit-box-shadow: none;
  -ms-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
} */
#detail .ivu-card-body {
  padding: 9px;
}
</style>
