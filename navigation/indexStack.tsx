import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/header";
import globalStyles from "../assets/globalStyles";
import ReportStack from "./reportStack";
import mainDrawer from "./mainDrawer";
import SchoolDetailsScreen from "../screens/admin/schoolDetailsScreen";
import { useAppSelector } from "../app/hooks";
import ChangePasswordScreen from "../screens/changePasswordScreen";

const Stack = createStackNavigator();
export default function IndexStack() {
    const daysSinceChangePassword = useAppSelector(
        (state) => state.user.daysSinceChangePassword
    );

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: globalStyles.backgroundColor },
                headerShown: true,
                header: () => <Header />,
            }}
        >
            {daysSinceChangePassword > 90 && (
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePasswordScreen}
                    options={{ headerShown: false }}
                />
            )}

            <Stack.Screen
                name="Drawer"
                component={mainDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ReportStack" component={ReportStack} />
            <Stack.Screen
                name="SchoolDetails"
                component={SchoolDetailsScreen}
            />
        </Stack.Navigator>
    );
}
