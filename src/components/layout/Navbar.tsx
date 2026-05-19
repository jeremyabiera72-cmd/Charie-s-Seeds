import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-coffee-dark/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center">
              <button 
                className="lg:hidden p-2 -ml-2 mr-2 text-coffee-cream hover:text-coffee-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="text-2xl font-serif font-bold text-coffee-cream tracking-wider flex items-center gap-2">
                Charie's Seeds<span className="w-1.5 h-1.5 rounded-full bg-coffee-gold"></span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/#about">About</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-coffee-cream hover:text-coffee-gold transition-colors hide-on-mobile relative"
              >
                <Search size={20} />
              </button>
              <Link to="/auth" className="text-coffee-cream hover:text-coffee-gold transition-colors hidden sm:block">
                <User size={20} />
              </Link>
              <button 
                className="text-coffee-cream hover:text-coffee-gold transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coffee-gold text-coffee-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-[280px] bg-coffee-dark border-r border-white/10 z-50 lg:hidden flex flex-col"
              >
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                  <span className="font-serif font-bold text-xl tracking-wider text-coffee-cream">MENU</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-coffee-gray hover:text-coffee-cream"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col space-y-6">
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="/shop">Shop</MobileNavLink>
                  <MobileNavLink to="/#about">About</MobileNavLink>
                  <MobileNavLink to="/products">Products</MobileNavLink>
                  <MobileNavLink to="/contact">Contact</MobileNavLink>
                  <div className="h-px bg-white/5 my-4"></div>
                  <MobileNavLink to="/auth">Login / Sign Up</MobileNavLink>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

function NavLink({ to, children }: { to: string, children: ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium tracking-wide text-coffee-cream/80 hover:text-coffee-gold transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-coffee-gold transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string, children: ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-lg font-medium text-coffee-cream/90 hover:text-coffee-gold transition-colors block"
    >
      {children}
    </Link>
  );
}
