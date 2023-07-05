'use client';
import React from 'react';
import Form from '@/app/components/Form';
import { useState } from 'react';

const ScraperSinglePage = () => {
  const [submittedValue, setSubmittedValue] = useState(null);
  const handleFormSubmit = (value) => {
    setSubmittedValue(value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ScraperSinglePage;
