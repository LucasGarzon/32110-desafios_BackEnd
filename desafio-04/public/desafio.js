let productsForm = document.getElementById('productsForm')

const handleSumbit = (evt, form, route) => {
  evt.preventDefault()
  let formData = new FormData(form)
  let obj = {}
  formData.forEach((value, key) => obj[key] = value)
  fetch(route, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json"
    }
  }).then(res => res.json())
      .then(res => console.log(res))
  form.reset()
}

productsForm.addEventListener('submit', (e) => handleSumbit(e, e.target, '/api/productos'))