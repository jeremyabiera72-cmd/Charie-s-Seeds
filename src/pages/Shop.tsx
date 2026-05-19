import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/mockData';
import { Filter, Search, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Shop() {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();

  const types = ['All', 'Arabica', 'Robusta', 'Liberica', 'Specialty Blend'];

  const filteredProducts = products.filter(p => {
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-4">Our Gallery</h1>
            <p className="text-coffee-gray max-w-xl">
              Browse our curated collection of premium coffee seeds. Filter by origin, type, or flavor profile to find your perfect brew.
            </p>
          </div>
          
          <div className="w-full md:w-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-gray group-focus-within:text-coffee-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search origins..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-coffee-cream focus:outline-none focus:border-coffee-gold/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-medium text-coffee-cream mb-6 pb-4 border-b border-white/5">
                  <Filter size={18} /> Categories
                </h3>
                <ul className="space-y-3">
                  {types.map(type => (
                    <li key={type}>
                      <button 
                        onClick={() => setFilterType(type)}
                        className={`text-sm w-full text-left transition-colors flex justify-between ${
                          filterType === type ? 'text-coffee-gold font-medium' : 'text-coffee-gray hover:text-coffee-cream'
                        }`}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative Banner / Promo */}
              <div className="p-6 relative rounded-xl overflow-hidden glass-morphism hidden lg:block">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524350876685-274059332603?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="relative z-10">
                  <h4 className="font-serif text-xl text-coffee-cream mb-2">Artisan Roasters Club</h4>
                  <p className="text-xs text-coffee-gray mb-4">Subscribe for monthly curated seed deliveries.</p>
                  <button className="text-sm text-coffee-gold font-medium underline underline-offset-4 hover:text-[#d6af8a] transition-colors">Join Now</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={product.id}
                    className="group flex flex-col glass-morphism rounded-xl overflow-hidden border border-white/5 hover:border-coffee-gold/20 transition-all duration-300"
                  >
                    {/* Image Container with Actions */}
                    <div className="relative aspect-square overflow-hidden bg-[#171210]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Floating Actions on Hover */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                          className={`w-10 h-10 backdrop-blur rounded-full flex items-center justify-center transition-colors border ${
                            isFavorite(product.id) 
                              ? 'bg-coffee-gold text-coffee-dark border-coffee-gold' 
                              : 'bg-coffee-dark/80 text-coffee-cream hover:bg-coffee-gold hover:text-coffee-dark border-white/10'
                          }`}
                        >
                          <Heart size={16} className={isFavorite(product.id) ? 'fill-coffee-dark' : ''} />
                        </button>
                        <Link to={`/product/${product.id}`} className="w-10 h-10 bg-coffee-dark/80 backdrop-blur rounded-full flex items-center justify-center text-coffee-cream hover:bg-coffee-gold hover:text-coffee-dark transition-colors border border-white/10">
                          <Eye size={16} />
                        </Link>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-coffee-dark/90 to-transparent">
                        <button 
                          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })}
                          className="w-full py-3 bg-coffee-gold text-coffee-dark font-medium flex justify-center items-center gap-2 rounded hover:bg-[#d6af8a] transition-colors"
                        >
                          <ShoppingBag size={18} /> Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs text-coffee-gold tracking-wider uppercase mb-2">{product.type}</div>
                      <Link to={`/product/${product.id}`} className="block group-hover:text-coffee-gold transition-colors">
                        <h3 className="font-serif text-xl text-coffee-cream mb-2 truncate">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-coffee-gray mb-4 flex-1 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                        <span className="text-lg font-medium text-coffee-cream tracking-wide">${product.price.toFixed(2)}</span>
                        <span className="text-xs px-2 py-1 bg-white/5 rounded text-coffee-gray border border-white/5">{product.origin}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 glass-morphism rounded-xl border border-white/5">
                <Search className="mx-auto text-coffee-gray/30 mb-4" size={48} />
                <h3 className="text-xl font-serif text-coffee-cream mb-2">No seeds found</h3>
                <p className="text-coffee-gray">Try adjusting your origin or category filters.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
