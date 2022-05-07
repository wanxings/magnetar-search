<template>
  <div class="layout" id="indexlayout">
    <Layout>
      <Header>
        <HeaderTool />
      </Header>
      <Content>
        <div id="indexapp">
          <Row type="flex" justify="center">
            <i-col :xs="{ span: 22 }" :md="{ span: 12 }" :lg="{ span: 8 }">
              <div class="logo">
                <a
                  href="/"
                  title="Go to Magnetar Home"
                  id="logo"
                  data-hveid="8"
                >
                  <img
                    src="/logo.png"
                    alt="Magnetar"
                    data-atf="1"
                    data-frt="0"
                  />
                </a>
              </div>
            </i-col>
          </Row>
          <Row type="flex" justify="center">
            <i-col
              :xs="22"
              :sm="22"
              :md="12"
              :lg="12"
              :xl="8"
              :xxl="8"
              style="max-width: 599px"
            >
              <SearchFix @search="search" @searchImage="searchImage" />
            </i-col>
          </Row>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTool from "@/components/HeaderTool.vue";
import SearchFix from "@/components/SearchFix.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    SearchFix,
    HeaderTool,
  },
  computed: {
    ...mapGetters("search", {
      keyword: "keyword",
      imageQuery: "imageQuery",
    }),
  },
  methods: {
    ...mapMutations({}),
    search() {
      this.$router.push({
        path: `/search/bt`,
        query: { q: this.keyword },
      });
    },
    searchImage() {
      console.log("Home-searchImage-id:%o", this.imageQuery.id);
      this.$router.push({
        path: "/search/image",
        query: { id: this.imageQuery.id },
      });
    },
  },
};
</script>
<style>
#indexapp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #d0e7ff;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 320px);
  justify-content: center;
  position: relative;
  min-height: 90px;
}

.logo {
  line-height: 46px;
  font-size: 19px;
  text-align: center;
  color: var(--theme-color);
  font-style: unset;
  font-family: none;
}
</style>
