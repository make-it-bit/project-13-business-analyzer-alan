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
    <li>
      <Link href={`/organizations/${ärinimi}`}>{name}</Link>
      <p>{website}</p>
    </li>
  );
};

export default ListItem;
