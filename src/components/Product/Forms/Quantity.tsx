"use client";

import React from "react";


type Props = {
    value: number;
    onChange: (value: number) => void;

    min?: number;
    max?: number;

    disabled?: boolean;
    loading?: boolean;

    className?: string;
};

const Quantity = (
    {
        value,
        onChange,

        min = 1,
        max,

        disabled = false,
        loading = false,

        className = '',
    }: Props) => {
    const updateValue = (newValue: number) => {
        if (Number.isNaN(newValue)) {
            return;
        }

        if (newValue < min) {
            newValue = min;
        }

        if (typeof max === 'number' && newValue > max) {
            newValue = max;
        }

        onChange(newValue);
    };

    const handleQuantityChange = (amount: number) => {
        updateValue(value + amount);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);

        if (e.target.value === '') {
            onChange(min);

            return;
        }

        updateValue(newValue);
    };

    return (
        <div className={`input-step border border-dark rounded-pill ${className}`}>
            <button
                type="button"
                className="minus material-shadow text-dark fw-bold"
                onClick={() => handleQuantityChange(-1)}
                disabled={disabled || loading || value <= min}
            >
                –
            </button>

            <input
                type="number"
                className="product-quantity fw-bold fs-6"
                value={value}
                min={min}
                max={max}
                disabled={disabled || loading}
                onChange={handleChange}
            />

            <button
                type="button"
                className="plus material-shadow text-dark fw-bold"
                onClick={() => handleQuantityChange(1)}
                disabled={
                    disabled ||
                    loading ||
                    (typeof max === 'number' && value >= max)
                }
            >
                +
            </button>
        </div>
    );
};

export default Quantity;