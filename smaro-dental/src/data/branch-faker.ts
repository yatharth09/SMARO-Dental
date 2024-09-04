import {createBranch} from "./models/Branch";
function getBranchFakeDataList()
{
     return Array.from({length: 3000},createBranch);
}

export {getBranchFakeDataList};
