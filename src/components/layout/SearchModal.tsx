import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { products } from '../../data/mockData';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus input would be nice, but simple approach for now
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(''), 300);
    }
  }, [isOpen]);

  const searchResults = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.type.toLowerCase().includes(query.toLowerCase()) ||
        p.flavor.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-coffee-dark/95 backdrop-blur-md"
        >
          <div className="max-w-4xl mx-auto w-full px-4 pt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-medium tracking-widest text-coffee-gold uppercase">Search</h2>
              <button 
                onClick={onClose}
                className="p-2 text-coffee-gray hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-12 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-gray group-focus-within:text-coffee-gold transition-colors" size={28} />
              <input
                type="text"
                autoFocus
                placeholder="Search origins, blends, or flavors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-16 text-2xl md:text-3xl font-serif text-coffee-cream focus:outline-none focus:border-coffee-gold/50 focus:bg-white/10 transition-all placeholder:text-white/20 shadow-2xl"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-gray hover:text-coffee-cream transition-colors p-2"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
              {query && searchResults.length === 0 ? (
                <div className="text-coffee-gray text-center py-12">
                  <p>No results found for "{query}".</p>
                  <button 
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="mt-4 text-coffee-gold hover:underline"
                  >
                    Browse all products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-coffee-gold uppercase tracking-widest mb-1">{product.type}</p>
                        <h4 className="text-xl font-medium text-coffee-cream group-hover:text-coffee-gold transition-colors">{product.name}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-medium text-coffee-cream">${product.price.toFixed(2)}</p>
                          <span className="text-xs text-coffee-gray border border-white/10 px-2 py-0.5 rounded bg-black/20">{product.origin}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 group-hover:bg-coffee-gold text-coffee-dark border border-white/5 hover:scale-110">
                        <ArrowRight size={18} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
