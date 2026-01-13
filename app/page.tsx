'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PRODUCTS = [
  { id: 1, name: 'Esprit Ruffle Shirt', price: 1381, image: 'product-01.jpg', category: 'women' },
  { id: 2, name: 'Herschel supply', price: 2931, image: 'product-02.jpg', category: 'men' },
  { id: 3, name: 'Only Check Trouser', price: 2117, image: 'product-03.jpg', category: 'women' },
  { id: 4, name: 'Classic Trench Coat', price: 6225, image: 'product-04.jpg', category: 'women' },
  { id: 5, name: 'Front Pocket Jumper', price: 2884, image: 'product-05.jpg', category: 'men' },
  { id: 6, name: 'Vintage Inspired Classic', price: 7736, image: 'product-06.jpg', category: 'shoes' },
  { id: 7, name: 'Shirt in Stretch Cotton', price: 4371, image: 'product-07.jpg', category: 'women' },
  { id: 8, name: 'Pieces Metallic Printed', price: 1574, image: 'product-08.jpg', category: 'bag' },
  { id: 9, name: 'Converse All Star Hi Plimsolls', price: 6225, image: 'product-09.jpg', category: 'shoes' },
  { id: 10, name: 'Femme T-Shirt In Stripe', price: 2146, image: 'product-10.jpg', category: 'women' },
  { id: 11, name: 'Herschel supply', price: 5242, image: 'product-11.jpg', category: 'bag' },
  { id: 12, name: 'Mini Silver Mesh Watch', price: 7209, image: 'product-12.jpg', category: 'watches' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const updateCartCount = () => {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const items = JSON.parse(saved);
        setCartItems(items);
        const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCart(count);
      }
    };
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const filteredProducts = selectedCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = () => {
    setCart(cart + 1);
  };

  const toggleWishlist = (productId: number) => {
    let updatedWishlist;
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter(id => id !== productId);
    } else {
      updatedWishlist = [...wishlist, productId];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const getProductDetails = (productId: number) => {
    return PRODUCTS.find(p => p.id === productId);
  };

  const cartTotal = cartItems.reduce((sum: number, item: any) => {
    const product = getProductDetails(item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-kumar-one)' }}>KVT exports</div>

          <nav className="hidden md:flex gap-8 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-red-500 transition">Home</Link>
            <Link href="#" className="text-gray-700 hover:text-red-500 transition">About</Link>
            <Link href="#" className="text-gray-700 hover:text-red-500 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4 ml-auto">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative text-gray-900 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-6.75-4.35-9-9.09C1.17 9.23 2.2 6.33 4.62 4.92a5.13 5.13 0 015.89.62L12 6.95l1.49-1.41a5.13 5.13 0 015.89-.62c2.42 1.41 3.45 4.31 1.62 7 0 0-1.62 3.24-9 9.08z" />
              </svg>
              {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
            </Link>

            {/* Cart Icon */}
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart}</span>}
            </button>

            <Link href="/signin" className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">YOUR CART</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 text-2xl">
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                cartItems.map((item: any) => {
                  const product = getProductDetails(item.id);
                  return (
                    <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                      <img
                        src={`https://themewagon.github.io/cozastore/images/${product?.image}`}
                        alt={product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-900">{product?.name}</h3>
                        <p className="text-sm text-gray-700">{item.quantity}x ${product?.price.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total and Buttons */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-full font-semibold text-center hover:bg-red-700 transition"
                  >
                    VIEW CART
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-full font-semibold text-center hover:bg-red-700 transition"
                  >
                    CHECK OUT
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-full max-w-4xl bg-white rounded-full border border-gray-300 shadow-lg flex items-center overflow-hidden">
            <div className="flex-1 px-6 py-4">
              <input
                type="text"
                placeholder="Search products"
                className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 font-semibold rounded-full m-1 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">PRODUCT OVERVIEW</h2>
          <button className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md hover:-translate-y-1 transition relative"
            >
              <Link href={`/products/${product.id}`}>
                <div className="bg-gray-100 h-72 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://themewagon.github.io/cozastore/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4 bg-white">
                <div className="flex items-start justify-between">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-medium text-[#6b7280] hover:text-red-600">{product.name}</h3>
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`transition ${
                      wishlist.includes(product.id) ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <svg className="w-6 h-6" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-6.75-4.35-9-9.09C1.17 9.23 2.2 6.33 4.62 4.92a5.13 5.13 0 015.89.62L12 6.95l1.49-1.41a5.13 5.13 0 015.89-.62c2.42 1.41 3.45 4.31 1.62 7 0 0-1.62 3.24-9 9.08z" />
                    </svg>
                  </button>
                </div>
                <Link href={`/products/${product.id}`}>
                  <p className="mt-2 text-base font-semibold text-[#6b7280]">₹{product.price.toFixed(2)}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-200 text-gray-900 px-12 py-3 rounded-full hover:bg-black hover:text-white transition font-medium text-sm">
            LOAD MORE
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
            {/* Categories */}
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wide">CATEGORIES</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">Women</a></li>
                <li><a href="#" className="hover:text-white transition">Men</a></li>
                <li><a href="#" className="hover:text-white transition">Shoes</a></li>
                <li><a href="#" className="hover:text-white transition">Watches</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wide">HELP</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wide">GET IN TOUCH</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
              </p>
              <div className="flex items-center gap-4 text-gray-300">
                <a href="#" className="hover:text-white" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 011-1h3z" /></svg>
                </a>
                <a href="#" className="hover:text-white" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="1.6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M17.5 6.5h.01" /></svg>
                </a>
                <a href="#" className="hover:text-white" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L5.769 21.75H2.462l7.726-8.835L1.54 2.25h6.826l4.853 6.093 5.825-6.093zM16.369 19.25h1.836L8.71 4.1H6.748l9.621 15.15z" /></svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wide">NEWSLETTER</h4>
              <div className="flex flex-col gap-4 max-w-xs">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-transparent border-b border-gray-500 text-gray-200 placeholder-gray-500 focus:outline-none pb-2 text-sm"
                />
                <button className="w-full max-w-[220px] bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>Copyright ©2026 KVT exports. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
