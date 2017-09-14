export default class PricingRules  {
    
    constructor (products) {
        this.products = products;
    }
    
    calculatePrice() {
        var result = 0.0;
        let calculate = function(count, price)  {
            return count / 2 * price
        }
        for (let product of this.products ) {
            switch (product.code) {
                case "VOUCHER": {
                    if (product.count % 2 == 0 ) {
                       result += calculate(product.count, product.price);
                    } else  {
                        result += calculate((product.count - 1), product.price) + product.price;
                    } 
                    break;
                }
                case "TSHIRT" : {
                    if(product.count >= 3 ) {
                        product.price -=  1
                    } 
                    result += product.count * product.price;
                    break;
                }
                default:{
                    result += product.count * product.price;
                    break;
                }    
            }

        }
        return result.toFixed(2);
    }  
}