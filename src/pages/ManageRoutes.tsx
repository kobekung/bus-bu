import React, { useState } from 'react';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon, FilterIcon } from 'lucide-react';
import AddRouteModal from '../components/modals/AddRouteModal';
const routesData = [{
  id: 1,
  name: 'Northern Express',
  color: '#3B82F6',
  company: 'Northern Bus Co.',
  schedule: 'Daily',
  departureTime: '08:00, 12:00, 16:00',
  status: 'active'
}, {
  id: 2,
  name: 'Southern Route',
  color: '#10B981',
  company: 'Southern Express',
  schedule: 'Weekdays',
  departureTime: '07:30, 13:30, 18:30',
  status: 'active'
}, {
  id: 3,
  name: 'Eastern Circuit',
  color: '#F59E0B',
  company: 'Eastern Transport',
  schedule: 'Weekends',
  departureTime: '09:00, 15:00',
  status: 'active'
}, {
  id: 4,
  name: 'Western Line',
  color: '#8B5CF6',
  company: 'Western Motors',
  schedule: 'Daily',
  departureTime: '06:00, 10:00, 14:00, 18:00',
  status: 'inactive'
}];
const ManageRoutes: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const filteredRoutes = routesData.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(search.toLowerCase()) || route.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || route.company === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });
  const companies = [...new Set(routesData.map(route => route.company))];
  const handleAddRoute = async (data: {
    name: string;
    company: string;
    color: string;
    schedule: string;
    departureTimes: string[];
    stations: {
      name: string;
      order: number;
    }[];
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Adding route:', data);
    const newRoute = {
      id: routesData.length + 1,
      name: data.name,
      color: data.color,
      company: data.company,
      schedule: data.schedule === 'daily' ? 'Daily' : data.schedule === 'weekdays' ? 'Weekdays' : 'Weekends',
      departureTime: data.departureTimes.join(', '),
      status: 'active',
      stations: data.stations
    };
    routesData.unshift(newRoute);
  };
  return <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Manage Routes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage bus routes
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          <PlusIcon size={16} className="mr-2" />
          Add New Route
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search routes..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FilterIcon size={18} className="mr-2" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Companies</option>
              {companies.map((company, index) => <option key={index} value={company}>
                  {company}
                </option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Departure Times
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRoutes.map(route => <tr key={route.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-2 rounded-full mr-3" style={{
                    backgroundColor: route.color
                  }}></div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {route.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {route.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {route.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {route.departureTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${route.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {route.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                      <EditIcon size={16} />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>)}
              {filteredRoutes.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No routes found matching your search criteria
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      <AddRouteModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddRoute} companies={companies} />
    </div>;
};
export default ManageRoutes;