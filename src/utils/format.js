export function formatTime(dates, fmt) {
    var date = new Date(dates);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            var str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
            );
        }
    }
    return fmt;
}
export function fileSize(val) {
    if (isNaN(val)) {
        return val;
    }
    if (val === 0) return "0 B";
    var k = 1024;
    var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(val) / Math.log(k));
    return (val / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
}
export function fileTime(val) {
    var now = new Date(val),
        y = now.getFullYear(),
        m = ("0" + (now.getMonth() + 1)).slice(-2),
        d = ("0" + now.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
}
export function delHtml(val) {
    return val.replace(/<[^>]+>/g,"");//截取html标签
}