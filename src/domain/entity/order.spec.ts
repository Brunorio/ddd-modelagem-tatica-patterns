import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "1", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("1", "1", []);
    }).toThrowError("Items are required");
  });


  it("should calculate total", () => {
    const itemOne = new OrderItem("1", "Item One", 10, "p1", 1);
    const itemTwo = new OrderItem("2", "Item Two", 20, "p2", 2);

    let order = new Order("1", "1", [itemOne, itemTwo]);

    const total = order.total();
    expect(total).toEqual(50);

  });
});