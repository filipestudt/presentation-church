import React, { Context, useEffect, useState } from 'react';
import { themeLight, themeDark } from '../../../shared/styles';

const localStorageKey = 'theme';

enum themes {
    dark,
    light
}

const ThemeContext = React.createContext({
    theme: themes.light,
    changeTheme: () => { },
    style: {},
    themes
});

export const ThemeProvider = (props: any) => {
    const [selectedTheme, setSelectedTheme] = useState(themes.light);
    const [style, setStyle] = useState({});

    useEffect(() => {
        getTheme();
    }, [])

    // Every time the theme changes, it will reload the style var with the new theme values
    useEffect(() => {
        loadStyle();
    }, [selectedTheme])

    const getTheme = function () {
        var data = localStorage.getItem(localStorageKey) || '';

        try {
            let result = JSON.parse(data);
            setSelectedTheme(result.theme);
        }
        catch (err) {
            console.log(err);
        }
    }

    const changeTheme = function () {
        var theme = selectedTheme == themes.light ? themes.dark : themes.light;
        setSelectedTheme(theme);
        localStorage.setItem(localStorageKey, JSON.stringify({ theme }));
    }

    const loadStyle = function () {
        var styleToSet = selectedTheme == themes.light ? themeLight : themeDark;
        setStyle(styleToSet);
    }

    return (
        <ThemeContext.Provider value={{ theme: selectedTheme, changeTheme, themes, style }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;