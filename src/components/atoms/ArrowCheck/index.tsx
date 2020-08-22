import React from "react";
import classNames from "classnames";
import style from "./style.scss";

type ArrowCheckProps = {
  check: boolean;
  componentClass?: string;
};
export const ArrowCheck: React.FunctionComponent<ArrowCheckProps> = ({
  check,
  componentClass,
}) => {
  const classNamePolyline = classNames(style.svg, check ? style.animate : "");
  return (
    <svg
      className={classNames(style.svg, componentClass || "")}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        className={classNamePolyline}
        points="5,60 27,85 96,17 "
        strokeLinecap="round"
        fill="none"
        strokeWidth={9}
        strokeLinejoin="round"
        strokeDasharray={140}
        strokeDashoffset={140}
        stroke="#272727"
      />
    </svg>
  );
};
