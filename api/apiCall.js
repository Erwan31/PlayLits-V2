import axios from "axios";
import { errorHandler } from "../Components/HeaderFooter/HeaderFooter";

export async function asyncGetCall({ endPoint = null, params = null, offset = 0, limit = 25 }) {
    
    if (endPoint === null) {
        throw new Error('Endpoint expected');
    }
    
    const token = window.localStorage.getItem("pl_token");
    const myHeaders = {
        Authorization: "Bearer " + token,
        'content-type': 'application/json',
    };
    const myParams = {
        ...params,
        offset,
        limit
    };
    let response;

    try {
        response = await axios.get(
        endPoint,
        {
            headers: myHeaders,
            params: myParams
        });
    }
    catch (e) {
        console.error('Error GET');
        // errorHandler(e);
        throw new Error(e);
    }

    return response.data;
}

export async function asyncLoopGetWithIds({ endPoint = null, params = null, offset = 0, limit = 50 }) {

    if (endPoint === null || params === null) {
        throw new Error('Expected endpoint or params for get call');
    };

    const key =  Array.isArray(params) ? 'ids' : Object.keys(params)[0];
    const data = Array.isArray(params) ? params : params[key];
    const maxIteration = Math.floor(data.length / limit) + 1;
    let iteration = 0;
    let result = [];
 
    do {
        let query = data.slice(iteration * limit, (iteration + 1) * limit);
        if (Array.isArray(query)) query = query.join(',');
        iteration++;

        try {
            const response = await asyncGetCall({
                endPoint,
                params: { [key]: query },
                offset,
                limit
            });

            if (Array.isArray(response)) {
                result.push(...response);
            }
            else result.push(response);
        }
        catch (e) {
            console.error('Loop GET Error');
            // errorHandler(e);
            throw new Error(e);
        }
    } while (maxIteration > iteration);
    return result;
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
        console.error('Error POST');
        // errorHandler(e);
        throw new Error(e);
    }

    return response.data;
}

export async function asyncLoopPostWithIds({ endPoint = null, params = null, offset = 0, limit = 50 }) {

    if (endPoint === null || params === null) {
        throw new Error('Expected endpoint or params for post call');
    };

    const key =  Array.isArray(params) ? 'uris' : Object.keys(params)[0];
    const data = Array.isArray(params) ? params : params[key];
    const maxIteration = Math.floor(data.length / limit) + 1;
    let iteration = 0;
    let result = [];
 
    do {
        let query = data.slice(iteration * limit, (iteration + 1) * limit);
        if (Array.isArray(query)) query = query.join(',');
        iteration++;
        const uglyEndPoint = endPoint + '?uris=' + query;
        console.log('question', uglyEndPoint, key, query, endPoint, offset, limit);
        try {
            const response = await asyncPostCall({
                endPoint: uglyEndPoint,
                // params: { [key]: query, offset, limit },
                // offset,
                // limit
            });

            console.log('response', response, params, endPoint, offset, limit);
            // if (Array.isArray(response)) {
            //     result.push(...response);
            // }
            // else result.push(response);
        }
        catch (e) {
            console.error('Loop POST Error');
            // errorHandler(e);
            throw new Error(e);
        }
    } while (maxIteration > iteration);

    return result;
}