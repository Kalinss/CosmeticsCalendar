import React from "react";
import style from "./style.scss";
import { Link } from "react-router-dom";

type typeLogo = {
  alt?: string;
  src?: string;
  path?: string;
  text?:string
};

export const Logo: React.FC<typeLogo> = ({
  src = "",
  alt = "",
  path = "/",
  text=''
}) => {
  const RenderContent = () => {
    return src ? (
      <div className={style.logo}>
        <img className={style.img} src={src} alt={alt} />
      </div>
    ) : (
      <h1 className={style.text}>{text}</h1>
    );
  };

  return (
    <Link to={`${path}`}>
      {
        <>
          <RenderContent />
        </>
      }
    </Link>
  );
};
