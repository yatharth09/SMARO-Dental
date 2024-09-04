export interface TemplateTypes {
    id:number;
    report_template_name:string;
    findings:string;
    impression:string;
    comments:string;
    test_type_id:number;
    test_sub_type_id:number;
    inserted_time:string;
    estatus:number;
    test_type:string;
    test_sub_type:string;
    short_code:string;
    date: Date;
    status: "Active"|"In Active";
}
