

<script type="text/javascript">
  import md5 from 'js-md5'
  import querystring from 'querystring'
    var signdata,randoms="EPkcb1nfkfhPfULjZFM6fgXIDsAyquKB"
    function getpostdata(postdata) {
      postdata.timestamp = Date.now()
      console.log(postdata.timestamp)
      signdata = postdata;
      signdata = ksort(signdata);
      signdata.key = randoms;
      postdata.sign = md5(md5(decodeURIComponent(querystring.stringify(signdata))));
      return postdata;
    }
    function ksort(jsonData) {
      try {
        let tempJsonObj = {};
        let sdic = Object.keys(jsonData).sort();
        sdic.map((item, index) => {
          tempJsonObj[item] = jsonData[sdic[index]];
        });
        return tempJsonObj;
      } catch (e) {
        return jsonData;
      }
    }
    // 暴露出这些属性和方法
    export default {
        getpostdata
    }
</script>