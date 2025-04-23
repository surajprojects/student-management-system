import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function errorHandle(error: any) {
    console.log(error);
    if (error instanceof AxiosError) {
        if (error.message === 'Network Error') {
            console.error('No internet connection, please check your network.');
        }
        else if (error.response) {
            const statusCode = error.response.status;
            if (statusCode === 400 || statusCode === 411) {
                toast.error('Bad Request. Please check your input.');
            } else if (statusCode === 401) {
                toast.error('Unauthorized. Please login again.');
            } else if (statusCode === 404) {
                toast.error("Data not found!!!");
            } else if (statusCode === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(`Error: ${statusCode}`);
            }
        }
        else {
            toast.error('An unexpected error occurred.');
            console.error('An unexpected error occurred:', error.message);
        }
    }
};