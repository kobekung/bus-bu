import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FilterIcon, DownloadIcon, PrinterIcon, ChevronDownIcon } from 'lucide-react';
// Mock data for reports
const dailyData = [{
  date: '2023-05-10',
  passengers: 320,
  revenue: 9600,
  routes: 4
}, {
  date: '2023-05-11',
  passengers: 350,
  revenue: 10500,
  routes: 4
}, {
  date: '2023-05-12',
  passengers: 380,
  revenue: 11400,
  routes: 4
}, {
  date: '2023-05-13',
  passengers: 450,
  revenue: 13500,
  routes: 5
}, {
  date: '2023-05-14',
  passengers: 480,
  revenue: 14400,
  routes: 5
}, {
  date: '2023-05-15',
  passengers: 410,
  revenue: 12300,
  routes: 4
}, {
  date: '2023-05-16',
  passengers: 390,
  revenue: 11700,
  routes: 4
}];
const companyData = [{
  name: 'Northern Bus Co.',
  passengers: 850,
  revenue: 25500
}, {
  name: 'Southern Express',
  passengers: 720,
  revenue: 21600
}, {
  name: 'Eastern Transport',
  passengers: 650,
  revenue: 19500
}, {
  name: 'Western Motors',
  passengers: 560,
  revenue: 16800
}];
const routeData = [{
  name: 'Northern Express',
  passengers: 850,
  revenue: 25500
}, {
  name: 'Southern Route',
  passengers: 720,
  revenue: 21600
}, {
  name: 'Eastern Circuit',
  passengers: 650,
  revenue: 19500
}, {
  name: 'Western Line',
  passengers: 560,
  revenue: 16800
}];
const paymentData = [{
  method: 'Cash',
  transactions: 1450,
  amount: 43500
}, {
  method: 'QR Code',
  transactions: 1330,
  amount: 39900
}];
const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: '2023-05-10',
    end: '2023-05-16'
  });
  const [groupBy, setGroupBy] = useState<string>('day');
  const [reportType, setReportType] = useState<string>('overview');
  return <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate and view detailed reports
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <PrinterIcon size={16} className="mr-2" />
            Print
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <DownloadIcon size={16} className="mr-2" />
            Export CSV
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <div size={16} className="mr-2" />
            Refresh Data
          </button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FilterIcon size={18} className="mr-2" />
            <span className="text-sm font-medium">Report Options:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <label htmlFor="start-date" className="text-sm text-gray-700 dark:text-gray-300">
                From:
              </label>
              <input type="date" id="start-date" value={dateRange.start} onChange={e => setDateRange({
              ...dateRange,
              start: e.target.value
            })} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="end-date" className="text-sm text-gray-700 dark:text-gray-300">
                To:
              </label>
              <input type="date" id="end-date" value={dateRange.end} onChange={e => setDateRange({
              ...dateRange,
              end: e.target.value
            })} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <select value={groupBy} onChange={e => setGroupBy(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="day">Group by Day</option>
              <option value="week">Group by Week</option>
              <option value="month">Group by Month</option>
            </select>
            <select value={reportType} onChange={e => setReportType(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
              <option value="overview">Overview</option>
              <option value="company">By Company</option>
              <option value="route">By Route</option>
              <option value="payment">By Payment Method</option>
            </select>
          </div>
        </div>
      </div>
      {/* Report Content */}
      <div className="space-y-6">
        {/* Overview Report */}
        {reportType === 'overview' && <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Daily Overview
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={date => new Date(date).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                })} />
                    <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" />
                    <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                    <Tooltip formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value}`, 'Revenue'];
                  if (name === 'passengers') return [value, 'Passengers'];
                  return [value, name];
                }} labelFormatter={date => new Date(date).toLocaleDateString()} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#F59E0B" activeDot={{
                  r: 8
                }} />
                    <Line yAxisId="right" type="monotone" dataKey="passengers" name="Passengers" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Total Passengers
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  2,780
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    ↑ 12.5%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    vs. previous period
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  $83,400
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    ↑ 8.3%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    vs. previous period
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Average Ticket Price
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  $30.00
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-red-600 dark:text-red-400">↓ 1.2%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    vs. previous period
                  </span>
                </div>
              </div>
            </div>
          </>}
        {/* Company Report */}
        {reportType === 'company' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Performance by Company
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip formatter={(value, name) => {
                if (name === 'revenue') return [`$${value}`, 'Revenue'];
                return [value, name];
              }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#F59E0B" />
                  <Bar yAxisId="right" dataKey="passengers" name="Passengers" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>}
        {/* Route Report */}
        {reportType === 'route' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Performance by Route
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip formatter={(value, name) => {
                if (name === 'revenue') return [`$${value}`, 'Revenue'];
                return [value, name];
              }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#F59E0B" />
                  <Bar yAxisId="right" dataKey="passengers" name="Passengers" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>}
        {/* Payment Report */}
        {reportType === 'payment' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Performance by Payment Method
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip formatter={(value, name) => {
                if (name === 'amount') return [`$${value}`, 'Amount'];
                return [value, name];
              }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="amount" name="Amount ($)" fill="#F59E0B" />
                  <Bar yAxisId="right" dataKey="transactions" name="Transactions" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>}
        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Detailed Data
              </h3>
              <div className="relative inline-block text-left">
                <button type="button" className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Export Options
                  <ChevronDownIcon size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Passengers
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Avg. Ticket Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Routes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dailyData.map((day, index) => <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {day.passengers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ${day.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ${(day.revenue / day.passengers).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {day.routes}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
};
export default Reports;