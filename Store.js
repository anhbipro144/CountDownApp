import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { React } from "react";
import { useState } from "react";
import {
    Ionicons,
    MaterialCommunityIcons,
    Entypo,
    AntDesign,
    FontAwesome,
    Feather,
} from "@expo/vector-icons";

import formatTime from "minutes-seconds-milliseconds";

// Vars
const image = {
    uri: "https://raw.githubusercontent.com/naseemakhtar994/Stopwatch/master/app/src/main/res/drawable/background.png",
};

export default function App() {
    const [laps, setLaps] = useState([]);
    const [status, setStatus] = useState(false);
    const [timeStart, setTimestart] = useState(null);
    const [timeElapse, setTimeElapse] = useState(null);
    const [myInterval, setMyInterval] = useState(null);
    // handling
    const onPress = () => {
        if (status) {
            setStatus(false);
            setTimestart(null);
            setLaps([]);
            clearInterval(myInterval);
            setTimeElapse(null);
        } else {
            let curTime = new Date();
            setStatus(true);
            setTimestart(curTime);
            setLaps([]);
            let tmp = setInterval(() => {
                setTimeElapse(new Date() - curTime);
            }, 10);
            setMyInterval(tmp);
        }
    };

    const handlingLap = () => {
        let time = new Date() - timeStart;
        console.log(laps);
        console.log(time);
        setLaps([...laps, time]);
    };

    return (
        <View style={styles.wrap}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
            >
                {/* Box 1 */}
                <View style={styles.boxOne}>
                    <Entypo
                        style={{ color: "white" }}
                        name="stopwatch"
                        size={50}
                        color="black"
                    />
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        STOPWATCH
                    </Text>
                </View>
                {/* Box 2 */}
                <View style={styles.boxTwo}>
                    <Text
                        style={{
                            fontSize: 50,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        {timeElapse !== null
                            ? formatTime(timeElapse)
                            : "00:00:00"}
                    </Text>
                </View>

                {/* Box 3 */}
                <View style={styles.boxThree}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        H
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        M
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        S
                    </Text>
                </View>
                {/* Box 4 */}
                <View style={styles.boxFour}>
                    {laps.map((elem, index) => {
                        return (
                            <Text key={index} style={{ color: "white" }}>
                                Lap {index + 1} : {formatTime(elem)}
                            </Text>
                        );
                    })}
                </View>
                {/* Box 5 */}
                <View style={styles.boxFive}>
                    {!status ? (
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.button}
                        >
                            <Feather
                                name="play-circle"
                                size={50}
                                color="white"
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.button}
                        >
                            <Feather
                                name="stop-circle"
                                size={50}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button}>
                        <Ionicons
                            onPress={handlingLap}
                            name="stop-sharp"
                            size={50}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#313de9",
        gap: 10,
        flexDirection: "column",
        height: 160,
        margin: 100,
        flex: 0.8,
    },
    boxOne: {
        color: "white",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
    },
    boxTwo: {
        gap: 1,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    boxThree: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 60,
    },
    boxFour: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 10,
        gap: 5,
    },
    boxFive: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 5,
        gap: 10,
    },

    part: {
        padding: 10,
        flexDirection: "row",
    },
    textInput: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: 30,
        marginLeft: 60,
        marginRight: 20,
    },
    button: {
        padding: 20,
        alignItems: "center",
    },
    text: {
        color: "#48cae4",
        fontSize: 18,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});
