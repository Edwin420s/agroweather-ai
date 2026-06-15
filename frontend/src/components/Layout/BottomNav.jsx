import { NavLink } from 'react-router-dom';

export const BottomNav = () => {
  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/forecast', icon: 'query_stats', label: 'Forecast' },
    { path: '/risks', icon: 'report_problem', label: 'Risks' },
    { path: '/insights', icon: 'auto_awesome', label: 'AI' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-2 pt-2 bg-surface shadow-lg rounded-t-xl border-t border-outline-variant">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-4 py-1 rounded-2xl transition-all ${
              isActive
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          <span className="material-symbols-outlined" style={item.path === '/' ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            {item.icon}
          </span>
          <span className="font-label-sm text-label-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};