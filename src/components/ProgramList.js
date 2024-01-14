// ProgramList.js
import React from 'react';

const ProgramList = ({ programs, onSelectProgram }) => {
  return (
    <div>
      <h2>Programs</h2>
      <ul>
        {programs.map((program) => (
          <li key={program.id} onClick={() => onSelectProgram(program)}>
            {program.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;
