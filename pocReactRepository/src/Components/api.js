// a separate file for API related functions
import axios from 'axios';

export const rescheduleEmail = async (emailId, message, newDateTime) => {
    try {
        debugger;

        alert(newDateTime);
        const response = await axios.put(`/api/emails/${emailId}/reschedule`, {
            newDateTime: newDateTime,
        });
        return response.data; // If needed, return the response data
    } catch (error) {
        throw error;
    }
};