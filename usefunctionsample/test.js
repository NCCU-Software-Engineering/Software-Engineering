
   var SolidityCoder = require("web3/lib/solidity/coder.js");
    //var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider());
    function watchBalance() {
        var coinbase = web3.eth.coinbase;
        var originalBalance = web3.eth.getBalance(coinbase).toNumber();
        document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
        document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';
        web3.eth.filter('latest').watch(function() {
            var currentBalance = web3.eth.getBalance(coinbase).toNumber();
            document.getElementById("current").innerText = 'current: ' + currentBalance;
            document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
        });
    }
