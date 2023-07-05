'use client';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = validateOrganizationName(organizationName);
    if (name) {
      onSubmit(name);
    }
  };

  const validateOrganizationName = (name) => {
    if (name) {
      setErrorMessage('');
      return name.trim();
    } else setErrorMessage('this is an error');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Organization name:
        <input
          className="border-2 border-black"
          type="text"
          value={organizationName}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
      {errorMessage && <p className="text-red-600 font-bold">{errorMessage}</p>}
    </form>
  );
};

export default Form;
