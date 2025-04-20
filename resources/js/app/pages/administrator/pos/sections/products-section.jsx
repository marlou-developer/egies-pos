import React, { useState } from 'react'
import ProductComponent from '../components/product-component'

// Sample product list (you can replace this with your real data)
const products = [
    { name: 'Lipstick A', category: 'Lipstick', description: 'Nice red', price: '₱700.00', image: '/images/user.png' },
    { name: 'Makeup Kit B', category: 'Make up', description: 'Complete kit', price: '₱1000.00', image: '/images/user.png' },
    { name: 'Soap C', category: 'Soap', description: 'Skin friendly', price: '₱200.00', image: '/images/user.png' },
    { name: 'Lipstick D', category: 'Lipstick', description: 'Matte finish', price: '₱750.00', image: '/images/user.png' },
    { name: 'Makeup Kit B', category: 'Make up', description: 'Complete kit', price: '₱1000.00', image: '/images/user.png' },
    { name: 'Lipstick D', category: 'Lipstick', description: 'Matte finish', price: '₱750.00', image: '/images/user.png' },
]

const categories = ['All items', 'Make up', 'Lipstick', 'Soap']

export default function ProductsSection() {
    const [activeCategory, setActiveCategory] = useState('All items')

    const filteredProducts = activeCategory === 'All items'
        ? products
        : products.filter(product => product.category === activeCategory)

    return (
        <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
            <div className="flex flex-row justify-between items-center px-5 mt-5">
                <div className="text-gray-800">
                    <div className="font-bold text-xl">Synergy's Beauty Products</div>
                    {/* <span className="text-xs">Location ID#SIMON123</span> */}
                </div>
            </div>

            {/* TABS */}
            <div className="mt-5 flex flex-row px-5">
                {categories.map(category => (
                    <span
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`cursor-pointer px-5 py-1 rounded-2xl text-sm mr-4 
                            ${activeCategory === category
                                ? 'bg-pink-300 text-white'
                                : 'font-semibold text-gray-700 hover:bg-gray-200'}`}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto ">
                {filteredProducts.map((product, index) => (
                    <ProductComponent
                        key={index}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    )
}
