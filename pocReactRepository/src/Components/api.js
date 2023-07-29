// a separate file for API related functions
import axios from 'axios';
import GlobalContext from '../Components/GlobalContext';

export const rescheduleEmail = async (email, newDateTime) => {
  try {

    const requestModel = {
      MessageId: email.messageId,
      emailMessage: email.message,
      RescheduleTime: newDateTime,
      Recipient: email.recipient
    };

    const response = await axios.post(
      `${GlobalContext.ApiUrl}Email/RescheduleAction`,
      requestModel,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );


    return response.data;
  } catch (error) {
    throw error;
  }
};