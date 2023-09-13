const { log } = require("console");
const fs = require("fs");
const { loadavg } = require("os");

class ProductManager {
  constructor() {
    this.path = "products.json";
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, "utf-8");

        return JSON.parse(productsFile);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(title, descrptiption, price, thumbnail, code, stock) {
    try {
      const products = await this.getProduct();

      let id;

      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      const newProducts = {
        title,
        descrptiption,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push({
        ...newProducts,
        id,
      });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

      if (productoFiltrado) {
        console.log(productoFiltrado);
        return productoFiltrado;
      } else {
        console.log("NOT FOUND");
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

      const products2 = products.filter((item) => {
        return item.id != id;
      });

      if (productoFiltrado) {
        await fs.promises.writeFile(this.path, JSON.stringify(products2));
      } else {
        console.log("PRODUCTO A ELIMINAR N0 EXITSE");
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct({ id, ...product }) {
    try {
      await this.deleteProductById(id);

      let productList = await this.getProduct();
      let productModificado = { ...product, id };
      let productListModificado = [productModificado, ...productList];
      console.log(productModificado);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productListModificado)
      );
    } catch (error) {
      return error;
    }
  }
}

async function test() {
  const productos = new ProductManager();
  
  console.log("Arreglo vacio");
  console.log(await productos.getProduct());

  console.log("Agregando producto");
  await productos.addProduct(
    "titulo3",
    "descripcion2",
    25,
    "xxxx2",
    "abc123",
    3
  );

  const arrayProductos = await productos.getProduct();
  console.log(arrayProductos);

  console.log("--BUSQUEDA POR ID--");
  const BusquedaID = await productos.getProductById(3);

  console.log("--MODIFICACION  MANTENIENDO ID=");
/*
  await productos.updateProduct({
    title: "titulo3",
    descrptiption: "descripcion2",
    price: 100000,
    thumbnail: "yyyy2",
    code: "abc123",
    stock: 3,
    id: 2,
  });

*/

  console.log("--BORRANDO PRODUCTO--");
  await productos.deleteProductById(1)
 
}



test();
