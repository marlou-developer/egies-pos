import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import React from 'react'

const dateFormat = 'YYYY-MM-DD';

export default function GenerateReportSection() {
    return (
        <div className='mb-4'>
            <h1 className='text-lg font-bold'>Generate Report</h1>
            <div className='flex gap-3 w-full'>
                <div className='flex-1'>
                    <RangePicker
                        className='border border-gray-500 w-full'
                        size='large' />
                </div>
                <div className='flex-1'>
                    <select className='w-full rounded-md' name="" id="">
                        <option selected disabled>Select Report to Generate</option>
                        <option value="">Stock Movement</option>
                        <option value="">Sales By Customer</option>
                        <option value="">Daily Sales</option>
                        <option value="">Sales By Product</option>
                        <option value="">Sales By Payment Types</option>
                        <option value="">Unpaid Sales</option>
                        <option value="">Purchase by Product</option>
                        <option value="">Payment Types by User</option>
                        <option value="">Purchase by Supplier</option>
                        <option value="">Payment Types by Customer</option>
                        <option value="">Purchase Invoice</option>
                        <option value="">Refunds</option>
                        <option value="">Invoices</option>
                        <option value="">Profit</option>
                    </select>
                </div>
                <button className='bg-pink-400 text-white p-2 px-4 rounded-lg hover:bg-pink-500'>
                    GENERATE
                </button>
            </div>

        </div>
    )
}
