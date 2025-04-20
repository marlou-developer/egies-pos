import React from 'react'
import ProductComponent from '../components/product-component'

export default function ProductsSection() {
    return (
        <div class="w-full lg:w-3/5 min-h-screen shadow-md shadow-pink-400">
            <div class="flex flex-row justify-between items-center px-5 mt-5">
                <div class="text-gray-800">
                    <div class="font-bold text-xl">Synergy's Beauty Products</div>
                    {/* <span class="text-xs">Location ID#SIMON123</span> */}
                </div>
            </div>
            <div class="mt-5 flex flex-row px-5">
                <span
                    class="px-5 py-1 bg-pink-300 rounded-2xl text-white text-sm mr-4"
                >
                    All items
                </span>
                <span class="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
                    Make up
                </span>
                <span class="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
                    Lipstick
                </span>
                <span class="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
                    Soap
                </span>
            </div>
            <div class="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4">
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
                <ProductComponent
                    name="Sample Name"
                    description="Sample description of the product"
                    price="₱700.00"
                    image="/images/user.png"
                />
            </div>
        </div>
    )
}
