import request from '@/utils/request'
// import { stringify } from 'qs'
import {
    version
} from '@/config'
export function getConfig() {
  return request({
    url: `/search/${version}/index/config`,
    method: 'get',
  })
}
 
