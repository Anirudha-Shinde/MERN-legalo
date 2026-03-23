// Location: mern/client/components/ObligationCard.jsx

import React, { useState } from 'react';

const ObligationCard = ({ obligation, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expand/collapse
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Stop propagation so clicking buttons doesn't trigger expand
  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="card" onClick={toggleExpand}>
      <div className="card-header">
        <h3>{obligation.title}</h3>
        <span className={`badge ${obligation.riskLevel}`}>{obligation.riskLevel}</span>
      </div>
      
      <div className="card-summary">
        <p><strong>ID:</strong> {obligation.obligationId}</p>
        <p><strong>Category:</strong> {obligation.category}</p>
      </div>

      {isExpanded && (
        <div className="card-details">
          <p><strong>Applies If:</strong> {obligation.appliesIf}</p>
          <p><strong>Completion Definition:</strong> {obligation.completionDefinition}</p>
          <p><strong>Status:</strong> {obligation.isActive ? 'Active' : 'Inactive'}</p>
          <p><strong>Created:</strong> {new Date(obligation.createdAt).toLocaleDateString()}</p>
          
          <div className="card-actions">
            <button 
              className="btn-edit" 
              onClick={(e) => handleActionClick(e, () => onEdit(obligation))}
            >
              Edit
            </button>
            <button 
              className="btn-delete" 
              onClick={(e) => handleActionClick(e, () => onDelete(obligation._id))}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObligationCard;