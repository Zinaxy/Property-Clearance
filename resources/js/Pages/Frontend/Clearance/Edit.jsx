import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Edit = ({ auth, properties, payment }) => {
    const { data, setData, post, processing, errors } = useForm({
        property_id: payment.data.property_id, // Pre-fill with existing property ID
        service_id: payment.data.serviceId,
        amount_usd: payment.data.amount_usd || "",
        payment_date: payment.data.paymentDate || "",
        method: payment.data.method || "",
        image: "",
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("payments.update", payment.data.id));
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
            <Head title="Clearance" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <form onSubmit={submit}>
                            <input
                                type="hidden"
                                id="property_id"
                                value={data.property_id}
                                onChange={(e) =>
                                    setData("property_id", e.target.value)
                                }
                            />

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="amount"
                                    value="Amount (USD)"
                                />
                                <TextInput
                                    id="amount"
                                    name="amount_usd"
                                    type="number"
                                    value={data.amount_usd}
                                    className="mt-1 block w-full"
                                    autoComplete="amount_usd"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("amount_usd", e.target.value)
                                    }
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
                                    value={data.method}
                                    className="mt-1 block w-full"
                                    autoComplete="method"
                                    onChange={(e) =>
                                        setData("method", e.target.value)
                                    }
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
                                    type="date"
                                    value={data.payment_date}
                                    className="mt-1 block w-full"
                                    autoComplete="payment_date"
                                    onChange={(e) =>
                                        setData("payment_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.payment_date}
                                    className="mt-2"
                                />
                            </div>

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="service_id"
                                    value="Select Service"
                                />
                                <select
                                    id="service_id"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                                    value={data.service_id}
                                    onChange={(e) =>
                                        setData("service_id", e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        SELECT SERVICE
                                    </option>
                                    {properties.data.map((item) =>
                                        item.services.map((service, index) => (
                                            <option
                                                value={service.id}
                                                key={index}
                                            >
                                                {service.service} (
                                                {service.current_amount +
                                                    service.arreas}
                                                )
                                            </option>
                                        ))
                                    )}
                                </select>
                                <InputError
                                    message={errors.service_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="m-3">
                                <InputLabel
                                    htmlFor="image"
                                    value="Proof of Payment"
                                />
                                <input
                                    id="image"
                                    type="file"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    autoComplete="image"
                                    accept="image/*"
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Submit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
