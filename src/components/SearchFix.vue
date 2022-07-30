<style>
.deleteImage {
  flex: 1;
  align-self: center;
  padding: 0 7px;
  color: #aeb8cb;
  cursor: pointer;
  font: 21px arial, sans-serif;
  line-height: inherit;
}
.minidiv .gsfi {
  height: 34px !important;
  margin: 10px 0 0 !important;
  box-shadow: none !important;
  border: 1px solid var(--search-input-border-color) !important;
  border-radius: 16px !important;
}
.minidiv .gLFyf input {
  height: 32px !important;
  border-radius: 16px !important;
  font-size: 14px !important;
}
.minidiv i {
  font-size: 20px !important;
  height: 34px !important;
  line-height: 34px !important;
}
.minidiv .slogo img {
  margin: 12px auto !important;
}
.minidiv .z-select {
  padding: 6px 0px 0px 10px;
}
.z-select {
  padding: 13px 0px 0px 10px;
}
.z-select i {
  font-size: 14px !important;
}
</style>
<template>
  <div id="searchfix">
    <i-input
      ref="searchInput"
      size="large"
      class="gLFyf gsfi"
      v-model="inputKeyword"
      @on-enter="search"
    >
      <Select
        slot="prefix"
        style=""
        class="z-select"
        size="small"
        v-model="searchCategories"
      >
        <Option
          v-for="item in searchCategoriesList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <div id="zicon" slot="suffix">
        <Icon title="图像搜索" @click="showUploadpane" type="md-qr-scanner" />
        <Icon title="搜索" @click="search" type="ios-search" />
      </div>
    </i-input>
  </div>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { mapGetters, mapMutations } from "vuex";
import { Message } from "view-design";

export default {
  name: "SearchFix",
  components: {},
  data() {
    return {
      searchCategories: "",
      searchCategoriesList: [
        {
          value: "bt",
          label: "磁力",
        },
        {
          value: "jav",
          label: "番号",
        },
        {
          value: "javActress",
          label: "女优",
        },
        {
          value: "movie",
          label: "影视",
        },
      ],
      uploadImageModalStatus: false,
    };
  },
  computed: {
    ...mapGetters("app", {
      // title: "title",
      language: "language",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
    ...mapGetters("search", {
      keyword: "keyword",
    }),
    inputKeyword: {
      get() {
        return this.keyword;
      },
      set(val) {
        this.set_keyword(val);
      },
    },
  },
  mounted() {
    let CategoriesItem =
      this.searchCategoriesList.find(
        (item) => item.value === this.$route.meta.parentPath
      ) || this.searchCategoriesList[0];
    this.searchCategories = CategoriesItem.value;
    this.$refs.searchInput.focus({
      cursor: "end",
    });
    // this.searchCategories = this.$route.meta.parentPath || "bt"; //根据路由设置初始搜索类型
    console.log(this.searchCategories);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // ...mapActions("search", {
    //   sugrec: "sugrec",
    // }),
    ...mapMutations("search", {
      set_keyword: "set_keyword",
    }),
    translateTitle,
    handleScroll() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.width = window.innerWidth;
      if (this.scroll > 99 && this.width > 992) {
        document.getElementById("searchTop").style =
          "position: fixed;top: 0px;width: 100%;background-color: var(--w-alpha-90);z-index: 999;margin-top: 0px;height: 52px;box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);}";
        // document.getElementsByClassName("searchmini").style = "top: 0px";
        // document.getElementsByClassName("searchmini").style.position = "fixed";
        document.getElementById("searchTop").classList.add("minidiv");
      } else {
        document.getElementById("searchTop").style = "";
        document.getElementById("searchTop").classList.remove("minidiv");
      }
    },
    showUploadpane() {
      if (!this.token) {
        Message.error({
          content: this.translateTitle("请先登录"),
          duration: 5,
        });
      } else {
        this.$router.push({
          path: "/image/upload",
        });
      }
    },

    entersearch() {
      this.search();
    },
    search() {
      // this.$emit("search");
      this.$router.push({
        path: `/${this.searchCategories}/search`,
        query: { q: this.keyword },
      });
    },
  },
};
</script>
<style >
#searchfix .ivu-input-suffix {
  width: 82px;
}
#searchfix .ivu-input-prefix,
.ivu-input-suffix {
  width: auto;
}
/* #searchfix .ivu-icon {
  cursor: pointer;
  font-size: 23px;
  height: 43px;
  line-height: 46px;
  padding: 0 4px;
  right: 6px;
  color: var(--theme-color);
} */
#zicon .ivu-icon {
  cursor: pointer;
  font-size: 23px;
  height: 43px;
  line-height: 46px;
  padding: 0 4px;
  right: 6px;
  color: var(--theme-color);
}

#searchfix .ivu-input-large {
  font-size: 16px;
  padding: 6px 95px 6px 63px;
  height: 46px;
  border-radius: 22px;
}
#searchfix .ivu-input {
  background-color: var(--theme-searchFix-background-color);
  border-color: var(--search-input-border-color);
  color: var(--txt-b-tip);
  border: none;
  box-shadow: 0px 2px 5px 0px rgb(60 64 67 / 16%);
}
#searchfix .ivu-input:hover {
  box-shadow: var(--theme-searchFix-box-shadow-hover);
  border-color: rgba(223, 225, 229, 0);
}
.ivu-upload-drag {
  background: transparent;
}
@media screen and (max-width: 996px) {
  .search-col {
    max-width: none;
  }
  #searchfix .ivu-icon {
    height: 43px;
    line-height: 43px;
  }
  #searchfix .ivu-input-large {
    height: 43px;
  }
}
</style>
