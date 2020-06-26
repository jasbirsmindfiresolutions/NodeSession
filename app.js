var readline = require('readline');

const items = [
	{
		id: 1,
		name: 'Soap',
		price: 10
	},
	{
		id: 2,
		name: 'Tooth Paste',
		price: 20
	},
	{
		id: 3,
		name: 'Ice cream',
		price: 30
	},
];

let order = {
	item: 0,
	qty: 0
}

let billing_amount = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question1 = () => {
  return new Promise((resolve, reject) => {
  	var ques = '';
  	items.map(function(item){
	  ques += item.id+') '+item.name+' - '+item.price+' rupees/item\n';
	})
    rl.question(`Hey there, We have the following items in our shop.\n${ques}What do you want to purchase today?`, (answer) => {
      order.item = answer;
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('How many? ', (answer) => {
      order.qty = answer;
      resolve()
    })
  })
}

const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Anything else? (Yes/No)', (answer) => {
    	calculateBilling()
      if(answer === 'Yes' || answer === 'yes' ){
      	main()
      } else {
      	resolve()
      	console.log('*******************************');
      	console.log(`Calculating your bill...\n`);
      	console.log(`Your bill is ${billing_amount} rupees`);
      	console.log('*******************************');
      }
    })
  })
}

const calculateBilling = () => {
	let choosenItem = items.filter(function(item){
		if(item.id == order.item)
			return item
	})
	billing_amount += choosenItem[0].price * order.qty;
}

const main = async () => {
  await question1()
  await question2()
  await question3()
  rl.close()
}

main()