import { useState, FormEvent } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-coffee-dark pt-32 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="bg-[#171210] p-12 rounded-2xl border border-coffee-gold/30 text-center max-w-lg shadow-[0_0_50px_rgba(194,149,110,0.1)]"
        >
          <div className="w-20 h-20 rounded-full bg-coffee-gold/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-coffee-gold" size={40} />
          </div>
          <h2 className="text-3xl font-serif text-coffee-cream mb-4">Order Confirmed</h2>
          <p className="text-coffee-gray mb-8">
            Thank you for your purchase. Your premium seeds are being prepared for shipping and will be on their way shortly.
          </p>
          <Link 
            to="/shop"
            className="inline-block px-8 py-4 bg-coffee-gold text-coffee-dark font-medium rounded hover:bg-[#d6af8a] transition-colors w-full"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-coffee-dark pt-32 px-4 text-center">
        <h2 className="text-3xl font-serif text-coffee-cream mb-4">Checkout Process</h2>
        <p className="text-coffee-gray mb-8">Your cart is empty.</p>
        <Link to="/shop" className="text-coffee-gold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-coffee-cream mb-12">Checkout</h1>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          
          {/* Form Section */}
          <div className="flex-1 space-y-12">
            
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              {/* Shipping Details */}
              <section className="bg-white/5 p-8 rounded-xl border border-white/5">
                <h2 className="text-xl font-medium text-coffee-cream mb-6 flex items-center gap-3">
                  <Truck className="text-coffee-gold" /> Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">First Name</label>
                    <input required type="text" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Last Name</label>
                    <input required type="text" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Street Address</label>
                    <input required type="text" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">City</label>
                    <input required type="text" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">ZIP Code</label>
                    <input required type="text" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section className="bg-white/5 p-8 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <ShieldCheck size={120} />
                </div>
                <h2 className="text-xl font-medium text-coffee-cream mb-6 flex items-center gap-3 relative z-10">
                  <CreditCard className="text-coffee-gold" /> Payment Method
                </h2>
                <div className="grid grid-cols-1 gap-6 relative z-10">
                  <div className="col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Card Number</label>
                    <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors font-mono tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 col-span-1">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">CVC</label>
                      <input required type="password" placeholder="***" className="w-full bg-coffee-dark border border-white/10 rounded px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#171210] p-6 lg:p-8 rounded-xl border border-coffee-gold/20 sticky top-32">
              <h2 className="text-2xl font-serif text-coffee-cream mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-white/5" />
                    <div className="flex-1">
                      <h4 className="text-coffee-cream font-medium text-sm truncate max-w-[150px]">{item.name}</h4>
                      <p className="text-coffee-gray text-xs">Qty: {item.quantity}</p>
                      <p className="text-coffee-gold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3 mb-6 font-medium">
                <div className="flex justify-between text-coffee-gray">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-coffee-gray">
                  <span>Shipping limit</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-coffee-cream text-xl pt-3 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-coffee-gold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 bg-coffee-gold text-coffee-dark font-bold text-lg rounded hover:bg-[#d6af8a] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? 'Processing Payment...' : 'Place Order'}
                {!isProcessing && <ShieldCheck size={20} />}
              </button>
              
              <p className="text-center text-xs text-coffee-gray mt-4 flex items-center justify-center gap-1">
                <Lock size={12} /> Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
