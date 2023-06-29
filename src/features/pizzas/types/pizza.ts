export default interface Pizza {
  id: number;
  name: string;
  veg: boolean;
  price: number;
  description: string;
  quantity: number;
  img: string;
  sizeandcrust?: [
    {
      mediumPan?: [{ price: number }];
      mediumstuffedcrustcheesemax?: [{ price: number }];
      mediumstuffedcrustvegkebab?: [
        {
          price: number;
        }
      ];
      "medium stuffed crust-veg kebab"?: [
        {
          price: number;
        }
      ];
      mediumstuffedcrustchickenseekhkebab?: [
        {
          price: number;
        }
      ];
      "medium stuffed crust kebab"?: [
        {
          price: number;
        }
      ];
    }
  ];
}
