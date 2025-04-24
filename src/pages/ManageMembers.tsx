import React, { useState } from 'react';
import { SearchIcon, FilterIcon, PlusIcon, UserIcon, PhoneIcon, TicketIcon, CalendarIcon } from 'lucide-react';
import AddMemberModal from '../components/modals/AddMemberModal';
import { useAuth } from '../contexts/AuthContext';
const membersData = [{
  id: 1,
  phone: '555-123-4567',
  name: 'John Smith',
  company: 'Northern Bus Co.',
  role: 'cashier',
  totalTrips: 15,
  lastTransaction: '2023-05-10',
  status: 'active'
}, {
  id: 2,
  phone: '555-987-6543',
  name: 'Sarah Johnson',
  company: 'Southern Express',
  role: 'admin',
  totalTrips: 8,
  lastTransaction: '2023-05-12',
  status: 'active'
}, {
  id: 3,
  phone: '555-456-7890',
  name: 'Michael Brown',
  company: 'Eastern Transport',
  totalTrips: 22,
  lastTransaction: '2023-05-15',
  status: 'inactive'
}, {
  id: 4,
  phone: '555-234-5678',
  name: 'Emily Davis',
  company: 'Western Motors',
  totalTrips: 5,
  lastTransaction: '2023-04-28',
  status: 'active'
}];
const ManageMembers: React.FC = () => {
  const {
    user
  } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const filteredMembers = membersData.filter(member => {
    const matchesSearch = member.phone.includes(search) || member.name && member.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || member.company === companyFilter;
    if (user?.role === 'admin' && user?.companyId) {
      return matchesSearch && matchesStatus && member.company === user.companyId;
    }
    return matchesSearch && matchesStatus && matchesCompany;
  });
  const companies = [...new Set(membersData.map(member => member.company))];
  const handleAddMember = async (data: {
    name: string;
    phone: string;
    company: string;
    role?: 'admin' | 'cashier';
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Adding member:', data);
    const newMember = {
      id: membersData.length + 1,
      ...data,
      role: data.role || 'cashier',
      totalTrips: 0,
      lastTransaction: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    membersData.unshift(newMember);
  };
  const showCompanyFilter = user?.role === 'superadmin';
  return <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Manage Members
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage customer information
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          <PlusIcon size={16} className="mr-2" />
          Add New Member
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by phone or name..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
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
            {showCompanyFilter && <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                <option value="all">All Companies</option>
                {companies.map((company, index) => <option key={index} value={company}>
                    {company}
                  </option>)}
              </select>}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMembers.map(member => <li key={member.id} className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-750">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-medium text-lg">
                      {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {member.name || 'Unnamed Member'}
                      </h3>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
                        ({member.role})
                      </span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <PhoneIcon size={16} className="mr-1" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserIcon size={14} className="mr-1" />
                      <span>{member.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <TicketIcon size={14} className="mr-1" />
                      <span>{member.totalTrips} trips total</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      Last Transaction
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>
                        {new Date(member.lastTransaction).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    View Details
                  </button>
                </div>
              </div>
            </li>)}
          {filteredMembers.length === 0 && <li className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No members found matching your search criteria
            </li>}
        </ul>
      </div>
      <AddMemberModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddMember} companies={companies} userRole={user?.role === 'superadmin' ? 'superadmin' : 'admin'} />
    </div>;
};
export default ManageMembers;