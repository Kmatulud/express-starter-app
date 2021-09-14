const express = require('express');
const exphbs  = require('express-handlebars');
var session = require("express-session");
const PizzaService = require('./pizzaService');
const app = express();
const PORT = process.env.PORT || 3017;

const pg = require("pg");
const Pool = pg.Pool;

// should use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
	useSSL = true;
}
// db connection to use
const connectionString =
	process.env.DATABASE_URL ||
	"postgresql://postgres:3201@localhost:3017/pizzas";

const pool = new Pool({
	connectionString,
	ssl: useSSL,
});

const pizzaService = PizzaService(pool);

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 //configure http session middleware
 app.use(session({ secret: 'keyboard cat', cookie: {maxAge: 6000}}))
// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
	res.render("index", {
		smallPizzaPrice: pizzaService.getsmallPizzaCost(),
		mediumPizzaPrice: pizzaService.getmediumPizzaCost(),
		largePizzaPrice: pizzaService.getlargePizzaCost(),
		numOfSmallPizzas: pizzaService.getNumOfsmallPizzas(),
		numOfMediumPizzas: pizzaService.getNumOfmediumPizzas(),
		numOfLargePizzas: pizzaService.getNumOflargePizzas,
		total: pizzaService.getOverallTotal(),
	});

	// if (!req.session.username){
	// 	res.redirect('/login')
	// }else if(req.session.username){
	// 	res.render('index');
	// }
	
});
// app.get('/home', function(req, res){
	
// });

app.post('/addpizza', function(req, res){
	pizzaService.setPrice(req.body.size)
	res.redirect('/');
})
app.get('/pizzas', function(req, res){

	res.render('pizza/index',{
		pizzas: pizzaService.listAll()
	})
})
app.post("/pizza/add", function (req, res) {
	console.log(req.body)
	pizzaService.addPizza(req.body)
	res.redirect("/pizzas");
});
app.get("/pizza/add", function (req, res) {
	res.render("pizza/add");
});

app.get('/login', function(req, res){
	res.render('login');
})

app.post('/login', function(req, res){
	if (req.body.username){
		req.session.username = req.body.username;
		res.redirect('/');
	}else{
		res.redirect('/login')
	}
})

app.post('/logout', function(req, res){
	req.session.username = null
	res.redirect('/login')
})
app.post('/count', function(req, res) {
	counter++;
	res.redirect('/')
});


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});