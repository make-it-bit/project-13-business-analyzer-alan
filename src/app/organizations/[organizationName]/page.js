import React from 'react';

export default async function Organization({ params }) {
  const { organizationName } = params;

  const organizationData = await fetchOrganizationData(organizationName);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="py-10 px-5 m-auto w-full sm:max-w-xl mt-10">
        <div className="bg-white shadow-xl shadow-purple-500 rounded border-2 border-purple-800 px-8 pt-6 pb-8 mb-20">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Data for{' '}
            <span className="text-gray-800">{decodeURI(organizationName)}</span>
          </p>
          {organizationData && renderJsonData(organizationData)}
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;Hello, world! All rights reserved.
        </p>
      </div>
    </div>
  );
}

const fetchOrganizationData = async (name) => {
  const response = await fetch(
    `http://localhost:3000/api/scraper?name=${name}`
  );

  if (response) {
    const data = await response.json();
    return data;
  }
};

const renderJsonData = (data) => {
  return Object.entries(data).map(([key, value]) => {
    if (typeof value === 'object') {
      // Recursively render nested object
      return (
        <div key={key} className="bg-green-800 p-4 rounded-lg shadow-md mb-4">
          <div className="text-white">
            <span className="font-bold">{key.replace(/_/g, ' ')}:</span>{' '}
            {renderJsonData(value)}
          </div>
        </div>
      );
    } else {
      // Render regular key-value pair
      return (
        <div key={key} className="bg-red-800 p-4 rounded-lg shadow-md mb-4">
          <div className="text-white">
            <span className="font-bold">{key.replace(/_/g, ' ')}:</span> {value}
          </div>
        </div>
      );
    }
  });
};