import querystring from 'querystring'


/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
 export function paramObj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
    )
  }


export const buildsearchurl = (parameter) => {
    return "?" + querystring.stringify(parameter)
}

export const buildgetAvData = (state) => {
    var parameter = {
        p: state.page,
        c: state.classification,
        d: state.date,
    }

    return "?" + querystring.stringify(parameter)
}
export const unique = (arr) => {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.hash) && res.set(arr.hash, 1));
}
export const keywordunique = (arr) => {
    return Array.from(new Set(arr));
}



