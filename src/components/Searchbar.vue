<template>
  <div id="homesearchbar">
    <AutoComplete
      v-model="inputKeyword"
      :data="searchtipsdata"
      icon="ios-search"
      size="large"
      @on-select.capture="tipsearch"
      @on-search="handleSearch"
      @keyup.enter.native="entersearch"
    >
    </AutoComplete>
  </div>
</template>

<script>
import { translateTitle } from "@/utils/i18n";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { keywordunique } from "@/utils/index";
export default {
  name: "HomeSearchbar",
  components: {},
  data() {
    return {
      searchtipsdata: [],
    };
  },
  computed: {
    ...mapGetters({
      searchparamet: "search/searchparamet",
    }),
    inputKeyword: {
      get() {
        return this.searchparamet.q;
      },
      set(q) {
        this.SET_SEARCHPARAMET({ q });
      },
    },
  },
  methods: {
    ...mapActions({
      sugrec: "search/sugrec",
      // updatekeyword: "search/Updatekeyword",
    }),
    ...mapMutations({
      SET_SEARCHPARAMET: "search/SET_SEARCHPARAMET",
    }),
    translateTitle,
    handleSearch(value) {
      if (value && value.length > 1) {
        this.sugrec(value)
          .then((data) => {
            data.unshift({ keyword: value });
            this.searchtipsdata = keywordunique(
              data.map((item) => {
                return item.keyword;
              })
            );
            console.log("下拉关键词：%o", this.searchtipsdata);
          })
          .catch((err) => {
            console.log("下拉关键词：%o", err.msg);
          });
      }
    },

    tipsearch(value) {
      this.inputKeyword = value;
      this.search();
    },
    entersearch() {
      this.search();
    },
    search() {
      this.SET_SEARCHPARAMET({
        t: "all",
        p: 1,
      })
      this.$router.push({
        path: "/search",
        query: this.searchparamet,
      });
    },
  },
};
</script>
<style >
#homesearchbar .ivu-input {
  background-color: transparent;
  border-color: var(--b-alpha-20);
  color: var(--txt-b-tip);
}
#homesearchbar .ivu-input:focus {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  border-color: rgba(223, 225, 229, 0);
}

#homesearchbar .ivu-input:hover {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  border-color: rgba(223, 225, 229, 0);
}
#homesearchbar .ivu-input-icon {
  font-size: 19px;
  height: 43px;
  line-height: 44px;
  right: 6px;
}
#homesearchbar .ivu-input-large {
  font-size: 16px;
  padding: 6px 18px;
  height: 44px;
  border-radius: 22px;
}
</style>
