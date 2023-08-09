import express from 'express';
import utils from './Utils/utils.js';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

//Inicio
app.get('/', (req, res) => {
	const message = `Bienvenido`;
	res.send({ message });
});

//Productos
app.get('/products', async (req, res) => {
	try {
		const products = await utils.readFile('./Json/products.json');
		// limit 
		const limit = req.query.limit;
		if (limit) {
			// Si se proporciona el parámetro "limit", devolver solo los primeros productos según el límite especificado
			const limitedProducts = products.slice(0, limit);
			res.json(limitedProducts);
		} else {
			// Si no se proporciona el parámetro "limit", devolver todos los productos
			res.json(products);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al leer el archivo de productos' });
	}
});

// Productos por ID
app.get('/products/:id', async (req, res) => {
	try {
		const products = await utils.readFile('./Json/products.json');
		const id = +req.params.id; // id a numero
		const product = products.find((producto) => producto.id === id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ error: 'El producto no existe' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al leer el archivo de productos' });
	}
});

app.listen(port, () => {
	console.log(
		`Servidor corriendo en el puerto ${port} 
        http://localhost:${port}`
	);
});