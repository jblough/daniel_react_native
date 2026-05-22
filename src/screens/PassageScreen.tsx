// import PagerView from 'react-native-pager-view';
import {ScrollView, StyleSheet} from "react-native";
import {Week} from "@/types/week";
import {useEffect, useState} from 'react';
import {downloadPassage} from "@/api";
import ScriptureView from "@/components/ScriptureView";

const source = "<p style='text-align:center;'>Loading... </p>";

interface PassageProps {
    week: Week;
}

const PassageScreen = ({week}: PassageProps) => {
    const [html, setHtml] = useState(source);

    useEffect(() => {
        downloadPassage(week.passage).then((res) => {
            if (res.data?.passages) {
                const html = res.data.passages.join();
                setHtml(html);
            }
        });

    }, []);

    return (
        <ScrollView style={styles.container}>
            <ScriptureView week={week} html={html}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PassageScreen;