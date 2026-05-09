"use client";

import React, {useState} from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {useTranslations} from "next-intl";


type Props = {
    min: number,
    max: number,
    initMin: number,
    initMax: number,
    onSubmit: (min: number, max: number) => void,
};

const FilterPrice = (
    {
        min,
        max,
        initMin,
        initMax,
        onSubmit,
    }: Props
) => {
    const t = useTranslations('Common');
    const currency = process.env.NEXT_PUBLIC_ENV_CURRENCY_SYMBOL_CODE ?? '$';
    const [range, setRange] = useState([min, max]);

    const handleRangeChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setRange(value);
        } else {
            setRange([value, value]);
        }
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        onSubmit(range[0], range[1]);
    };

    return (
        <form
            className="mt-5"
            onSubmit={handleSubmit}
        >
            <div className="slider-area">
                <Slider
                    range
                    step={1}
                    min={initMin}
                    max={initMax}
                    value={range}
                    onChange={handleRangeChange}
                    allowCross={false}
                />

                <div className="d-flex align-items-center mt-4 py-2">
                    <span className="text-muted">{t('price')}:</span>

                    <h6 className="mb-0 mx-2">
                        <span>{`${range[0].toFixed(2)}${currency}`}</span>
                    </h6>
                    -
                    <h6 className="mb-0 ms-2">
                        <span>{`${range[1].toFixed(2)}${currency}`}</span>
                    </h6>
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-custom-dark fw-medium min-w-150"
            >{t('apply')}</button>
        </form>
    );
}

export default FilterPrice;