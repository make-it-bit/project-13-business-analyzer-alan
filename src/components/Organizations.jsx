import ListItem from './ListItem';

import React from 'react';

const Organizations = (organizations) => {
  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold dark:text-white/90">Organizations</h2>
      <ul className="w-full">
        {organizations.data.map((organizationData) => (
          <ListItem
            key={organizationData.id}
            organizationData={organizationData}
          />
        ))}
      </ul>
    </section>
  );
};

export default Organizations;
