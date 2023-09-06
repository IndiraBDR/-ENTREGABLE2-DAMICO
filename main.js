class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  addProduct(title, descrptiption, price, thumbnail, code, stock) {
    const newProducts = {
      title,
      descrptiption,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!this.products.find((item) => item.code === code)) {
      if (!Object.values(newProducts).includes(undefined)) {
        ProductManager.id++;

        this.products.push({
          ...newProducts,
          id: ProductManager.id,
        });
      } else {
        console.log("FALTAN CAMPOS");
      }
    } else {
      console.log("el codigo YA EXISTE");
    }
  }


  getProduct() {
    return this.products;
  }

  getProductById(id) {
    !this.products.find((item) => item.id === id)
      ? console.log("NOT FOUND")
      : console.log(this.products.find((item) => item.id === id));
  }
}

const productos = new ProductManager();

//Arreglo vacio
console.log(productos.getProduct());

// Agregamos 2 productos
productos.addProduct("titulo1", "descripcion1", 25, "xxxx1", "abc123", 3);
productos.addProduct("titulo2", "descripcion2", 10, "xxxx2", "abc124", 7);

//Arreglo con los 2 productos
console.log(productos.getProduct());

//Agregramos producto con codigo ya existente (VALIDACION DE CODE REPETIDO)
productos.addProduct("titulo3", "descripcion3", 10, "xxxx3", "abc124", 4);
console.log(productos.getProduct());

//Agregramos producto con falta de datos(VALIDACION DE CAMPOS)
productos.addProduct("titulo4", "descripcion4", 10, "xxxx4", "abc125");
console.log(productos.getProduct());

//Busqueda por ID
console.log("Producto filtrado por ID");
productos.getProductById(2);

//Validacion de ID existente
productos.getProductById(3);
