<style scoped>
.ivu-list-item span {
  font-weight: 700;
}
</style>
<template>
  <Card class="TabCard Card-theme-dark" style="margin-bottom: 20px">
    <p slot="title" style="height: 24px">
      <Tag style="background: var(--theme-color)" color="primary">{{
        translateTitle(Tagvalue)
      }}</Tag>
      <font v-html="data.name" style="font-size: 14px"></font>
      <span v-if="data.name_zh">
        (<font v-html="data.name_zh" style="font-size: 14px"></font>)</span
      >
    </p>
    <a v-if="Jump" href="#" slot="extra" @click.prevent="goActress(data.id)">
      <Icon type="ios-loop-strong"></Icon>
      {{ translateTitle("详情") }}
    </a>
    <Row
      type="flex"
      justify="start"
      style="padding: 0px 10px 10px 10px; color: var(--txt-b-tip)"
    >
      <i-col :xs="24" :sm="6" :md="6" :lg="6">
        <div style="overflow: hidden; cursor: pointer; position: relative">
          <div style="overflow: hidden; text-align: center; margin-top: 12px">
            <img
              style="width: auto; border-radius: 4px; max-width: 158px"
              :src="data.img"
            />
            <div
              style="position: absolute; bottom: 10px; right: 10px; z-index: 8"
            ></div>
          </div>
        </div>
      </i-col>

      <i-col :xs="24" :sm="18" :md="18" :lg="18">
        <List style="padding: 0 10px 10px 10px" :split="false" size="small">
          <ListItem v-if="data.otherName.length > 0">
            <div>
              <span >
                {{ translateTitle("别名") }}:
              </span>
              <Tag
                v-for="(item, avgenreindex) in data.otherName"
                :key="avgenreindex"
                color="primary"
              >
                {{ item.name }}
              </Tag>
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span> {{ translateTitle("出生日期") }}: </span>
              {{ data.birthday | formatTime("yyyy-MM-dd") }}
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span >
                {{ translateTitle("出生地") }}:
              </span>
              {{ data.birthplace ? data.birthplace : "未知" }}
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span >
                {{ translateTitle("罩杯") }}:
              </span>
              {{ data.cup ? data.cup : "未知" }}
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span >
                {{ translateTitle("三围") }}:
              </span>
              {{
                data.bust
                  ? data.bust + "/" + data.waist + "/" + data.hips
                  : "未知"
              }}
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span >
                {{ translateTitle("身高") }}:
              </span>
              {{ data.height ? data.height + translateTitle("厘米") : "未知" }}
            </div>
          </ListItem>
          <ListItem>
            <div>
              <span >
                {{ translateTitle("爱好") }}:
              </span>
              {{ data.hobby ? data.hobby : "未知" }}
            </div>
          </ListItem>
        </List>
      </i-col>
    </Row>
  </Card>
</template>

<script>
import { translateTitle } from "@/utils/i18n";

export default {
  props: {
    data: Object,
    Tagvalue: {
      type: String,
      default: "女优",
    },
    Jump: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    translateTitle,
    goActress(id) {
      let routeData = this.$router.resolve({
        path: `/jav/actress`,
        query: { id },
      });
      window.open(routeData.href, "_blank"); //打开新标签
    },
  },
  filters: {
    formatTime: function (dates, fmt) {
      if (!dates) return "未知";
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
};
</script>


