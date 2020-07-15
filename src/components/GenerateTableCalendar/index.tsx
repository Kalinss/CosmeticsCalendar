import React from "react";
import { objectDateCalendar } from "./../../types";
import { isActuallyMonth } from "../../utils/dates/dates";
import classNames from "classnames";
import {itemCosmeticType} from "../../stores/ItemsCosmetic";
import moment from "moment";

import style from "./style.scss";
type GenerateTableCalendarType = {
  array: objectDateCalendar[][];
  actuallyDate: Date;
  allDisabled: boolean;
  itemsCosmetic:itemCosmeticType[]
};

export const GenerateTableCalendar: React.FunctionComponent<GenerateTableCalendarType> = (
  props
) => {
    const thereIsATask = (actuallyDate:Date, taskCreateDate:Date,timeDelay:number)=>{
        const actually = moment(actuallyDate);
        actually.set({hour:0,minute:0,second:0,millisecond:0});
        const createDate = moment(taskCreateDate);
        createDate.set({hour:0,minute:0,second:0,millisecond:0});
        return ((actually.diff(createDate,'d')) % timeDelay === 0)
    };

    const isNowDay = (actuallyDate:Date,itemDate:Date) =>{
        const actually = moment(actuallyDate);
        actually.set({hour:0,minute:0,second:0,millisecond:0});
        const itemDateAct = moment(itemDate);
        itemDateAct.set({hour:0,minute:0,second:0,millisecond:0});
        console.log((actually.diff(itemDateAct, 'd') === 0));
        return ((actually.diff(itemDateAct,'d') === 0))
    }

    return (
    <table>
      <tbody>
        {props.array.map((week: any, i: number) => (
          <tr key={i}>
            {week.map((item: objectDateCalendar, z: number) => {
              return props.allDisabled ? (
                <td key={z} className={classNames(style.td, style.disabled)}>
                  <div>
                    <span>{item.number}</span>
                  </div>
                </td>
              ) : isActuallyMonth(props.actuallyDate, item.date) ? (
                <td key={z} className={classNames(style.td, style.disabled)}>
                  <div className={isNowDay(item.date,props.actuallyDate)? style.active:''}>
                    <span>{item.number}</span>
                  </div>
                </td>
              ) : (
                <td key={z} className={style.td}>
                  <div className={isNowDay(item.date,props.actuallyDate)? style.active:''}>
                      {
                          props.itemsCosmetic.map((cosmetic,i)=>
                              thereIsATask(item.date,cosmetic.date,cosmetic.timingDelay.value)&&<span>Ю</span>
                          )
                      }
                    <span>{item.number}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
