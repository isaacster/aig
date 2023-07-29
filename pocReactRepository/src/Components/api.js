// a separate file for API related functions
import axios from 'axios';
import GlobalContext from '../Components/GlobalContext';

export const rescheduleEmail = async (email, newDateTime) => {
    try {
        debugger;


      const requestModel = {
        MessageId: email.messageId,
        emailMessage: email.message,
        RescheduleTime: newDateTime,
        Recipient: email.recipient
      };
  
      //`${GlobalContext.ApiUrl}Email/RescheduleAction`

      // Make the Axios POST request
      const response = await axios.post(
        `${GlobalContext.ApiUrl}Email/RescheduleAction`,
        requestModel,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      
        return response.data; // If needed, return the response data
    } catch (error) {
        throw error;
    }
};