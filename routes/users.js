const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let Users = require('../Users')
//get all
router.get('/', (req, res) =>{
    res.json(Users)
})

//get one user by id
router.get('/:id', (req, res) =>{
    const found = Users.some(User => User.id ===parseInt(req.params.id))
    if(found){
        res.json(Users.filter(User => User.id === parseInt(req.params.id)))
    }else{
        res.status(400)
    }
})

//update user
router.put('/:id', (req, res) =>{
    const found = Users.some(User => User.id === parseInt(req.params.id))
    if(found){
        const updateUser = req.body
        Users.forEach(User =>{
            if(User.id ===parseInt(req.params.id)){
                User.name=updateUser.name? updateUser.name:User.name
                User.email=updateUser.email? updateUser.email:User.email
                res.json({msg:"User updated successfully", Users})
            }
        })
    }
})
// delete users
router.delete('/:id', (req, res) =>{
    const found = Users.some(User => User.id ===parseInt(req.params.id))
    if(found){
        Users = Users.filter(User => User.id !== parseInt(req.params.id))
        res.json({msg: " User deleted", Users})
    } else{
        res.status(400)
    }
})
//create user
router.post('/', (req, res) =>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if(!newUser.name || newUser.email){
        res.status(400)
    }
    Users.push(newUser)
    res.json(Users)
})
module.exports = router