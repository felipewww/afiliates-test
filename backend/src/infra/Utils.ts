import * as util from "util";

export class Utils {
    public static log(obj: any) {
        console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}))
    }
}