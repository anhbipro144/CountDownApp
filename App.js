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

// Vars
const image = {
    uri: "https://raw.githubusercontent.com/naseemakhtar994/Stopwatch/master/app/src/main/res/drawable/background.png",
};

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [isTimeout, setIstimeout] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [sec, setSec] = useState(0);
    let myInterval;

    // handling
    const handlingRemain = (h, m, s) => {
        const now = new Date();
        const future = new Date(
            now.getTime() +
                (Number(h) * 60 * 60 * 1000 +
                    Number(m) * 60000 +
                    Number(s) * 1000)
        );
        return future;
    };
    // Start Timer

    const onPress = () => {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
            const future = handlingRemain(hour, minute, sec);

            myInterval = setInterval(() => {
                const now = new Date().getTime();
                const remain = future - now;
                const hours = Math.floor(remain / (1000 * 60 * 60));
                const minutes = Math.floor(
                    (remain % (60 * 60 * 1000)) / (1000 * 60)
                );
                const seconds = Math.floor((remain % (60 * 1000)) / 1000);

                if (remain < 0) {
                    clearInterval(myInterval);
                    console.log("Time out!!");
                    setIsRunning(false);
                    setIstimeout(true);
                } else {
                    setHour(hours);
                    setMinute(minutes);
                    setSec(seconds);
                }
            }, 1000);
        }
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
                        TIMER
                    </Text>
                </View>
                {/* Box 2 */}
                <View style={styles.boxTwo}>
                    {isRunning ? (
                        <View style={styles.boxTwo2}>
                            <Text style={styles.white}>{hour}</Text>:
                            <Text style={styles.white}>{minute}</Text>:
                            <Text style={styles.white}>{sec}</Text>
                        </View>
                    ) : (
                        <View style={styles.boxTwo}>
                            {/* Hour */}
                            <TextInput
                                value={hour}
                                onChangeText={setHour}
                                keyboardType="numeric"
                                style={{
                                    width: 30,
                                    borderBottomColor: "white",
                                    borderBottomWidth: 1,
                                    color: "white",
                                    textAlign: " center",
                                    fontSize: 30,
                                }}
                            ></TextInput>
                            : {/* Minute */}
                            <TextInput
                                value={minute}
                                onChangeText={setMinute}
                                keyboardType="numeric"
                                style={{
                                    width: 30,
                                    borderBottomColor: "white",
                                    borderBottomWidth: 1,
                                    color: "white",
                                    textAlign: " center",
                                    fontSize: 30,
                                }}
                            ></TextInput>
                            : {/* Seconds */}
                            <TextInput
                                value={sec}
                                onChangeText={setSec}
                                keyboardType="numeric"
                                style={{
                                    width: 30,
                                    borderBottomColor: "white",
                                    borderBottomWidth: 1,
                                    color: "white",
                                    textAlign: " center",
                                    fontSize: 30,
                                }}
                            ></TextInput>
                        </View>
                    )}
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
                <View style={styles.boxFour}></View>
                {/* Box 5 */}
                <View style={styles.boxFive}>
                    {isRunning ? (
                        <Text></Text>
                    ) : (
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
                    )}
                    {isTimeout ? (
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            Time Out!!!
                        </Text>
                    ) : (
                        <Text></Text>
                    )}
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
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 20,
        padding: 10,
    },
    boxTwo2: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 27,
        padding: 10,
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
    white: {
        color: "white",
        fontSize: 30,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});
