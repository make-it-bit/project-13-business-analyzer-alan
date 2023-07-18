'use client';
import Form from '@/components/FormCsv';
import Organizations from '@/components/Organizations';
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

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

  const beginLoopScraper = async (organizationsArray) => {
    const gatheredData = [];
    for (let elem of organizationsArray) {
      try {
        const organizationData = await fetchOrganizationData(elem['ärinimi']);
        console.log(`success for ${elem['name']}`);
        gatheredData.push(renderSpecificData(organizationData, elem['name']));
      } catch {
        console.log(`failed for ${elem['name']}`);
        gatheredData.push(`failed for ${elem['name']}`);
      }
    }

    const csvString = gatheredData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    const blobURL = URL.createObjectURL(blob);
    const tempAnchor = document.createElement('a');
    tempAnchor.href = blobURL;
    tempAnchor.download = 'output.csv';
    tempAnchor.click();
    URL.revokeObjectURL(blobURL);
  };

  const fetchOrganizationData = async (name) => {
    const response = await fetch(
      `http://localhost:3000/api/scraper?name=${name}`
    );

    if (response) {
      const data = await response.json();
      return data;
    }
  };

  // temp method, console output data
  const renderSpecificData = (data, name) => {
    const res = [];
    Object.entries(data).map(([key, value]) => {
      key = key.replace(/_/g, ' ');

      if (key === 'Üldinfo') {
        res.push(value['Registrikood']);
        res.push(value['Õiguslik_vorm']);
        res.push(value['Staatus']);
        res.push(value['Asutatud_ettevõtteregistris']);
        res.push(value['Registreeritud']);
      }

      if (key === 'Maksualane info') {
        res.push(value['Riiklikud_maksud']);
        res.push(value['Tööjõumaksud']);
        res.push(value['Maksustatav_käive']);
        res.push(value['Töötajate_arv']);
      }
    });
    // console.log(`data for ${name}`);
    // console.log(res.join(','));
    return res.join(',');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <div className="py-10 px-5 m-auto w-full sm:max-w-xl mt-10">
        <Form onSubmit={handleFormSubmit} />
        {csvData && (
          <>
            {/* <button className="bg-red-400" onClick={beginLoopScraper(csvData)}>
              begin loop scraper
            </button> */}
            <Organizations data={csvData} />
          </>
        )}
      </div>
    </div>
  );
};

export default CsvScraperPage;
