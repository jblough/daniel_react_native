import {Stack} from "expo-router";
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useTheme} from "@/hooks/useTheme";

export const Licensing = () => {
    const themeColors = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: themeColors.colors.background,
        },
        licensingText: {
            fontSize: 14,
            padding: 10,
            color: themeColors.colors.text,
        },
    });

    return (
        <Stack.Screen options={{
            headerShown: true,
            title: "Licensing",
            headerStyle: {backgroundColor: themeColors.colors.header},
            headerTintColor: themeColors.colors.text,
        }}>
            <ScrollView style={styles.container}>
                <Text style={styles.licensingText}>
                    Scripture quotations marked “ESV” are from the ESV® Bible (The Holy Bible, English Standard
                    Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission.
                    All rights reserved. The ESV text may not be quoted in any publication made available to the public
                    by a Creative Commons license. The ESV may not be translated into any other language.
                </Text>
                <Text style={styles.licensingText}>
                    Users may not copy or download more than 500 verses of the ESV Bible or more than one half of any
                    book of the ESV Bible.
                </Text>
                <Text style={styles.licensingText}>
                    Unless otherwise indicated, all Scripture quotations are from the ESV® Bible (The Holy Bible,
                    English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used
                    by permission. All rights reserved. The ESV text may not be quoted in any publication made available
                    to the public by a Creative Commons license. The ESV may not be translated into any other language.

                    Users may not copy or download more than 500 verses of the ESV Bible or more than one half of any
                    book of the ESV Bible.
                </Text>
            </ScrollView>
        </Stack.Screen>
    );
};


export default Licensing