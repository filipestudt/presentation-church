import React, { Context, useEffect, useState } from 'react';
import { themeLight, themeDark, Theme } from '../styles';

const localStorageKey = 'theme';

enum themes {
    dark,
    light
}

interface IThemeContext {
    theme: themes;
    changeTheme: Function;
    style: Theme;
}

const newThemeContext: IThemeContext = {
    theme: themes.light,
    changeTheme: () => {},
    style: themeLight
}

const ThemeContext = React.createContext(newThemeContext);

export const ThemeProvider = (props: any) => {
    const [selectedTheme, setSelectedTheme] = useState(themes.light);
    var styleState: Theme = {
        background: '',
        contentBackground: '',
        iconColor: '',
        selectedIconColor: '',
        selectedIconBackgroundColor: ''
    }
    const [style, setStyle] = useState(styleState);

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
        <ThemeContext.Provider value={{ theme: selectedTheme, changeTheme, style }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;