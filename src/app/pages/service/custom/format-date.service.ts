import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
// @Pipe({
//     name: 'dateFormat'
//   })
//   export class FormatDateService extends DatePipe implements PipeTransform {
//     transform(value: any, args?: any): any {
//        ///MMM/dd/yyyy 
//        return super.transform(value, "dd/MM/yyyy");
//     }
//   }

export class FormatDateService {
    readonly DT_FORMAT = 'MM/DD/YYYY';
    parse(value: string): NgbDateStruct {
        if (value) {
            value = value.trim();
            let mdt = moment(value, this.DT_FORMAT)
        }
        return null;
    }
    format(date: NgbDateStruct): Date {
        if (!date) return new Date();
        let mdt = moment([date.year, date.month - 1, date.day]).toDate();
        return mdt
    }
}