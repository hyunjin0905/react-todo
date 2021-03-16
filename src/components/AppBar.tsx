import React, { CSSProperties, FC } from "react";
import { makeStyles } from "@material-ui/core";




interface AppBarProps {
    className?: string;
    style?: CSSProperties
}


export const AppBar: FC<AppBarProps> = ({ className, style, children }) => {
    const classes = useStyle();
    const defaultStyle = className? classes.root + "" + className : classes.root;
    return(
        <div className={defaultStyle} style={style}>
            {children}
        </div>
    )
}


const useStyle = makeStyles( {
    root: {
        backgroundColor: "#cecece",
        padding: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: "white"
    }

});

