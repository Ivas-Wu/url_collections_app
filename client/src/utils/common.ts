import { AxiosError } from "axios";

export const handleErrorMessage = (err: unknown): string => {
    var res = 'An unknown error occurred';
    if (err instanceof AxiosError) {
        if (err.response && err.response.data && err.response.data) {
            res = err.response.data.error; 
            const errors = err.response.data.errors; 
            if (Array.isArray(errors)) {
                res = errors.map((error) => error.msg).join(', ');
            }            
        } else if (err.message) {
            res = err.message; 
        }
    } 
    return res;
};