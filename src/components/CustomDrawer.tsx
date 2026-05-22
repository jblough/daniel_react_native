import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, View} from "react-native";
import {readingPlan} from "@/constants/reading_plan";
import {useDispatch, useSelector} from "react-redux";
import {setWeek} from "@/store/selectedWeekSlice";
import type {RootState} from "@/store/store";

const CustomDrawer = (props: any) => {
    const selectedWeek = useSelector((state: RootState) => state.selectedWeek);
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('@/assets/images/lion_head_with_footer.png')}
                    style={styles.headerImage}
                    resizeMode="contain"
                />
            </View>

            {readingPlan.map(item => (
                <DrawerItem
                    key={item.weekNumber}
                    focused={item.weekNumber === selectedWeek.week.weekNumber}
                    label={() => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.titleText}>Week {item.weekNumber}</Text>
                                <Text style={styles.subtitleText}>{item.passage}</Text>
                            </View>
                        </View>
                    )}
                    onPress={() => {
                        dispatch(setWeek(item));
                        props.navigation.closeDrawer();
                    }}
                />
            ))}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerContainer: {
        height: 150, // Adjust as needed
        width: '100%',
        marginBottom: 10,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitleText: {
        fontSize: 14,
    }
});

export default CustomDrawer;