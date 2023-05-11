'use client'

import TemplateAdmin from "@/components/TemplateAdmin";
import Link from "next/link";
import {useAuthContext} from "@/infra/context/auth.context";

export default () => {
    const ctx = useAuthContext();

    return (
        <TemplateAdmin>
            <div>CTX username on component HOME: {ctx.authUserEntity.username}</div>
            <Link href={'/admin/some'}>
                To some
            </Link>
        </TemplateAdmin>
    )
}