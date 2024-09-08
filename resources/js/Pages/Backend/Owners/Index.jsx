import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { BiShow, BiTrash } from "react-icons/bi";

const Index = ({ auth, users }) => {
    console.log(users);

    const [query, setQuery] = useState("");
    const filteredUsers = users.data.filter((user) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            user.name.toLowerCase().includes(lowerCaseQuery) ||
            user.surname.toLowerCase().includes(lowerCaseQuery) ||
            user.role.toLowerCase().includes(lowerCaseQuery)
        );
    });

    //delete
    const deleteBlog = (item) => {
        if (!window.confirm("Are you sure you want to delete this Blog?")) {
            return;
        } else {
            Inertia.delete(route("blog_manage.destroy", item.id));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Property Owners
                </h2>
            }
        >
            <Head title="Owners" />

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
                                {/*  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <Link
                                        href={route("blog_manage.create")}
                                        className="flex items-center justify-center text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-primary focus:outline-none dark:focus:ring-primary"
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
                                            Owner Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Properties
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Payments
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Request
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.length <= 0 ? (
                                        <div className="flex justify-center items-center text-center font-bold text-white bg-rose-500 w-full">
                                            <span className="p-4">
                                                No Data Available
                                            </span>
                                        </div>
                                    ) : (
                                        filteredUsers.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            >
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {item.name}&nbsp;
                                                    {item.surname}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {item.properties.length}
                                                </th>

                                                <td className="px-6 py-4">
                                                    {item.email}
                                                </td>
                                                <td className="px-6 py-4">1</td>
                                                <td className="px-6 py-4">2</td>

                                                <td className="px-6 py-4 flex justify-between items-center">
                                                    <Link
                                                        href={route(
                                                            "property.show",
                                                            item.properties[0]
                                                                ?.id
                                                        )}
                                                        className="mx-2"
                                                    >
                                                        <BiShow size={30} />
                                                    </Link>

                                                    {/* <Link
                                                    href={route(
                                                        "owners.edit",
                                                        item.id
                                                    )}
                                                    className="text-sky-600 mx-2"
                                                >
                                                    <BiEdit size={30} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deleteBlog(item)
                                                    }
                                                    className="text-red-600 mx-2"
                                                >
                                                    <BiTrash size={30} />
                                                </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <Pagination
                                links={users.meta.links}
                                meta={users.meta}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
