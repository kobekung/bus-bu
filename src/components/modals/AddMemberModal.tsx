import React, { useState } from 'react';
import { XIcon, PhoneIcon, UserIcon, BuildingIcon } from 'lucide-react';
interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    phone: string;
    company: string;
    role?: 'admin' | 'cashier';
  }) => void;
  companies: string[];
  userRole: 'admin' | 'superadmin';
}
const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  companies,
  userRole
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    role: userRole === 'superadmin' ? 'cashier' : 'cashier' as 'admin' | 'cashier'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Member's name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be in format: 123-456-7890';
    }
    if (userRole === 'superadmin' && !formData.company) {
      newErrors.company = 'Company is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
              Add New Member
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fill in the member details below
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Member Name
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="text" id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`} placeholder="Enter member name" />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="tel" id="phone" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`} placeholder="123-456-7890" />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phone}
                  </p>}
              </div>
              {userRole === 'superadmin' && <div>
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
                </div>}
              {userRole === 'superadmin' && <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon size={18} className="text-gray-400" />
                    </div>
                    <select id="role" value={formData.role} onChange={e => setFormData({
                  ...formData,
                  role: e.target.value as 'admin' | 'cashier'
                })} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                      <option value="cashier">Cashier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50">
                {isSubmitting ? <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div> : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default AddMemberModal;