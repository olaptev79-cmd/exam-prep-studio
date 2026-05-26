import { NavLink, Route, Routes } from 'react-router-dom';
import OverviewScreen from '../features/overview/OverviewScreen';
import PlannerScreen from '../features/planner/PlannerScreen';
import TaskQueueScreen from '../features/tasks/TaskQueueScreen';
import PracticeScreen from '../features/practice/PracticeScreen';
import InsightsScreen from '../features/insights/InsightsScreen';

const navigation = [
  { to: '/', label: 'Overview' },
  { to: '/planner', label: 'Planner' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/practice', label: 'Practice' },
  { to: '/insights', label: 'Insights' }
];

export default function App() {
  return (
    <div className="layout-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-icon">ES</div>
          <div>
            <h1>ExamPrep Studio</h1>
            <p>Revision planning for focused students</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <span className="pill">This week</span>
          <h3>One strong mock exam can shift the whole month.</h3>
          <p>Use planner, practice and review together instead of treating them as separate tasks.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Student workspace</p>
            <h2>Good afternoon, Alex</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-btn">Weekly report</button>
            <button className="primary-btn">Start 45-minute block</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<OverviewScreen />} />
          <Route path="/planner" element={<PlannerScreen />} />
          <Route path="/tasks" element={<TaskQueueScreen />} />
          <Route path="/practice" element={<PracticeScreen />} />
          <Route path="/insights" element={<InsightsScreen />} />
        </Routes>
      </main>
    </div>
  );
}
