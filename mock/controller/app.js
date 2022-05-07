const { version } = require('@/config')


module.exports = [
  {
    url: `/search/${version}/index/config`,
    type: 'get',
    response() {
      return {
        "code": 0,
        "msg": "成功",
        "zh": "成功",
        "en": "Success",
        "data": {
          "polyStatusData": [
            {
              "name": "東京図書館",
              "status": 1
            },
            {
              "name": "zooqle",
              "status": 0
            },
            {
              "name": "Torrentz2",
              "status": 1
            },
            {
              "name": "anirena",
              "status": 1
            },
            {
              "name": "TorrentGalaxy",
              "status": 1
            },
            {
              "name": "LimeTorrents",
              "status": 1
            },
            {
              "name": "动漫花园",
              "status": 1
            },
            {
              "name": "Nyaa",
              "status": 1
            },
            {
              "name": "SNyaa",
              "status": 1
            },
            {
              "name": "btsow",
              "status": 1
            },
            {
              "name": "glodls",
              "status": 1
            },
            {
              "name": "bitsearch",
              "status": 1
            }
          ],
          "searchRankingData": [
            "SKMJ-272",
            "ARSO-22156",
            "DLDSS-056",
            "FC2-2714057",
            "MEYD-750",
            "FSDSS-396",
            "SDMU-984",
            "HBAD-616",
            "SDNM-339",
            "SUN-050",
            "MOND-228",
            "FC2-2666448",
            "FC2-2703027",
            "DLDSS-068",
            "FC2-2699412",
            "FC2-2713916",
            "FSDSS-392",
            "FC2-2663739",
            "FSDSS-397",
            "FC2-2733769",
            "FC2-2661854",
            "SDDE-665",
            "STARS-554",
            "FC2-2728914",
            "FC2-2682982",
            "NTRD-100",
            "FSDSS-382",
            "FC2-2691264",
            "FC2-2660214",
            "FSDSS-389",
            "FC2-2672887",
            "FC2-2645085",
            "SPRD-1528",
            "DLDSS-075",
            "FC2-2632743",
            "FC2-2652224",
            "FC2-2676371",
            "FC2-2669665",
            "FC2-2737414",
            "STARS-577",
            "STARS-548",
            "STARS-558",
            "FC2-2661837",
            "MTALL-016",
            "FSDSS-386",
            "FSDSS-393",
            "FC2-2705724",
            "FC2-2650982",
            "FC2-2720895",
            "SDAB-212",
            "FC2-2645107",
            "FC2-2711719",
            "FC2-2653914",
            "FC2-2654244",
            "FC2-2642596",
            "MOGI-021",
            "FC2-2610114",
            "FC2-2629651",
            "FC2-2695291",
            "DLDSS-059",
            "FC2-2735375",
            "FC2-2629971",
            "SDMM-109",
            "KIRE-070",
            "FC2-2682623",
            "FC2-2658276",
            "SPRD-1530",
            "SDNM-329",
            "FSDSS-379",
            "FC2-2690547",
            "NHDTB-643",
            "FC2-2684616",
            "FSDSS-390",
            "FC2-2711771",
            "FC2-2645129",
            "STARS-566",
            "STARS-514",
            "STARS-521",
            "FC2-2724757",
            "NHDTB-644"
          ],
          "trackerList": "http://1337.abcvg.info:80/announce",
          "version": [
            "1.1.7"
          ]
        }
      }
    },
  },
]
