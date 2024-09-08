import { logo } from "@/Pages/images";

export default function ApplicationLogo({ logoStyle }) {
    return <img src={logo} alt="" className={logoStyle} />;
}
