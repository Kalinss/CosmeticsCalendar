import React, { FunctionComponent, useState } from "react";
import style from "./style.scss";
import { toJS } from "mobx";
import {
  createArrayObjectDays,
  getTwoDimensionalArray,
} from "../../utils/dates/dates";
import {
  GenerateTableCalendar,
  ArrowCalendar,
  CalendarTableHead,
} from "../index";
import { getUpperFirstCharString } from "../../utils/string/string";
import moment from "moment";
import "moment/locale/ru";
import classNames from "classnames";
import { IMainStore } from "~/stores/MainStore";
import { inject, observer } from "mobx-react";

const HEIGHT_CALENDAR = 271;
const TRANSITION_SLIDER_DELAY = 0.3;

export const Calendar: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [actuallyDate, setActuallyDate] = useState(new Date());
    const [yPosition, setYPosition] = useState(-HEIGHT_CALENDAR);
    const [transition, setTransition] = useState(true);
    const [disabledButton, setDisabledButton] = useState(false);

    const prevMonth = moment(actuallyDate).subtract(1, "M").toDate();
    const nextMonth = moment(actuallyDate).add(1, "M").toDate();

    const arrayDays = createArrayObjectDays(actuallyDate);
    const dimensionalDateArray = getTwoDimensionalArray(arrayDays, 7);
    const actuallyDateMonthName = getUpperFirstCharString(
      moment(actuallyDate).locale("ru").format("MMMM")
    );
    const itemsCosmetic = toJS(stores!.ItemsCosmetic.items);

    // animation functions
    const reset = () => {
      setTimeout(() => {
        setTransition(false);
        setYPosition(-HEIGHT_CALENDAR);
        setTimeout(() => {
          setTransition(true);
          setDisabledButton(false);
        }, 100);
      }, TRANSITION_SLIDER_DELAY * 1000);
    };

    const next = () => {
      setDisabledButton(true);
      setYPosition(yPosition - HEIGHT_CALENDAR);
      setActuallyDate(nextMonth);
      reset();
    };

    const prev = () => {
      setDisabledButton(true);
      setYPosition(yPosition + HEIGHT_CALENDAR);
      setActuallyDate(prevMonth);
      reset();
    };

    return (
      <div className={style.calendar}>
        <div className={style.heading}>
          <div className={style.left}>
            <p>
              <span>{actuallyDateMonthName}</span>
              &nbsp;
              <span>{moment(actuallyDate).format("YYYY")}</span>
            </p>
          </div>

          <div className={style.right}>
            <button
              className={style.button}
              onClick={prev}
              disabled={disabledButton}
            >
              <div className={style.svgWrapper}>
                <ArrowCalendar />
              </div>
            </button>

            <button
              className={classNames(style.button, style.bottom)}
              onClick={next}
              disabled={disabledButton}
            >
              <div className={style.svgWrapper}>
                <ArrowCalendar />
              </div>
            </button>
          </div>
        </div>
        {/*calendar head*/}
        <CalendarTableHead />
        {/*calendar body*/}
        <div
          className={style.wrapperTable}
          style={{ height: `${HEIGHT_CALENDAR}px` }}
        >
          <div
            className={style.styleSlider}
            style={{
              transform: `translateY(${yPosition}px)`,
              transition: transition ? `${TRANSITION_SLIDER_DELAY}s ease` : "",
            }}
          >
            <GenerateTableCalendar // for prev month
              array={dimensionalDateArray}
              actuallyDate={prevMonth}
              allDisabled={true}
              itemsCosmetic={itemsCosmetic}
            />
            <GenerateTableCalendar // for actually month
              array={dimensionalDateArray}
              actuallyDate={actuallyDate}
              allDisabled={false}
              itemsCosmetic={itemsCosmetic}
            />
            <GenerateTableCalendar //for next month
              allDisabled={true}
              array={dimensionalDateArray}
              actuallyDate={nextMonth}
              itemsCosmetic={itemsCosmetic}
            />
          </div>
        </div>
      </div>
    );
  })
);
