import { AxiosError } from "axios";

export const handleErrorMessage = (err: unknown): string => {
    var res = 'An unknown error occurred';
    if (err instanceof AxiosError) {
        if (err.response && err.response.data && err.response.data) {
            res = err.response.data.error; 
        } else if (err.message) {
            res = err.message; 
        }
    } 
    return res;
};