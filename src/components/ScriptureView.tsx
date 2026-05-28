import {Alert, GestureResponderEvent, Platform, useWindowDimensions,} from "react-native";
import RenderHtml from 'react-native-render-html';
import {memo} from 'react';
import {ThemeColors} from "@/constants/theme";
import {Settings} from "@/types/settings";

interface ScriptureViewProps {
    html: string;
    playAudio: (url: string) => void;
    themeColors: ThemeColors;
    settings: Settings;
}

const ScriptureView = memo(function ScriptureView({playAudio, html, themeColors, settings}: ScriptureViewProps) {
    const {width} = useWindowDimensions();

    function onPress(_: GestureResponderEvent,
                     href: string,
                     htmlAttribs: Record<string, string>) {
        if (href.endsWith('mp3') && htmlAttribs["type"] === "audio/mpeg") {
            playAudio(href);
        }

        // TODO: Display footnotes as a tooltip or something like that
        const linkTitle = htmlAttribs["title"];
        if (linkTitle && htmlAttribs["type"] !== "audio/mpeg") {
            if (Platform.OS === 'web') {
                alert(linkTitle);
            } else {
                Alert.alert(linkTitle);
            }
        }
    }

    const renderersProps = {a: {onPress}}

    return (
        <RenderHtml
            contentWidth={width}
            source={{html: html}}
            baseStyle={{
                fontSize: settings.fontSize,
                color: themeColors.text,
                backgroundColor: themeColors.background,
                tintColor: themeColors.text,
            }}
            renderersProps={renderersProps}
            ignoredDomTags={["note"]}
        />

    );
});

export default ScriptureView;