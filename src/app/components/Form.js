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
    } else setErrorMessage('name cannot be empty');
  };

  return (
    <div className="flex flex-col">
      <form
        className="bg-white shadow-xl shadow-purple-500 rounded border-2 border-purple-800 px-8 pt-6 pb-8 mb-20"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="organization"
          >
            Organization name
          </label>
          <input
            className="shadow appearance-none border border-gray-400 border-glowing rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="organization"
            type="text"
            placeholder="e.g. selver as"
            value={organizationName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Go!
          </button>
          {errorMessage && (
            <p className="text-red-600 font-bold">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
