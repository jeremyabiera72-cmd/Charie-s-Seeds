import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, ShieldCheck, CupSoda, Star } from 'lucide-react';
import { products } from '../data/mockData';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-coffee-dark">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center object-cover" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-coffee-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={STAGGER}
              className="max-w-xl md:w-1/2 md:pr-12"
            >
            <motion.h1 
              variants={FADE_UP}
              className="text-5xl md:text-7xl font-serif text-coffee-cream font-bold leading-tight mb-6"
            >
              Premium Coffee Seeds <br />
              <span className="text-gold-gradient font-normal italic">for Authentic Brewing</span>
            </motion.h1>
            
            <motion.p 
              variants={FADE_UP}
              className="text-lg md:text-xl text-coffee-cream/80 mb-10 max-w-lg"
            >
              Elevate your morning ritual. We source the finest, ethically-grown coffee seeds from the world's most renowned high-altitude farms.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="px-8 py-4 bg-coffee-gold text-coffee-dark font-medium text-center hover:bg-[#d6af8a] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link 
                to="/auth" 
                className="px-8 py-4 bg-transparent border border-coffee-gold text-coffee-gold text-center hover:bg-coffee-gold/10 transition-colors rounded-sm"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-coffee-cream/50">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-coffee-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* 2. Product Introduction */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-coffee-gold mb-3">Our Selection</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-6">Discover the Origins</h3>
          <p className="max-w-2xl mx-auto text-coffee-gray">From the floral heights of Ethiopia to the volcanic soils of Guatemala, explore our hand-picked selection of raw coffee seeds.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={FADE_UP}
              className="group relative bg-[#171210] border border-white/5 rounded-2xl overflow-hidden hover:border-coffee-gold/30 transition-colors duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-coffee-gold uppercase tracking-wider mb-1">{product.type}</p>
                    <h4 className="text-xl font-medium text-coffee-cream group-hover:text-coffee-gold transition-colors">{product.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-coffee-gray mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-coffee-cream">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-coffee-gold text-coffee-gold" />
                    <span className="text-sm text-coffee-gray">{product.rating}</span>
                  </div>
                </div>
                <Link 
                  to={`/product/${product.id}`}
                  className="w-full py-3 block text-center border border-white/10 text-coffee-cream group-hover:bg-coffee-gold group-hover:text-coffee-dark group-hover:border-coffee-gold transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 text-coffee-gold hover:text-[#d6af8a] hover:gap-3 transition-all">
            <span className="uppercase tracking-widest text-sm font-medium">View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-24 bg-[#0d0a09] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-coffee-cream mb-6">The Charie's Seeds Difference</h2>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Leaf, title: "Organic Farming", desc: "Sourced exclusively from certified organic and shaded farms seamlessly integrated with nature." },
              { icon: ShieldCheck, title: "Premium Quality", desc: "Every batch is rigorously tested for defects, ensuring only specialty-grade seeds reach your doorstep." },
              { icon: Truck, title: "Worldwide Shipping", desc: "Climate-controlled transit guarantees freshness, no matter where you are brewing." },
              { icon: CupSoda, title: "Sustainable Yield", desc: "We pay above fair-trade prices, empowering farmers to invest back into their communities." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={FADE_UP} className="p-8 glass-morphism rounded-xl text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-coffee-dark border border-coffee-gold/20 flex items-center justify-center mb-6 group-hover:border-coffee-gold transition-colors">
                  <feature.icon className="text-coffee-gold" size={28} />
                </div>
                <h4 className="text-xl font-medium text-coffee-cream mb-3">{feature.title}</h4>
                <p className="text-sm text-coffee-gray leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Coffee Story (Split Layout) */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
             <div className="relative aspect-square rounded-2xl overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                 alt="Coffee farming"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(18,14,13,0.8)]"></div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm uppercase tracking-widest text-coffee-gold mb-3">Our Origins</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-coffee-cream mb-8 leading-tight">Rooted in Tradition,<br/>Perfected by Science</h3>
            <div className="space-y-6 text-coffee-gray">
              <p>
                Charie’s Seeds began as a family tradition rooted in the rich agricultural lands of Agusan del Sur, where farming has been a way of life passed down through generations. Built on dedication, hard work, and deep respect for nature, our family continues to cultivate seeds with passion and authenticity.
              </p>
              <p>
               At Charie’s Seeds, we provide pure and high-quality seed products carefully grown and selected with extensive care. We take pride in offering locally nurtured seeds that are not imported, ensuring freshness, reliability, and the natural quality trusted by farmers and growers in the community.
              </p>
              <p>
                From traditional farming knowledge to modern cultivation practices, every seed we produce reflects our commitment to excellence and sustainable agriculture. More than just a product, our seeds represent family heritage, genuine care, and a promise to help every harvest grow stronger and healthier.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 bg-[#0a0807] overflow-hidden border-t border-white/5 text-center">
        <h2 className="text-4xl font-serif text-coffee-cream mb-16">Stories from the Cup</h2>
        
        <div className="flex gap-6 px-4 md:px-0 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbars justify-start md:justify-center">
          {[
            { name: "Julian Bates", role: "Master Roaster", review: "The Arabica Reserve is unparalleled. The moisture content is incredibly consistent, making for a flawless roast every time." },
            { name: "Sophia Chen", role: "Home Barista", review: "I decided to try roasting at home, and the Specialty Blend seeds gave me a rich, complex flavor that easily beats my local cafe." },
            { name: "Marcus Delgado", role: "Coffee Shop Owner", review: "Charie's Seeds’ Liberica seeds have become a secret weapon in our signature drinks. The bold, smoky notes are stunning." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="min-w-[320px] max-w-sm glass-morphism p-8 rounded-2xl flex-shrink-0 snap-center text-left"
            >
              <div className="flex gap-1 mb-6 text-coffee-gold">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-coffee-gold" />)}
              </div>
              <p className="text-coffee-cream/90 italic mb-8">"{item.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-coffee-brown flex items-center justify-center font-serif text-coffee-gold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-medium text-coffee-cream">{item.name}</h5>
                  <p className="text-xs text-coffee-gray">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
