import React from 'react'

export default function ProductComponent({ name, description, price, image }) {
    return (
        <div class="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
            <div>
                <div class="font-bold text-gray-800">{name}</div>
                <span class="font-light text-sm text-gray-400">{description}</span>
            </div>
            <div class="flex flex-row justify-between items-center">
                <span class="self-end font-bold text-lg text-pink-300">{price}</span>
                <img src={image} className="h-14 w-14 object-cover rounded-md" alt="" />
            </div>
        </div>
    )
}
