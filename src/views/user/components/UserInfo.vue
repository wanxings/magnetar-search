<template>
  <Card>
    <div style="text-align: center">
      <img style="border-radius: 50%;" :src="avatar" />
      <h3>{{ name }}</h3>
      <Tag v-if="leave == 0" color="primary">管理员</Tag>
      <Tag v-else-if="leave == 100" color="primary">内测用户</Tag>
      <Tag v-else color="primary">普通用户</Tag>
    </div>
  </Card>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  name: "UserInfo",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", {
      name: "name",
      email: "email",
      avatar: "avatar",
      leave: "leave",
      credits: "credits",
      token: "token",
    }),
  },
  filters: {},
  methods: {},
  mounted: function () {
    // this.$store.dispatch('inituserconfig');
  },
};
</script>

<style>
</style>
