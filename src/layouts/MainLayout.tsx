import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { MenuIcon, XIcon, HomeIcon, TicketIcon, MapIcon, UsersIcon, FileTextIcon, LogOutIcon, SunIcon, MoonIcon, BuildingIcon } from 'lucide-react';
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon size={20} />
  }, {
    name: 'Sell Ticket',
    path: '/sell-ticket',
    icon: <TicketIcon size={20} />
  }, {
    name: 'Manage Routes',
    path: '/manage-routes',
    icon: <MapIcon size={20} />,
    minRole: 'admin'
  }, {
    name: 'Manage Tickets',
    path: '/manage-tickets',
    icon: <TicketIcon size={20} />,
    minRole: 'admin'
  }, {
    name: 'Manage Members',
    path: '/manage-members',
    icon: <UsersIcon size={20} />,
    minRole: 'admin'
  }, {
    name: 'Reports',
    path: '/reports',
    icon: <FileTextIcon size={20} />
  }, {
    name: 'Manage Company',
    path: '/manage-company',
    icon: <BuildingIcon size={20} />,
    minRole: 'superadmin'
  }];
  const filteredNavItems = navItems.filter(item => {
    if (!item.minRole) return true;
    if (item.minRole === 'admin') return user?.role === 'admin' || user?.role === 'superadmin';
    if (item.minRole === 'superadmin') return user?.role === 'superadmin';
    return true;
  });
  return <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
              BusTicket
            </span>
          </div>
          <button className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setSidebarOpen(false)}>
            <XIcon size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="px-3 py-4">
          <div className="space-y-1">
            {filteredNavItems.map(item => <NavLink key={item.path} to={item.path} className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>)}
          </div>
        </div>
        <div className="absolute bottom-0 w-full border-t dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {theme === 'dark' ? <SunIcon size={20} className="text-gray-500 dark:text-gray-400" /> : <MoonIcon size={20} className="text-gray-500" />}
            </button>
            <button onClick={logout} className="flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg">
              <LogOutIcon size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setSidebarOpen(true)}>
              <MenuIcon size={24} className="text-gray-500 dark:text-gray-400" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-medium">
                    {user?.username.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user?.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6">
            <Outlet />
          </div>
        </main>
      </div>
      {sidebarOpen && <div className="fixed inset-0 z-0 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>;
};
export default MainLayout;