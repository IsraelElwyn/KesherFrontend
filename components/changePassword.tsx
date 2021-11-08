import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import api from "../api";
import { useAppDispatch } from "../app/hooks";
import globalStyles from "../assets/globalStyles";
import SmallButton from "./buttons/smallButton";
import ResetPasswordForm from "./forms/resetPasswordForm";
import { updateDaysSinceChangePassword } from "../features/user/user-slice";

export default function ChangePassword() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm();

    const handleChangePassword = async (data: any) => {
        try {
            await api.users().changePassword(data);
            dispatch(
                updateDaysSinceChangePassword({
                    daysSinceChangePassword: 0,
                })
            );
            reset();
            alert(t("Password Changed Seccessfully"));
        } catch (error) {
            alert("שגיאה באחד השדות");
            reset();
        }
    };
    return (
        <View>
            <Text style={styles.title}>{t("Reset Password")}</Text>
            <ResetPasswordForm
                control={control}
                errors={errors}
                getValues={getValues}
            />
            <SmallButton
                text={t("Confirm")}
                onPress={handleSubmit(handleChangePassword)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
