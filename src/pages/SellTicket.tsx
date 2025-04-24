import React, { useState } from 'react';
import { CheckCircleIcon, CreditCardIcon, QrCodeIcon, TruckIcon, UserIcon, PhoneIcon } from 'lucide-react';
// Mock data
const routes = [{
  id: 1,
  name: 'Northern Express',
  color: '#3B82F6',
  company: 'Northern Bus Co.'
}, {
  id: 2,
  name: 'Southern Route',
  color: '#10B981',
  company: 'Southern Express'
}, {
  id: 3,
  name: 'Eastern Circuit',
  color: '#F59E0B',
  company: 'Eastern Transport'
}, {
  id: 4,
  name: 'Western Line',
  color: '#8B5CF6',
  company: 'Western Motors'
}];
const locations = [{
  id: 1,
  name: 'Central Station',
  routeIds: [1, 2, 3, 4]
}, {
  id: 2,
  name: 'North Terminal',
  routeIds: [1]
}, {
  id: 3,
  name: 'South Terminal',
  routeIds: [2]
}, {
  id: 4,
  name: 'East Terminal',
  routeIds: [3]
}, {
  id: 5,
  name: 'West Terminal',
  routeIds: [4]
}, {
  id: 6,
  name: 'Mountain View',
  routeIds: [1, 4]
}, {
  id: 7,
  name: 'Riverside',
  routeIds: [2, 3]
}];
// Price calculation based on start and stop
const calculatePrice = (startId: number, stopId: number) => {
  // Simple mock calculation
  return Math.abs(startId - stopId) * 10 + 20;
};
const SellTicket: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [startLocation, setStartLocation] = useState<number | null>(null);
  const [stopLocation, setStopLocation] = useState<number | null>(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Filter locations based on selected route
  const availableStartLocations = selectedRoute ? locations.filter(loc => loc.routeIds.includes(selectedRoute)) : [];
  const availableStopLocations = startLocation ? locations.filter(loc => loc.routeIds.includes(selectedRoute!) && loc.id !== startLocation) : [];
  // Calculate ticket price
  const basePrice = startLocation && stopLocation ? calculatePrice(startLocation, stopLocation) : 0;
  const totalPrice = basePrice * passengerCount;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedRoute(null);
        setStartLocation(null);
        setStopLocation(null);
        setPassengerCount(1);
        setPhoneNumber('');
        setPaymentMethod(null);
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  if (isSuccess) {
    return <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircleIcon size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ticket Sold Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The ticket has been successfully processed and is ready for the
              passenger.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Route:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {routes.find(r => r.id === selectedRoute)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">From:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {locations.find(l => l.id === startLocation)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">To:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {locations.find(l => l.id === stopLocation)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Passengers:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {passengerCount}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Payment:
                </span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-500 dark:text-gray-400">Total:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <button onClick={() => {
            setSelectedRoute(null);
            setStartLocation(null);
            setStopLocation(null);
            setPassengerCount(1);
            setPhoneNumber('');
            setPaymentMethod(null);
            setIsSuccess(false);
          }} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Sell Another Ticket
            </button>
          </div>
        </div>
      </div>;
  }
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Sell Ticket
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create a new ticket for passengers
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Route Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="route" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Route
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TruckIcon size={18} className="text-gray-400" />
                  </div>
                  <select id="route" value={selectedRoute || ''} onChange={e => {
                  const value = e.target.value ? parseInt(e.target.value) : null;
                  setSelectedRoute(value);
                  setStartLocation(null);
                  setStopLocation(null);
                }} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" required>
                    <option value="">Select a route</option>
                    {routes.map(route => <option key={route.id} value={route.id}>
                        {route.name} ({route.company})
                      </option>)}
                  </select>
                </div>
              </div>
            </div>
            {selectedRoute && <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Location
                  </label>
                  <select id="startLocation" value={startLocation || ''} onChange={e => {
                const value = e.target.value ? parseInt(e.target.value) : null;
                setStartLocation(value);
                setStopLocation(null);
              }} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" required>
                    <option value="">Select start location</option>
                    {availableStartLocations.map(location => <option key={location.id} value={location.id}>
                        {location.name}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="stopLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Destination
                  </label>
                  <select id="stopLocation" value={stopLocation || ''} onChange={e => setStopLocation(e.target.value ? parseInt(e.target.value) : null)} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" disabled={!startLocation} required>
                    <option value="">Select destination</option>
                    {availableStopLocations.map(location => <option key={location.id} value={location.id}>
                        {location.name}
                      </option>)}
                  </select>
                </div>
              </div>}
            {startLocation && stopLocation && <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Ticket Price:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${basePrice.toFixed(2)} per passenger
                  </span>
                </div>
              </div>}
          </div>
          {startLocation && stopLocation && <>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Passenger Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Passengers
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon size={18} className="text-gray-400" />
                      </div>
                      <input type="number" id="passengerCount" min="1" max="10" value={passengerCount} onChange={e => setPassengerCount(parseInt(e.target.value) || 1)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon size={18} className="text-gray-400" />
                      </div>
                      <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="For member discounts & notifications" className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Payment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button type="button" className={`flex items-center justify-center py-3 px-4 border-2 rounded-md transition-colors ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-300 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700'}`} onClick={() => setPaymentMethod('cash')}>
                    <CreditCardIcon size={20} className="mr-2" />
                    <span className="font-medium">Cash Payment</span>
                  </button>
                  <button type="button" className={`flex items-center justify-center py-3 px-4 border-2 rounded-md transition-colors ${paymentMethod === 'qr' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-300 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700'}`} onClick={() => setPaymentMethod('qr')}>
                    <QrCodeIcon size={20} className="mr-2" />
                    <span className="font-medium">QR Code Payment</span>
                  </button>
                </div>
                {paymentMethod && <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500 dark:text-gray-400">
                          Base Price:
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ${basePrice.toFixed(2)} × {passengerCount}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-500 dark:text-gray-400">
                          Total:
                        </span>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>}
              </div>
              <div className="p-6 flex justify-end">
                <button type="submit" disabled={!paymentMethod || isSubmitting} className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div> : 'Complete Sale'}
                </button>
              </div>
            </>}
        </form>
      </div>
    </div>;
};
export default SellTicket;