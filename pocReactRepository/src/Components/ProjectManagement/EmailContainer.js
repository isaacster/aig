import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/emailActions';
//import EmailDetails from './EmailDetailsPopup';
import EmailReschedule from './EmailReschedule';

const EmailContainer = ({ data, loading, error, fetchData }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [orderBy, setOrderBy] = useState('id');
    const [searchQuery, setSearchQuery] = useState('');

    const handleProjectClick = (project) => {
        
        console.log('handleProjectClick' + project);
        setSelectedProject(project);
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

    if (!data || !data.projects || data.projects.length === 0) {
        return <p>No projects found.</p>;
    }

    let sortedProjects = [...data.projects];
    if (orderBy) {        
        sortedProjects.sort((a, b) => { //comparison 
            if (orderBy.startsWith('-')) { //indicates that the sorting should be performed in descending order 
                return b[orderBy.slice(1)].localeCompare(a[orderBy.slice(1)]);
            }
            return a[orderBy].localeCompare(b[orderBy]);
        });
    }

    if (searchQuery) {
        sortedProjects = sortedProjects.filter((project) =>
            //extracts all the property values of the project object as an array.
            Object.values(project).some((value) =>
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
            <input className='search-projects'
                type="text"
                placeholder="Search projects"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <div className="center">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th onClick={() => handleSorting('id')}>ID</th>
                            <th onClick={() => handleSorting('name')}>Name</th>
                            <th onClick={() => handleSorting('client')}>Client</th>
                            <th onClick={() => handleSorting('description')}>Description</th>
                            <th onClick={() => handleSorting('startDate')}>Start Date</th>
                            <th onClick={() => handleSorting('endDate')}>End Date</th>
                            <th onClick={() => handleSorting('status')}>Status</th>                             
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProjects.map((project) => (
                            <tr key={project.id} onClick={() => handleProjectClick(project)}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.client}</td>
                                <td>{project.description}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                                <td>{project.status}</td>                               
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* ... Rest of your component code ... */}
            </div>

            {isPopupOpen && selectedProject && (
                <div className="popup-container">
                    <EmailReschedule email={selectedProject} onClose={() => setPopupOpen(false)} />
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
