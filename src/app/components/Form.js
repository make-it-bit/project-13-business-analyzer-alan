'use client';
import { useState } from 'react';

const Form = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = await validateOrganizationName(organizationName);
      console.log('name: ', name);
    } catch (error) {
      console.log(error);
    }
  };

  const validateOrganizationName = (name) => {
    return new Promise((resolve, reject) => {
      if (name) {
        setErrorMessage('');
        return name.trim();
      }
      setErrorMessage('this is an error');
    });
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
