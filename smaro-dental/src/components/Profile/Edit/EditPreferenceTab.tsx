import React,{useEffect} from "react";

import * as Yup from "yup";
import {useFormik,FormikValues} from "formik";

import LabelWithInput from "@/components/Common/LabelWithInput";
import {InputEvent,InputTextAreaEvent,ProfileTypes} from "@/types";
import LabelSelectBox from "@/components/Common/LabelSelectBox";
import {isStr} from "@/utils/utils";

interface OwnProps {
    onSubmit:(params:ProfileTypes|FormikValues)=>unknown;
    radiologist:ProfileTypes;
}
type Props = OwnProps;
const validationSchema = Yup.object().shape({
        shift_timings: Yup.string().optional().label("Availability Hours or Shift Preferences"),
        participation_peer_review_programs: Yup.string().optional().label("Participation in Peer Review Programs"),
        commitment_quality_assurance_protocols: Yup.string().optional().label("Commitment to Quality Assurance Protocols"),
        ref_colleagues: Yup.string().optional().label("References from Previous Employers or Colleagues"),
        recom_endorsements: Yup.string().optional().label("Recommendations or Endorsements"),
        comments: Yup.string().optional().label("Additional Comments or Notes"),
        willingness_oncal: Yup.string().optional().label("Willingness for On-call or Emergency Cases"),
        pref_reporting_format: Yup.string().optional().label("Preferred Reporting Formats or Systems"),
});
const oncall_emergency_options = [
    {label:"Yes",value:true,color:"black"},
    {label:"No",value:false,color:"black"},
];
const StepThreeEditModal: React.FC<Props> = ({radiologist,onSubmit}) => {

    const initialValues = {
        shift_timings:"",
        participation_peer_review_programs: "",
        commitment_quality_assurance_protocols: "",
        ref_colleagues: "",
        recom_endorsements: "",
        comments: "",
        willingness_oncal: "",
        pref_reporting_format: "",
    }

    const {values,touched,errors,setFieldValue,handleSubmit} = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        onSubmit:(params:ProfileTypes|FormikValues)=>{
           onSubmit(params)
        }});

    const onChangeInputValue = (key:keyof ProfileTypes,e:InputEvent|InputTextAreaEvent)=>{
        void setFieldValue(key,e.target.value);
    }

    useEffect(() => {
        if(radiologist)
        {
            void setFieldValue("shift_timings",radiologist.shift_timings);
            void setFieldValue("participation_peer_review_programs",radiologist.participation_peer_review_programs);
            void setFieldValue("commitment_quality_assurance_protocols",radiologist.commitment_quality_assurance_protocols);
            void setFieldValue("ref_colleagues",radiologist.ref_colleagues);
            void setFieldValue("recom_endorsements",radiologist.recom_endorsements);
            void setFieldValue("comments",radiologist.comments);
            void setFieldValue("willingness_oncal",radiologist.willingness_oncal);
            void setFieldValue("pref_reporting_format",radiologist.pref_reporting_format);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radiologist]);

    return (
        <div className="w-full mt-10">
                   <div className="grid grid-cols-3 gap-10 items-end">
                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="Availability Hours or Shift Preferences"
                           onChange={(e:InputEvent)=>onChangeInputValue("shift_timings",e)}
                           value={values.shift_timings}
                           errorText={errors.shift_timings}
                           touched={touched.shift_timings}
                       />
                       <LabelSelectBox
                           label={"Willingness for On-call or Emergency Cases"}
                           value={values.willingness_oncal}
                           width={250}
                           theme="light"
                           setValue={(option)=>setFieldValue("willingness_oncal",option.value)}
                           options={oncall_emergency_options}
                       />
                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="Preferred Reporting Formats or Systems"
                           onChange={(e:InputEvent)=>onChangeInputValue("pref_reporting_format",e)}
                           value={values.pref_reporting_format}
                           errorText={errors.pref_reporting_format}
                           touched={touched.pref_reporting_format}
                       />
                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="Participation in Peer Review Programs"
                           onChange={(e:InputEvent)=>onChangeInputValue("participation_peer_review_programs",e)}
                           value={values.participation_peer_review_programs}
                           errorText={errors.participation_peer_review_programs}
                           touched={touched.participation_peer_review_programs}
                       />

                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="Commitment to Quality Assurance Protocols"
                           onChange={(e:InputEvent)=>onChangeInputValue("commitment_quality_assurance_protocols",e)}
                           value={values.commitment_quality_assurance_protocols}
                           errorText={errors.commitment_quality_assurance_protocols}
                           touched={touched.commitment_quality_assurance_protocols}
                       />

                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="References from Previous Employers or Colleagues"
                           onChange={(e:InputEvent)=>onChangeInputValue("ref_colleagues",e)}
                           value={values.ref_colleagues}
                           errorText={errors.ref_colleagues}
                           touched={touched.ref_colleagues}

                       />
                       <LabelWithInput
                           width="250"
                           theme="light"
                           label="Recommendations or Endorsements"
                           onChange={(e:InputEvent)=>onChangeInputValue("recom_endorsements",e)}
                           value={values.recom_endorsements}
                           errorText={errors.recom_endorsements}
                           touched={touched.recom_endorsements}
                       />
                   </div>

              <div>
                     <h1 className="text-black text-xl mt-10 font-semibold  mb-2">Additional Comments or Notes</h1>
                      <textarea
                          className="text-base font-normal resize-y w-[725px] min-h-[100px] text-black px-2 py-[5px] bg-white border border-[#DEE2E6] outline-none rounded-[6px]"
                          placeholder="Write a message"
                          onChange={(e:InputTextAreaEvent)=>onChangeInputValue("comments",e)}
                          value={values.comments}
                      />
                    {isStr(errors.comments) && <span className="text-xs text-red-600">{String(errors.comments)}</span>}
                </div>
                <div className="w-full text-right px-4">
                    <button type="button" onClick={()=>handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-white font-semibold px-4 py-[10px]">
                        Save Changes
                    </button>
                </div>
        </div>
    )
}

export default StepThreeEditModal;
