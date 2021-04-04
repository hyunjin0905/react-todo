import React, { FC, useContext } from "react";
import {  LanguageContext } from "./MyComponent";




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
    return (
        <div onClick={() => changeLanguage("ko")}>
            { language }
        </div>
    )
}