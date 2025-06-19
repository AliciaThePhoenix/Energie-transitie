import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/historisch', label: 'Historisch energieverbruik' },
  { href: '/realtime', label: 'Realtime energie verbruik' },
  { href: '/kosten', label: 'Kostenoverzicht' },
  { href: '/doelstelling', label: 'doelstelling' },
  { href: '/co2', label: 'Co2-uitstoot' }
];

export default function Navigation() {
  const router = useRouter();
  return (
    <nav className="sidebar-nav">
      <ul className="sidebar-nav-list">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} legacyBehavior>
              <a className={`sidebar-nav-btn${router.pathname === item.href ? ' active' : ''}`}>
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 