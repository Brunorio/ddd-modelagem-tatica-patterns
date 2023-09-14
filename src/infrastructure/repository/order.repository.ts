import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/orderRepositoryInterface";
import OrderItem from "../../domain/entity/order_item";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    let order = await OrderModel.findByPk(entity.id);
    if(!(order))
        throw new Error("Order not found");
      
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t
      });
  
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });

    var items = orderModel.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
    });

    return new Order(orderModel.id, orderModel.customer_id, items);
  }
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll();

    return Promise.all(ordersModel.map(async (order) => {
      const orderItems = await OrderItemModel.findAll({
        where: { order_id: order.id }
      });
      var items = orderItems.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      });
      return new Order(order.id, order.customer_id, items);
    }));

  }
}