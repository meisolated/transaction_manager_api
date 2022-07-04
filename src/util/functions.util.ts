import moment from "moment"
export const dateNtime = () => {
    let time = moment().format("DD-MM-YYYY hh:mm:ss")
    return time
}
