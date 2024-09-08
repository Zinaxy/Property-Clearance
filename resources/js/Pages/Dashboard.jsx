import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { BiHome, BiRightArrow } from "react-icons/bi";
import * as XLSX from "xlsx";

export default function Dashboard({
    auth,
    users,
    properties,
    clearanceP,
    clearanceA,
    payments,
}) {
    //top cards
    const dashCards = [
        {
            name: "Properties",
            num: users.data.properties.length,
            icon: (
                <svg
                    className="w-16 h-16 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                </svg>
            ),
        },
        {
            name: "Payments ",
            num: payments,
            icon: (
                <svg
                    class="w-16 h-16 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                    />
                </svg>
            ),
        },
        {
            name: "Pending Clearance",
            num: clearanceP,
            icon: (
                <svg
                    class="w-16 h-16 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            ),
        },
        {
            name: "Approved Clearance",
            num: clearanceA,
            icon: (
                <svg
                    class="w-16 h-16 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            ),
        },
    ];
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
        // Gather the data you want to export
        const data = properties.data
            .map((item, index) => {
                return item.services.map((service, serviceIndex) => ({
                    "#": index + 1,
                    "Property #": item.property_no,
                    Owner: users.data.name + users.data.surname,
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

        // Create a new workbook and add the data
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");

        // Export the workbook to Excel
        XLSX.writeFile(workbook, "Properties_Report.xlsx");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-[120em] mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashCards.map((dashCard, index) => (
                            <Card key={index}>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col space-y-4">
                                        <h3 className="text-2xl dark:text-gray-300">
                                            {dashCard.name}
                                        </h3>
                                        <p className="text-4xl dark:text-white font-extrabold font-serif">
                                            {dashCard.num}
                                        </p>
                                    </div>
                                    <div className="">{dashCard.icon}</div>
                                </div>
                            </Card>
                        ))}
                    </div>{" "}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={printTable}
                                class="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Print Table
                            </button>
                            <button
                                onClick={exportToExcel}
                                class="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Export to Excel
                            </button>
                        </div>
                        <div
                            class="relative overflow-x-auto shadow-md sm:rounded-lg"
                            id="printableTable"
                        >
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Property
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.data.map((item, index) => (
                                        <tr
                                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            key={item.id}
                                        >
                                            <td class="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <div className="flex flex-col justify-start items-center gap-4">
                                                    <div className="items-center">
                                                        <span className="bg-gray-400 py-2 px-4 rounded">
                                                            ACCOUNT
                                                        </span>{" "}
                                                        <span className="border border-gray-400 py-2 px-4 rounded">
                                                            {item.account}
                                                        </span>
                                                        &nbsp;
                                                        <span className="text-lg font-bold capitalize">
                                                            {users.data.name}{" "}
                                                            &nbsp;
                                                            {users.data.surname}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <div className="">
                                                            ADDRESS:{" "}
                                                        </div>
                                                        <div className="">
                                                            STAND &nbsp;
                                                            {
                                                                item.property_no
                                                            }{" "}
                                                            <br /> {item.street}{" "}
                                                            STREET <br />
                                                            {item.surbub},
                                                            Masvingo
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="px-6 py-4">
                                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead class="text-xs text-gray-700 uppercase  dark:text-gray-400">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                #Code
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                Service
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                Current Cost
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                Arreas
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                AMOUNT (USD)
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                class="px-6 py-3 border-b"
                                                            >
                                                                AMOUNT (ZIG)
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {item.services.length >=
                                                        1 ? (
                                                            item.services.map(
                                                                (
                                                                    service,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={
                                                                            service.current_amount <=
                                                                                0 &&
                                                                            "bg-emerald-600 text-white"
                                                                        }
                                                                    >
                                                                        <td class="px-6 py-4">
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {
                                                                                service.service
                                                                            }
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {service.current_amount.toFixed(
                                                                                2
                                                                            )}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {service.arreas.toFixed(
                                                                                2
                                                                            )}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {(
                                                                                service.current_amount +
                                                                                service.arreas
                                                                            ).toFixed(
                                                                                2
                                                                            )}
                                                                        </td>
                                                                        <td class="px-6 py-4">
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
                                                                <td class="px-6 py-4"></td>
                                                                <td class="px-6 py-4"></td>
                                                                <td class="px-6 py-4"></td>
                                                                <td class="px-6 py-4"></td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td className="px-6 py-4 border-t-2 ">
                                                                {item.services
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
                                                                {item.services
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
                                                            <td class="px-6 py-4 border-t-2 font-bold">
                                                                {item.services
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
                                                            <td class="px-6 py-4 border-t-2 font-bold">
                                                                {item.services
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
                                    ))}
                                </tbody>
                            </table>
                        </div>{" "}
                        <Pagination
                            links={properties.meta.links}
                            meta={properties.meta}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
