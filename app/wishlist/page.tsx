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

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      const wishlistIds = JSON.parse(saved);
      const items = wishlistIds.map((id: number) => PRODUCTS.find(p => p.id === id)).filter(Boolean);
      setWishlistItems(items as WishlistProduct[]);
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      const wishlistIds = JSON.parse(saved);
      const updated = wishlistIds.filter((itemId: number) => itemId !== id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    }
  };

  const addToCart = (product: WishlistProduct) => {
    const saved = localStorage.getItem('cart');
    const cart = saved ? JSON.parse(saved) : [];
    
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-kumar-one)' }}>KVT exports</Link>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-700 hover:text-red-500 transition">Home</Link>
            <Link href="#" className="text-gray-700 hover:text-red-500 transition">About</Link>
            <Link href="#" className="text-gray-700 hover:text-red-500 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-6.75-4.35-9-9.09C1.17 9.23 2.2 6.33 4.62 4.92a5.13 5.13 0 015.89.62L12 6.95l1.49-1.41a5.13 5.13 0 015.89-.62c2.42 1.41 3.45 4.31 1.62 7 0 0-1.62 3.24-9 9.08z" />
              </svg>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Wishlist Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-6.75-4.35-9-9.09C1.17 9.23 2.2 6.33 4.62 4.92a5.13 5.13 0 015.89.62L12 6.95l1.49-1.41a5.13 5.13 0 015.89-.62c2.42 1.41 3.45 4.31 1.62 7 0 0-1.62 3.24-9 9.08z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Add some products you love!</p>
            <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md hover:-translate-y-1 transition relative">
                <Link href={`/products/${item.id}`}>
                  <div className="bg-gray-100 h-72 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://themewagon.github.io/cozastore/images/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4 bg-white">
                  <div className="flex items-start justify-between">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-base font-medium text-[#6b7280] hover:text-red-600">{item.name}</h3>
                    </Link>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-6.75-4.35-9-9.09C1.17 9.23 2.2 6.33 4.62 4.92a5.13 5.13 0 015.89.62L12 6.95l1.49-1.41a5.13 5.13 0 015.89-.62c2.42 1.41 3.45 4.31 1.62 7 0 0-1.62 3.24-9 9.08z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-base font-semibold text-[#6b7280]">₹{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
