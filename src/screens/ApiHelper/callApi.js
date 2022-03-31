import config from "./config";

export async function callApi(url = "", method = "POST", param = {}) {

    let api = config.baseurl + url

    let formbody = []
    for (let property in param) {
        const key = encodeURIComponent(property)
        const value = encodeURIComponent(param[property])
        formbody.push(key + '=' + value)
    }
    formbody = formbody.join("&")

    let settings = {
        method: method,
        headers: config.headers,
        body: formbody
    }

    if (method == "FILE_UPLOAD") {
        settings = {
            method: "POST",
            headers: config.fileUploadHeader,
            body: param
        }
    }
   
    try {
        const fetchresponse = await fetch(api, settings)
        const response = await fetchresponse.json()
        return response

    } catch (err) {
        return {
            status: false,
            message: err
        }
    }

}