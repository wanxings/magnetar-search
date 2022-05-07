<template>
  <div id="detail" v-if="detailData.headimg">
    <p slot="header" style="text-align: center">
      
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
                <div style="overflow: hidden">
                  <img v-if="detailData.headimg" class="simg" :src="detailData.headimg.bimg" />
                </div>
              </div>
            </Card>
          </i-col>
          <i-col class="msks" :xs="24" :sm="7" :md="7" :lg="7">
            <List :split="false" size="small" style="margin: 12px">
              <ListItem><div><span style="font-weight: 700;">{{translateTitle("标题")}}: </span>{{ detailData.title }} </div></ListItem>
              <ListItem><div><span style="font-weight: 700;">{{translateTitle("识别码")}}: </span>{{ detailData.code }} </div></ListItem>
              <ListItem
                ><div>
                  <span style="font-weight: 700">{{translateTitle("发布日期")}}: </span>
                  {{ formatTime(detailData.rdate, "yyyy-MM-dd")}}
                </div></ListItem
              >
              <ListItem
                ><div>
                  <span style="font-weight: 700">{{translateTitle("视频时间")}}: </span>
                  {{ detailData.length }} {{translateTitle("分钟")}}
                </div></ListItem
              >
              <ListItem
                ><div>
                  <span style="font-weight: 700">{{translateTitle("所处分类")}}: </span>
                  <Tag 
                  v-for="(item, genreindex) in detailData.avgenre"
                  :key="genreindex" color="primary">{{item.name}}</Tag>
                </div></ListItem
              >
              <ListItem
                ><div>
                  <span style="font-weight: 700">{{translateTitle("相关演员")}}: </span>
                  <Tag 
                  v-for="(item, actressindex) in detailData.avactress"
                  :key="actressindex" color="primary">{{item.actname}}</Tag>
                  
                </div></ListItem
              >
  
            </List>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <Row id="simgid" type="flex" justify="center" :gutter="12">
      <i-col
        v-for="(item, index) in detailData.detailimg"
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
    <Row id="searchid" type="flex" justify="center" :gutter="12">
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <div v-for="(item, index) in dhtdata" :key="index">
          <Cards v-bind:infodata="item"></Cards>
        </div>
      </i-col>
    </Row>
  </div>
</template>
 
<script>
import Cards from "@/components/Cards.vue";
import { translateTitle } from "@/utils/i18n";
import { formatTime } from "@/utils/format";
export default {
  name: "VideoDetail",
  components: {
    Cards,
  },
  props: {
    detailData: Object,
    dhtdata: Array
  },
  filters: {
    formatTime: function (dates, fmt) {
      var date = new Date(dates);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    },
  },
  methods: {
    translateTitle,
    formatTime,
    previewImg(index) {
      console.log(index);
      var urlData = this.detailData.detailimg
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
#simgid .ivu-card-body {
  padding: 2px;
}
#searchid .ivu-card-head {
  padding: 7px 10px;
  border: none;
}

#searchid .ivu-card-body {
  padding: 0px;
}

#searchid .ivu-card-head p,
.ivu-card-head-inner {
  color: var(--txt-b-pure);
}

#searchid .ivu-collapse-simple {
  background-color: transparent;
}

#searchid .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i {
  margin-right: 0px;
  color: var(--theme-color) !important;
}
#searchid .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  color: var(--txt-b-pure);
  height: 41px;
  line-height: 41px;
  padding-left: 10px;
}

#searchid .ivu-collapse {
  border: none;
}

#searchid .ivu-collapse-content {
  background-color: transparent;
}

#searchid .ivu-spin-fix {
  background-color: transparent;
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
