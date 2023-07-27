// a separate file for API related functions
import axios from 'axios';
import GlobalContext from '../Components/GlobalContext';

export const rescheduleEmail = async (emailId, message, newDateTime) => {
    try {
        debugger;


        const logToUpdate = {
            ID: 5,
            ActivityData: 'Updated activity data', // Replace this with the updated value for ActivityData
            Timestamp: new Date(), // Replace this with the updated value for Timestamp
        };


        const response = await axios.put(`https://localhost:44375/api/Logger/${logToUpdate.ID}`, logToUpdate, {
            headers: {
                'Content-Type': 'application/json',
            },



            //  const response = await axios.put(`https://localhost:44375/api/Logger/5`, {


            //await axios.put(`${GlobalContext.ApiUrl}/Logger/5`, {   //${emailId}

            //await axios.put(`/api/emails/${emailId}/reschedule`, {
            ActivityData: "sdfsdfsdfsdfsdf",
        },

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data; // If needed, return the response data
    } catch (error) {
        throw error;
    }
};