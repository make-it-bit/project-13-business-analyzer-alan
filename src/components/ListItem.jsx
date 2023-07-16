import React from 'react';
import Link from 'next/link';

const ListItem = (organizationData) => {
  const {
    category,
    e_commerce_backend,
    id,
    js_frameworks,
    name,
    website,
    ärinimi,
  } = organizationData['organizationData'];

  return (
    <Link href={`/organizations/${ärinimi}`}>
      <li className="border-b border-gray-300 py-4 flex items-center justify-between hover:bg-gray-100 p-3">
        <p>{name}</p>
        <p>{website}</p>
      </li>
    </Link>
  );
};

export default ListItem;
