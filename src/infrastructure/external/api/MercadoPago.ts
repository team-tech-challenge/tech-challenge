import { Payment, MercadoPagoConfig } from 'mercadopago';

const clientMercadoPago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO });

const paymentMercadoPago = new Payment(clientMercadoPago);


const  createMercadoPago = async (id,price,customer) => {

    const { firstName, lastName } = customer.getFirstAndLastName();    
    return await paymentMercadoPago.create({
        body: { 
            transaction_amount: price,
            description: 'Pedido: '+id,
            payment_method_id: 'pix',
            external_reference: id,
            payer: {
                email: customer.getEmail(),
                identification:{
                    type:'CPF',
                    number: customer.getCpf()
                }	
            },
            additional_info: {
                payer: {
                    first_name: firstName,
                    last_name: lastName,
                    							
                }
            },
            notification_url: process.env.WEBHOOK + "/payment/webhook"			
        }
    })
}

const  searchMercadoPago = async (id) => {    
    return await paymentMercadoPago.search({
        options: {
            id: id	    
        } 
    })
}


export { createMercadoPago, searchMercadoPago };
