export enum ThemeMode {
    system = "system",
    dark = "dark",
    light = "light",
}

export interface Settings {
    mode: ThemeMode;
    fontSize: number;
}