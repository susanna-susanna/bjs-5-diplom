class Profile {
  constructor({username, name: {firstName, lastName}, password}) {
    this.username = username;
    this.name = {firstName, lastName};
    this.password = password;
  }
     
  createUser(callback) {
    return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
      console.log(`Creating new user ${this.username}`); 
      if (data) {
        console.log(`${this.name.firstName} has created!`);
        callback(err, data);
      }
    });
  }
   
  performLogin(callback) {
    return ApiConnector.performLogin(this, (err, data) => {
      console.log(`Authorizing user ${this.username}`);
      if (data) {
        console.log(`${this.name.firstName} has authorized successful!`);
        callback(err, data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 1`, err);
      }
    });
  }
   
  addMoney({currency, amount}, callback) {
    return ApiConnector.addMoney({currency, amount}, (err, data) => {
      if (data) {
        console.log(`Adding money ${amount} of ${currency} to ${this.username}`);
        callback(err, data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 2`, err);
      }
    });
  }
   
  convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {       
    return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
      if (data) {
        console.log(`Converting ${fromCurrency} to ${targetAmount} NETCOINS`);
        callback(err,data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 3`, err);
      }
    });
  }       
 
  transferMoney({to, amount}, callback) {
    return ApiConnector.transferMoney({to, amount}, (err, data) => {
      if (data) {
        console.log(`Transfering ${amount} of money to ${to}`);
          //callback({to, amount}); ???
          callback(err, data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 4`, err);
      }
    });
  }
}
 
function getStocks(callback) {
  let stocks = []; // ???
  return ApiConnector.getStocks((err, data) => {
    if (data) {
      console.log(`Getting stocks info`);
      callback(err, data);
    } else {
        console.log(`Something went wrong. Please, try again. Error 5`, err);
    } 
  });
}

 
function main() {
  const Ilya = new Profile({
      username: 'ilya',
      name: {firstName: 'Ilya', lastName: 'Muromez'},
      password: '12345'
  });
 
  const Tugarin = new Profile({
      username: 'tugarin',
      name: {firstName: 'Tugarin', lastName: 'Zmey'},
      password: 'abcde'
  });
  
  getStocks(function(err, data) {
    let stocks = data;
    console.log(data); // посмотрите, что будет выведено в консоль
    
    if (err){
      console.log(`Something went wrong. Please, try again. Error`, err);  //?? нужно ли??
    }
    
    let stock = data[99]; //????
    
    Ilya.createUser(function() {
      Ilya.performLogin(function() {
        let wallet = {currency: 'EUR', amount: 500000};
        Ilya.addMoney(wallet, function() {
          //let converting = stocks[99] * wallet.amount;   
          //let converting = stock * wallet.amount;
          let converting = stock['EUR_NETCOIN'] * wallet.amount;
          Ilya.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: converting}, function() {
            Tugarin.createUser(function() {
              //Ilya.transferMoney({to: 'tugarin', amount: 1000}, function({err, data}) {
              Ilya.transferMoney({to: 'tugarin', amount: 1000}, function() {
                         
                //console.log(` ${to}  ${Tugarin.name.firstName} has got ${amount} NETCOINS`);  
                console.log(`Tugarin has got 1000 NETCOINS`);
                
              });
            });
          });
        });
      });
    });
  });
}
 
main();  