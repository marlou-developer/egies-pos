import React from "react";
import classNames from "classnames";

const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
};

const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    loading = false,
}) {
    const baseStyle =
        "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const finalClass = classNames(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        className
    );

    return (
        <button
            type={type}
            className={finalClass}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <div className="flex gap-1 py-2">
                    <span className="relative flex size-2 duration-1000 animate-bounce [animation-delay:0ms]">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                    </span>
                    <span className="relative flex size-2 duration-1000 animate-bounce [animation-delay:100ms]">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                    </span>
                    <span className="relative flex size-2 duration-1000 animate-bounce [animation-delay:200ms]">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                    </span>
                    <span className="relative flex size-2 duration-1000 animate-bounce [animation-delay:300ms]">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                    </span>
                    <span className="relative flex size-2 duration-1000 animate-bounce [animation-delay:400ms]">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-white"></span>
                    </span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
