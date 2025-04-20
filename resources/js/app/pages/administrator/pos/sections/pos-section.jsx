import React from 'react'
import ProductsSection from './products-section'

export default function PosSection() {
    return (
        <div class="w-full">
            <div class="flex lg:flex-row flex-col-reverse shadow-md shadow-pink-400">
                <ProductsSection />
                <div class="w-full lg:w-2/5">
                    <div class="flex flex-row items-center justify-between px-5 mt-5">
                        <div class="font-bold text-xl">Current Order</div>
                        {/* <div class="font-semibold">
                            <span class="px-4 py-2 rounded-md bg-red-100 text-red-500">Clear All</span>
                            <span class="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
                        </div> */}
                    </div>
                    <div class="px-5 py-4 mt-5 overflow-y-auto h-64">
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/4u_nRgiLW3M/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Make up</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                                <span class="font-semibold mx-4">2</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱13.50
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/sc5sTPMrVfk/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Lipstick</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                                <span class="font-semibold mx-4">10</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱3.50
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Lipstick</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                                <span class="font-semibold mx-4">10</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱3.50
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Lipstick</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                                <span class="font-semibold mx-4">10</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱3.50
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Soap</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-red-300 text-white">x</span>
                                <span class="font-semibold mx-4">1</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱2.50
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center mb-4">
                            <div class="flex flex-row items-center w-2/5">
                                <img src="https://source.unsplash.com/4u_nRgiLW3M/600x600" class="w-10 h-10 object-cover rounded-md" alt="" />
                                <span class="ml-4 font-semibold text-sm">Soap</span>
                            </div>
                            <div class="w-32 flex justify-between">
                                <span class="px-3 py-1 rounded-md bg-red-300 text-white">x</span>
                                <span class="font-semibold mx-4">1</span>
                                <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                            </div>
                            <div class="font-semibold text-lg w-16 text-center">
                                ₱2.50
                            </div>
                        </div>
                    </div>
                    <div class="px-5 mt-5">
                        <div class="py-4 rounded-md shadow-lg">
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">Subtotal</span>
                                <span class="font-bold">₱35.25</span>
                            </div>
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">Discount</span>
                                <span class="font-bold">- ₱5.00</span>
                            </div>
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">Sales Tax</span>
                                <span class="font-bold">₱2.25</span>
                            </div>
                            <div class="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                                <span class="font-semibold text-2xl">Total</span>
                                <span class="font-bold text-2xl">₱37.50</span>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 mt-5">
                        <div class="rounded-md shadow-lg px-4 py-4">
                            <div class="flex flex-row justify-between items-center">
                                <div class="flex flex-col">
                                    <span class="uppercase text-xs font-semibold">cashless credit</span>
                                    <span class="text-xl font-bold text-pink-300">₱32.50</span>
                                    <span class=" text-xs text-gray-400 ">Available</span>
                                </div>
                                <div class="px-4 py-3 bg-gray-300 text-gray-800 rounded-md font-bold"> Cancel</div>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 mt-5">
                        <div class="px-4 py-4 rounded-md shadow-lg text-center bg-pink-300 text-white font-semibold">
                            Pay With Cashless Credit
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
