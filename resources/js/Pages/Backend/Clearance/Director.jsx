import Card from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { BiHome, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import * as XLSX from "xlsx";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function Show({ auth, property, clearance }) {
    const [confirmingFormApproval, setConfirmingFormApproval] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        clearance_id: clearance,
        status: "",
        final_status: "in_progress",
        feedback: "",
        _method: "PUT",
    });
    const confirmFormApproval = () => {
        setConfirmingFormApproval(true);
    };

    const approveForm = (e) => {
        e.preventDefault();

        post(route("clearances.update", clearance), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        setConfirmingFormApproval(false);

        reset();
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Approve Clearance Form
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-[120em] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <div className="flex gap-4 mb-4">
                            <PrimaryButton
                                className="bg-sky-500"
                                onClick={confirmFormApproval}
                            >
                                Approve / Reject
                            </PrimaryButton>
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
                                                                <tr key={index}>
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
                                                                        {
                                                                            service.current_amount
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            service.arreas
                                                                        }
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
            <Modal show={confirmingFormApproval} onClose={closeModal}>
                <form onSubmit={approveForm} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to Approve this Application ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once Approved The application will be forwareded to the
                        Finance Director
                    </p>
                    <input
                        type="hidden"
                        name="final_status"
                        value="in_progress"
                    />

                    <div className="m-3">
                        <InputLabel htmlFor="status" value="Select Property" />
                        <select
                            id="status"
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="" disabled>
                                SELECT OPTION
                            </option>

                            <option value="approved" className="bg-sky-600">
                                Approve Application
                            </option>
                            <option value="rejected" className="bg-red-600">
                                Reject Application
                            </option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="m-3">
                        <InputLabel htmlFor="status" value="Client Feedback" />
                        <textarea
                            name="feedback"
                            id=""
                            value={data.feedback}
                            rows="4"
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                            onChange={(e) =>
                                setData("feedback", e.target.value)
                            }
                            required
                        ></textarea>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            {processing ? "Processing..." : "Approve"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
