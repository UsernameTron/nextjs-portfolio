import Link from 'next/link';

const Navigation = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/linkedin', label: 'LinkedIn Articles' },
    { href: '/medium', label: 'Medium' },
    { href: '/substack', label: 'Substack' },
    { href: '/projects', label: 'Projects' },
    { href: '/media', label: 'Media' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
