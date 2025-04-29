import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function errorHandle(error: unknown) {
    if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        switch (status) {
            case 400:
            case 411:
                toast.error("Bad Request. Please check your input.");
                break;
            case 401:
                toast.error("Unauthorized. Please login again.");
                break;
            case 404:
                toast.error("Data not found!!!");
                break;
            case 500:
                toast.error("Server error. Please try again later.");
                break;
            default:
                toast.error(`Error: ${status}`);
                break;
        }
    } else if (error instanceof AxiosError && error.message === 'Network Error') {
        console.error("No internet connection.");
        toast.error("No internet connection.");
    } else {
        console.error("Unknown error:", error);
        toast.error("Something went wrong.");
    }
};