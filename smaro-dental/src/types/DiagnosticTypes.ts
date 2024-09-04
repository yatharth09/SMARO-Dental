
interface DiagnosticCenter {
    id:number;
    branch_name: string;
    branch_address: string;
    contact_no: string;
    email: string;
    timing: string;
    client_id: string;
    inserted_by: string;
    tin: string;
    business_licence: string;
    hipaa: boolean;
    regulatory_details: string;
    no_of_Img_machines: number;
    types_of_Img_equipments: string;
    hours_of_operation: string;
    dicom_comp_of_Img_equip: string;
    info_on_pacs: string;
    Internet_con_details: string;
    res_time_exp_for_Img_analysis: string;
    avail_urgent_cases: boolean;
    reporting_formats: string;
    accreditation_info: string;
    radiologists_credentials: string;
    sec_measures_for_data_protection: string;
    access_control_mechanisms_data: string;
    disaster_recovery_plan: string;
    emr_system_used: string;
    com_proto_img_reports: string;
    billing_contact_info: string;
    comments: string;
}


interface DiagnosticTypes {
    center_name:string;
    name: string;
    contact_name: string;
    contact_email: string;
    address: string;
    active_status: string;
    contact_no: string;
    diagnostic_center_id:string;
    created_at:string;
    number:string;
}

export type {
    DiagnosticCenter,
    DiagnosticTypes,
}
