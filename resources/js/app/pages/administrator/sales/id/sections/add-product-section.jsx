
import { delete_product_thunk, get_product_thunk } from "@/app/redux/product-thunk";
import { delete_supplier_thunk, get_supplier_thunk } from "@/app/redux/supplier-thunk";
import { delete_user_thunk, get_users_thunk } from "@/app/redux/user-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProductComponent from "../../../pos/components/product-component";
import PosSection from "./pos-section";

export default function AddProductSection({ data, storeName }) {
    const { categories } = useSelector((store) => store.categories);
    const [activeCategory, setActiveCategory] = useState("");
    const { carts } = useSelector((store) => store.products);
    const [searchTerm, setSearchTerm] = useState("");

    const activeProducts = categories.find(
        (category) => category.name === activeCategory
    )?.products;

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0].name);
        }
    }, [categories]);

    const mergedProducts = categories.flatMap((category) =>
        category.products.map((product) => ({
            ...product,
        }))
    );

    const filteredProducts = mergedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);

    const deleteUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_supplier_thunk(data.id)
            );
            store.dispatch(get_supplier_thunk())
            message.success("Removed Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Supplier. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove User">
                <button
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-pink-100 hover:bg-pink-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={openModal}
                >
                    <FaPlus className="size-3.5 text-pink-500" />
                    <b>Add Product</b>
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="8xl" >
                <div>
                    <PosSection 
                    setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </Modal>
        </>
    );
}
