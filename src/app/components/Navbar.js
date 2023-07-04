import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-green-400 to-blue-400 p-4 sticky">
      <div className="mx-auto flex flex-start gap-10 flex-col sm:flex-row">
        <h1 className="text-xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link href="/" className="text-white hover:text-black">
            Home
          </Link>
        </h1>
        <h1 className="text-xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link href="/scraper/csv" className="text-white hover:text-black">
            Google sheet fetch
          </Link>
        </h1>
        <h1 className="text-xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link href="/scraper/single" className="text-white hover:text-black">
            Single fetch
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
