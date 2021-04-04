import React, { FC, useContext, useState } from "react";
import { Message } from "./Message";



// * React.createContext => Context 객체 만들기
// * Context.Provider => Provider 이용해서 Context 변경 사항을 자손들에게 제공
// * Context.Consumer => value 의 변경사항들을 구독한다 context 에서 가장 가까운 Provider 참조
// * useContext 사용해서 Context 객체의 value 를 가져올 수 있다


// * 중첩해서 Context 사용하는 이유는
// => 종류별로 만들면 중간의 컴포넌트가 업데이트를 하지않아도 되는 이점 중간컴포넌트의 렌더링 건너뛰고 Consumer 컴포넌트만 렌더링

// * 고차컴포넌트로 여러개 컨테스트 데이터 전달 ?!!@!@!@

// * 하위컴포넌트에서 컨테스틑 데이터수정하기

interface LanguageContextState  {
    language: string;
    changeLanguage: (lang: string) => void;

};


export const LanguageContext = React.createContext<LanguageContextState>({
    language: "en",
    changeLanguage: () => {}
})


export const LanguageContextProvider: FC = ({ children }) => {
    const [ lang, setLang ] = useState<string>("en");
    const changeLanguage = (lang: string) => setLang(lang);
    return (
        <LanguageContext.Provider value={{ language: lang, changeLanguage: changeLanguage}}>
            { children }
        </LanguageContext.Provider>
    )
}

interface ThemeContextState {
    theme: string;
    changeTheme: (theme: string) => void;
}


export const ThemeContext = React.createContext<ThemeContextState>({
    theme: "dark",
    changeTheme: () => {}
})


export const ThemeContextProvider: FC = ({children}) => {
    const [ theme, setTheme ] = useState<string>("dark");
    const changeTheme = (theme: string) => {
        setTheme(theme)
    }
    return(
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}



export const MyComponent: FC = (props) => {

    return (
        <>
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <Message/>
                </ThemeContextProvider>
            </LanguageContextProvider>
        </>
    )

}
