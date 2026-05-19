export function Footer() {
  return (
    <footer className="bg-[#0a0807] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif text-coffee-gold mb-4">Charie's Seeds.</h3>
            <p className="text-coffee-gray mb-6 max-w-sm">
              We source and deliver the finest coffee seeds from around the world,
              brought to you to craft the perfect brew.
            </p>
            <div className="flex space-x-4">
              {/* Social icons could go here */}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-coffee-cream">Shop</h4>
            <ul className="space-y-2 text-coffee-gray text-sm">
              <li><a href="/shop" className="hover:text-coffee-gold transition">All Products</a></li>
              <li><a href="/shop" className="hover:text-coffee-gold transition">Arabica Seeds</a></li>
              <li><a href="/shop" className="hover:text-coffee-gold transition">Robusta Seeds</a></li>
              <li><a href="/shop" className="hover:text-coffee-gold transition">Specialty Blends</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-coffee-cream">Company</h4>
            <ul className="space-y-2 text-coffee-gray text-sm">
              <li><a href="#" className="hover:text-coffee-gold transition">Our Story</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition">Farms</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition">FAQ</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-coffee-gray">
          <p>&copy; {new Date().getFullYear()} Charie's Seeds. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-coffee-cream transition">Privacy Policy</a>
            <a href="#" className="hover:text-coffee-cream transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
