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
    BiTrash,
    BiXCircle,
} from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";

const Index = ({ auth, clearances, success }) => {
    const [modalOpen, setModalOpen] = useState(null); // Track the open modal by clearance ID

    const openModal = (clearanceId) => {
        setModalOpen(clearanceId);
    };

    const closeModal = () => {
        setModalOpen(null);
    };
    const [query, setQuery] = useState("");

    const filteredClearances = clearances.data.filter((clearance) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            clearance.status.toLowerCase().includes(lowerCaseQuery) ||
            clearance.final_status.toLowerCase().includes(lowerCaseQuery) ||
            clearance.expire_date.toLowerCase().includes(lowerCaseQuery) ||
            clearance.property.property_no
                .toLowerCase()
                .includes(lowerCaseQuery) ||
            clearance.property.surbub.toLowerCase().includes(lowerCaseQuery) ||
            clearance.property.street.toLowerCase().includes(lowerCaseQuery)
        );
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Clearances
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
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"></div>
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
                                            Date Applied
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Lawyers Letter
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Property Owner
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Property Address
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Feedback
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            F/Director
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Expire Date
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClearances.map(
                                        (clearance, index) => (
                                            <tr
                                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                                key={index}
                                            >
                                                <td class="px-6 py-4">
                                                    {index}
                                                </td>
                                                <td class="px-6 py-4">
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
                                                            openModal(
                                                                clearance.id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={`images/clearence/${clearance.image}`}
                                                            alt=""
                                                            className="w-12"
                                                        />
                                                    </button>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {clearance.user.name} &nbsp;{" "}
                                                    {clearance.user.surname}
                                                </td>
                                                <td class="px-6 py-4">
                                                    STAND &nbsp;
                                                    {
                                                        clearance.property
                                                            .property_no
                                                    }
                                                    ,&nbsp;
                                                    {clearance.property.street}
                                                    &nbsp;Street,&nbsp;
                                                    {clearance.property.surbub}
                                                    &nbsp; ,Masvingo
                                                </td>

                                                <td className="px-6 py-4">
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
                                                </td>
                                                <td
                                                    class={
                                                        "px-6 py-4 text-center"
                                                    }
                                                >
                                                    <span className="dark:text-white px-2 py-1 mx-2 rounded">
                                                        {clearance.feedback ===
                                                        null ? (
                                                            <TbLoader3
                                                                size={20}
                                                                className=""
                                                            />
                                                        ) : (
                                                            clearance.feedback
                                                        )}
                                                    </span>
                                                </td>
                                                <td class={"px-6 py-4"}>
                                                    <span className="dark:text-white px-2 py-1 mx-2 rounded">
                                                        {clearance.status ===
                                                        "rejected" ? (
                                                            <BiXCircle
                                                                size={30}
                                                                className="text-red-600"
                                                            />
                                                        ) : (
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
                                                        )}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {clearance.expire_date ==
                                                    null
                                                        ? ""
                                                        : clearance.expire_date}
                                                </td>
                                                <td className="px-6 py-4 flex justify-between items-center">
                                                    <Link
                                                        href={route(
                                                            "clearances.show",
                                                            clearance.id
                                                        )}
                                                        className="text-sky-600 mx-2"
                                                    >
                                                        <BiShow size={30} />
                                                    </Link>
                                                    {/* <button
                                                        onClick={() =>
                                                            deleteClearance(
                                                                clearance
                                                            )
                                                        }
                                                        className="text-red-600 mx-2"
                                                    >
                                                        <BiTrash size={30} />
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )
                                    )}
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
