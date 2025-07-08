// FilteringSection.jsx
import React from "react";
import { useSelector } from "react-redux";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import Select from "react-select";

export default function FilteringSection({ setForm, form }) {
    const { report_items } = useSelector((store) => store.carts);
    console.log("report_items?.customers", report_items);

    const handleDateChange = (dates, dateStrings) => {
        console.log("dateStrings", dateStrings);
        setForm({
            ...form,
            start: dateStrings[0],
            end: dateStrings[1],
        });
        setDateRange(dateStrings);
    };
    const reports = [
        "Daily Sales",
        "Sales By Payment Types",
        "Unpaid Sales",
        "Payment Types by User",
        "Sales By Customer",
    ];
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            <div className="space-y-4">
                {[
                    {
                        label: "Customers",
                        id: "customer",
                        options: [
                            {
                                label: "All",
                                value: "all",
                            },
                            ...report_items?.customers?.map((res) => ({
                                label: res.name,
                                value: res.id,
                            })),
                        ],
                        disabled: false,
                    },
                    {
                        label: "Suppliers",
                        id: "supplier",
                        options: [
                            {
                                label: "All",
                                value: "all",
                            },
                            ...report_items?.suppliers?.map((res) => ({
                                label: res.name,
                                value: res.id,
                            })),
                        ],
                        disabled: false,
                    },
                    {
                        label: "User",
                        id: "user",
                        options: [
                            {
                                label: "All",
                                value: "all",
                            },
                            ...report_items?.users?.map((res) => ({
                                label: res.name,
                                value: res.id,
                            })),
                        ],
                        disabled: false,
                    },
                    {
                        label: "Product",
                        id: "product",
                        options: [
                            {
                                label: "All",
                                value: "all",
                            },
                            ...report_items?.products?.map((res) => ({
                                label: res.name,
                                value: res.id,
                            })),
                        ],
                        disabled: reports.includes(form.type),
                    },
                    {
                        label: "Product group",
                        id: "category",
                        options: [
                            {
                                label: "All",
                                value: "all",
                            },
                            ...report_items?.categories?.map((res) => ({
                                label: res.name,
                                value: res.id,
                            })),
                        ],
                        disabled: reports.includes(form.type),
                    },
                ].map(({ label, id, options, disabled }) => {
                    return (
                        <div key={id}>
                            <label className="block mb-1 text-sm">
                                {label}
                            </label>
                            <Select
                                options={[...options]}
                                isDisabled={disabled}
                                onChange={(selected) =>
                                    setForm({
                                        ...form,
                                        [id]: selected?.value, // use selected.value instead of e.target.value
                                    })
                                }
                                defaultValue={[options[0]]}
                                isSearchable
                                className="text-black w-full"
                            />
                        </div>
                    );
                })}

                <div>
                    <label className="block mb-1 text-sm">Date range</label>
                    <RangePicker
                        format="YYYY-MM-DD"
                        size="large"
                        onChange={handleDateChange}
                        style={{ width: "100%" }}
                        allowClear
                    />
                </div>

                <div className="flex gap-2 pt-4">
                    <a
                        href={`/administrator/reports/search?category=${
                            form?.category ?? ""
                        }&customer=${form?.customer ?? ""}&product=${
                            form?.product ?? ""
                        }&supplier=${form?.supplier ?? ""}&type=${
                            form?.type ?? ""
                        }&user=${form?.user ?? ""}&start=${
                            form?.start ?? ""
                        }&end=${form?.end ?? ""}`}
                        target="_blank"
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
                    >
                        Show report
                    </a>
                  <button className="flex-1 text-center bg-green-600 hover:bg-green-700 p-2 rounded text-white">
                        Excel
                    </button>
                </div>
            </div>
        </div>
    );
}
