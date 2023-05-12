import { Injectable } from '@nestjs/common';
import {BaseService} from "@/domain/base-service";

/*
## Formato do arquivo de entrada

| Campo    | Início | Fim | Tamanho | Descrição                      |
| -------- | ------ | --- | ------- | ------------------------------ |
| Tipo     | 1      | 1   | 1       | Tipo da transação              |
| Data     | 2      | 26  | 25      | Data - ISO Date + GMT          |
| Produto  | 27     | 56  | 30      | Descrição do produto           |
| Valor    | 57     | 66  | 10      | Valor da transação em centavos |
| Vendedor | 67     | 86  | 20      | Nome do vendedor               |

### Tipos de transação

Esses são os valores possíveis para o campo Tipo:

| Tipo | Descrição         | Natureza | Sinal |
| ---- | ----------------- | -------- | ----- |
| 1    | Venda produtor    | Entrada  | +     |
| 2    | Venda afiliado    | Entrada  | +     |
| 3    | Comissão paga     | Saída    | -     |
| 4    | Comissão recebida | Entrada  | +     |
* */

export enum ETransaction {
    SALE_CREATOR = 1,
    SALE_AFFILIATE,
    COMMISSION_PAID,
    COMMISSION_RECEIVED
}

@Injectable()
export class UploadService extends BaseService<string, any>{
    async handle(so?: string): Promise<any> {
        
        console.log('file text in usecase!')
        // console.log(so)
        
        const lines = so.split("\n")
        console.log(lines)
        
        const sellers = {}
        
        for (const line of lines) {
            
            // ignorar linhas em branco
            if (line === '') {
                continue
            }
            
            const type = parseInt(line[0]);
            const date = line.slice(1,26)
            const product = line.slice(26,56)
            const price = line.slice(56,66)
            const seller = line.slice(66,86)
            
            const priceConverted = parseInt(price) / 100
            
            if (!sellers[seller]) {
                sellers[seller] = {
                    productsSoldAsCreator: [],
                    productsSoldAsAffiliate: [],
                    creditsAsCreator: [],
                    
                    // seria a mesma coisa aqui?
                    creditsAsAffiliate: [], //este é apenas o total vendido. O valor real recebido é apenas na comissão
                    creditsAsAffiliateFromCommission: [],
                    
                    creditsTotal: 0,
                    debitsFromCommission: []
                }
            }
            
            // todo - não permitir arquivo se:
            // afiliado VENDEU e não recebeu comissão
            
            const ref = sellers[seller];
            
            console.log('\n');
            switch (type){
                case ETransaction.SALE_CREATOR:
                    console.log(`Criador ${seller} vendeu, ENTRADA saldo (${price}) no criador`)
                    ref.productsSoldAsCreator.push(product)
                    ref.creditsAsCreator.push(priceConverted)
                    break;
                    
                // não considera como entrada de saldo no afiliado. Apenas um registro qde que ele vendeu
                case ETransaction.SALE_AFFILIATE:
                    console.log(`Afiliado ${seller} vendeu, ENTRADA de saldo (${price}) no afiliado`)
                    ref.productsSoldAsAffiliate.push(product)
                    ref.creditsAsAffiliate.push(priceConverted)
                    break
                
                case ETransaction.COMMISSION_PAID:
                    console.log(`Criador ${seller} pagou comissão, SAIDA do saldo (${price}) do criador`)
                    ref.debitsFromCommission.push(priceConverted)
                    break;
                    
                case ETransaction.COMMISSION_RECEIVED:
                    console.log(`Afiliado ${seller} recebeu, ENTRADA de saldo (${price}) no afiliado`)
                    ref.creditsAsAffiliateFromCommission.push(priceConverted)
                    break;
            }
        }
        
        console.log(sellers);
        
        return Promise.resolve(undefined);
    }
}
