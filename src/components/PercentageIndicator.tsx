import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Ionicons from "@expo/vector-icons/Ionicons";

interface PercentageIndicatorProps {
    percentage: number;
    done?: boolean;
}

export default function PercentageIndicator({percentage, done}: PercentageIndicatorProps) {
    const radius = 24;
    const strokeWidth = 6;
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const color = '#3498db';

    return (
        <View style={{width: radius * 2, height: radius * 2, justifyContent: 'center', alignItems: 'center'}}>
            <Svg width={radius * 2} height={radius * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                    fill={"#ddd"}
                />
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius} ${radius})`} // Starts progress at the top (12 o'clock)
                />
            </Svg>

            {percentage < 100 && !done &&
                <View style={styles.textOverlay}>
                    <Text style={[styles.text, {fontSize: radius * 0.4}]}>{percentage}%</Text>
                </View>}

            {(percentage >= 100 || done) &&
                <View style={styles.textOverlay}>
                    <Ionicons style={styles.text} name={"checkmark"} size={32} color={color}/>
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    textOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});
