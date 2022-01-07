enum metrics {
  sm = 8,
  md = 16,
  lg = 24,
  xg = 30,
  borderRadius = 20,
  navBarHeight = 50
}

export interface Theme {
  background: string;
  contentBackground: string;
  iconColor: string;
  selectedIconColor: string;
  selectedIconBackgroundColor: string;
}

export const themeLight = <Theme>{
  background: '#f3f6fd',
  contentBackground: '#ffffff',
  iconColor: '#888',
  selectedIconColor: '#fff',
  selectedIconBackgroundColor: '#888888'
}

export const themeDark = <Theme>{
  background: '#000000',
  contentBackground: '#ffffff',
  iconColor: '#ccc',
  selectedIconColor: '#fff',
  selectedIconBackgroundColor: '#888888'
}


export { metrics }