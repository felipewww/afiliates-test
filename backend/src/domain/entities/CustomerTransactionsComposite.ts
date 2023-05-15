import {TransactionEntity} from "@/domain/entities/Transaction.entity";
import {CustomerEntity} from "@/domain/entities/Customer.entity";
import * as process from "process";
import {ETransactionType} from "common-types/dist/app";

/**
 * Each Customer has many Transactions. The "CustomerTransactionsComposite" object
 * stores all Transactions for a specific Customer
 */
export class CustomerTransactionsComposite {
    
    private Transactions: Array<TransactionEntity> = []
    
    constructor(
        public customer: CustomerEntity,
    ) {
    
    }
    
    get transactions() {
        return this.Transactions
    }
    
    addTransaction(transaction: TransactionEntity) {
        // When affiliate sell something (ETransactionType.SALE_AFFILIATE)
        // should not register credits change, just save this register in database
        if (
            transaction.type === ETransactionType.SALE_CREATOR
            || transaction.type === ETransactionType.COMMISSION_PAID
            || transaction.type === ETransactionType.COMMISSION_RECEIVED
        ) {
            this.setCurrentCredits(transaction);
        }
        
        transaction.customer = this.customer
        
        this.Transactions.push(transaction)
    }
    
    private setCurrentCredits(transaction: TransactionEntity) {
        const operator: { [key: number]: '+'|'-' } = {}
        
        operator[ETransactionType.SALE_CREATOR] = '+'
        operator[ETransactionType.COMMISSION_PAID] = '-';
        operator[ETransactionType.COMMISSION_RECEIVED] = '+';
        
        const lastTransactionCredits = this.getLastTransactionCredits();
        
        transaction.currentCredits = eval(`${lastTransactionCredits} ${operator[transaction.type]} ${transaction.price}`);
        
        this.customer.currentCredits = transaction.currentCredits;
    }
    
    private getLastTransactionCredits() {
        const lastTransaction = this.Transactions[this.Transactions.length-1];
        const lastTransactionCredits = (lastTransaction) ? lastTransaction.currentCredits : 0;
        
        return lastTransactionCredits;
    }
    
    private log(transaction: TransactionEntity) {
        if (process.env.APP_ENV === 'dev') {
            const logTexts: { [key: number]: { who: string, action: string }; } = {};
            
            logTexts[ETransactionType.SALE_CREATOR] = {
                "who": "Criador",
                "action": "vendeu, ENTRADA saldo"
            }
            
            logTexts[ETransactionType.COMMISSION_PAID] = {
                "who": "Criador",
                "action": "pagou comissão, SAIDA do saldo"
            }
            
            logTexts[ETransactionType.COMMISSION_RECEIVED] = {
                "who": "Afiliado",
                "action": "recebeu, ENTRADA de saldo"
            }
            
            logTexts[ETransactionType.SALE_AFFILIATE] = {
                "who": "Afiliado",
                "action": " vendeu, APENAS UM REGISTRO DE VENDA "
            }
            
            const who = logTexts[transaction.type].who;
            const action = logTexts[transaction.type].action
            
            console.log(`${who} ${this.customer.name} ${action} (${transaction.price}) para ${who}`)
        }
    }
}