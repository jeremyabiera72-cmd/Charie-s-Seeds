import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/mockData';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Products() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Arabica', 'Robusta', 'Liberica', 'Specialty Blend'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.type === activeCategory);

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-6">Our Full Selection</h1>
          <p className="text-coffee-gray text-lg">
            Discover our complete family of premium, direct-trade coffee seeds from around the world.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-coffee-gold text-coffee-dark' 
                  : 'bg-white/5 text-coffee-gray hover:text-coffee-cream hover:bg-white/10 border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      </div>
    </div>
  );
}
