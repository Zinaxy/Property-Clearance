import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
import * as XLSX from "xlsx";

const Index = ({ auth, properties }) => {
    const [query, setQuery] = useState("");

    const filteredProperties = properties.data.filter((property) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            property.property_no.toLowerCase().includes(lowerCaseQuery) ||
            property.account.toLowerCase().includes(lowerCaseQuery) ||
            property.street.toLowerCase().includes(lowerCaseQuery) ||
            property.surbub.toLowerCase().includes(lowerCaseQuery) ||
            property.status.toLowerCase().includes(lowerCaseQuery)
        );
    });

    // Print the table
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

    // Export to Excel
    const exportToExcel = () => {
        const data = filteredProperties
            .map((item, index) => {
                return item.services.map((service, serviceIndex) => ({
                    "Property #": index + 1,
                    "Owner Name":
                        item.user_id.name + " " + item.user_id.surname,
                    "Property No": item.property_no,
                    Street: item.street,
                    Suburb: item.surbub,
                    "Service Code": serviceIndex + 1,
                    Service: service.service,
                    "Current Cost": service.current_amount,
                    Arrears: service.arreas,
                    "Amount (USD)": (
                        service.current_amount + service.arreas
                    ).toFixed(2),
                    "Amount (ZIG)": (
                        (service.current_amount + service.arreas) *
                        13.5
                    ).toFixed(2),
                }));
            })
            .flat();

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");

        XLSX.writeFile(workbook, "Properties_Report.xlsx");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Properties
                </h2>
            }
        >
            <Head title="Properties" />

            <div className="py-12">
                <div className="max-w-[100em] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-1/2">
                                    <form className="">
                                        <SearchInput
                                            placeholder="Search"
                                            onChange={(e) =>
                                                setQuery(
                                                    e.target.value.toLowerCase()
                                                )
                                            }
                                        />
                                    </form>
                                </div>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={printTable}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Print Table
                                    </button>
                                    <button
                                        onClick={exportToExcel}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="relative overflow-x-auto shadow-md sm:rounded-lg"
                            id="printableTable"
                        >
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Owner Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Account
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Property Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Current Cost
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Arrears
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Amount (USD)
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Amount (ZIG)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProperties.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item.status === "available"
                                                    ? "Not Registered"
                                                    : item.user_id.name +
                                                      " " +
                                                      item.user_id.surname}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.account}
                                            </td>
                                            <td className="px-6 py-4">{`${item.property_no}, ${item.street} Street, ${item.surbub}, Masvingo`}</td>
                                            <td className="px-6 py-4">
                                                {item.status === "available"
                                                    ? "00.00"
                                                    : item.services
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
                                            <td className="px-6 py-4">
                                                {item.status === "available"
                                                    ? "00.00"
                                                    : item.services
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
                                            <td className="px-6 py-4 font-bold">
                                                {item.status === "available"
                                                    ? "00.00"
                                                    : item.services
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
                                            <td className="px-6 py-4 font-bold">
                                                {item.status === "available"
                                                    ? "00.00"
                                                    : item.services
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
                                            <td className="px-6 py-4 flex justify-between items-center">
                                                <Link
                                                    href={route(
                                                        "property.show",
                                                        item.id
                                                    )}
                                                    className="mx-2"
                                                >
                                                    <BiShow size={30} />
                                                </Link>
                                                {/* Uncomment if you want to enable editing and deleting */}
                                                {/*
                                                <Link
                                                    href={route("property.edit", item.id)}
                                                    className="text-sky-600 mx-2"
                                                >
                                                    <BiEdit size={30} />
                                                </Link>
                                                <button
                                                    onClick={() => deleteBlog(item)}
                                                    className="text-red-600 mx-2"
                                                >
                                                    <BiTrash size={30} />
                                                </button>
                                                */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            links={properties.meta.links}
                            meta={properties.meta}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
