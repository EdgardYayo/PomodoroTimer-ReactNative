import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTab, setCurrentTab, setTime }) {

    async function handlePress(index){
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTab(index);
        setTime(newTime * 60);
    }


    return (
        <View style={{ flexDirection: "row" }}>
            {options.map((item, index) => (
                <TouchableOpacity 
                  style={[
                    styles.itemStyles, 
                    styles.itemBorder(currentTab, index)
                  ]} 
                  key={index}
                  onPress={() => handlePress(index)}
                >
                    <Text style={{ fontWeight: "bold" }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyles: {
        width: "33.3%",
        alignItems: "center",
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        borderColor: "white",
        marginVertical: 20,
    },

    itemBorder: (currentTab, index) => ({
        borderColor: index === currentTab ? "white" : "transparent",
    })
})