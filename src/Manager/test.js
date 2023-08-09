import { ProductManager } from './ProductManager.js';

const store = new ProductManager('products.json');

store.addProduct(
	'Producto 1',
	'Descripcion producto 1',
	500,
	'sin imagen',
	'A',
	10
);
store.addProduct(
	'Producto 2',
	'Descripcion producto 2',
	500,
	'sin imagen',
	'B',
	10
);
store.addProduct(
	'Producto 3',
	'Descripcion producto 3',
	500,
	'sin imagen',
	'C',
	10
);
store.addProduct(
	'Producto 4',
	'Descripcion producto 4',
	500,
	'sin imagen',
	'D',
	10
);
