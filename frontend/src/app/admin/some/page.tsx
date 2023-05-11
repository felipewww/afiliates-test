'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";
import {useAuthContext} from "@/infra/context/auth.context";

export default () => {
    const ctx = useAuthContext();

    return (
        <TemplateAdmin>
            <Link href={'/admin'}>
                To Home
            </Link>
        </TemplateAdmin>
    )
}