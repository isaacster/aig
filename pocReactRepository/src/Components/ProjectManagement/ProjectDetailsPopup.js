import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectDetails } from '../../actions/projectActions';

const ProjectDetailsPopup = ({ projectId, onClose }) => {
  
  const dispatch = useDispatch();
  const projectDetails = useSelector((state) => state.projectDetails.projectDetails);

  useEffect(() => {
    // Get project details when the pop-up is opened
    if (projectId) {
      dispatch(fetchProjectDetails(projectId));
    }
  }, [dispatch, projectId]);

  return (
    <div className="modal">
    <div className="modal-content">
    <div>
      {projectDetails ? (
        <>
          <h2>Project Details</h2>
          <p>ID: {projectDetails.id}</p>
          <p>Name: {projectDetails.name}</p>
          <p>Client: {projectDetails.client}</p>
         
          <button onClick={onClose}>Close</button>
        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProjectDetailsPopup;
