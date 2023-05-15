import {ICustomer} from "../../../common-types/src/domain/CustomerTransactionsCompound";

export default (props: { customer: ICustomer }) => {
    return (
        <>
         <div>{props.customer?.id} | {props.customer?.name} | {props.customer?.currentCredits}</div>
        </>
    )
}