import supertest from 'supertest'
import chai, { expect } from 'chai'

const request = supertest('http://localhost:8080')

let id = ''

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
        title: 'Ejemplo Supertest 01',
        price: '200',
        thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342681.png'
      }
      let res = await request.post('/products').send(newProduct)
      expect(res.status).to.equal(200)
      let product = res.body
      id = product._id
      
    })
  })

  describe('PUT', () => { 
    it('Debe poder modificar un producto de la bd por su id', async () => {
      let modification = {
        title: 'Ejemplo Supertest Actualizado',
        price: '250',
        thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342682.png'
        }
      let res = await request.put(`/products/${id}`).send(modification)
      expect(res.status).to.equal(200)
    })
  })
  
  describe('DELETE', () => {
    it('Debe poder eliminar un producto por su id', async () => {
      let res = await request.delete(`/products/${id}`).send()
      expect(res.status).to.equal(200)
    })
  })

})