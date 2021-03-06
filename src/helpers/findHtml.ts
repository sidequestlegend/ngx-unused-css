const fs = require("fs");
const path = require("path");

//source: https://gist.github.com/victorsollozzo/4134793
export default class FindHTML {
  findHtml = (
    base: string,
    ext?: string,
    files?: any,
    result?: any
  ): string[] => {
    if (!base) {
      return [];
    }
    files = files || fs.readdirSync(base);
    result = result || [];
    ext = "html";

    files.forEach(file => {
      let newbase = path.join(base, file);
      if (fs.statSync(newbase).isDirectory()) {
        result = this.findHtml(
          newbase,
          "html",
          fs.readdirSync(newbase),
          result
        );
      } else {
        if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
          result.push(newbase);
        }
      }
    });
    return result;
  };
}
