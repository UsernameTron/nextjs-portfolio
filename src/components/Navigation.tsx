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
    <nav className="fixed top-0 left-0 right-0 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-display font-bold text-xl text-white hover:text-primary-300 transition-colors">
            No AI Grift
          </Link>
          <div className="flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors rounded-md"
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
