// ProgramDetails.js
import React, { useState } from 'react';

const ProgramDetails = ({ selectedProgram, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Implement logic to save changes to the server
    setEditMode(false);
  };

  const handleDelete = () => {
    // Implement logic to delete the program on the server
    setEditMode(false);
    onDelete();
  };

  return (
    <div>
      <h2>Program Details</h2>
      {selectedProgram ? (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={selectedProgram.name}
              disabled={!editMode}
              onChange={(e) => {}}
            />
          </div>
          {/* Add other fields based on your program model */}
          {editMode ? (
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      ) : (
        <p>Select a program to view details.</p>
      )}
    </div>
  );
};

export default ProgramDetails;
