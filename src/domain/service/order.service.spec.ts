import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "../service/order.service";

describe("Order service unit tests", () => {

  it("should place an order", () => {
    const customer  = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("I1", "Item 1", 10, "P1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toEqual(5);
    expect(order.total()).toEqual(10);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "T1", 100, "p1", 1);
    const item2 = new OrderItem("2", "T2", 100, "p2", 1);

    const order1 = new Order("1", "C1", [item1]);
    const order2 = new Order("2", "C1", [item2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(200);
  });
});