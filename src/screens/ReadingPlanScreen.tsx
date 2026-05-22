import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, View} from "react-native";
import {readingPlan} from "@/constants/reading_plan";
import {Drawer} from "expo-router/drawer";

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('@/assets/images/lion_head_with_footer.png')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            </View>

            {readingPlan.map(item => (
                <DrawerItem
                    key={item.weekNumber}
                    label={() => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Week {item.weekNumber}</Text>
                                <Text>{item.passage}</Text>
                            </View>
                            {/*{item.completed && <Text style={{color}}>C</Text>}*/}
                        </View>
                    )}
                    onPress={() => {
                        console.log(`Navigate to ${item.passage}`);
                    }}
                />
            ))}
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        </Drawer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 150, // Adjust as needed
        width: '100%',
        marginBottom: 10,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
});
