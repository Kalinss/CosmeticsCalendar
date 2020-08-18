import React from "react";
import style from "./style.scss";
import classNames from "classnames";
import { Link, Router } from "react-router-dom";
import moment from "moment";
import config from "../../../config";
type typeCalendarTableCell = {
  disabled: boolean;
  value: number;
  date: Date;
  active?: boolean;
  dot?: boolean;
};

export const CalendarTableCell: React.FC<typeCalendarTableCell> = ({
  disabled,
  value,
  date,
  active = false,
  dot = false,
}) => {
  const getFormatDate = (date: Date) => moment(date).format("L");
  const getLink = `${config.baseHref}/todolist/${getFormatDate(date)}`;
  const classNameTD = classNames(style.td, disabled && style.disabled);
  const classActive = classNames(active && style.active);

  const getValueCell = (disabled: boolean) => {
    return disabled ? (
      <span className={style.linkText}>{value}</span>
    ) : (
      <Link to={getLink}>
        <span className={style.linkText}>{value}</span>
      </Link>
    );
  };

  return (
    <td className={classNames(classNameTD)}>
      <div className={classActive}>
        {dot && <b className={style.dot}></b>}
        {getValueCell(disabled)}
      </div>
    </td>
  );
};
