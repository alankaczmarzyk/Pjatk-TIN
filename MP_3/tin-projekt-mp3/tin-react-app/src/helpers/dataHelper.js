import moment from "moment"
export function getFormattedDate(dateSource) {
    return moment(dateSource).format("YYYY-MM-DD");
}