import moment from "moment";

function convertDbDateFormat(inputDate: string|Date) {
   const format1 = "YYYY-MM-DD HH:mm:ss";
    const datetime = new Date(inputDate);
    return moment(datetime).format(format1);
}

export {convertDbDateFormat}
