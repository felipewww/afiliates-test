'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";

export default () => {
    return (
        <TemplateAdmin>
            <Link href={'/admin/some'}>
                To some
            </Link>
        </TemplateAdmin>
    )
}