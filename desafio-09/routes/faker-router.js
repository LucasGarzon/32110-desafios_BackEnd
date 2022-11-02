import { faker } from '@faker-js/faker'

export const randomProducts = []

function createRandomProducts() {
  return {
    id: parseFloat(faker.random.numeric(3)),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price(10, 4500)),
    thumbnail: faker.image.imageUrl()
  };
}

Array.from({ length: 5 }).forEach(() => {
  randomProducts.push(createRandomProducts());
});

router.get('/', (req, res) => {

})


