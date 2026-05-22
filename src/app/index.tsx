import {StyleSheet, View} from "react-native";
import PassageScreen from "@/screens/PassageScreen";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";

export default function Index() {
    const selectedWeek = useSelector((state: RootState) => state.selectedWeek);

    return (
        <View style={styles.container}>
            <PassageScreen week={selectedWeek.week}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
