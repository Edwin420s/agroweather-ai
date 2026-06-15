import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { BottomNav } from './components/Layout/BottomNav';
import { Dashboard } from './components/Pages/Dashboard';
import { ForecastPage } from './components/Pages/ForecastPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/risks" element={<Dashboard />} />
            <Route path="/insights" element={<Dashboard />} />
          </Routes>
          <BottomNav />
        </main>
      </div>
    </Router>
  );
}

export default App;