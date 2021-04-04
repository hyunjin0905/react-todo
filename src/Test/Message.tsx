import React, { FC, useContext } from "react";
import { LanguageContext, ThemeContext } from "./MyComponent";
import { Button } from "@material-ui/core";




// export const Message: FC = (props) => {
//     return (
//         <LanguageContext.Consumer>
//             {
//                 context => {
//                 const { language, changeLanguage } = context;
//                     return (
//                         <div onClick={() => changeLanguage("ko")}>
//                             {language}
//                         </div>
//                     )
//                 }
//             }
//         </LanguageContext.Consumer>
//     )
// }


export const Message: FC = (props) => {
    const { language, changeLanguage } = useContext(LanguageContext);
    const { theme , changeTheme } = useContext(ThemeContext);
    return (
        <>
            <div style={{ width: "100%", height: "400px", backgroundColor: theme === "dark" ? "#efefefef" : "#cecece" }}>
                <Button onClick={() => changeLanguage("ko")}>
                    { language }
                </Button>
                <Button onClick={() => changeTheme("bright")}>
                    { theme }
                </Button>
            </div>
        </>
    )
}