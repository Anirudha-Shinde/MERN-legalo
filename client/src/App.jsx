// Locations: mern/client/App.jsx

import React, { useState, useEffect } from 'react';
import apiService from './services/api';
import ObligationCard from './components/ObligationCard';
import ObligationForm from './components/ObligationForm';
import './App.css';

function App() {
  const [obligations, setObligations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingObligation, setEditingObligation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formKey, setFormKey] = useState(0); // Add this to force form reset


  // Fetch data on load
  const fetchObligations = async () => {
    try {
      const response = await apiService.getAll();
      setObligations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObligations();
  }, []);

  // Handle Create or Update
  const handleSubmit = async (data) => {
    try {
      if (editingObligation) {
        // Update existing
        await apiService.update(editingObligation._id, data);
      } else {
        // Create new
        await apiService.create(data);
      }
      // Reset form and refresh list
      setEditingObligation(null);
      setShowForm(false);
      setFormKey(prev => prev + 1); // Force form to re-render with fresh state
      fetchObligations();
    } catch (error) {
      alert('Error saving obligation: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this obligation?')) {
      try {
        await apiService.delete(id);
        fetchObligations();
      } catch (error) {
        alert('Error deleting obligation');
      }
    }
  };

  // Handle Edit Click
  const handleEdit = (obligation) => {
    setEditingObligation(obligation);
    setShowForm(true);
  };

  // Handle Cancel Form
  const handleCancel = () => {
    setEditingObligation(null);
    setShowForm(false);
    setFormKey(prev => prev + 1); // Reset form state
  };

  return (
    <div className="app-container">
      <header>
        <h1>Obligation Manager</h1>
        <button className="btn-add" onClick={() => {
          setEditingObligation(null);
          setShowForm(true);
          setFormKey(prev => prev + 1); // Reset form state
        }}>
          + Add New Obligation
        </button>
      </header>

      {showForm && (
        <ObligationForm 
          key={formKey} // This forces complete re-render when key changes
          onSubmit={handleSubmit} 
          initialData={editingObligation} 
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p>Loading obligations...</p>
      ) : (
        <div className="card-grid">
          {obligations.length > 0 ? (
            obligations.map((obligation) => (
              <ObligationCard 
                key={obligation._id} 
                obligation={obligation} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No obligations found. Add one to get started!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;