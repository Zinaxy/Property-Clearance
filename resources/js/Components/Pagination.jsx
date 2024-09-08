import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links, meta }) => {
    return (
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white mx-2">
                    {meta.current_page}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white mx-2">
                    {meta.last_page}
                </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            preserveScroll
                            href={link.url || ""}
                            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                                link.active
                                    ? "z-10 text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            } ${
                                !link.url
                                    ? "!text-gray-500 cursor-not-allowed"
                                    : ""
                            }`}
                            aria-current={link.active ? "page" : undefined}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
