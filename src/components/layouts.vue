<style scoped>
.ivu-divider-horizontal {
  margin: 2px 0;
}
.ma-ivu-divider-horizontal {
  margin: 17px 0 0 0;
}
</style>
<template>
  <div class="Search" id="Search" style="">
    <Layout>
      <div id="searchTop" class="searchmini">
        <div class="slogo">
          <a href="/" title="Magnetar" data-hveid="8">
            <img src="/logo.png" alt="Magnetar" data-atf="1" data-frt="0" />
          </a>
        </div>
        <i-col :xs="24" :lg="9" :xl="9" class="search-col">
          <SearchFix
            @search="search"
            @searchImage="searchImage"
            ref="SearchFix"
          />
        </i-col>
        <HeaderTool />
      </div>
      <div class="tabs" id="sort">
        <Row>
          <i-col :xs="{ span: 24 }" :lg="{ span: 20 }" class="marleft">
            <SearchEngine  />
          </i-col>
        </Row>
      </div>
      <Divider  />
      <router-view></router-view>
      <Backtop />
    </Layout>
  </div>
</template>
<script>
// @ is an alias to /src

import SearchFix from "@/components/SearchFix.vue";
import HeaderTool from "@/components/HeaderTool.vue";
import Backtop from "@/components/Backtop.vue";
import SearchEngine from "@/components/SearchEngine.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    SearchFix,
    HeaderTool,
    Backtop,
    SearchEngine,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("search", {
      keyword: "keyword",
      imageQuery: "imageQuery",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
  },
  methods: {
    ...mapMutations({}),
    search() {
      console.log("Index-search-router.name:%o", this.$route.name);
      this.$router.push({
        path: `/search`,
        query: { q: this.keyword },
      });
    },
    searchImage() {
      console.log("Index-searchImage-id:%o", this.imageQuery.id);
      this.$router.push({
        path: "/image/search",
        query: { id: this.imageQuery.id },
      });
    },
  },
};
</script>
<style>
#resultStats {
  line-height: 43px;
  font-size: 13px;
  color: var(--txt-b-tip);
  float: left;
}
#Search .ivu-layout-header {
  background: none;
}
#Search {
  min-width: 1300px;
}
#Search .ivu-layout-header {
  background: none;
  line-height: 0px;
}
#Search .ivu-layout {
  background: none;
}

#Search .ivu-divider {
  background: var(--theme-divider-color);
}
.card-shadow:hover {
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: 0px 5px 30px 0px var(--b-alpha-15);
  -ms-box-shadow: 0px 5px 30px 0px var(--b-alpha-15);
  box-shadow: 0px 5px 30px 0px var(--b-alpha-15);
  transform: translateY(-6px);
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
}
#right-panl .ivu-card-head {
  border-bottom: 1px solid var(--b-alpha-15);
  border: none;
}
#right-panl {
  margin-left: 100px;
}
/* #Search .ivu-input:focus {
  box-shadow: 0 2px 8px 1px var(--b-alpha-20);
  border-color: rgba(223, 225, 229, 0);
}

#Search .ivu-input:hover {
  box-shadow: 0 2px 8px 1px var(--b-alpha-20);
  border-color: rgba(223, 225, 229, 0);
} */

/* #Search .ivu-input {
  background-color: transparent;
  box-shadow: 0 2px 5px 1px var(--b-alpha-10);
  border: 1px solid transparent;
} */
#sort {
  padding-top: 10px;
}
.mhide {
  display: flex;
  height: 122px;
  align-items: center;
  justify-content: center;
}
.code-row-bg {
  margin-top: 20px;
}
.ivu-message-info .ivu-icon,
.ivu-message-loading .ivu-icon {
  color: var(--theme-color) !important;
}
.ivu-spin {
  color: var(--theme-color) !important;
}
.searchmini {
  margin-top: 20px;
  position: relative;
}
.slogo {
  width: 163px;
  height: 46px;
  padding: 0;
  float: left;
  line-height: 46px;
  font-size: 19px;
  color: var(--theme-color);
  font-style: unset;
  font-family: none;
  text-align: center;
}
.slogo img {
  margin: 8px auto;
}
.ivu-modal-footer {
  border: none;
}
.ivu-modal-header {
  border: none;
}

.ivu-tree-title {
  color: var(--txt-b-tip);
}
.ivu-tree-title:hover {
  background-color: var(--b-alpha-10);
}
.ivu-tree-title-selected,
.ivu-tree-title-selected:hover {
  background-color: var(--b-alpha-10);
}
.ivu-alert-warning {
  border: none;
  background-color: var(--b-alpha-5);
  color: var(--txt-b-tip);
}

@media (min-width: 992px) {
  .marleft {
    margin-left: 180px;
    max-width: 652px;
  }
  .slogo {
    text-align: center;
  }
}
@media screen and (min-width: 992px) and (max-width: 1121px) {
  .marleft {
    margin-left: 40px;
  }
}
@media screen and (max-width: 991px) {
  #Search {
    min-width: unset !important;
  }
  .searchmini {
    margin-top: 0px !important;
  }
  .search-col {
    max-width: none;
    padding: 0 16px;
  }
  .marleft {
    padding: 0 15px;
  }
  .slogo {
    width: 100%;
    height: 64px;
  }
  .slogo img {
    margin: 14px auto !important;
  }
  #right-panl {
    margin-left: unset !important;
    max-width: unset;
  }
}
</style>

<style>
.TabCard .ivu-card-head {
  padding: 7px 10px;
  border: none;
}
.TabCard .ivu-card-body {
  padding: 0px;
}
.TabCard .ivu-card-extra {
  top: 9px;
}
.TabCard .ivu-card-head p,
.TabCard .ivu-card-head-inner {
  color: var(--b-alpha-90);
}
.TabCard .ivu-collapse-simple {
  background-color: transparent;
}
.TabCard .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i {
  margin-right: 0px;
  color: var(--theme-color) !important;
}
.TabCard .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  color: var(--b-alpha-90);
  height: 41px;
  line-height: 41px;
  padding-left: 10px;
}
.TabCard .ivu-collapse {
  border: none;
}
.TabCard .ivu-collapse-content {
  background-color: transparent;
}
.TabCard .ivu-spin-fix {
  background-color: transparent;
}
</style>