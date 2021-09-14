module.exports = function PizzaService() {
	const pizzas = [];
	let smallPizzaCount = 0;
	let largePizzaCount = 0;
	let mediumPizzaCount = 0;
	let smallPizzaCost = 0;
	let mediumPizzaCost = 0;
	let largePizzaCost = 0;
	function setPrice(size){
		if (size === "small") {
			smallPizzaCost += 35.00;
			smallPizzaCount++;
		} else if (size === "medium") {
			mediumPizzaCost += 65.00;
			mediumPizzaCount++;
		} else if (size === "large") {
			largePizzaCost += 85.00;
			largePizzaCount++;
		}
	}
	function getsmallPizzaCost() {
		return smallPizzaCost;
	}
	function getmediumPizzaCost() {
		return mediumPizzaCost
	}
	function getlargePizzaCost() {
		return largePizzaCost;
	}
	function getNumOfsmallPizzas(){
		return smallPizzaCount;
	}
	function getNumOfmediumPizzas() {
		return mediumPizzaCount;
	}
	function getNumOflargePizzas() {
		return largePizzaCount;
	}
	function getOverallTotal(){
		return smallPizzaCost + mediumPizzaCost + largePizzaCost;
	}
	function addPizza(pizza) {
		pizzas.push(pizza);
	}
	async function listAll() {
		return  pizzas;
	}
	function deletePizza(pizzaId) {}

	function updatePizza(pizzaId) {}

	return {
		addPizza,
		deletePizza,
		updatePizza,
		listAll,
		setPrice,
		getlargePizzaCost,
		getsmallPizzaCost,
		getmediumPizzaCost,
		getOverallTotal,
		getNumOfsmallPizzas,
		getNumOfmediumPizzas,
		getNumOflargePizzas,
	};
};
