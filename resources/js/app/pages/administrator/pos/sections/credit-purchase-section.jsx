import { Modal } from "@/Components/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CreditPurchaseSection() {
    const { customers } = useSelector((state) => state.customers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);

    console.log("customer", customers);

    return (
        <div>
            <button
                onClick={openModal}
                className="px-4 py-4 w-full rounded-md shadow-lg text-center bg-pink-300 hover:bg-pink-400 text-white font-semibold"
            >
                Credit
            </button>

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-1/4">
                <div className="px-4">
                    <h2 className="text-lg font-bold mb-4">Credit Purchase</h2>
                    <form>
                        <div>
                            <select className="w-full rounded-md p-2 border border-gray-300">
                                <option disabled selected>
                                    Select Customer
                                </option>
                                {customers?.length > 0 ? (
                                    customers.result.map((cust) => (
                                        <option key={cust.id} value={cust.id}>
                                            {cust.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No customers found</option>
                                )}
                            </select>
                        </div>
                        <div className="flex gap-2 items-center justify-end mt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
