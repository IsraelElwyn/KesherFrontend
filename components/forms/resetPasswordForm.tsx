import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import globalStyles from "../../assets/globalStyles";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ResetPasswordForm({ control, errors, getValues }: any) {
    const { t } = useTranslation();

    return (
        <View>
            <View style={styles.inputBox}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        // pattern:
                        //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                        maxLength: 50,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.text}
                            placeholderTextColor="#C4C4C6"
                            placeholder={t("Old Password")}
                            textContentType="password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="oldPassword"
                    defaultValue=""
                />
                <View style={styles.newPasswordView}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern:
                                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                            maxLength: 50,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder={t("New Password")}
                                textContentType="newPassword"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="newPassword"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern:
                                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                            maxLength: 50,
                            validate: (value) =>
                                value === getValues("newPassword"),
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder={t("New Password Again")}
                                textContentType="newPassword"
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="newPasswordAgain"
                        defaultValue=""
                    />
                </View>
            </View>

            {errors.oldPassword && (
                <Text style={styles.errorText}>
                    {t("Invalid Old Password")}
                </Text>
            )}
            {errors.newPassword && (
                <Text style={styles.errorText}>
                    {t("Invalid New Password")}
                </Text>
            )}
            {errors.newPasswordAgain && (
                <Text style={styles.errorText}>
                    {t("Inmatching Passwords")}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        // width: "90%",
        // alignSelf: "center",
    },
    text: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        color: globalStyles.color.text,
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#C4C4C6",
        marginBottom: 7,
    },
    errorText: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        marginRight: "5%",
        color: globalStyles.color.text,
    },
    newPasswordView: {
        marginTop: 7,
    },
});
