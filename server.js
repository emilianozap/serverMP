const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");

dotenv.config()


mercadopago.configure({
	access_token: process.env.TOKEN,
});

app.use(express.json());
app.use(cors());



app.get("/", function(req, res){
    res.send("servidor en linea")
})

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "https://movies-api-olive-beta.vercel.app/profile",
			"failure": "https://movies-api-olive-beta.vercel.app/profile",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences
	.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});