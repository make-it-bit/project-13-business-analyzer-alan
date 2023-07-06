'use client';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState('');

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      setErrorMessage('');
      onSubmit(file);
    } else setErrorMessage('empty file');
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
            htmlFor="file"
          >
            Csv file
          </label>
          <input
            className="shadow appearance-none border border-gray-400 border-glowing rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="file"
            type="file"
            placeholder="yourfile.csv"
            accept=".csv"
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
