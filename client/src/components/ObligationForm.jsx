// Location: mern/client/components/ObligationForm.jsx

import React, { useState, useEffect } from 'react';

const ObligationForm = ({ onSubmit, initialData, onCancel }) => {
  // Initialize state with empty values or initialData (for edit)
  const [formData, setFormData] = useState({
    obligationId: '',
    title: '',
    category: '',
    appliesIf: '',
    riskLevel: 'medium',
    completionDefinition: '',
    isActive: true
  });

  // If initialData changes (e.g., user clicks Edit), update form state
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form if no initial data (after cancel/add)
      setFormData({
        obligationId: '',
        title: '',
        category: '',
        appliesIf: '',
        riskLevel: 'medium',
        completionDefinition: '',
        isActive: true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? 'Edit Obligation' : 'Add New Obligation'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Obligation Id</label>
          <input type="text" name="obligationId" value={formData.obligationId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Applies If</label>
          <input type="text" name="appliesIf" value={formData.appliesIf} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Risk Level</label>
          <select name="riskLevel" value={formData.riskLevel} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Completion Definition</label>
          <textarea name="completionDefinition" value={formData.completionDefinition} onChange={handleChange} required />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
            Is Active
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">{initialData ? 'Update' : 'Create'}</button>
          {onCancel && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default ObligationForm;