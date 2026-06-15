import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const navItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/forecast', icon: 'calendar_month', label: '7-Day Forecast' },
    { path: '/risks', icon: 'warning', label: 'Risk Analysis' },
    { path: '/insights', icon: 'psychology', label: 'AI Insights' },
  ];

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant py-6 px-4 z-40">
      <div className="mb-8 flex items-center gap-2 px-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            agriculture
          </span>
        </div>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">AgroWeather AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Field Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-label-md text-label-md ${
                isActive
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-3 border border-primary text-primary font-label-md rounded-xl hover:bg-primary-fixed transition-colors">
          <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          Switch Farm
        </button>
        <NavLink
          to="/support"
          className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-md">Support</span>
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};