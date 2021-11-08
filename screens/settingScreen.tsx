import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import globalStyles from "../assets/globalStyles";
import ChangePassword from "../components/changePassword";

export default function SettingScreen() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(0);

    const options = [
        { label: "English", value: "en" },
        { label: "עברית", value: "he" },
    ];

    useEffect(() => {
        getLanguage();
    }, []);

    const handleChangeLanguage = async (language: string) => {
        await AsyncStorage.setItem("language", language);
        i18n.changeLanguage(language);
    };

    const getLanguage = async () => {
        const lang = await AsyncStorage.getItem("language");
        const langIndex = options.findIndex((item) => item.value === lang);
        setLanguage(langIndex === -1 ? 0 : langIndex);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ChangePassword />
                <SwitchSelector
                    initial={language}
                    value={language}
                    onPress={handleChangeLanguage}
                    backgroundColor={globalStyles.color.purple}
                    borderColor={globalStyles.color.purple}
                    buttonColor="white"
                    selectedColor={globalStyles.color.text}
                    textColor="white"
                    selectedTextStyle={{
                        fontFamily: globalStyles.font.semiBold,
                    }}
                    textStyle={{ fontFamily: globalStyles.font.semiBold }}
                    height={50}
                    hasPadding
                    options={options}
                />
            </View>
        </TouchableWithoutFeedback>
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
        marginRight: 6,
        paddingTop: 30,
        paddingBottom: 10,
    },
});
