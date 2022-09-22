const socket = io();
let productsForm = document.getElementById('productsForm');
let chatForm = document.getElementById('chatForm')

const handleSubmit = (evt, form, route) => {
    evt.preventDefault()
    let formData = new FormData(form)
    let obj = {}
    formData.forEach((value, key) => obj[key]=value)
    socketEvent = route.slice(1)
    fetch(route, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => socket.emit(socketEvent, response))
        .then(() => form.reset())
}

productsForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/products'))
chatForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/chat'))

socket.on('history', data => {
  if (data.length > 0) {
      let history = document.getElementById('history')
      let html = `
      <table class="table bg-dark text-light">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Icon</th>
        </tr>
      </thead>
      <tbody>
      `
      data.forEach(product => {
          html += `
          <tr>
            <th scope="row">${product.id}</th>
            <td>${product.title}</td>
            <td>$${product.price}</td>
          <td>
            <img
              src="${product.thumbnail}"
              alt="product icon"
              style="width: 1.2rem"
            />
          </td>
        </tr>          
          `
      })
      html += `
      </tbody>
      </table>
      `
      history.innerHTML = html
  }
})

socket.on('chatHistory', data => {
  if (data.length > 0) {
      let chatHistory = document.getElementById('chatHistory')
      let html = ''
      data.forEach(message => {
          html += `
          <div>
              <span style="color: blue; font-weight: bold">${message.email}</span>
              <span style="color: red">[${message.timestamp}]: </span>
              <span style="color: green">${message.message}</span>
          </div>
          `
      })
      chatHistory.innerHTML = html
  }
})