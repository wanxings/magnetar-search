<template>
 <img :src="url">
</template>
<script>
 export default {
  props: ['src'], // 父组件传过来所需的url
  data() {
   return {
    url: 'http://www.86y.org/images/loading.gif' // 先加载loading.gif
   }
  },
  mounted() {
   var newImg = new Image()
   newImg.src = this.src
   newImg.onerror = () => { // 图片加载错误时的替换图片
    newImg.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489486509807&di=22213343ba71ad6436b561b5df999ff7&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F77%2F31%2F20300542906611142174319458811.jpg'
   }
   newImg.onload = () => { // 图片加载成功后把地址给原来的img
    this.url = newImg.src
   }
  }
 }
</script>