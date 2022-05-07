<template>
  <div id="Searchmini">
    <i-col :xs="24" :lg="9" :xl="9" class="search-col">
      <Input
        search
        size="large"
        @on-search="search"
        placeholder=""
        v-bind:value="keyword"
      />
    </i-col>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: "黑猫警长",
    },
  },
  data() {
    return {
      keywords: this.keyword,
    };
  },
  
  methods: {
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>
<style>

#Searchmini .ivu-input-icon {
  font-size: 19px;
  height: 43px;
  line-height: 46px;
  right: 6px;
  color: var(--theme-color);
}

#Searchmini .ivu-input-large {
  font-size: 16px;
  padding: 6px 43px 6px 18px;
  height: 46px;
  border-radius: 22px;
}
#Searchmini .ivu-input {
  background-color: transparent;
  border-color: var(--b-alpha-20);
  color: var(--txt-b-tip);
}
@media screen and (max-width: 996px) {
  .search-col {
    max-width: none;
  }
}
</style>
