import React from "react";
import Layout from "../shared/Layout"
import TableView from "../components/UploadDcmFiles/TableView"
import { useState } from "react"
import CreateModal from "../components/UploadDcmFiles/CreateModal"

const UploadDcmFiles:React.FC = () => {
  const [showModal,setShowModal] = useState(false)
  return (
    <Layout>
    <div className="flex flex-col items-center pt-[1.125rem]">
      <TableView setShowModal={setShowModal}/>
    </div>
    {
      showModal && <CreateModal setShow={setShowModal} show={showModal} />
    }
</Layout>
  )
}

export default UploadDcmFiles;
