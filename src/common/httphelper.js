/* eslint-disable no-undef */
import axios from "axios";


export const GET = async (path) => {
    path = `http://192.168.1.23:8070/${path}`;
    try {
        const response = await axios.get(path, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {

        console.log(error);
    }
};

export const POST = async (path, data) => {
    path = `http://192.168.1.23:8070/${path}`;
    try {
        const response = await axios.post(path, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {

        console.log(error);

    }
};

export const DELETE = async (path, data) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.delete(path, {
            headers: {
                "Content-Type": "application/json",
            },
            data,
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {

        } else {
            console.log(error);
            return error.response.data;
        }
        return error.response.data;
    }
};

export const PUT = async (path, data) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.put(path, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {

        } else {
            console.log(error);
            return error.response.data;
        }
        return error.response.data;
    }
};
