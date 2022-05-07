import { Message } from "view-design";
import { translateTitle } from "@/utils/i18n";
export function copyMagnetLink(val) {
    if (this.AutoTracker === "on") {
        let data = this.tracker;
        let trackerlist = data.split(/[\r\n]+/); // 根据换行或者回车进行识别
        trackerlist.forEach((item, index) => {
          // 删除空项
          if (!item) {
            trackerlist.splice(index, 1);
          }
        });
        trackerlist = Array.from(new Set(trackerlist)); // 去重
        trackerlist = trackerlist.join("&tr=");
        val = `${val}&tr=${trackerlist}`;
      }
      let message = `magnet:?xt=urn:btih:${val}`;
      this.$copyText(message).then(
        () => {
          Message.success({
            content: translateTitle("已复制到粘贴板"),
            background: true,
          });
        },
        () => {
          Message.error({
            content: `${translateTitle(
              "复制失败，可能浏览器不支持该功能，请手动复制"
            )}${message}`,
            background: true,
          });
        }
      );
}