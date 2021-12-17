import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const URL = "https://kesher-web-app.azurewebsites.net";

const options = async () => {
    const token = await AsyncStorage.getItem("token");
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

export default {
    URL: URL,
    login() {
        return {
            login: (data: any) => axios.post(`${URL}/login`, data),
            sendHello: () => axios.get(`${URL}/hello`),
        };
    },
    users() {
        return {
            getMe: async () => axios.get(`${URL}/users/getMe`, await options()),
            createNewParent: async (data: any) =>
                axios.post(`${URL}/users/parent`, { data }, await options()),
            createNewTeacher: async (data: any) =>
                axios.post(`${URL}/users/teacher`, { data }, await options()),
            createNewTherapist: async (data: any) =>
                axios.post(`${URL}/users/therapist`, { data }, await options()),
            addSchoolToUser: async (schoolId: string, userId: string) =>
                axios.patch(
                    `${URL}/users/school`,
                    { schoolId, userId },
                    await options()
                ),
            changePassword: async (data: object) =>
                axios.patch(`${URL}/users/password`, data, await options()),
            getStaffsBySchoolId: async (schoolId: string) =>
                axios.get(
                    `${URL}/users/staffbyschool/${schoolId}`,
                    await options()
                ),
            getAllStaff: async () =>
                axios.get(`${URL}/users/staff/`, await options()),
            // move the getMe to here?
        };
    },
    children() {
        return {
            createNewChild: async (data: any) =>
                axios.post(`${URL}/children`, data, await options()),
            uploadImage: async (data: any) =>
                axios.patch(`${URL}/children/photo`, data, await options()),
            updateChildActive: async (id: string, isActive: boolean) =>
                axios.patch(
                    `${URL}/children/active/${id}`,
                    { isActive },
                    await options()
                ),
        };
    },
    schools() {
        return {
            getChildren: async (id: string) =>
                axios.get(`${URL}/schools/${id}`, await options()),
            addChildToSchool: async (schoolId: any, childId: any) =>
                axios.patch(
                    `${URL}/schools/children`,
                    { schoolId, childId },
                    await options()
                ),
            getSchoolEvents: async (id: string) =>
                axios.get(`${URL}/schools/events/${id}`, await options()),
            addNewEvent: async (schoolId: string, event: any) =>
                axios.patch(
                    `${URL}/schools/events/${schoolId}`,
                    { event },
                    await options()
                ),
            createNewSchool: async (data: any) =>
                axios.post(`${URL}/schools`, data, await options()),
        };
    },
    reports() {
        return {
            createNewReport: async (id: string) =>
                axios.post(
                    `${URL}/reports/newreport/${id}`,
                    null,
                    await options()
                ),
            getChildrenAttendance: async (ids: Array<String>) =>
                axios.post(
                    `${URL}/reports/attendances/`,
                    { ids },
                    await options()
                ),
            getAllChildReports: async (id: string) =>
                axios.get(`${URL}/reports/${id}`, await options()),
            getAllChildLatestReport: async (id: string) =>
                axios.get(`${URL}/reports/latestreport/${id}`, await options()),
            updateChildAttendance: async (id: string, attendance: boolean) =>
                axios.patch(
                    `${URL}/reports/child/${id}`,
                    { attendance },
                    await options()
                ),
            addSubReportToReport: async (id: string, subReports: any) =>
                axios.patch(
                    `${URL}/reports/subreport/${id}`,
                    { subReports },
                    await options()
                ),
            addCommentToReport: async (ReportId: string, comment: any) =>
                axios.patch(
                    `${URL}/reports/comment/${ReportId}`,
                    { comment },
                    await options()
                ),
            addImageToReport: async (data: any) =>
                axios.post(`${URL}/reports/image`, data, await options()),
        };
    },
};
