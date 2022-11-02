import { faker } from '@faker-js/faker'

const randomProducts = []

function createRandomProducts() {
  return {
    id: parseFloat(faker.random.numeric(3)),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price(10, 4500)),
    thumbnail: faker.image.image(640, 480, true)
  };
}

Array.from({ length: 5 }).forEach(() => {
  randomProducts.push(createRandomProducts());
});

export default randomProducts