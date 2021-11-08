import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../app/hooks";
import ChildrenListCheck from "../../components/childrenListCheck";

export default function ChildrenManagmentScreen() {
    const school = useAppSelector((state) => state.user.currentSchool);

    return (
        <View>
            <ChildrenListCheck schoolId={school._id} />
        </View>
    );
}

const styles = StyleSheet.create({});
