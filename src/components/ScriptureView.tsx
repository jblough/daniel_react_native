import {Alert, GestureResponderEvent, Platform, useWindowDimensions,} from "react-native";
import RenderHtml from 'react-native-render-html';
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import {memo} from 'react';

interface ScriptureViewProps {
    html: string;
    playAudio: (url: string) => void;
}

const ScriptureView = memo(function ScriptureView({playAudio, html}: ScriptureViewProps) {
    const settings = useSelector((state: RootState) => state.settings);
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
            baseStyle={{fontSize: settings.fontSize}}
            renderersProps={renderersProps}
            ignoredDomTags={["note"]}
        />

    );
});

export default ScriptureView;