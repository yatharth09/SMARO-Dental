interface BranchTypes {
    id: number;
    branch_name:string;
	branch_address:string;
	contact_no:string;
	email:string;
	timing:string;
	client_id:number;
	admin_id:number;
	client_name:string;
	inserted_by:number;
	inserted_time:Date;
	status:number;
	location_lat_long:string;
	available_tests:string;
}

export type {BranchTypes}
