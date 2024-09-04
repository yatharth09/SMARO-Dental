import axios from "axios";
import {getApiToken} from "@/storage/storage";
import {ensureHTTPS} from "@/utils/utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const OHIF_SERVER_URL = import.meta.env.VITE_OHIF_SERVER_URL;
export const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;
export const AWS_BUCKET_URL = import.meta.env.VITE_AWS_BUCKET_URL;

export const api = {
    get: async (url: string, params?: any) => {
        const token = getApiToken();
        url = ensureHTTPS(url);
        const config = {
            headers: {
                Token: token,
            },
            params,
        };
        return axios.get(url, config);
    },

    post: async (url: string, formData: any, headers = {}) => {
        const token = getApiToken();
        const config = {
            method: "post",
            url: ensureHTTPS(url),
            headers: {
                ...headers,
                Token: token,
            },
            data: formData,
        };
        return axios(config);
    },
    put: async (url: string, params: any, headers = {}) => {
        const token = getApiToken();
        const config = {
            method: "put",
            url: ensureHTTPS(url),
            headers: {
                ...headers,
                Token: token,
            },
            data: params,
        };
        return axios(config);
    },
    delete: async (url: string, params: any, headers = {}) => {
        const token = getApiToken();
        const config = {
            method: "delete",
            url: ensureHTTPS(url),
            headers: {
                ...headers,
                Token: token,
            },
            data: params,
        };
        return axios(config);
    },
    endpoints: {
        auth: {
            login: BASE_URL + "/auth/radiologist/login",
            forgot_password: BASE_URL + "/auth/radiologist/forget-password",
            verify_otp: BASE_URL + "/auth/radiologist/verify-otp",
            reset_password: BASE_URL + "/auth/radiologist/reset-password"

        },
        profile:
            {
                get: BASE_URL + "/radiologist",
                update: BASE_URL + "/radiologist/update",
                update_profile: BASE_URL + "/profiles/radiologist",
                change_password: BASE_URL + "/auth/radiologist/change-password"
            },
        patients: {
            get: BASE_URL + "/patient",
            create: BASE_URL + "/patient/create",
            update: BASE_URL + "/patient/update",
            delete: BASE_URL + "/patient/deactivate",
        },
        patientRadiologist: {
            get: BASE_URL + "/patient/profile",

        },
        report: {
            by_patient_id: BASE_URL + "/diagnostics/patient/report/by-patient-id",
            all: BASE_URL + "/patient/report/all",
            get: BASE_URL + "/diagnostics/patient/report",
            view: BASE_URL + "/diagnostics/patient/report/by-patient-id",
            create: BASE_URL + "/diagnostics/patient/report/create",
            update: BASE_URL + "/diagnostics/patient/report/update",
            delete: BASE_URL + "/patient/deactivate",
        },
        report_analysis: {
            get: {
                id: BASE_URL + "/patient/report/analysis",
                radiologist: BASE_URL + "/radiologist/report/analysis",
                patient: BASE_URL + "/radiologist/report/analysis/patient",
            },
            update: BASE_URL + "/patient/report/analysis/update",
            reportPDF: BASE_URL + "/patient/report/analysis/pdf",
        },
        branch: {
            get: BASE_URL + "/branch/getAll",
            create: BASE_URL + "/branch/create",
            update: BASE_URL + "/branch/update",
            delete: BASE_URL + "/branch/delete",
            get_by_report_id: BASE_URL + "/branch/by/report-id",
        },
        dashboard: {
            preview: BASE_URL + "/dashboard/preview",
            report: BASE_URL + "/dashboard/report/analysis/completed/all"
        },
        upload: {
            image: BASE_URL + "/upload/picture",
            document: BASE_URL + "/upload/picture",
        },
        organisation: {
            get: BASE_URL + "/organisation/get-all",
        },
        state: {
            get: BASE_URL + "/getStates"
        },
        test_type: {
            get: BASE_URL + "/test-type"
        },
        test_subtype: {
            get: BASE_URL + "/subtype"
        },
        dicom: {
            upload: BASE_URL + "/upload/dicom/file "
        },
        wallet: {
            price:
                {
                    create: BASE_URL + "/test/price",
                    get: BASE_URL + "client/test/price",
                    update: BASE_URL + "/test/price",

                }
        },
        template: {
            create: BASE_URL + "/report-templates",
            get_all: BASE_URL + "/report-templates/get-all",
            get: BASE_URL + "/report-templates",
            update: BASE_URL + "/report-templates"
        },
        ml: {
            get: BASE_URL + "/report-ml",
        },
        medical_council: {
            get: BASE_URL + "/medical-councils",
        },
        medical_degree: {
            get: BASE_URL + "/medical-degrees",
        },
        medical_colleges: {
            get: BASE_URL + "/medical-colleges",
        },
        speciality: {
            get: BASE_URL + "/speciality",
        },
        hospitals: {
            get: BASE_URL + "/hospitals",
        },
        radiologist: {
            get: BASE_URL + "/radiologist"
        },
        newReportTemplate: {
            getNewReportTemplate: BASE_URL + "/new/template/report",
            getSections: BASE_URL + "/master/template/section",
        },
        message: {
            init: BASE_URL + "/chat/sender/init/conversation",
            get: BASE_URL + "/chat/get/messages",
            categories: BASE_URL + "/chat/categories",
            startConversation: BASE_URL + "/chat/sender/init/conversation",
            conversations: BASE_URL + "/chat/sender/conversations",
        },
        tickets: {
            ticketList: BASE_URL + "/chat/sender/conversations"
        },
        reportImages: {
            create: BASE_URL + "/patient/report/analysis/image/create",
            get: BASE_URL + "/patient/report/analysis/image",
            update: BASE_URL + "/patient/report/analysis/image/update"
        },
        radiologistSignature: {
            create: BASE_URL + "/radiologist/signature/create",
            get: BASE_URL + "/radiologist/signature",
            update: BASE_URL + "/radiologist/signature/update",
            delete: BASE_URL + "/radiologist/signature/delete",
        },
        getPdf: {
            get: BASE_URL + "/patient/report/pdf",
            html:BASE_URL + "/patient/report/docx",
        },

        authCheck: BASE_URL + "/check-auth-status"

    },
};
