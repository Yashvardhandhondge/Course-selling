
export const handleError = (error) => {
    if (error.response) {
        return { message: error.response.data.message || "An error occurred", status: error.response.status };
    } else if (error.request) {
        return { message: "No response from server", status: 500 };
    } else {
        return { message: error.message, status: 500 };
    }
};
