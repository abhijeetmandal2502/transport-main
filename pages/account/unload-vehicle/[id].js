import CnDelivered from "../../../components/account/CnDelivered"
import BreadCrumb from "../../../components/BreadCrumb"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"
import useSWR from 'swr'

const UnloadedCn = ({ data }) => {

    // get token from session
    const { data: session } = useSession()
    const token = session.user.access_token
    const router = useRouter();
    const lrNo = router.query.id


    return (
        <>
            <BreadCrumb />
            <CnDelivered lrNo={lrNo} />
        </>

    )
}

export default UnloadedCn
