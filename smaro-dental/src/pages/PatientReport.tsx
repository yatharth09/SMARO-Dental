import React, {useEffect} from "react";

import Layout from "../shared/Layout";
import TableView from "../components/PatientReport/TableView";
import ViewModal from "../components/PatientReport/ViewModal";
import TableContainer from "../components/PatientReport/TableContainer";
import OhifViewerDialog from "../components/SmartViewer/OhifViewerDialog";
import ReportViewerDialog from "../components/SmartViewer/ReportViewerDialog";

import useReportAnalysis from "../hooks/useReportAnalysis";
import useAuth from "../hooks/useAuth";
import {isNum} from "@/utils/utils";

const PatientReport:React.FC = () => {
const {user} = useAuth();
   const {
       reports,
       report,
       showViewModal,
       isViewerModalOpen,
       isPdfViewerOpen,
       selectedReportAnalysis,
       getAnalysisByRadiologistId,
       onPressActionButton,
       onClose
   } = useReportAnalysis();

    useEffect(() => {
       if(isNum(user?.id))
       {
            void (async () => {
                await getAnalysisByRadiologistId(user?.id);
            })();
       }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);



    return (
        <Layout>
            <div className="px-10">
                <TableContainer>
                    <TableView
                        list={reports}
                        onActionBtnPress={onPressActionButton}
                    />
                </TableContainer>
            </div>
            {
                showViewModal && <ViewModal
                                   report={report}
                                   show={showViewModal}
                                   onClose={onClose}
                                 />
            }

            {
                isViewerModalOpen && <OhifViewerDialog
                    open={isViewerModalOpen}
                    onClose={onClose}
                    analysis={selectedReportAnalysis}
                />
            }
            {
                isPdfViewerOpen &&  <ReportViewerDialog
                    show={isPdfViewerOpen}
                    onClose={onClose}
                    analysis={report}
                />
            }

        </Layout>)
}

export default PatientReport;

