import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { BiHome, BiRightArrow } from "react-icons/bi";
import * as XLSX from "xlsx";

export default function Show({ auth, property }) {
    const printTable = () => {
        const content = document.getElementById("printableTable").innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(`
        <html>
            <head>
                <title>Print Table</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid #ccc;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .border-t-2 {
                        border-top: 2px solid #000;
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    const exportToExcel = () => {
        const data = property.data.services.map((service, index) => ({
            Code: index + 1,
            Service: service.service,
            "Current Cost": service.current_amount,
            Arrears: service.arreas,
            "Amount (USD)": (service.current_amount + service.arreas).toFixed(
                2
            ),
            "Amount (ZIG)": (
                (service.current_amount + service.arreas) *
                13.5
            ).toFixed(2),
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Property Services");

        XLSX.writeFile(workbook, "Property_Services_Report.xlsx");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Property Number {property.data.property_no}
                </h2>
            }
        >
            <Head title="Property " />

            <div className="py-12">
                <div className="max-w-[120em] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={printTable}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Print Data
                            </button>
                            <button
                                onClick={exportToExcel}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Export to Excel
                            </button>
                        </div>
                        <div
                            className="relative overflow-x-auto shadow-md sm:rounded-lg"
                            id="printableTable"
                        >
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Property
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Service Information and Cost
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <div className="flex flex-col justify-start items-center gap-4">
                                                <div className="items-center">
                                                    <span className="bg-gray-400 py-2 px-4 rounded">
                                                        ACCOUNT
                                                    </span>{" "}
                                                    <span className="border border-gray-400 py-2 px-4 rounded">
                                                        {property.data.account}
                                                    </span>
                                                    &nbsp;
                                                    {property.data.user_id !=
                                                    null ? (
                                                        <span className="text-lg font-bold capitalize">
                                                            {
                                                                property.data
                                                                    .user_id
                                                                    .name
                                                            }{" "}
                                                            &nbsp;
                                                            {
                                                                property.data
                                                                    .user_id
                                                                    .surname
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="text-lg font-bold capitalize">
                                                            Available for Sale
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex gap-4">
                                                    <div className="">
                                                        ADDRESS:{" "}
                                                    </div>
                                                    <div className="">
                                                        STAND &nbsp;
                                                        {
                                                            property.data
                                                                .property_no
                                                        }{" "}
                                                        <br />{" "}
                                                        {property.data.street}{" "}
                                                        STREET <br />
                                                        {property.data.surbub},
                                                        Masvingo
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            #Code
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            Service
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            Current Cost
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            Arrears
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            AMOUNT (USD)
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 border-b"
                                                        >
                                                            AMOUNT (ZIG)
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {property.data.services
                                                        .length >= 1 ? (
                                                        property.data.services.map(
                                                            (
                                                                service,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    key={index}
                                                                    className={
                                                                        service.current_amount <=
                                                                            0 &&
                                                                        "bg-emerald-600 text-white"
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            service.service
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {service.current_amount.toFixed(
                                                                            2
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {service.arreas.toFixed(
                                                                            2
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {(
                                                                            service.current_amount +
                                                                            service.arreas
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {(
                                                                            (service.current_amount +
                                                                                service.arreas) *
                                                                            13.5
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td className="px-6 py-4"></td>
                                                            <td className="px-6 py-4"></td>
                                                            <td className="px-6 py-4"></td>
                                                            <td className="px-6 py-4"></td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="px-6 py-4 border-t-2 ">
                                                            {property.data.services
                                                                .reduce(
                                                                    (
                                                                        total,
                                                                        service
                                                                    ) =>
                                                                        total +
                                                                        service.current_amount,
                                                                    0
                                                                )
                                                                .toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 border-t-2 ">
                                                            {property.data.services
                                                                .reduce(
                                                                    (
                                                                        total,
                                                                        service
                                                                    ) =>
                                                                        total +
                                                                        service.arreas,
                                                                    0
                                                                )
                                                                .toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 border-t-2 font-bold">
                                                            {property.data.services
                                                                .reduce(
                                                                    (
                                                                        total,
                                                                        service
                                                                    ) =>
                                                                        total +
                                                                        service.current_amount +
                                                                        service.arreas,
                                                                    0
                                                                )
                                                                .toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 border-t-2 font-bold">
                                                            {property.data.services
                                                                .reduce(
                                                                    (
                                                                        total,
                                                                        service
                                                                    ) =>
                                                                        total +
                                                                        (service.current_amount +
                                                                            service.arreas) *
                                                                            13.5,
                                                                    0
                                                                )
                                                                .toFixed(2)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
