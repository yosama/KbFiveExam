import PricingRules from "./PricingRules.js";

export default class Checkout  {

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
        let pricingRules = new PricingRules(numbersOfItemsByProduct);
        let price = pricingRules.calculatePrice();
        console.log("Items:" + this.scannedElements + "\nTotal: "+ price+ "€");
    }
}