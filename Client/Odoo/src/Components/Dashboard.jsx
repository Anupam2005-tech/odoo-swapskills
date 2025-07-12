import React, { useState } from 'react';
import SidebarCompo from '../Components/SidebarCompo';
import SkillForm from './SkillForm';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar */}
      
      <div className="w-[220px]">
        <SidebarCompo />
      </div>

      {/* Main Content */}
      
      <div className="flex-1 px-4 md:px-10 py-6">
        {/* Header: Search & Availability Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px] px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-100 dark:bg-zinc-800 text-black dark:text-white text-sm"
          />

          {/* Availability dropdown */}
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full sm:w-[200px] px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-100 dark:bg-zinc-800 text-black dark:text-white text-sm"
          >
            <option value="">Filter by availability</option>
            <option value="Weekends">Weekends</option>
            <option value="Evenings">Evenings</option>
            <option value="Mornings">Mornings</option>
            <option value="Weekdays">Weekdays</option>
          </select>
        </div>

        {/* Placeholder for further content */}
        <div className="text-gray-600 dark:text-gray-300">
          {/* You can render a grid/list of users or skill cards here */}
          Start exploring skill swaps!
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;