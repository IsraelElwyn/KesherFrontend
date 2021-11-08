import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";
import ChangePassword from "../components/changePassword";

export default function ChangePasswordScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                על מנת לשמור על פרטיותכם, יש לשנת סיסמה כל 90 יום.
            </Text>
            <ChangePassword />
            <Image
                style={styles.image}
                source={require("../assets/images/purple-logo.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
    },
    title: {
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        paddingRight: "10%",
        paddingLeft: "7%",
        paddingTop: "15%",
    },
    image: {
        width: globalStyles.window.width * 0.85,
        height: globalStyles.window.width * 0.85,
        alignSelf: "center",
    },
});
