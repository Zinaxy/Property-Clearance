import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Index = ({ auth, properties }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("clearances.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Request Clearance Form
                </h2>
            }
        >
            <Head title="Clearance" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <form onSubmit={submit}>
                            <div className="m-3">
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
                                        SELECT PROPERTY TO REQUEST
                                    </option>
                                    {properties.data.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            STAND &nbsp;{item.property_no}
                                            ,&nbsp;
                                            {item.street}&nbsp;Street,&nbsp;
                                            {item.surbub}&nbsp; ,Masvingo
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.property_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="m-3">
                                <InputLabel
                                    htmlFor="image"
                                    value="Lawyer`s Letter"
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
                                    Request
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
