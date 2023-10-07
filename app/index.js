import { View, ScrollView, Text, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from "react";
import Header from '../components/Header';
import Timer from '../components/Timer';
// import { Audio } from "expo-av"

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App(){
    const [isWorking, setIsWorking] = useState(false);
    const [time, setTime] = useState(25 * 60);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        let interval = null;

        if(isWorking) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000)
        } else {
            clearInterval(interval);
        }

        if(time === 0){
            setIsWorking(prev => !prev);
            setTime(isWorking ? 300 : 1500);
        }

        return () => {
            clearInterval(interval);
        }

    }, [isWorking, time])

    const handleStartStop = () => {
        //playSound();
        setIsWorking(!isWorking);
    }

    // IF WE WANTED TO PLAY A CLICK SOUND OR WHATEVER SOUND
    // const playSound = async () => {
    //     const { sound } = await Audio.Sound.createAsync(
    //         require("./assets/click.mp3")
    //     )
    //     await sound.playAsync();
    // }
    return (
        <ScrollView style={[
          styles.container, 
          { backgroundColor: colors[currentTab] }
        ]}>
            <Text style={styles.text}>Pomodoro</Text>
            <Header 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab}
              setTime={setTime}
            />
            <Timer time={time}/>
            <TouchableOpacity 
              style={styles.btn}
              onPress={() => handleStartStop()}
            >
                <Text style={styles.btnText}>{ isWorking ? "STOP": "START" }</Text>
            </TouchableOpacity>
            <Image
              source={require("../assets/clock.png")}
              style={styles.clock}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' && 30,
        paddingHorizontal: 15,
    },

    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },

    btnText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
    },

    btn: {
        backgroundColor: "#333",
        padding: 15,
        marginTop: 15,
        borderRadius: 15,
    },

    clock: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    }

});