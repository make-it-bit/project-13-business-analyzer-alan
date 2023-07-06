'use client';
import React from 'react';
import Form from '@/app/components/FormSingle';
import { useState } from 'react';
import Loading from './loading';

const ScraperSinglePage = () => {
  const [loading, setLoading] = useState(false);
  const [organizationData, setOrganizationData] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);

  const handleFormSubmit = (name) => {
    if (name) {
      setLoading(true);
      fetchOrganizationData(name);
    }
  };

  const fetchOrganizationData = async (name) => {
    const response = await fetch(`/api/scraper?name=${name}`);

    if (response) {
      setLoading(false);
      const data = await response.json();
      setOrganizationData(data);
      setOrganizationName(name);
    }
  };

  const renderJsonData = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object') {
        // Recursively render nested object
        return (
          <div key={key} className="bg-green-800">
            <div>
              {key.replace(/_/g, ' ')}: {renderJsonData(value)}
            </div>
          </div>
        );
      } else {
        // Render regular key-value pair
        return (
          <div key={key} className="bg-red-800">
            <div>
              {key.replace(/_/g, ' ')}: {value}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="py-10 px-5 m-auto w-full sm:max-w-xl mt-10">
        <Form onSubmit={handleFormSubmit} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {organizationData && (
              <div className="bg-white shadow-xl shadow-purple-500 rounded border-2 border-purple-800 px-8 pt-6 pb-8 mb-20">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Data for {organizationName}
                </p>
                {renderJsonData(organizationData)}
              </div>
            )}
          </>
        )}
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;Hello, world! All rights reserved.
      </p>
    </div>
  );
};

export default ScraperSinglePage;
