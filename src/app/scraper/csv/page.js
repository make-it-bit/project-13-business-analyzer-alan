'use client';
import Form from '@/app/components/FormCsv';
import React from 'react';

const CsvScraperPage = () => {
  const handleFormSubmit = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csvData = e.target.result;
        let rowData = csvData.split('\n');
        console.log('rowData: ', rowData);
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <div className="py-10 px-5 m-auto w-full sm:max-w-xl mt-10">
        <Form onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default CsvScraperPage;
