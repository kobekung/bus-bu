import React, { useState } from 'react';
import { SearchIcon, EyeIcon, FilterIcon, DownloadIcon } from 'lucide-react';
// Mock data
const ticketsData = [{
  id: 'T12345',
  route: 'Northern Express',
  routeColor: '#3B82F6',
  from: 'Central Station',
  to: 'North Terminal',
  date: '2023-05-15',
  time: '08:00',
  status: 'used',
  amount: 30.0,
  paymentMethod: 'cash',
  discountType: 'none',
  passengerCount: 1,
  customerPhone: '555-123-4567'
}, {
  id: 'T12346',
  route: 'Southern Route',
  routeColor: '#10B981',
  from: 'Central Station',
  to: 'South Terminal',
  date: '2023-05-15',
  time: '09:30',
  status: 'active',
  amount: 50.0,
  paymentMethod: 'qr',
  discountType: 'senior',
  passengerCount: 2,
  customerPhone: '555-987-6543'
}, {
  id: 'T12347',
  route: 'Eastern Circuit',
  routeColor: '#F59E0B',
  from: 'East Terminal',
  to: 'Riverside',
  date: '2023-05-16',
  time: '10:00',
  status: 'canceled',
  amount: 25.0,
  paymentMethod: 'cash',
  discountType: 'student',
  passengerCount: 1,
  customerPhone: '555-456-7890'
}, {
  id: 'T12348',
  route: 'Western Line',
  routeColor: '#8B5CF6',
  from: 'Central Station',
  to: 'Mountain View',
  date: '2023-05-16',
  time: '14:00',
  status: 'active',
  amount: 75.0,
  paymentMethod: 'qr',
  discountType: 'none',
  passengerCount: 3,
  customerPhone: '555-234-5678'
}];
const ManageTickets: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  // Apply filters
  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(search.toLowerCase()) || ticket.route.toLowerCase().includes(search.toLowerCase()) || ticket.customerPhone.includes(search);
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || ticket.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });
  return <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Manage Tickets
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage ticket information
          </p>
        </div>
        <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          <DownloadIcon size={16} className="mr-2" />
          Export Tickets
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ticket ID, route, or phone..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FilterIcon size={18} className="mr-2" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="used">Used</option>
              <option value="canceled">Canceled</option>
            </select>
            <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="all">All Payments</option>
              <option value="cash">Cash</option>
              <option value="qr">QR Code</option>
            </select>
          </div>
        </div>
      </div>
      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Journey
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTickets.map(ticket => <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-2 rounded-full mr-3" style={{
                    backgroundColor: ticket.routeColor
                  }}></div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {ticket.route}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {ticket.from} <span className="mx-1">→</span> {ticket.to}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {ticket.passengerCount} passenger
                      {ticket.passengerCount > 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(ticket.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {ticket.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ticket.status === 'used' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.paymentMethod === 'cash' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}>
                      {ticket.paymentMethod.toUpperCase()}
                    </span>
                    {ticket.discountType !== 'none' && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {ticket.discountType.toUpperCase()}
                      </span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    ${ticket.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                      <EyeIcon size={16} />
                    </button>
                  </td>
                </tr>)}
              {filteredTickets.length === 0 && <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No tickets found matching your search criteria
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default ManageTickets;