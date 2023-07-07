'use client';
import Form from '@/components/FormCsv';
import Organizations from '@/components/Organizations';
import React, { useState } from 'react';

const CsvScraperPage = () => {
  const [csvData, setCsvData] = useState(null);

  const handleFormSubmit = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csvData = e.target.result;
        parseCsv(csvData);
      };
    }
  };

  const parseCsv = (csvData) => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      obj['id'] = i;
      for (let j = 0; j < headers.length; j++) {
        let key = headers[j];
        let value = currentLine[j];

        if (key) key = key.trim().replace(/[-\s]/g, '_');

        obj[key] = value;
      }

      result.push(obj);
    }

    setCsvData(result);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <div className="py-10 px-5 m-auto w-full sm:max-w-xl mt-10">
        <Form onSubmit={handleFormSubmit} />
        {csvData && <Organizations data={csvData} />}
      </div>
    </div>
  );
};

export default CsvScraperPage;
