// import PagerView from 'react-native-pager-view';
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {Week} from "@/types/week";
import ScriptureView from "@/components/ScriptureView";
import {usePassageContent} from "@/hooks/usePassageContent";

interface PassageProps {
    week: Week;
}

const PassageScreen = ({week}: PassageProps) => {
    const {content, loading} = usePassageContent(week);
    
    if (loading) {
        return <ActivityIndicator/>;
    }

    return (
        <ScrollView style={styles.container}>
            <ScriptureView week={week} html={content}/>
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