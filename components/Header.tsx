
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="relative w-1/3">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        <input
          type="text"
          placeholder="Search transactions, investments..."
          className="bg-slate-100 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-500 hover:text-sky-600">
          <i className="fas fa-bell text-xl"></i>
        </button>
        <button className="text-slate-500 hover:text-sky-600">
          <i className="fas fa-cog text-xl"></i>
        </button>
        <div className="flex items-center">
          <img
            src="https://picsum.photos/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-3 font-semibold text-slate-700">Alex Johnson</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
