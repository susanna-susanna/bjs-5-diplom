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
        console.log(`Something went wrong. Please, try again. Error 1`);
      }
    });
  }
   
  addMoney({currency, amount}, callback) {
    return ApiConnector.addMoney({currency, amount}, (err, data) => {
      if (data) {
        console.log(`Adding money ${amount} of ${currency} to ${this.username}`);
        callback(err, data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 2`);
      }
    });
  }
   
  convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {       
    return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, data) => {
      if (data) {
        console.log(`Converting ${fromCurrency} to ${targetAmount} NETCOINS`);
        callback(err,data);
      } else {
        console.log(`Something went wrong. Please, try again. Error 3`);
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
        console.log(`Something went wrong. Please, try again. Error 4`);
      }
    });
  }
}
 
//let stocks = [];  
  //Сохраните данные, полученные в результате вызова getStocks, в переменную.
  //Метод getStocks возвращает массив из 100 объектов следующего вида:
function getStocks(callback) {
  let stocks = []; // ???
  return ApiConnector.getStocks((err, data) => {
    if (data) {
      /*for (let i = 0; i < data.length; i++) {
        //stocks.push(data[i]);
        stocks[i] = data[i];
      }*/
      console.log(`Getting stocks info`);
      callback(err, data);
    } else {
        console.log(`Something went wrong. Please, try again. Error 5`);
    } 
  });
}
let stocks = getStocks(); // ??? не пойму: здесь, или на 69 строке, или вообще не там))
 
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
 
  Ilya.createUser(function() {
    Ilya.performLogin(function() {
      Ilya.addMoney({currency: 'EUR', amount: 500000}, function() {
        Ilya.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: 2000}, function() {
          Tugarin.createUser(function() {
            Ilya.transferMoney({to: 'tugarin', amount: 1000}, function({to, amount}) {                           
              console.log(` ${to}  ${Tugarin.name.firstName} has got ${amount} NETCOINS`);  
            });
          });
        });
      });
    });
  });
 
}
 
main();  //так вызывать или как на строках 116-118 ????
/*
getStocks(function() {
  main();
});
*/ 
 
 /* ИЛИ ВСЁ ТАКИ НУЖНО все делать как в примерах в задании диплома ??
function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
        });
}

main(); */ 