<style scoped>
.logo span{
  color: #5CA1FF;
  animation: identifierLogo 1s ease-in-out infinite alternate;
}
.logo span:nth-child(n+1){
  animation-delay: 0.2s;
}
.logo span:nth-child(n+2){
  animation-delay: 0.4s;
}
.logo span:nth-child(n+3){
  animation-delay: 0.6s;
}
.logo span:nth-child(n+4){
  animation-delay: 0.8s;
}
.logo span:nth-child(n+5){
  animation-delay: 1s;
}
@keyframes identifierLogo {
  to{
    color: #00C1FF;
    text-shadow: 1px 0 2px #00C1FF;
  }
}
</style>
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
                <!-- <br> -->
                <!-- <a>
                  <span>M</span>
                  <span>a</span>
                  <span>g</span>
                  <span>n</span>
                  <span>e</span>
                  <span>t</span>
                  <span>a</span>
                  <span>r</span>
                </a> -->
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
              <SearchFix />
            </i-col>
          </Row>
          <Row v-if="token" type="flex" justify="center">
            <i-col
              :xs="22"
              :sm="22"
              :md="12"
              :lg="12"
              :xl="8"
              :xxl="8"
              style="text-align: center;padding-top: 29px;"
            >
              <ButtonGroup>
                <Button to="/bt" type="text">磁力</Button>
                <Button v-if="safeMode==='off'" to="/jav" type="text">番号</Button>
                <!-- <Button to="/javActress" type="text">女优</Button> -->
                <!-- <Button to="/movie" type="text">影视</Button> -->
                <Button to="/user" type="text" >个人中心</Button>
              </ButtonGroup>
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
    ...mapGetters("app", {
      safeMode: "safeMode",
    }),
    ...mapGetters("user", {
      token: "token",
    }),
  },
  methods: {
    ...mapMutations({}),
    // search() {
    //   this.$router.push({
    //     path: `/search`,
    //     query: { q: this.keyword },
    //   });
    // }, 
    // searchImage() {
    //   console.log("Home-searchImage-id:%o", this.imageQuery.id);
    //   this.$router.push({
    //     path: "/image/search",
    //     query: { id: this.imageQuery.id },
    //   });
    // },
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
