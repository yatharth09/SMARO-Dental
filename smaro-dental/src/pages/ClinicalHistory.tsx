import React, { useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../shared/Layout"
import DcmFileDropZone from "../components/Common/DcmFileDropZone";

const ClinicalHistory:React.FC = () => {
    const [clinicalHistory,setClinicalHistory] = useState("");
    const [techniques,setTechniques] = useState("");

  return (
    <Layout>
      <div className="mx-12 my-6 flex flex-wrap gap-5">
        <div className="flex flex-wrap w-full justify-between">
            <div>
             <div  className="accordion-section">
                <div className="w-[64.375rem] rounded-[6px] bg-white my-5 items-center py-5 px-10 h-min-[16.188rem] border border-gray-300">

                     <div className="my-2">
                            <div className="flex justify-between mb-3">
                                    <div className="flex items-center gap-x-4">
                                      <h2 className="text-xl font-bold text-black">Upload DCM File</h2>
                                    </div>
                            </div>
                            <div className="min-h-[10rem]">
                              <DcmFileDropZone/>
                            </div>
                        </div>

                          <div className="my-2">
                            <div className="flex justify-between mb-3">
                                    <div className="flex items-center gap-x-4">
                                      <h2 className="text-xl font-bold text-black">Clinical History</h2>
                                    </div>
                            </div>
                            <div className="min-h-[10rem]">
                                <ReactQuill
                                    theme="snow"
                                    value={clinicalHistory}
                                    onChange={(value) => setClinicalHistory(value)}
                                    placeholder="Write a note"
                                />
                            </div>
                        </div>
                      <div className="my-2">
                            <div className="flex justify-between mb-3">
                                    <div className="flex items-center gap-x-4">
                                      <h2 className="text-xl font-bold text-black">Technique</h2>
                                    </div>
                            </div>
                            <div className="min-h-[10rem]">
                                <ReactQuill
                                    theme="snow"
                                    value={techniques}
                                    onChange={(value) => setTechniques(value)}
                                    placeholder="Write a note"
                                />
                            </div>
                        </div>
                    <div className="text-right mt-3">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClinicalHistory;
