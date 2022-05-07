<style scoped>
.ivu-card ul li >span {
  float: right;
}
.ivu-card ul li {
  list-style: none;
}
.ivu-card a {
  color: #515a6e;
}
.ivu-card a:hover {
  color: #5cadff;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content>
        <div>
          <Row type="flex" justify="center">
            <i-col :xs="{ span: 22 }" :md="{ span: 12 }" :lg="{ span: 4 }">
              <Card style="min-width: 350px;">
                <p slot="title" style="text-align:center">免费视频</p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                  <Icon type="ios-loop-strong"></Icon>
                  详细列表
                </a>
                <ul>
                  <li v-for="(item, index) in randomMovieList" :key="index">
                    <a :href="item.url" target="_blank"
                      ><Avatar size="20" icon="md-planet" /> {{ item.name }}</a
                    >
                    <span>
                      <Icon type="md-arrow-round-forward"></Icon>
                    </span>
                  </li>
                </ul>
              </Card>
            </i-col>
          </Row>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      movieList: [
        {
          name: "xvideo",
          url: "https://movie.douban.com/subject/1292052/",
          rate: 9.6,
        },
        {
          name: "youjizz",
          url: "https://movie.douban.com/subject/1295644/",
          rate: 9.4,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
        {
          name: "pornhub",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5,
        },
      ],
      randomMovieList: [],
    };
  },
  computed: {
    ...mapGetters({
      keyword: "search/keyword",
    }),
  },
  methods: {
    changeLimit() {
      function getArrayItems(arr, num) {
        const temp_array = [];
        for (let index in arr) {
          temp_array.push(arr[index]);
        }
        const return_array = [];
        for (let i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            const arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
      this.randomMovieList = getArrayItems(this.movieList, 10);
    },
  },
  mounted() {
    this.changeLimit();
  },
};
</script>
<style>
.logo {
  line-height: 46px;
  font-size: 19px;
  text-align: center;
  color: var(--theme-color);
  font-style: unset;
  font-family: none;
}
</style>
