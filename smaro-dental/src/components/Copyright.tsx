import { Link } from "react-router-dom";

export default function Copyright(props: any) {
    return (
        <p className="text-base text-blue-500 flex justify-center items-center" {...props}>
            {"Copyright © "}
            <Link color="inherit" to="/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </p>
    );
}
