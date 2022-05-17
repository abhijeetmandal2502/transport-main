import React, { useEffect } from 'react'
import FinalPayOut from '../../../components/account/FinalPayOut'
import BreadCrumb from '../../../components/BreadCrumb'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import useSWR from 'swr'

const CloseLr = () => {

    const { data: session } = useSession()
    const token = session.user.access_token

    const router = useRouter();
    const lrNo = router.query.lrNo


    const fetcher = (...args) => fetch(...args, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => res.json())

    const { data, error } = useSWR(`${process.env.apiUrl}/due-payment/${lrNo}`, fetcher)


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const res = data.data;

    return (
        <>
            <BreadCrumb />
            <FinalPayOut lrNo={lrNo} lrInfo={res} />
        </>
    )
}

export default CloseLr
