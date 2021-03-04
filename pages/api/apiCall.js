import axios from "axios";

export async function asyncGetCall({ endPoint = null, offset = 0, limit = 25 }) {
    
    if (endPoint === null) {
        throw new Error('Endpoint expected');
    }
    
    const token = window.localStorage.getItem("pl_token");
    const myHeaders = {
        Authorization: "Bearer " + token,
        'content-type': 'application/json',
    };
    let response;

    try {
        response = await axios.get(
        endPoint,
        {
            headers: myHeaders
        });
    }
    catch (e) {
        console.error('Error GET', e);
        return null;
    }

    return response.data;
}

export async function asyncPostCall({ endPoint = null, data = {}, offset = 0, limit = 25 }) {
    
    if (endPoint === null) {
        throw new Error('Endpoint expected');
    }
    
    const token = window.localStorage.getItem("pl_token");
    const myHeaders = {
        Authorization: "Bearer " + token,
        'content-type': 'application/json',
    };
    const myParams = {
        offset: offset,
        limit: limit
        };
        let response;


    try {
        response = await axios.post(
        endPoint,
        data,
        {
            headers: myHeaders,
            params: myParams,
        });
    }
    catch (e) {
        console.error('Error POST', e);
        return null;
    }

    return response.data;
}