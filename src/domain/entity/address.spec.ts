import Address from "./address";

describe("Address unit test", () => { 
  let addressValues = {
    street: "Rua Nelson da Silva Guidio",
    number: 435,
    zip: "19025260",
    city: "Presidente Prudente"
  }

  Object.keys(addressValues).forEach((param: string) => {
    it(`Should throw error when ${param} is empty`, () => {
      if(param === "number") return;
      let data = {...addressValues, [param]: ""};
      expect(() => {
        const address = new Address(data['street'], data['number'], data['zip'], data['city']);
      }).toThrowError(`${param[0].toUpperCase()}${param.substring(1)} is required`)
    })
  });

  it("Given a valid address when transform to string then print valid string", () => {
    const address = new Address(addressValues['street'], addressValues['number'], addressValues['zip'], addressValues['city']);

    expect(address.toString()).toBe("Rua Nelson da Silva Guidio, 435, 19025260 Presidente Prudente");
  });

});