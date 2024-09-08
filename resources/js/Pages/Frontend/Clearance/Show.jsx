import ApplicationLogo from "@/Components/ApplicationLogo";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { BiDownload, BiHome, BiRightArrow } from "react-icons/bi";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Show({ auth, property, clearance }) {
    const exportToPDF = () => {
        const input = document.getElementById("printableTable");
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("Rates_clearance_certificate.pdf");
        });
    };
    console.log(property);
    console.log(clearance);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Approve Clearance Form
                </h2>
            }
        >
            <Head title="Clearance / Show" />

            <div className="py-12">
                <div className="max-w-[120em] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-10">
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={exportToPDF}
                                className="bg-red-500 text-white px-4 py-2 rounded flex justify-center items-center gap-4"
                            >
                                Download Certificate{" "}
                                <BiDownload size={30} className="mx-2" />
                            </button>
                        </div>
                        <div
                            className="relative overflow-x-auto shadow-md sm:rounded-lg"
                            id="printableTable"
                        >
                            <div className="border-4 border-sky-600 px-6 py-10 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className=""></span>
                                    <span className="">
                                        <p className="text-sm dark:text-white font-extrabold font-serif">
                                            Certificate Number:{" "}
                                            <b className={"text-lg"}>
                                                {" "}
                                                101{property.data.id}
                                            </b>
                                        </p>
                                    </span>
                                </div>
                                <div className="flex justify-center items-center gap-10">
                                    <span className="">
                                        <ApplicationLogo />
                                    </span>
                                    <span className="text-4xl font-bold dark:text-white">
                                        MASVINGO CITY COUNCIL
                                        <p className="text-sm dark:text-white font-extrabold font-serif text-center my-4">
                                            <b className={"text-lg"}>
                                                Clearance Certificate
                                            </b>
                                        </p>
                                    </span>
                                </div>
                                <div className="dark:text-white px-16">
                                    <p className="">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Sequi quod totam qui
                                        vero nostrum consectetur laudantium
                                        dolores obcaecati vel nulla provident
                                        atque iusto amet iure sunt quas adipisci
                                        quidem esse vitae autem reiciendis,
                                        itaque impedit necessitatibus?
                                        Consectetur ratione, reprehenderit
                                        accusantium quas pariatur ab quis illum
                                        commodi vero quidem libero sequi!
                                    </p>
                                    <div className="flex flex-col my-6">
                                        <h5 className="font-bold text-2xl border-b-2 w-6/12">
                                            DESCRIPTION OF PROPERTY
                                        </h5>
                                        <div className="flex flex-col mt-3 gap-y-10">
                                            <p className="grid grid-cols-2 gap-8">
                                                <span className="">
                                                    Stand Number:
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {property.data.property_no}
                                                </span>
                                            </p>
                                            <p className="grid grid-cols-2 gap-8">
                                                <span className="">
                                                    Street:
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {property.data.street}
                                                </span>
                                            </p>
                                            <p className="grid grid-cols-2 gap-8">
                                                <span className="">
                                                    Surbub:
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {property.data.surbub}
                                                </span>
                                            </p>
                                            <p className="grid grid-cols-2 gap-8">
                                                <span className="">
                                                    Registered Owner:
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {property.data.user_id.name}
                                                    &nbsp;
                                                    {
                                                        property.data.user_id
                                                            .surname
                                                    }
                                                </span>
                                            </p>
                                            <p className="grid grid-cols-2 gap-8 mt-4">
                                                <span className="">
                                                    Certificate is valid until
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {clearance.data.expire_date}
                                                </span>
                                            </p>
                                            <p className="grid grid-cols-2 gap-8">
                                                <span className="font-bold">
                                                    Given under my hand at
                                                    _________________________ ,
                                                    on Date
                                                </span>
                                                <span className="text-lg font-bold mt-4 italic">
                                                    Date Issued:{" "}
                                                    {clearance.data.updated_at}{" "}
                                                    <br />
                                                    By Admin : Masvingo City
                                                    Council
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-10">
                                            <p className="">
                                                <span className="border-t-2 w-6/12">
                                                    MUNICIPAL MANAGER
                                                </span>
                                                <br />
                                                CITY OF MASVINGO METROPOLITAN
                                                MINICIPALITY
                                            </p>
                                        </div>
                                        <div className="mt-10 text-center">
                                            <p className="">
                                                This Certificate is being issued
                                                without prejudice to any rights
                                                of City Council.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
