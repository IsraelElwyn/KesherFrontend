import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportSubCategoryScreen from "../screens/teacher/reportSubCategoryScreen";
import StartReportScreen from "../screens/teacher/startReportScreen";
import CompleteReportScreen from "../screens/teacher/completeReportScreen";
import globalStyles from "../assets/globalStyles";

const Stack = createStackNavigator();
export default function ReportStack({ navigation, route }: any) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: globalStyles.backgroundColor },
            }}
        >
            {/* <Stack.Screen
                name="ChildrenList"
                component={ChildrenListReportScreen}
            /> */}

            <Stack.Screen name="StartReport" component={StartReportScreen} />
            <Stack.Screen
                name="SubCategory"
                component={ReportSubCategoryScreen}
            />
            <Stack.Screen
                name="CompleteReport"
                component={CompleteReportScreen}
            />
        </Stack.Navigator>
    );
}
