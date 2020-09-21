import { SalesType } from './types/sales.type';
import { CustomerType } from './types/customer.type';
import { FormatTypes } from './format.types'

export class FormatWhatsApp {
    
    constructor(private salesOrder: {customer: CustomerType, order: SalesType}) {
        
    }

    breakLine() {
        return '\n---\n'
    }

    formatSchedule() {
        var sc = '*AGENDAMENTO*'
        
        sc += `\nPara *${FormatTypes.formatDateDDMM(this.salesOrder.order.schedule.date)}* entre ${this.salesOrder.order.schedule.period}`

        return sc;
    }

    public formatSalesOrder() {
        var data: string = '';

        data += this.formatHeader()
        data += this.breakLine();
        if (this.salesOrder.order.schedule != undefined) {
            data += this.formatSchedule();
            data += this.breakLine();
        }
        data += `_Itens_ \n${this.formatOrder()}`;

        data += this.breakLine();
        data += `*Endereço:* \n${this.formatAddress()}`

        if (this.salesOrder.order.instruction != undefined && this.salesOrder.order.instruction.trim().length > 0) {
            data += this.breakLine();
            data += `*Instruções:* \n${this.formatOrderInstructions()}`

        }


        data += this.breakLine();
        data += this.formatFooter()

        return data;
    }

    formatPaym() {
        var paym: string = ''

        switch (this.salesOrder.order.paymMethod) {
            case 'transfer':
                paym += '_Transferência_\n';
                break;
            case 'money':
                paym += '_Dinheiro_'
                break;
            case 'credit':
                paym += '_Cartão de crédito_'
                break;
        }

        return paym;
    }

    formatSalesId() {
        var orderFormated = String(this.salesOrder.order.salesId);
        return `#${orderFormated.padStart(4, '0')}`
    }

    formatHeader() {
        var header = `*${this.formatSalesId()}*`;
        header += `\n _${this.formatUserInfo()}_`;

        return header;
    }

    formatUserInfo() {
        var userInfo: string = `${this.salesOrder.customer.name.trim()}`
        userInfo += ` - ${this.salesOrder.customer.phone}`
        return userInfo;
    }

    formatAddress() {
        var line1 = `${this.salesOrder.customer.address.street}, ${this.salesOrder.customer.address.number} `;
        if (this.salesOrder.customer.address.complement != undefined && this.salesOrder.customer.address.complement != '') {
            line1 += ` - ${this.salesOrder.customer.address.complement} `
        }

        line1 += `${this.salesOrder.customer.address.district}, ${this.salesOrder.customer.address.city}/${this.salesOrder.customer.address.state}`

        return line1;
    }

    formatPrice(value: number) {
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }


    formatOrder() {
        var order: string = '';

        this.salesOrder.order.lines .forEach(p => {
            
            order += `    \n *${p.qty}X*  ${(p.productId.unit == undefined || p.productId.unit == '') ? '' : '_' + p.productId.unit + '_'}  *${p.product}*  _(${this.formatPrice(p.amount)})_`

            
            p.items.forEach(category => {
                order += `\n  _${category.category}_`
                category.items.forEach(item => {
                    order += `    \n     + _${(item.qty > 1) ? item.qty + '  ' : ''}${item.item}_`
                })
            })
        })
        order += '\n'
        this.salesOrder.order.taxes.forEach(t => order += `    \n _(${t.name} ${this.formatPrice(t.value)})_`)
        order += `\n\n*Total ${this.formatPrice(this.salesOrder.order.totalAmount)}*`
        order += `\n_Pagamento:_ ${this.formatPaym()}`;

        return order;
    }

    formatOrderInstructions() {
        return `\n${this.salesOrder.order.instruction.trim()}`
    }

    formatFooter() {
        var footer: string = '';
        footer += `Pedido em ${FormatTypes.formatDateTime(this.salesOrder.order.time)}`;
        footer += ` via bslista.com/${this.salesOrder.order.store}`;

        return footer;
    }

}