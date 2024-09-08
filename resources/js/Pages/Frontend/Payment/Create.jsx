import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Index = ({ auth, properties }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        // property_id: "",
        service_id: "",
        amount_usd: "",
        payment_date: "",
        method: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("payments.store"));
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
                                    htmlFor="date"
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
                                        SELECT SERVICE TO PAY
                                    </option>
                                    {properties.data.map((item) =>
                                        item.services.map((service, index) => (
                                            <option
                                                value={service.id}
                                                key={index}
                                                className="flex justify-between gap-4 items-center"
                                            >
                                                <span>
                                                    <p>{service.service}</p>
                                                </span>
                                                &nbsp;
                                                <small className="mr-10">
                                                    (
                                                    {service.current_amount +
                                                        service.arreas}
                                                    )
                                                </small>
                                            </option>
                                        ))
                                    )}
                                </select>
                                <InputError
                                    message={errors.service_id}
                                    className="mt-2"
                                />
                            </div>

                            {/*   <div className="m-3">
                                <InputLabel
                                    htmlFor="property_id"
                                    value="Select Property"
                                />
                                <select
                                    id="property_id"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full"
                                    value={data.property_id}
                                    onChange={(e) =>
                                        setData("property_id", e.target.value)
                                    }

                                >
                                    <option value="" disabled>
                                        SELECT PROPERTY TO PAY
                                    </option>
                                    {properties.data.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.property_no}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.property_id}
                                    className="mt-2"
                                />
                            </div> */}

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

export default Index;
