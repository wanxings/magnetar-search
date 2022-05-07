<template>
  <div>
    <div class="tabs" id="sort">
      <Row >
        <i-col :xs="{ span: 24 }" :lg="{ span: 20, offset: 2 }">
          <Tabs
            @on-click="changeclassification"
            :value="javparamet.t"
            size="small"
            :animated="false"
          >
            <TabPane label="有码" name="censored"></TabPane>
            <TabPane label="无码" name="uncensored"></TabPane>
            <TabPane label="FC2" name="fc2"></TabPane>
          </Tabs>
        </i-col>
      </Row>
    </div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12, offset: 2 }">
        <!-- <div
          style="
            line-height: 43px;
            font-size: 13px;
            padding-left: 16px;
            color: #70757a;
            float: left;
          "
        ><Icon type="md-photos" />
          找到 {{ counts }} 条结果
          <nobr>( {{ stimes }} 秒)&nbsp;</nobr>
        </div> -->
        <!-- <Select<Icon type="md-code" />
          style="padding: 11px 0px 0px 10px"
          @on-change="changesorts"
          placeholder="排序类型"
          size="small"
          :value="sorts"
        >
          <Option
            v-for="item in selectType"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select> -->
        日期：
        <DatePicker
          @on-change="changedate"
          size="small"
          type="month"
          :value="javparamet.d | vardate"
          format="yyyy年MM月"
          placeholder="发行日期"
          style="width: 130px; line-height: 43px; "
        ></DatePicker>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      javparamet: "jav/javparamet",
    }),
  },
  filters: {
    vardate: function (value) {
      if (value.length === 6) {
        return value.slice(0, 4) + "-" + value.slice(4);
      } else {
        return value;
      }
    },
  },
  methods: {
    changeclassification(val) {
      this.$emit("changeclassification", val);
    },
    changesorts(val) {
      this.$emit("changesorts", val);
    },
    changedate(val) {
      let newdate = val.replace("年", "").replace("月", "");
      this.$emit("changedate", newdate);
    },
  },
};
</script>
<style>
.ivu-tabs-bar {
  margin-bottom: 1px;
}

#sort .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  font-size: 16px;
}
.ivu-icon-ios-browsers-outline {
  font-weight: bold;
}
#sort .ivu-tabs-nav .ivu-tabs-tab-active {
  color: var(--theme-color);
}
#sort .ivu-tabs-nav {
  color: var(--txt-b-pure);
}
#sort .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: var(--theme-color);
}

.tabs {
  margin-top: 10px;
}
#sort .ivu-tabs-ink-bar {
  background-color: var(--theme-color);
}
.ivu-tabs-mini .ivu-tabs-tab {
  color: #5f6368;
  font-size: 13px;
}
.ivu-tabs-bar {
  border-bottom: none;
}
</style>
<style>
.ivu-select-dropdown {
  max-height: 230px;
}
.ivu-select-selection {
  background-color: transparent;
  border: none;
}
.ivu-select {
  width: auto;
}
.ivu-select-visible .ivu-select-selection {
  border: none;
  box-shadow: none;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  color: #70757a;
}
.ivu-select-arrow {
  color: #70757a;
}
.ivu-select-dropdown {
  background-color: var(--w-alpha-90);
}
.ivu-select-item:hover {
  background: var(--b-alpha-5);
}
.ivu-select-item {
  color: #70757a;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 13px;
  color: #70757a;
}
.ivu-select-item {
  font-size: 13px !important;
  color: #70757a;
}
.ivu-select-item-focus {
  background: var(--b-alpha-10);
}
</style>
