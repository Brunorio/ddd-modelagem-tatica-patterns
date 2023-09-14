import Product from "../entity/product";
import ProductService from "../service/product.service";

describe("Product service Unit tests", () => {

  it("should change the prices of all products", () => {
    const productOne = new Product("p1", "Product One", 10);
    const productTwo = new Product("p2", "Product Two", 20);

    const products = [productOne, productTwo];

    ProductService.increasePrice(products, 100);
    expect(productOne.price).toBe(20);
    expect(productTwo.price).toBe(40);
  });


});