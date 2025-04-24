import React, { useState } from 'react';
import { XIcon, MapPinIcon, BuildingIcon, ClockIcon, PlusIcon, GripVerticalIcon } from 'lucide-react';
interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    company: string;
    color: string;
    schedule: string;
    departureTimes: string[];
    stations: {
      name: string;
      order: number;
    }[];
  }) => void;
  companies: string[];
}
const AddRouteModal: React.FC<AddRouteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  companies
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    color: '#3B82F6',
    schedule: 'daily',
    departureTimes: [''],
    stations: [{
      name: '',
      order: 0
    }]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Route name is required';
    }
    if (!formData.company) {
      newErrors.company = 'Company is required';
    }
    if (!formData.schedule) {
      newErrors.schedule = 'Schedule is required';
    }
    if (formData.departureTimes.some(time => !time)) {
      newErrors.departureTimes = 'All departure times must be filled';
    }
    if (formData.stations.length < 2) {
      newErrors.stations = 'At least 2 stations are required';
    }
    if (formData.stations.some(station => !station.name.trim())) {
      newErrors.stations = 'All station names must be filled';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const addDepartureTime = () => {
    setFormData({
      ...formData,
      departureTimes: [...formData.departureTimes, '']
    });
  };
  const removeDepartureTime = (index: number) => {
    setFormData({
      ...formData,
      departureTimes: formData.departureTimes.filter((_, i) => i !== index)
    });
  };
  const updateDepartureTime = (index: number, value: string) => {
    const newDepartureTimes = [...formData.departureTimes];
    newDepartureTimes[index] = value;
    setFormData({
      ...formData,
      departureTimes: newDepartureTimes
    });
  };
  const addStation = () => {
    setFormData({
      ...formData,
      stations: [...formData.stations, {
        name: '',
        order: formData.stations.length
      }]
    });
  };
  const removeStation = (index: number) => {
    if (formData.stations.length > 1) {
      const newStations = formData.stations.filter((_, i) => i !== index);
      const updatedStations = newStations.map((station, i) => ({
        ...station,
        order: i
      }));
      setFormData({
        ...formData,
        stations: updatedStations
      });
    }
  };
  const updateStation = (index: number, value: string) => {
    const newStations = [...formData.stations];
    newStations[index] = {
      ...newStations[index],
      name: value
    };
    setFormData({
      ...formData,
      stations: newStations
    });
  };
  const moveStation = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0 || direction === 'down' && index === formData.stations.length - 1) {
      return;
    }
    const newStations = [...formData.stations];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = {
      ...newStations[index]
    };
    newStations[index] = {
      ...newStations[swapIndex],
      order: temp.order
    };
    newStations[swapIndex] = {
      ...temp,
      order: newStations[index].order
    };
    setFormData({
      ...formData,
      stations: newStations
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        <div className="relative z-50 w-full max-w-md p-6 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <XIcon size={24} />
            </button>
          </div>
          <div className="mb-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Add New Route
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fill in the route details below
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Route Name
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="text" id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`} placeholder="Enter route name" />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BuildingIcon size={18} className="text-gray-400" />
                  </div>
                  <select id="company" value={formData.company} onChange={e => setFormData({
                  ...formData,
                  company: e.target.value
                })} className={`block w-full pl-10 pr-3 py-2 border ${errors.company ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}>
                    <option value="">Select a company</option>
                    {companies.map(company => <option key={company} value={company}>
                        {company}
                      </option>)}
                  </select>
                </div>
                {errors.company && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.company}
                  </p>}
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Route Color
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600" style={{
                  backgroundColor: formData.color
                }} />
                  <input type="color" id="color" value={formData.color} onChange={e => setFormData({
                  ...formData,
                  color: e.target.value
                })} className="h-8 w-16 rounded border border-gray-300 dark:border-gray-600" />
                </div>
              </div>
              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Schedule
                </label>
                <select id="schedule" value={formData.schedule} onChange={e => setFormData({
                ...formData,
                schedule: e.target.value
              })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Departure Times
                </label>
                <div className="mt-1 space-y-2">
                  {formData.departureTimes.map((time, index) => <div key={index} className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ClockIcon size={18} className="text-gray-400" />
                        </div>
                        <input type="time" value={time} onChange={e => updateDepartureTime(index, e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                      </div>
                      {formData.departureTimes.length > 1 && <button type="button" onClick={() => removeDepartureTime(index)} className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                          <XIcon size={18} />
                        </button>}
                    </div>)}
                  <button type="button" onClick={addDepartureTime} className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Add Departure Time
                  </button>
                </div>
                {errors.departureTimes && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.departureTimes}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stations
                </label>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add stations in order from start to end
                </p>
                <div className="mt-2 space-y-2">
                  {formData.stations.map((station, index) => <div key={index} className="flex items-center space-x-2">
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col space-y-1">
                          <button type="button" onClick={() => moveStation(index, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50">
                            ↑
                          </button>
                          <button type="button" onClick={() => moveStation(index, 'down')} disabled={index === formData.stations.length - 1} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50">
                            ↓
                          </button>
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon size={18} className="text-gray-400" />
                        </div>
                        <input type="text" value={station.name} onChange={e => updateStation(index, e.target.value)} placeholder={`Station ${index + 1}`} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                      </div>
                      {formData.stations.length > 1 && <button type="button" onClick={() => removeStation(index)} className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                          <XIcon size={18} />
                        </button>}
                    </div>)}
                  <button type="button" onClick={addStation} className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    <PlusIcon size={16} className="inline-block mr-2" />
                    Add Station
                  </button>
                </div>
                {errors.stations && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.stations}
                  </p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50">
                {isSubmitting ? <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div> : 'Add Route'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default AddRouteModal;