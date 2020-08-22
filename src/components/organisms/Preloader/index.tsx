import React from "react";
import style from "./style.scss";
import classNames from "classnames";

export const Preloader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.background}>
        <h1 className={style.text}>Loading... Please wait...</h1>
        <div className={classNames(style.loader, style.loaderLeft)} />
        <div className={classNames(style.loader, style.loaderRight)} />
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={15}
                result="blur"
                colorInterpolationFilters="sRGB"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
                result="goo"
                colorInterpolationFilters="sRGB"
              />
              <feBlend
                in="SourceGraphic"
                in2="goo"
                colorInterpolationFilters="sRGB"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
