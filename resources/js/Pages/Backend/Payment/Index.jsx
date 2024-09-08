import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { BiEdit, BiPlusCircle, BiShow, BiTrash } from "react-icons/bi";
import { Inertia } from "@inertiajs/inertia";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/Pages/constants";

const Index = ({ auth, payments, success }) => {
    const [query, setQuery] = useState("");
    const filteredPayments = payments.data.filter((payment) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            payment.method.toLowerCase().includes(lowerCaseQuery) ||
            payment.payment_date.toLowerCase().includes(lowerCaseQuery) ||
            payment.status.toLowerCase().includes(lowerCaseQuery) ||
            payment.service_id.service.toLowerCase().includes(lowerCaseQuery) ||
            payment.service_id.property_id.property_no
                .toLowerCase()
                .includes(lowerCaseQuery) ||
            payment.service_id.property_id.street
                .toLowerCase()
                .includes(lowerCaseQuery) ||
            payment.service_id.property_id.surbub
                .toLowerCase()
                .includes(lowerCaseQuery)
        );
    });
    //delete
    const deletePayment = (payment) => {
        if (!window.confirm("Are you sure you want to delete this Payment?")) {
            return;
        } else {
            Inertia.delete(route("payments.destroy", payment.id));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Payments
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-[100em] mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-3 bg-emerald-500 text-white rounded w-4/12 ">
                            {success}
                        </div>
                    )}
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
                                {/*  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <Link
                                        href={route("payments.create")}
                                        className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-600"
                                    >
                                        <BiPlusCircle
                                            size={20}
                                            className="mr-2"
                                        />
                                        NewITEM
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date Payed
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Property Owner
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Owner Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Property Address
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Amount(USD)
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Method
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Proof
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment, index) => (
                                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td class="px-6 py-4">{index}</td>
                                            <td class="px-6 py-4">
                                                {payment.payment_date}
                                            </td>
                                            <td class="px-6 py-4">
                                                {`${payment.service_id.property_id.user_id.name}  ${payment.service_id.property_id.user_id.surname}`}
                                            </td>
                                            <td class="px-6 py-4">
                                                {`${payment.service_id.property_id.user_id.email}`}
                                            </td>
                                            <td class="px-6 py-4">
                                                {`${payment.service_id.property_id.property_no},${payment.service_id.property_id.street}, ${payment.service_id.property_id.surbub},Masvingo`}
                                            </td>
                                            <td class="px-6 py-4">
                                                {payment.service_id.service}
                                            </td>
                                            <td class="px-6 py-4">
                                                {payment.amount_usd}
                                            </td>
                                            <td class="px-6 py-4">
                                                {payment.method}
                                            </td>
                                            <td class="px-6 py-4">
                                                <img
                                                    src={`images/payments/${payment.image}`}
                                                    alt=""
                                                    className="w-12"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            payment.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            payment.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex justify-between items-center">
                                                <Link
                                                    href={route(
                                                        "payments.show",
                                                        payment.id
                                                    )}
                                                    className="mx-2"
                                                >
                                                    <BiShow size={30} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deletePayment(payment)
                                                    }
                                                    className="text-red-600 mx-2"
                                                >
                                                    <BiTrash size={30} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                links={payments.meta.links}
                                meta={payments.meta}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
