import React, { useState, useEffect } from 'react';
import { rescheduleEmail } from '../api';

const EmailReschedule = ({ email, onClose }) => {
    //const [showDetails, setShowDetails] = useState(false);
    const [rescheduleOption, setRescheduleOption] = useState(null);
    const [customDateTime, setCustomDateTime] = useState('');
    const [rescheduleResponse, setRescheduleResponse] = useState(null);
    const [reScheduleOptionsDic, setReScheduleOptions] = useState(null);

    const InitializeRescheduleDateToState = () => {

        let rescheduleTimeToSend = {};

        const now = new Date();

        //a. 1 min FOR TESTING
        const minute = new Date(now);
        minute.setMinutes(now.getMinutes() + 1);
        console.log(minute);
        rescheduleTimeToSend.minute = minute;

        //a. Later today
        const laterToday = new Date(now);
        laterToday.setHours(now.getHours() + 3); // For example, adding 3 hours
        console.log(laterToday);
        rescheduleTimeToSend.laterToday = laterToday;

        // b. Tomorrow
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        console.log(tomorrow);
        rescheduleTimeToSend.tomorrow = tomorrow;

        // c. Later this week
        const laterThisWeek = new Date(now);
        laterThisWeek.setDate(now.getDate() + (3 - now.getDay())); // Set to the last day of the week (e.g., Saturday)
        laterThisWeek.setHours(8, 0, 0);
        console.log(laterThisWeek);
        rescheduleTimeToSend.laterThisWeek = laterThisWeek;

        // d. This weekend
        const thisWeekend = new Date(now);
        thisWeekend.setDate(now.getDate() + (6 - now.getDay())); // Set to the last day of the week (e.g., Saturday)
        thisWeekend.setHours(23, 59, 59); // Set to the end of the day
        console.log(thisWeekend);
        rescheduleTimeToSend.thisWeekend = thisWeekend;

        // e. Next week
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + (14 - now.getDay()));
        nextWeek.setHours(8, 0, 0);
        console.log(nextWeek);
        rescheduleTimeToSend.nextWeek = nextWeek;

        setReScheduleOptions(rescheduleTimeToSend);
    };

    useEffect(() => { InitializeRescheduleDateToState(); }, []);

    const getDateFormatLbel = (rescheduleTimeToSend) => {

        return rescheduleTimeToSend.toLocaleString('en-US', {
            weekday: 'short',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    const handleReschedule = async () => {
        try {
            setRescheduleResponse('');
            // Extract the emailId from the email object or wherever it's available
            const emailId = email.id;

            let rescheduleTimeToSend = '';

            if (rescheduleOption === 'Custom') {
                rescheduleTimeToSend = new Date(customDateTime);
            }
            else {

                if (!rescheduleOption) {
                    setRescheduleResponse('Please select a date');
                    return;
                }

                const now = new Date();
                switch (rescheduleOption) {
                    case 100:
                        rescheduleTimeToSend = reScheduleOptionsDic.minute;
                        break;
                    case 1:
                        rescheduleTimeToSend = reScheduleOptionsDic.laterToday;
                        break;
                    case 2:
                        rescheduleTimeToSend = reScheduleOptionsDic.tomorrow;
                        break;
                    case 3:
                        rescheduleTimeToSend = reScheduleOptionsDic.laterThisWeek;
                        break;
                    case 4:
                        rescheduleTimeToSend = reScheduleOptionsDic.thisWeekend;
                        break;
                    case 5:
                        rescheduleTimeToSend = reScheduleOptionsDic.nextWeek;
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

            let finalDate = rescheduleTimeToSend.toISOString();

            var res = await rescheduleEmail(email, finalDate);

            // Handle success or show a notification if needed
            setRescheduleResponse('Rescheduled request sent successfully. response from service: ' + res);
        } catch (error) {

            setRescheduleResponse('Failed to re-schedule email.');
            // Handle the error or show an error notification
            setRescheduleOption('');
        }
    };

    return (
        <div>

            <div className="modal">
                <div className="modal-content">
                    <div className="schedule-header"> Snooze email {email.messageId} untill...</div>

                    {/* Render reschedule options */}
                    {
                        <div className='reschedule-wrapper'>
                            <button className={rescheduleOption == 100 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(100)}>1 min testing</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.minute)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 1 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(1)}>Later today</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.laterToday)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 2 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(2)}>Tomorrow</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.tomorrow)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 3 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(3)}>Later this week</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.laterThisWeek)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 4 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(4)}>This weekend</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.thisWeekend)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 5 ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption(5)}>Next week</button>
                            {reScheduleOptionsDic && (<label className='lbl-date'>{getDateFormatLbel(reScheduleOptionsDic.nextWeek)}</label>)}
                            <br></br>
                            <button className={rescheduleOption == 'Custom' ? 'active-button reschedule-btn' : 'reschedule-btn'} onClick={() => setRescheduleOption('Custom')}>Pick date-time</button>
                            {rescheduleOption === 'Custom' && (
                                <input
                                    type="datetime-local"
                                    className="custom-datetime-input"
                                    value={customDateTime}
                                    onChange={(e) => setCustomDateTime(e.target.value)}
                                />
                            )}
                            <br></br>
                            <button className="margin-top reschedule-btn reschedule-action-btn" onClick={handleReschedule}>Reschedule</button>
                            <button className="margin-top reschedule-btn reschedule-action-btn close cancel-btn" onClick={onClose}>Cancel</button>
                            <br></br>
                            <span>{rescheduleResponse}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EmailReschedule;