import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import api from "../api";
import UserCard from "./userCard";
import { SwipeListView } from "react-native-swipe-list-view";
import globalStyles from "../assets/globalStyles";

export default function ChildrenListCheck({ schoolId }: { schoolId: string }) {
    const [children, setChildren] = useState();

    useEffect(() => {
        const getChildren = async () => {
            if (!schoolId) {
                return;
            }
            const childrenResponse = await api.schools().getChildren(schoolId);

            //ANCHOR update profile pic
            let childrenList = childrenResponse.data.children;
            childrenList.forEach((child: any) => {
                if (!child.profilePic.startsWith("http")) {
                    child.profilePic = `${api.URL}/${child.profilePic}`
                        .split(/\\/g)
                        .join("/");
                }
            });
            setChildren(childrenList);
        };

        getChildren();
    }, [schoolId]);

    const handleUnactiveChildPress = (child: any) => {
        Alert.alert(
            "הסרת ילד מהגן",
            `האם את/ה בטוח/ה שאת/ה רוצה להסיר את ${child.name.first} ${child.name.last} מהגן?`,
            [
                {
                    text: "ביטול",
                    onPress: () => console.log("canceled"),
                    style: "cancel",
                },
                {
                    text: "אני בטוח/ה",
                    onPress: async () => {
                        await api
                            .children()
                            .updateChildActive(child._id, false);
                        setChildren((children) =>
                            children.map((currentChild) =>
                                currentChild._id === child._id
                                    ? { ...currentChild, active: "false" }
                                    : currentChild
                            )
                        );
                    },
                },
            ]
        );
    };
    console.log(children);

    return (
        <View style={styles.container}>
            <SwipeListView
                data={children}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data, rowMap) => (
                    <View>
                        {data.item.active === true && (
                            <UserCard
                                name={data.item.name}
                                image={data.item.profilePic}
                            />
                        )}
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <TouchableOpacity
                        style={styles.rowBack}
                        onPress={() => handleUnactiveChildPress(data.item)}
                    >
                        <Text style={styles.text}>הסרת</Text>
                        <Text style={styles.text}>ילד מהגן</Text>
                    </TouchableOpacity>
                )}
                leftOpenValue={75}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "92%",
        alignSelf: "center",
    },
    list: {
        paddingTop: 25,
    },
    rowBack: {
        height: "100%",
        paddingTop: 5,
        flex: 1,
    },
    text: {
        color: globalStyles.color.text,
        fontSize: 14,
        fontFamily: globalStyles.font.semiBold,
        paddingLeft: 4,
    },
});
