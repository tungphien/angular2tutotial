import { Injectable } from '@angular/core';
@Injectable()
export class Util {
    convertDate(dateString) {
        let regDate = /(.*)-(.*)-(.*)/g;
        let arr = regDate.exec(dateString);
        if (arr.length >= 4) {
            arr[2] = arr[2].length < 2 ? ("0" + arr[2]) : arr[2];
            arr[1] = arr[1].length < 2 ? ("0" + arr[1]) : arr[1];
            //yyyy-MM-dd
            return arr[3] + "-" + arr[2] + "-" + arr[1];
        }
        return "";
    }
} 