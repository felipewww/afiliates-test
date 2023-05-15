import {ICustomer} from "../../../common-types/src/domain/CustomerTransactionsCompound";
import styles from "./customer-info.module.css"

export default (props: { customer: ICustomer }) => {
    return (
        <div className={styles.cinfo}>
            <div>The customer (#{props.customer?.id}) {props.customer?.name} has {props.customer?.currentCredits} credits.</div>
        </div>
    )
}