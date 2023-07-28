// a separate file for API related functions
import axios from 'axios';
import GlobalContext from '../Components/GlobalContext';

export const rescheduleEmail = async (emailId, message, newDateTime) => {
    try {
      //  debugger;


      const requestModel = {
        MessageId: 'your_message_id',
        RescheduleTime: 'your_reschedule_time',
      };
  
      // Make the Axios POST request
      const response = await axios.post(
        'https://localhost:44375/api/Email/RescheduleAction',
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