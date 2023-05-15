'use client'

import {ITransaction} from "../../../common-types/src/domain/CustomerTransactionsCompound";

export default (props: { transactions: Array<ITransaction>, selectCustomer: Function }) => {
    console.log(props)
    
    const renderTransactions = () => {
        return props.transactions.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td>{item.course.title}</td>
                    <td>{item.price}</td>
                    <td>{item.customer.name}</td>
                    <td onClick={() => props.selectCustomer(item.customer)}>See customer</td>
                </tr>
            )
        })
    }
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th>type</th>
                        <th>title</th>
                        <th>price</th>
                        <th>Customer name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTransactions()}
                </tbody>
            </table>
        </>
    )
}