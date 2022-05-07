<template>
  <span class="btnBox_span" @click="settingstatus = true"
    ><Icon
      size="24"
      type="md-settings"
      style="padding: 0 4px; line-height: 59px"
    />
    <Modal
      v-model="settingstatus"
      width="360"
      :mask-closable="false"
      id="setting"
    >
      <p slot="header" style="text-align: center">
        <span>{{ translateTitle("常规设置") }}</span>
      </p>
      <span style="color: var(--txt-b-pure); font-size: 15px">基础设置</span>
      <div
        style="
          margin: 10px 0;
          padding: 0px 16px;
          background-color: var(--b-alpha-5);
          border-radius: 5px;
        "
      >
        <List :split="false">
          <ListItem>
            {{ translateTitle("语言") }}

            <Select
              style="float: right; width: auto"
              @on-select="changeLangFn"
              size="small"
              :value="language"
              class="slider"
            >
              <Option
                v-for="item in languageitem"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </ListItem>
          <ListItem>
            {{ translateTitle("夜间模式") }}

            <i-switch
              true-color="var(--theme-color)"
              :value="darkmode == 'on' ? true : false"
              style="float: right"
              class="slider"
              @on-change="darkthemechange"
            />
          </ListItem>
          <ListItem>
            {{ translateTitle("磁力链追加Tracker") }}
            <i-switch
              :value="autotracker == 'on' ? true : false"
              @on-change="AutoTrackerChange"
              true-color="var(--theme-color)"
              style="float: right"
              class="slider"
            />
          </ListItem>
        </List>
      </div>
      <span style="color: var(--txt-b-pure); font-size: 15px">搜索偏好</span>
      <div
        style="
          margin: 10px 0;
          padding: 0px 16px;
          background-color: var(--b-alpha-5);
          border-radius: 5px;
        "
      >
        <List :split="false">
          <ListItem>
            {{ translateTitle("番号库") }}
            <i-switch
              true-color="var(--theme-color)"
              :value="searchJavlibrary == 'on' ? true : false"
              style="float: right"
              class="slider"
              @on-change="SearchJavlibraryChange"
            />
          </ListItem>
          <ListItem>
            {{ translateTitle("影视库") }}
            <i-switch
              :value="searchDoubanlibrary == 'on' ? true : false"
              @on-change="SearchDoubanlibraryChange"
              true-color="var(--theme-color)"
              style="float: right"
              class="slider"
            />
          </ListItem>
        </List>
      </div>
      <div slot="footer"></div>
    </Modal>
  </span>
</template>
<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [""],
  components: {},
  data() {
    return {
      settingstatus: false,
    };
  },
  computed: {
    ...mapGetters({
      darkmode: "app/darkmode",
      language: "app/language",
      autotracker: "app/autotracker",
      searchJavlibrary: "app/searchJavlibrary",
      searchDoubanlibrary: "app/searchDoubanlibrary",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    languageitem() {
      return [
        {
          value: "zh",
          label: "简体中文",
        },
        {
          value: "en",
          label: "English",
        },
      ];
    },
  },
  methods: {
    translateTitle,
    ...mapActions({
      changeLanguage: "app/changeLanguage",
      changeAutotracker: "app/changeAutotracker",
      changeDarkmode: "app/changeDarkmode",
      changeSearchJavlibrary: "app/changeSearchJavlibrary",
      changeSearchDoubanlibrary: "app/changeSearchDoubanlibrary",
    }),
    changeLangFn() {
      let language = localStorage.getItem("language") == "zh" ? "en" : "zh";
      this.changeLanguage(language);
      this.$i18n.locale = language;
    },
    darkthemechange(status) {
      status
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
      this.changeDarkmode(status ? "on" : "off");
    },
    AutoTrackerChange(status) {
      this.changeAutotracker(status ? "on" : "off");
    },
    SearchJavlibraryChange(status) {
      this.changeSearchJavlibrary(status ? "on" : "off");
    },
    SearchDoubanlibraryChange(status) {
      this.changeSearchDoubanlibrary(status ? "on" : "off");
    },
  },
};
</script>
<style>
.language_span {
  display: inline-block;
  line-height: 23px;
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
}
#setting .ivu-modal-header {
  border: none;
}

#setting .ivu-modal-footer {
  border: none;
}

#setting li {
  display: block;
}
</style>
