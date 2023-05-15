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
                    <td onClick={() => props.selectCustomer(item.customer)} style={ {cursor: "pointer"} }>See customer</td>
                </tr>
            )
        })
    }
    
    return (
        <>
            
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">date</th>
                            <th scope="col" className="px-6 py-3">type</th>
                            <th scope="col" className="px-6 py-3">title</th>
                            <th scope="col" className="px-6 py-3">price</th>
                            <th scope="col" className="px-6 py-3">Customer name</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTransactions()}
                    </tbody>
                </table>
            </div>
        </>
    )
}