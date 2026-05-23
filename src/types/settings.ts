export enum ThemeMode {
    system = "system",
    dark = "dark",
    light = "light",
}

export interface Settings {
    themeMode: ThemeMode;
    fontSize: number;
}