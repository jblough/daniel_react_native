import {ActivityIndicator, StyleSheet, View} from "react-native";
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
        <View style={styles.container}>
            <ScriptureView week={week} html={content}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginHorizontal: 10,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PassageScreen;