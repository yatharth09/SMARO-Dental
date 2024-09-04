import {createFileUpload} from "./models/FileUpload";
import {FileUploadTypes} from "../types";

function getFakeFileUploadList():FileUploadTypes[]
{
    return Array.from({length:3000},createFileUpload)
}

export {getFakeFileUploadList}
