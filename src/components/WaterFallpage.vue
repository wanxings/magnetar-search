<template>
  <Waterfall
    :list="videodata"
    :gutter="1"
    :width="140"
    backgroundColor="rgba(73, 74, 95,0)"
    :breakpoints="{

      800: {
        rowPerView: 4,
      },
      500: {
        rowPerView: 2,
      },
    }"
    animationEffect="fadeIn"
    ref="waterfall"
  >
    <template slot="item" slot-scope="props">
      <Card>
        <div
          class="previewcard"
          @click="showdetail(props.data.id, props.data.code)"
        >
          <div class="cover">
            <img
              v-lazy="props.data.headimg.simg"
              alt
              @load="$refs.waterfall.refresh()"
            />
            <div
              style="
                position: fixed;
                bottom: 80px;
                right: 10px;
                z-index: 8;
              "
            ><i-button v-if="props.data.pvideo" @click="showplayvideo($event,props.data.pvideo)" size="small" icon="ios-play"></i-button>
            </div>
          </div>
          <dl>
            <dd>{{ props.data.code }}</dd>
            <dt :title="props.data.title" style="">{{ props.data.title }}</dt>
            <dt>{{ props.data.rdate | formatTime("yyyy-MM-dd") }}</dt>
          </dl>
        </div>
      </Card>
    </template>
  </Waterfall>
</template>

<script>
import Waterfall from "vue-waterfall-plugin";
export default {
  components: {
    Waterfall,
  },
  props: {
    videodata: Array,
    prefix: String,
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
    showdetail(id, code) {
      this.$emit("showdetail", id, code);
    },
    showplayvideo(e,pvideo){
      e.stopPropagation();//阻止冒泡
      this.$emit("showplayvideo", pvideo);
    }
  },
};
</script>

<style>
.previewcard {
  text-align: center;
  height: auto;
  color: var(--txt-b-pure);
}
.previewcard dt {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 92%;
}
.cover {
  padding: 0 0 10px 0;
  color: var(--txt-b-pure);
}
.cover img {
  display: block;
  width: 100%;
  border-radius: 5px;
}
</style>
