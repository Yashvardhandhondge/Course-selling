const { v4: uuidv4 } = require('uuid');
function mockPayment(amount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const success = true;
            if(success){
                resolve({
                    transactionId:uuidv4(),
                    status:"success",
                    amount,
                });
            }else{
                reject(new Error('Payment failed'));
            }
        },1000)
    })
}

module.exports ={
    mockPayment
}