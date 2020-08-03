import React from "react";
import style from "./style.scss";

export const FormLabel: React.FC<{ text: string }> = ({ text }) => (
  <label className={style.label}>{text}</label>
);
