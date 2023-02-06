import supertest from 'supertest'
import chai, { expect } from 'chai'

const request = supertest('http://localhost:8080')

describe('test Api-productos', () => {
  describe('GET', () => {
    it('La petiión debería retornar status 200', async () => {
      let res = await request.get('/products')
      expect(res.status).to.equal(200)
    })
  })

  describe('POST', () => {
    it('Debe poder guardar un usuario', async () => {
      const newProduct = {
        title: 'Ejemplo Axios 01',
        price: '200',
        thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342681.png'
      }
      let res = await request.post('/products').send(newProduct)
      expect(res.status).to.equal(200)
    })
  })
})