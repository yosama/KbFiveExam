
class Checkout  {

    constructor(pricingRules) {
        this.cabifyProducts = [
            {
                code:"VOUCHER",
                name:"Cabify Voucher",
                price: 5
            },
            {
                code:"TSHIRT",
                name:"Cabify T-Shirt",
                price: 20
            },
            {
                code:"MUG",
                name:"Cabify Coffee Mug",
                price: 7.50
            }
        ]
        this.scannedElements = [];
    }

    scan (item) {
        if (item !== ""){
            this.scannedElements.push(" " + item);
        }
        return this;
    }

    getItemsNumberByProduct  () {
        let countVoucher = 0
        let countTShirt = 0;
        let countMug = 0;
        for (let code of this.scannedElements) {
            code = code.trim();
            if (code === "VOUCHER") {
                countVoucher += 1;
            } else if (code === "TSHIRT") {
                countTShirt += 1;
            } else {
                countMug += 1;
            }
        }
        
        let numbersOfItemsByProduct = [
          {code:this.cabifyProducts[0].code, price: this.cabifyProducts[0].price, count:countVoucher}, 
          {code:this.cabifyProducts[1].code, price:this.cabifyProducts[1].price, count:countTShirt},
          {code:this.cabifyProducts[2].code, price:this.cabifyProducts[2].price, count:countMug}
        ]
        return numbersOfItemsByProduct;
    }

    tot () { 
        let numbersOfItemsByProduct = this.getItemsNumberByProduct();
        pricingRules = new PricingRules(numbersOfItemsByProduct);
        let price = pricingRules.calculatePrice();
        console.log("Items:" + this.scannedElements + "\nTotal: "+ price+ "€");
    }
}

class PricingRules  {
    
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

let pricingRules 
let co = new Checkout(pricingRules);
//co.scan("VOUCHER").scan("TSHIRT").scan("MUG");
//co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER");
//co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT").scan("VOUCHER").scan("TSHIRT");
co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER").scan("VOUCHER").scan("MUG").scan("TSHIRT").scan("TSHIRT");
let price = co.tot()