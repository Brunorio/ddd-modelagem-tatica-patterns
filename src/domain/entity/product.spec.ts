import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Banada", 10);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("1", "", 10);
    }).toThrowError("Name is required");
  });
  it("should throw error when price is zero", () => {
    expect(() => {
      let product = new Product("1", "Banada", 0);
    }).toThrowError("Price is invalid");
  });

  it("should throw error when price is negative", () => {
    expect(() => {
      let product = new Product("1", "Banada", -10);
    }).toThrowError("Price is invalid");
  });

  it("should change name", () => {
    let product = new Product("1", "Banada", 10);
    product.changeName("Watermelon");

    expect(product.name).toEqual("Watermelon");
  });
  it("should throw error on change to invalid name", () => {
    let product = new Product("1", "Banada", 10);
    expect(() => {
      product.changeName("");
    }).toThrowError("Name is required");
  });

 
});