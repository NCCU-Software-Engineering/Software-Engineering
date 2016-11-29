var SolidityCoder = require("web3/lib/solidity/coder.js");
var web3=request('web3/lib/web3.js')

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var number = web3.eth.blockNumber;
console.log(number);