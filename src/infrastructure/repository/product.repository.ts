import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/productRepositoryInterface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }
  async update(entity: Product): Promise<void> {
    ProductModel.update({
        name: entity.name,
        price: entity.price
      }, {
        where: {
          id: entity.id
        }
      }
    )
    
  }
  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({
      where: { id }
    });

    return (new Product(productModel.id, productModel.name, productModel.price));
  }
  async findAll(): Promise<Product[]> {
    let productsModel =  await ProductModel.findAll();
    
    return productsModel.map(productModel => {
      return new Product(productModel.id, productModel.name, productModel.price);
    });
  }
  
}