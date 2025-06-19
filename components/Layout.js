import Navigation from './Navigation';

export default function Layout({ children, hideSidebar }) {
  if (hideSidebar) {
    return <main className="main-content minimal-content">{children}</main>;
  }
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Navigation />
      </aside>
      <main className="main-content minimal-content">
        {children}
      </main>
    </div>
  );
} 