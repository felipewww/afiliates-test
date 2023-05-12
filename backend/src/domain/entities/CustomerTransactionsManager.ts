import {TransactionEntity} from "@/domain/entities/Transaction.entity";
import {CustomerEntity} from "@/domain/entities/Customer.entity";
import {ETransactionType} from "@/domain/services/upload/upload.service";
import * as process from "process";

export class CustomerTransactionsManager {
    private transactions: Array<TransactionEntity> = []
    
    constructor(
        public customer: CustomerEntity,
    ) {
    
    }
    
    addTransaction(transaction: TransactionEntity) {
        this.asd(transaction)
        this.transactions.push(transaction)
    }
    
    private asd(transaction: TransactionEntity) {
        this.log(transaction);
        
        // When affiliate sell something (ETransactionType.SALE_AFFILIATE)
        // should not register credits change, just save this register in database
        if (
            transaction.type === ETransactionType.SALE_CREATOR
            || transaction.type === ETransactionType.COMMISSION_PAID
            || transaction.type === ETransactionType.COMMISSION_RECEIVED
        ) {
            this.setCurrentCredits(transaction);
        }
    }
    
    private setCurrentCredits(transaction: TransactionEntity) {
        const operator: { [key: number]: '+'|'-' } = {}
        
        operator[ETransactionType.SALE_CREATOR] = '+'
        operator[ETransactionType.COMMISSION_PAID] = '-';
        operator[ETransactionType.COMMISSION_RECEIVED] = '+';
        
        const lastTransaction = this.transactions[this.transactions.length-1];
        
        const customerCurrentCredits = (lastTransaction) ? lastTransaction.currentCredits : 0;
        
        let currentCredits = eval(`${customerCurrentCredits} ${operator[transaction.type]} ${transaction.price}`);
        
        transaction.currentCredits = currentCredits;
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