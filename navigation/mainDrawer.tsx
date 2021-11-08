import React from "react";
import HomeScreen from "../screens/parent/homeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import globalStyles from "../assets/globalStyles";
import DrawerIcons from "../assets/icons/drawerIcons";
import CoronaScreen from "../screens/parent/coronaScreen";
import SettingScreen from "../screens/settingScreen";
import DailyReportScreen from "../screens/parent/dailyReportScreen";
import ElwynScreen from "../screens/elwynScreen";
import TopTabs from "./topTabs";
import Header from "../components/header";
import EventsBoardScreen from "../screens/eventsBoardScreen";
import AddChildScreen from "../screens/teacher/addChildScreen";
import CustomDrawer from "../components/customDrawer";
import { useAppSelector } from "../app/hooks";
import SchoolsListScreen from "../screens/admin/schoolsListScreen";
import AddNewSchoolScreen from "../screens/admin/addNewSchoolScreen";
import { useTranslation } from "react-i18next";
import ChildrenListReportScreen from "../screens/teacher/childrenListReportScreen";
import ChildrenManagmentScreen from "../screens/teacher/childrenManagmentScreen";
import { FontAwesome5 } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
export default function MainDrawer(props: any) {
    const { t } = useTranslation();
    const role = useAppSelector((state) => state.user.role);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={{
                borderTopRightRadius: 40,
                borderBottomRightRadius: 40,
                width: "80%",
            }}
            screenOptions={{
                headerShown: true,
                header: () => <Header />,
            }}
            drawerContentOptions={{
                style: {
                    marginTop: -30,
                },
                labelStyle: {
                    fontFamily: globalStyles.font.semiBold,
                    fontSize: 20,
                    lineHeight: 24,
                    alignItems: "center",
                    textAlign: "right",
                    color: "#999999",
                },
                itemStyle: {
                    borderBottomWidth: 0.6,
                    borderBottomColor: "#C4C4C4",
                },
                activeTintColor: "white",
            }}
            sceneContainerStyle={{
                backgroundColor: globalStyles.backgroundColor,
            }}
        >
            {role === "Admin" && (
                <Drawer.Screen
                    name="AdminHome"
                    component={SchoolsListScreen}
                    options={{
                        title: t("Home Page"),
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Parent" && (
                <Drawer.Screen
                    name="ParentHome"
                    component={HomeScreen}
                    options={{
                        title: t("Home Page"),
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Teacher" && (
                <Drawer.Screen
                    name="TeacherHome"
                    component={TopTabs}
                    options={{
                        title: t("Home Page"),
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Therapist" && (
                <Drawer.Screen
                    name="TherapistHome"
                    component={ChildrenListReportScreen}
                    options={{
                        title: t("Home Page"),
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {/* {role === "Parent" && (
                <Drawer.Screen
                    name="Corona"
                    component={CoronaScreen}
                    options={{
                        title: "הצהרת קורונה",
                        drawerIcon: () => DrawerIcons.corona,
                        header: () => <Header title="הצהרת קורונה" />,
                    }}
                />
            )} */}

            {role === "Teacher" && (
                <Drawer.Screen
                    name="AddChild"
                    component={AddChildScreen}
                    options={{
                        title: t("Add Child"),
                        drawerIcon: () => DrawerIcons.plus,
                        header: () => <Header title={t("Add Child")} />,
                    }}
                />
            )}

            {role === "Teacher" && (
                <Drawer.Screen
                    name="ChildrenManagment"
                    component={ChildrenManagmentScreen}
                    options={{
                        title: t("Managment Children"),
                        drawerIcon: () => (
                            <FontAwesome5
                                name="user-cog"
                                size={24}
                                color="#9C9C9A"
                            />
                        ),
                        header: () => (
                            <Header title={t("Managment Children")} />
                        ),
                    }}
                />
            )}

            {role === "Admin" && (
                <Drawer.Screen
                    name="AddSchool"
                    component={AddNewSchoolScreen}
                    options={{
                        title: t("Add School"),
                        drawerIcon: () => DrawerIcons.plus,
                        header: () => <Header title={t("Add School")} />,
                    }}
                />
            )}

            {role === "Parent" && (
                <Drawer.Screen
                    name="DailyReport"
                    component={DailyReportScreen}
                    options={{
                        title: t("Daily Report"),
                        drawerIcon: () => DrawerIcons.checklist,
                        header: () => <Header title={t("Daily Report")} />,
                    }}
                />
            )}

            {(role === "Teacher" || role === "Parent") && (
                <Drawer.Screen
                    name="EventsBoard"
                    component={EventsBoardScreen}
                    options={{
                        title: t("Events Board"),
                        drawerIcon: () => DrawerIcons.calender,
                        header: () => <Header title={t("Events Board")} />,
                    }}
                />
            )}

            <Drawer.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    title: t("Settings"),
                    drawerIcon: () => DrawerIcons.settings,
                    header: () => <Header title={t("Settings")} />,
                }}
            />

            <Drawer.Screen
                name="Elwyn"
                component={ElwynScreen}
                options={{
                    title: t("Elwyn's Website"),
                    drawerIcon: () => DrawerIcons.elwyn,
                    header: () => <Header title={t("Elwyn's Website")} />,
                }}
            />
        </Drawer.Navigator>
    );
}
