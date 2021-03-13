import React, { CSSProperties, FC } from "react";
import { makeStyles } from "@material-ui/core";


interface PageProps {
  className?: string;
  style?: CSSProperties;
}

export const Page: FC<PageProps> = ({ children, className, style }) => {
  const { pageDefault } = useStyle();
  const pageClassName = pageDefault + (className ? className : "");
  return (
    <div className={pageClassName} style={style}>
      { children }
    </div>
  )
}


const useStyle = makeStyles({
  pageDefault: {
    width: "100vw",
    height: "100vh",
  }
})
