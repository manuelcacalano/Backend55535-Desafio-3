import utils from '../Utils/utils.js';

export class ProductManager {
	products;

	constructor(path) {
		this.path = path;
		this.products = [];
		this.lastId = 1;
	}

	async addProduct(title, description, price, thumbnail, code, stock) {
		if (
			title == undefined ||
			description == undefined ||
			price == undefined ||
			thumbnail == undefined ||
			code == undefined ||
			stock == undefined
		) {
			throw new Error('Todos los campos son obligatorios');
		}

		const existingProducts = this.products.find(
			(product) => product.code === code
		);

		if (existingProducts) {
			throw new Error('El codigo del producto ya esta en uso');
		} else {
			const newProduct = {
				id: this.lastId++,
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
			};
			this.products.push(newProduct);

			try {
				await utils.writeFile(this.path, this.products);
			} catch (error) {
				throw error;
			}
		}
	}

	async getProducts() {
		try {
			let data = await utils.readFile(this.path);
			return data?.length > 0 ? data : 'Aun no hay registros';
		} catch (error) {
			throw error;
		}
	}

	async getProductById(id) {
		try {
			let dato = await utils.readFile(this.path);
			this.products = dato?.length > 0 ? dato : [];
			const product = this.products.find((product) => product.id === id);

			if (!product || product === undefined) {
				throw new Error('No existe el producto solicitado');
			}

			return product;
		} catch (error) {
			throw error;
		}
	}

	async updateProduct(id, data) {
		try {
			let products = await utils.readFile(this.path);
			this.products = products?.length > 0 ? products : [];

			let productIndex = this.products.findIndex((dato) => dato.id === id);
			if (productIndex !== -1) {
				this.products[productIndex] = {
					...this.products[productIndex],
					...data,
				};
				await utils.writeFile(this.path, products);
				return {
					mensaje: 'producto actualizado',
					producto: this.products[productIndex],
				};
			} else {
				return { mensaje: 'no existe el producto solicitado' };
			}
		} catch (error) {
			throw error;
		}
	}

	async deleteProduct(id) {
		try {
			let products = await utils.readFile(this.path);
			this.products = products?.length > 0 ? products : [];

			const productIndex = this.products.findIndex(
				(product) => product.id === id
			);
			if (productIndex !== -1) {
				let product = this.products[productIndex];
				this.products.splice(productIndex, 1);
				await utils.writeFile(this.path, products);
				return { mensaje: 'producto eliminado', producto: product };
			} else {
				throw new Error('No existe el producto solicitado');
			}
		} catch (error) {
			throw error;
		}
	}
}

export default {
	ProductManager,
};