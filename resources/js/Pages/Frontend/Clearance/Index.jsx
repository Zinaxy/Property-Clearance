import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/Pages/constants";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    BiEdit,
    BiLoader,
    BiPlusCircle,
    BiShow,
    BiShowAlt,
    BiTrash,
    BiXCircle,
} from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";

const Index = ({ auth, clearances, success }) => {
    const [modalOpen, setModalOpen] = useState(null); // Track the open modal by clearance ID

    const deleteClearance = (clearance) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this Clearance Request?"
            )
        ) {
            return;
        } else {
            Inertia.delete(route("clearances.destroy", clearance.id));
        }
    };

    const openModal = (clearanceId) => {
        setModalOpen(clearanceId);
    };

    const closeModal = () => {
        setModalOpen(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Clearances
                </h2>
            }
        >
            <Head title="Clearances" />

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
                                    {/* Search functionality can be added here */}
                                </div>
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <Link
                                        href={route("clearances.create")}
                                        className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-600"
                                    >
                                        <BiPlusCircle
                                            size={20}
                                            className="mr-2"
                                        />
                                        New Clearance
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Date Applied
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Lawyers Letter
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Property Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Feedback
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Expire Date
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clearances.data.map((clearance, index) => (
                                        <tr
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            key={index}
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {clearance.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Modal
                                                    show={
                                                        modalOpen ===
                                                        clearance.id
                                                    }
                                                    onClose={closeModal}
                                                >
                                                    <img
                                                        src={`images/clearence/${clearance.image}`}
                                                        alt=""
                                                        className="w-full"
                                                    />
                                                </Modal>
                                                <button
                                                    className="bg-sky-500"
                                                    onClick={() =>
                                                        openModal(clearance.id)
                                                    }
                                                >
                                                    <img
                                                        src={`images/clearence/${clearance.image}`}
                                                        alt=""
                                                        className="w-12"
                                                    />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                STAND &nbsp;
                                                {clearance.property.property_no}
                                                ,&nbsp;
                                                {clearance.property.street}
                                                &nbsp;Street,&nbsp;
                                                {clearance.property.surbub}
                                                &nbsp;, Masvingo
                                            </td>
                                            <td className="px-6 py-4">
                                                {clearance.status ===
                                                "approved" ? (
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                clearance
                                                                    .final_status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                clearance
                                                                    .final_status
                                                            ]
                                                        }
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                clearance.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                clearance.status
                                                            ]
                                                        }
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="dark:text-white px-2 py-1 mx-2 rounded">
                                                    {clearance.feedback ===
                                                    null ? (
                                                        <TbLoader3
                                                            size={20}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        clearance.feedback
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                {clearance.expire_date}
                                            </td>
                                            <td className="px-6 py-4 flex justify-between items-center">
                                                {clearance.final_status ===
                                                    "approved" && (
                                                    <Link
                                                        href={route(
                                                            "clearances.show",
                                                            clearance.id
                                                        )}
                                                        className="text-sky-600 mx-2"
                                                    >
                                                        <BiShowAlt size={30} />
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        deleteClearance(
                                                            clearance
                                                        )
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
                                links={clearances.meta.links}
                                meta={clearances.meta}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
