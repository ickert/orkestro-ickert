This project was created to Software Engineer Exercise of Orkestro by Felipe Ickert

## Available Scripts

In order to see the project starting running:

### `npm install`

Runs the first step of the test, installing all server dependencies.

### `npm start`

Runs the server in the port [4000] 

## The server and verbs

In order to see the server running you can try:

GET METHODS:

[http://localhost:4000/orders] - Show a list of all orders registered.
[http://localhost:4000/orders/82aebbe0-cc20-11e9-a923-81f4f4e1f132] - Show a especific order by the ID (In this case a example of 82aebbe0-cc20-11e9-a923-81f4f4e1f132)
[http://localhost:4000/ordersMock] - Show a list of all orders registered as mock data inside the server
[http://localhost:4000/driversMock] - Show a list of all orders registered as mock data inside the server
[http://localhost:4000/drivers] - Show a list of all drivers registered.

POST METHODS:

[http://localhost:4000/orders] Also respond as a post verb in order to save a order. A example of request would be:

{
	"pickupTime": "2013-02-08 09:30:26",
	"pickupAddress": "Adress 1",
	"dropoffAddress": "DropoffAddress1",
	"type": "package",
	"packageSize": "12 x 12"
}

