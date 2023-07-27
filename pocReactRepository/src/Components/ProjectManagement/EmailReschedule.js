import React, { useState } from 'react';
import { rescheduleEmail } from '../api';

const EmailReschedule = ({ email }) => {
    //const [showDetails, setShowDetails] = useState(false);
    const [rescheduleOption, setRescheduleOption] = useState(null);
    const [customDateTime, setCustomDateTime] = useState('');

    const handleReschedule = async () => {
        try {
            // Extract the emailId from the email object or wherever it's available
            const emailId = email.id;
            
            let rescheduleTimeToSend = '';

            if (rescheduleOption === 'Custom') {
                rescheduleTimeToSend = customDateTime;
            }
            else {
                const now = new Date();
                switch (rescheduleOption) {
                    case 1:
                        //a. Later today
                        const laterToday = new Date(now);
                        laterToday.setHours(now.getHours() + 3); // For example, adding 3 hours
                        console.log(laterToday);
                        rescheduleTimeToSend = laterToday;
                        break;
                    case 2:
                        // b. Tomorrow
                        const tomorrow = new Date(now);
                        tomorrow.setDate(now.getDate() + 1);
                        console.log(tomorrow);
                        rescheduleTimeToSend = tomorrow;
                        break;
                    case 3:
                        // c. Later this week
                        const laterThisWeek = new Date(now);
                        laterThisWeek.setDate(now.getDate() + (6 - now.getDay())); // Set to the last day of the week (e.g., Saturday)
                        laterThisWeek.setHours(23, 59, 59); // Set to the end of the day
                        console.log(laterThisWeek);
                        rescheduleTimeToSend = laterThisWeek;
                        break;
                    case 4:
                        // d. This weekend
                        const thisWeekend = new Date(now);
                        thisWeekend.setDate(now.getDate() + (6 - now.getDay())); // Set to the last day of the week (e.g., Saturday)
                        thisWeekend.setHours(23, 59, 59); // Set to the end of the day
                        console.log(thisWeekend);
                        rescheduleTimeToSend = thisWeekend;
                        break;
                    case 5:
                        // e. Next week
                        const nextWeek = new Date(now);
                        nextWeek.setDate(now.getDate() + (13 - now.getDay())); // Set to the last day of next week (e.g., Saturday)
                        nextWeek.setHours(23, 59, 59); // Set to the end of the day
                        console.log(nextWeek);
                        rescheduleTimeToSend = nextWeek;
                        break;
                    default:
                        break;
                }
            }

            setRescheduleOption('');
            // Compose the message based on the selected rescheduleOption and customDateTime (if applicable)
            const message =
                rescheduleOption === 'Custom'
                    ? `Custom reschedule: ${customDateTime}`
                    : `Reschedule to ${rescheduleOption}`;

            await rescheduleEmail(emailId, message, rescheduleTimeToSend);

            // Handle success or show a notification if needed
            //alert('Email re-scheduled successfully!');
        } catch (error) {
            // Handle the error or show an error notification
           // alert('Failed to re-schedule email.');
            setRescheduleOption('');
        }
    };

    return (
        <div>
            {/* Render summary of the email    <div onClick={() => setShowDetails(!showDetails)}> <span>{email.subject}</span>    <span>{email.sender}</span>       </div> */}


            <div className="modal">
                <div className="modal-content">

                    {/* Render reschedule options */}
                    {
                        <div>
                            <button className={rescheduleOption == 1 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(1)}>Later today</button>
                            <button className={rescheduleOption == 2 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(2)}>Tomorrow</button>
                            <button className={rescheduleOption == 3 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(3)}>Later this week</button>
                            <button className={rescheduleOption == 4 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(4)}>This weekend</button>
                            <button className={rescheduleOption == 5 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(5)}>Next week</button>
                            <button className={rescheduleOption == 'Custom' ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption('Custom')}>Custom date-time</button>
                            {rescheduleOption === 'Custom' && (
                                <input
                                    type="datetime-local"
                                    className="custom-datetime-input"
                                    value={customDateTime}
                                    onChange={(e) => setCustomDateTime(e.target.value)}
                                />
                            )}
                            <button className="reschedule-btn reschedule-action-btn" onClick={handleReschedule}>Reschedule</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EmailReschedule;