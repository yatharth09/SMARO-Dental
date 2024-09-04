interface AnalysisTypes {
    report_analysis_id:number;
    patient_report_id:number;
    findings:string;
    impression:string;
    comments:string;
    report_status:string;
    radiologist_id:number;
    assigned_by:number;
    registration_date?: any
    updated_time?:any;
}

interface PatientTypes {
     gender:string;
     dob:string|Date;
     patient_name:string;
     patient_email:string;
     patient_mobile:string;
     address: string;
     age:number;
}

export interface ReportTypes  {
    id: number; // report table id
    ref_code:string;
    patient_id: number;
    patient_study_id: string;
    test_type_id: number;
    test_sub_type_id: string;
    techniques: string;
    clinical_history: string | null;
    clinical_history_file: string | null;
    results_type: string;
    doctor_id: number;
    hospital_id: number;
    client_login_id: number;
    client_id:number;
    branch_id:number;
    doctor_name: string | null;
    test_type: string;
    test_sub_type: string;
    report_status: string;
    clinical_history_count: number;
    priority_type: string;
    patient_study_instance_id:string;
    inserted_time:string;
    estatus:number;
    short_code:string;
    client_name:string;
    branch_name:string;
    impression:string;
}


export type ReportAnalysisTypes = AnalysisTypes & ReportTypes & PatientTypes;
