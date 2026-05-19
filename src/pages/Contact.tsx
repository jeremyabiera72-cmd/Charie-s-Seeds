import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-coffee-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-6">Get in Touch</h1>
          <p className="text-coffee-gray text-lg">
            Whether you have a question about our beans, an order, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif text-coffee-cream mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-coffee-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-coffee-cream text-lg mb-1">Our Location</h3>
                  <p className="text-coffee-gray">
                    123 Coffee Bean St.<br />
                    Seattle, WA 98101<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-coffee-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-coffee-cream text-lg mb-1">Phone Number</h3>
                  <p className="text-coffee-gray">
                    +1 (555) 123-4567<br />
                    Mon - Fri, 8am - 5pm PST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-coffee-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-coffee-cream text-lg mb-1">Email Address</h3>
                  <p className="text-coffee-gray">
                    hello@chariesseeds.com<br />
                    support@chariesseeds.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white/5 rounded-xl border border-white/5">
              <h3 className="font-serif text-xl text-coffee-cream mb-4">Wholesale Inquiries</h3>
              <p className="text-coffee-gray mb-6 text-sm">
                Interested in supplying your cafe or business with our premium seeds? We offer competitive wholesale pricing.
              </p>
              <button className="text-coffee-gold font-medium hover:text-[#d6af8a] hover:underline transition-all">
                Apply for Wholesale &rarr;
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-morphism p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-[#120e0d]/95 backdrop-blur flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 className="text-coffee-gold mb-4" size={48} />
                <h3 className="text-2xl font-serif text-coffee-cream mb-2">Message Sent!</h3>
                <p className="text-coffee-gray">Thank you for reaching out. We will get back to you within 24 hours.</p>
              </motion.div>
            )}

            <h2 className="text-2xl font-serif text-coffee-cream mb-8">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">First Name</label>
                  <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Email Address</label>
                <input required type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors" />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Subject</label>
                <select required defaultValue="" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors appearance-none">
                  <option value="" disabled>Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-coffee-gray mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-coffee-cream focus:border-coffee-gold outline-none transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-coffee-gold text-coffee-dark font-medium rounded-lg hover:bg-[#d6af8a] transition-all flex justify-center items-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
