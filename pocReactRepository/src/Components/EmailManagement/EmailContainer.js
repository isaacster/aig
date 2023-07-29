import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/emailActions';
import EmailReschedule from './EmailReschedule';

const EmailContainer = ({ data, loading, error, fetchData }) => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [orderBy, setOrderBy] = useState('id');
    const [searchQuery, setSearchQuery] = useState('');

    const handleEmailClick = (email) => {

        console.log('handleEmailClick' + email);
        setSelectedEmail(email);
        setPopupOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSorting = (column) => {
        // Toggle the sorting order between ascending and descending by using the - character 
        setOrderBy((prevOrderBy) => (prevOrderBy === column ? `-${column}` : column));
    };

    const handleSearchChange = (event) => {
        console.log('handleSearchChange' + event.target.value);
        setSearchQuery(event.target.value);
    };

    if (!data || !data.emails || data.emails.length === 0) {
        return <p>No emails found.</p>;
    }

    let sortedEmails = [...data.emails];


    /* if (orderBy) {     
         debugger;   
         sortedEmails.sort((a, b) => { //comparison 
             if (orderBy.startsWith('-')) { //indicates that the sorting should be performed in descending order 
                 return b[orderBy.slice(1)].localeCompare(a[orderBy.slice(1)]);
             }
             return a[orderBy].localeCompare(b[orderBy]);
         });
     }
 */

    if (searchQuery) {
        sortedEmails = sortedEmails.filter((email) =>
           
            Object.values(email).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <input className='search-emails'
                type="text"
                placeholder="Search emails"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <div className="center">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th onClick={() => handleSorting('messageId')}>MessageId</th>
                            <th onClick={() => handleSorting('timestamp')}>Date</th>
                            <th onClick={() => handleSorting('recipient')}>Recipient</th>
                            <th onClick={() => handleSorting('subject')}>Subject</th>
                            <th onClick={() => handleSorting('message')}>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmails.map((email) => (
                            <tr key={email.messageId} onClick={() => handleEmailClick(email)}>
                                <td>{email.messageId}</td>
                                <td>{email.timestamp}</td>
                                <td>{email.recipient}</td>
                                <td>{email.subject}</td>
                                <td>{email.message}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* ... Rest of your component code ... */}
            </div>

            {isPopupOpen && selectedEmail && (
                <div className="popup-container">
                    <EmailReschedule email={selectedEmail} onClose={() => setPopupOpen(false)} />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    data: state.data.data,
    loading: state.data.loading,
    error: state.data.error,
});

const mapDispatchToProps = {
    fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);
