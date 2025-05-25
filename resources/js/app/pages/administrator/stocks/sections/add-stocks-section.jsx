import React, { useState } from 'react';
import { FaSquarePlus } from 'react-icons/fa6';
import Modal from '@/Components/Modal';
import Input from '@/app/_components/input';

export default function AddStocksSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [costOption, setCostOption] = useState("same");

    return (
        <div>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative inline-flex items-center rounded-md bg-pink-100 w-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 "
            >
                <FaSquarePlus className="mr-1 text-pink-500" />
                Add Stocks
            </button>

            <Modal open={modalOpen} setOpen={setModalOpen} >
                <div className='mt-6 flex flex-col gap-5'>
                    <h1 className='font-bold text-xl text-pink-500'>Add Stock(s)</h1>

                    <div>
                        <Input
                            name="delivery_id"
                            label="Delivery ID"
                            type="text"
                        />
                    </div>
                    <div>
                        <Input
                            name="quantity"
                            label="Quantity"
                            type="number"
                        />
                    </div>
                    <div>
                        <select
                            value={costOption}
                            onChange={(e) => setCostOption(e.target.value)}
                            className="w-full rounded-md border-gray-500 text-sm h-11"
                        >
                            <option disabled selected>Pricing</option>
                            <option value="same">Same cost price =    ₱
                                {parseFloat(data?.cost).toLocaleString("en-PH", { minimumFractionDigits: 2, })}</option>
                            <option value="different">Different cost price</option>
                        </select>
                    </div>

                    {costOption === "different" && (
                        <p className="text-sm text-gray-600">
                            If cost price is different from the current cost price,&nbsp;
                            <a href="/administrator/products" className="text-pink-500 underline">Add Product</a> instead.
                        </p>
                    )}
                </div>
                <div className='mt-3 w-full'>
                    <div className='flex items-center justify-end'>
                        <button
                            disabled={costOption === "different"}
                            className={`rounded-md p-2 text-white transition 
        ${costOption === "different"
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-pink-400 hover:bg-pink-500"}
    `}
                        >
                            Add Stock
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
