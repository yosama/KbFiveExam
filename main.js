import Checkout from ("./Checkout.js");

let pricingRules 
let co = new Checkout(pricingRules);
//co.scan("VOUCHER").scan("TSHIRT").scan("MUG");
//co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER");
//co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT").scan("VOUCHER").scan("TSHIRT");
co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER").scan("VOUCHER").scan("MUG").scan("TSHIRT").scan("TSHIRT");
let price = co.tot();