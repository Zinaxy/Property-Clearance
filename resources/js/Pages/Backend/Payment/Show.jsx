import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Show = ({ auth, properties, payment }) => {
    const { data, setData, post, processing, errors } = useForm({
        service_id: payment.data.serviceId,
        amount_usd: payment.data.amount_usd,
        status: "approved" || "",
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("services.update", payment.data.serviceId));
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
            <Head title="Payments" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <form onSubmit={submit}>
                            <div className="m-3">
                                <InputLabel
                                    htmlFor="amount"
                                    value="Amount (USD)"
                                />
                                <TextInput
                                    id="amount"
                                    name="amount_usd"
                                    value={data.amount_usd}
                                    className="mt-1 block w-full"
                                    autoComplete="amount_usd"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("amount_usd", e.target.value)
                                    }
                                    disabled
                                />
                                <InputError
                                    message={errors.amount_usd}
                                    className="mt-2"
                                />
                            </div>

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="method"
                                    value="Method of Payment"
                                />
                                <TextInput
                                    id="method"
                                    name="method"
                                    value={payment.data.method}
                                    className="mt-1 block w-full"
                                    autoComplete="method"
                                    disabled
                                />
                                <InputError
                                    message={errors.method}
                                    className="mt-2"
                                />
                            </div>
                            <div className="m-3">
                                <InputLabel
                                    htmlFor="payment_date"
                                    value="Date of Payment"
                                />
                                <TextInput
                                    id="payment_date"
                                    name="payment_date"
                                    value={payment.data.payment_date}
                                    className="mt-1 block w-full"
                                    autoComplete="payment_date"
                                    disabled
                                />
                                <InputError
                                    message={errors.payment_date}
                                    className="mt-2"
                                />
                            </div>

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="service_id"
                                    value="Service Payed"
                                />
                                <select
                                    id="service_id"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                                    value={payment.data.service_id.service}
                                    disabled
                                >
                                    <option value={payment.serviceId}>
                                        {payment.data.service_id.service}
                                    </option>
                                </select>
                                <InputError
                                    message={errors.service_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="m-3">
                                <img
                                    src={
                                        payment.data.image
                                            ? `../images/payments/${payment.data.image}`
                                            : "default-image.png"
                                    }
                                    alt="payment proof image"
                                    className="w-6/12 h-6/12"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "default-image.png"; // Fallback image if loading fails
                                    }}
                                />
                            </div>

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="status"
                                    value="Approve or Reject Payment"
                                />
                                <select
                                    id="status"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option disabled>SELECT TO APPROVE</option>
                                    <option value={"approved"}>
                                        Approve Payment
                                    </option>
                                    <option
                                        value={"rejected"}
                                        className="bg-red-500"
                                    >
                                        Reject Payment
                                    </option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("payments.index")}
                                    className="bg-transparent border text-white rounded px-3 py-2 mx-4"
                                >
                                    Go Back
                                </Link>
                                {payment.data.status === "pending" ? (
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        SUBMIT
                                    </PrimaryButton>
                                ) : (
                                    <span
                                        className={
                                            payment.data.status === "approved"
                                                ? "bg-emerald-600 text-white rounded px-3 py-2"
                                                : "bg-red-600 text-white rounded px-3 py-2"
                                        }
                                    >
                                        {payment.data.status}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
