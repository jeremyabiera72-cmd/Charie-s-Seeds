import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { ShoppingBag, Star, ChevronLeft, Minus, Plus, Share2, Heart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc'|'origin'|'reviews'>('desc');
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center text-coffee-cream">
        <h2 className="text-2xl font-serif mb-4">Product not found</h2>
        <Link to="/shop" className="text-coffee-gold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity, image: product.image });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-coffee-dark pt-24 pb-24 relative overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#171210] border border-coffee-gold bg-opacity-90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle2 className="text-coffee-gold" size={20} />
            <span className="text-coffee-cream font-medium">Added to your cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-coffee-gray hover:text-coffee-gold transition-colors mb-8">
          <ChevronLeft size={20} /> Back to selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Main Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative aspect-square rounded-2xl overflow-hidden glass-morphism border border-white/5"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover origin-center hover:scale-125 transition-transform duration-700 ease-in-out cursor-zoom-in"
            />
            <button 
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-6 right-6 w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg ${
                isFavorite(product.id) 
                  ? 'bg-coffee-gold text-coffee-dark hover:bg-[#d6af8a]' 
                  : 'bg-coffee-dark/50 text-white/70 hover:text-coffee-gold'
              }`}
            >
              <Heart size={20} className={isFavorite(product.id) ? 'fill-coffee-dark' : ''} />
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="mb-8 border-b border-white/5 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-coffee-gold uppercase tracking-widest text-sm mb-2">{product.type}</p>
                  <h1 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-4">{product.name}</h1>
                </div>
                <button className="text-coffee-gray hover:text-coffee-cream mt-2"><Share2 size={20}/></button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-medium text-coffee-cream">${product.price.toFixed(2)}</span>
                <div className="h-6 w-px bg-white/10"></div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-coffee-gold text-coffee-gold" />
                  <span className="text-sm text-coffee-gray">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-coffee-gray/90 leading-relaxed mb-6 block lg:hidden">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-coffee-cream">{product.stock}</span>
                <span className="text-sm text-coffee-gray">— Ships within 24 hours</span>
              </div>

              {/* Add to Cart Control */}
              <div className="flex flex-col sm:flex-row gap-4 align-stretch">
                <div className="flex items-center justify-between border border-white/10 rounded overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-coffee-gray hover:bg-white/5 hover:text-coffee-cream transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-lg text-coffee-cream font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-coffee-gray hover:bg-white/5 hover:text-coffee-cream transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-3 bg-coffee-gold text-coffee-dark font-medium flex items-center justify-center gap-3 rounded hover:bg-[#d6af8a] transition-colors"
                >
                  <ShoppingBag size={20} /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex-1 flex flex-col">
              <div className="flex border-b border-white/10 mb-6 font-medium text-sm text-coffee-gray uppercase tracking-widest gap-8">
                <button 
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'desc' ? 'border-coffee-gold text-coffee-gold' : 'border-transparent hover:text-coffee-cream'}`}
                  onClick={() => setActiveTab('desc')}
                >
                  Description
                </button>
                <button 
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'origin' ? 'border-coffee-gold text-coffee-gold' : 'border-transparent hover:text-coffee-cream'}`}
                  onClick={() => setActiveTab('origin')}
                >
                  Origin & Process
                </button>
                <button 
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-coffee-gold text-coffee-gold' : 'border-transparent hover:text-coffee-cream'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              <div className="flex-1 text-coffee-gray">
                {activeTab === 'desc' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <span className="block text-xs uppercase text-coffee-gold mb-1">Flavor Notes</span>
                        <span className="text-coffee-cream text-sm">{product.flavor}</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <span className="block text-xs uppercase text-coffee-gold mb-1">Roast Rec</span>
                        <span className="text-coffee-cream text-sm">Light to Medium</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'origin' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
                    <p><strong>Region:</strong> Sourced directly from {product.origin}. Supported by local organic farming communities.</p>
                    <p><strong>Processing:</strong> Fully Washed. Fermented for 24-36 hours and dried on raised beds to ensure a clean, vibrant profile.</p>
                  </motion.div>
                )}
                {activeTab === 'reviews' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex items-center justify-center py-8">
                    <p>Reviews coming soon via authenticated buyers.</p>
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
