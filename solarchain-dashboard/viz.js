// NOTE: Need to compile with browserify viz.js -o main.js
var SolidityCoder = require("web3");

//var account = '0x4cf24bf15bfead008b22ea33b7c99a82326031a7'; // Pi
var account = '0xB9b605D8e7d2e3bD43cbd59d1F079e8734f7b070'; // Dev
var contractAddress = '0x99C7Da5abDA00c9317c39DA1bfdB5509453840Bb';

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

web3.eth.defaultAccount = account;

// Assemble function hashes

var functionHashes = getFunctionHashes(abiArray);

// Get hold of contract instance

var contract = web3.eth.contract(abiArray).at(contractAddress);

// Setup filter to watch transactions

var filter = web3.eth.filter('latest');

filter.watch(function(error, result){
  if (error) return;
  
  var block = web3.eth.getBlock(result, true);
  console.log('block #' + block.number);

  console.dir(block.transactions);

  for (var index = 0; index < block.transactions.length; index++) {
    var t = block.transactions[index];

    // Decode from
    var from = t.from==account ? "me" : t.from;

    // Decode function
    var func = findFunctionByHash(functionHashes, t.input);

    if (func == 'sellEnergy') {
      // This is the sellEnergy() method
      var inputData = SolidityCoder.decodeParams(["uint256"], t.input.substring(10));
      console.dir(inputData);
      $('#transactions').append('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + "ApolloTrade" + 
        '</td><td>sellEnergy(' + inputData[0].toString() + ')</td></tr>');
    } else if (func == 'buyEnergy') {
      // This is the buyEnergy() method
      var inputData = SolidityCoder.decodeParams(["uint256"], t.input.substring(10));
      console.dir(inputData);
      $('#transactions').append('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + "ApolloTrade" + 
        '</td><td>buyEnergy(' + inputData[0].toString() + ')</td></tr>');
    } else {
      // Default log
      $('#transactions').append('<tr><td>' + t.blockNumber + '</td><td>' + from + '</td><td>' + t.to + '</td><td>' + t.input + '</td></tr>')
    }
  }
});

// Update labels every second

setInterval(function() {

  // Account balance in Ether
  var balanceWei = web3.eth.getBalance(account).toNumber();
  var balance = web3.fromWei(balanceWei, 'ether');
  $('#label1').text(balance);

  // Block number
  var number = web3.eth.blockNumber;
  if ($('#label2').text() != number)
    $('#label2').text(number).effect("highlight");

  // Contract coin balance: call (not state changing)
  var coinBalance = contract.getCoinAccount.call();
  $('#label3').text(coinBalance);

  // Contract energy balance: call (not state changing)
  var energyBalance = contract.getEnergyAccount.call();
  $('#label4').text(energyBalance);

}, 1000);

// Get function hashes
// TODO: also extract input parameter types for later decoding

function getFunctionHashes(abi) {
  var hashes = [];
  for (var i=0; i<abi.length; i++) {
    var item = abi[i];
    if (item.type != "function") continue;
    var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    var hash = web3.sha3(signature);
    console.log(item.name + '=' + hash);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
}

function findFunctionByHash(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10))
      return hashes[i].name;
  }
  return null;
}