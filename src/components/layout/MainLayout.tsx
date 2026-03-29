import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function MainLayout({ 
  children, 
  showNavbar = true, 
  showFooter = true 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))] text-[hsl(var(--color-text-primary))] font-body selection:bg-[hsl(var(--color-primary)/0.2)] selection:text-[hsl(var(--color-primary))] relative flex flex-col">
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
}
