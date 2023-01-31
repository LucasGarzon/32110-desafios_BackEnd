import UsersService from "../services/userService.js";
const userService = new UsersService()

const saveUser = async (req, res) => {
    const result = await userService.addUser(req.body)
    if (result === false) res.redirect('/registerError')
    else res.redirect('/')
}

export default {saveUser}