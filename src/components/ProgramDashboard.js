// ProgramDashboard.js
import React, { useState } from 'react';
import ProgramList from './ProgramList';
import ProgramDetails from './ProgramDetails';

const dummyPrograms = [
  { id: 1, name: 'Program 1' },
  { id: 2, name: 'Program 2' },
  // Add more dummy programs as needed
];

const ProgramDashboard = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
  };

  const handleDeleteProgram = () => {
    // Implement logic to delete the program from the server
    setSelectedProgram(null);
  };

  return (
    <div>
      <ProgramList programs={dummyPrograms} onSelectProgram={handleSelectProgram} />
      <ProgramDetails
        selectedProgram={selectedProgram}
        onDelete={handleDeleteProgram}
      />
    </div>
  );
};

export default ProgramDashboard;
