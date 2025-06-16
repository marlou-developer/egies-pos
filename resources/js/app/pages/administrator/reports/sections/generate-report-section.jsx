import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";

export default function GenerateReportSection() {
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");
    const initialType = params.get("type");

    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";
    const [form, setForm] = useState({
        type: initialType,
        dateRange: [initialStart??moment().format("YYYY-MM-DD"), initialEnd??moment().add(1, "days").format("YYYY-MM-DD")],
    });

  
    
    const handleGenerate = () => {
        router.visit(
            `/administrator/reports?start=${form.dateRange[0]}&end=${form.dateRange[1]}&type=${form.type}`
        );
    };
    return (
        <div className="mb-4">
            <h1 className="text-lg font-bold">Generate Report</h1>
            <div className="flex gap-3 w-full">
                <div className="flex-1">
                    <RangePicker
                        className="border border-gray-500 w-full"
                        size="large"
                        format={dateFormat}
                        // value={form.dateRange.length ? form.dateRange.map(date => dateFormat) : null}
                        value={[
                            dayjs(
                                form.dateRange[0] ??
                                    moment().format("YYYY-MM-DD"),
                                dateFormat
                            ),
                            dayjs(
                                form.dateRange[1] ??
                                    moment()
                                        .add(1, "days")
                                        .format("YYYY-MM-DD"),
                                dateFormat
                            ),
                        ]}
                        onChange={(dates, dateStrings) =>
                            setForm((prev) => ({
                                ...prev,
                                dateRange: dateStrings,
                            }))
                        }
                    />
                </div>
                <div className="flex-1">
                    <select
                        value={form.type}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                type: e.target.value,
                            }))
                        }
                        className="w-full rounded-md"
                    >
                        <option value="" disabled>
                            Select Report to Generate
                        </option>
                        <option value="Fast Stock Movement">Fast Stock Movement</option>
                        <option value="Slow Stock Movement">Slow Stock Movement</option>
                        <option value="Sales By Customer">
                            Sales By Customer
                        </option>
                        <option value="Daily Sales">Daily Sales</option>
                        <option value="Sales By Product">
                            Sales By Product
                        </option>
                        <option value="Sales By Payment Types">
                            Sales By Payment Types
                        </option>
                        <option value="Unpaid Sales">Unpaid Sales</option>
                        <option value="Purchase by Product">
                            Purchase by Product
                        </option>
                        <option value="Payment Types by User">
                            Payment Types by User
                        </option>
                        <option value="Purchase by Supplier">
                            Purchase by Supplier
                        </option>
                        <option value="Payment Types by Customer">
                            Payment Types by Customer
                        </option>
                        <option value="Purchase Invoice">
                            Purchase Invoice
                        </option>
                        <option value="Refunds">Refunds</option>
                        <option value="Invoices">Invoices</option>
                        <option value="Profit">Profit</option>
                    </select>
                </div>
                <button
                    onClick={handleGenerate}
                    className="bg-pink-400 text-white p-2 px-4 rounded-lg hover:bg-pink-500"
                >
                    GENERATE
                </button>
            </div>
        </div>
    );
}
