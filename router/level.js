const express = require ("express")
const { removeAllListeners } = require("nodemon")
const app = express()

//memanggil models rak
const level = require ("../models/index").level

//membuat middleware
app.use (express.urlencoded({extended: true}))

//authentication
const verifyToken = require("./verifyToken")
app.use(verifyToken)

app.get ("/", async(req, res) =>{
    level.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
             massage : error.massage
        })
    })
})

app.post ("/", async(req, res) =>{
    //menampung data
    let data ={
        nama_level : req.body.nama_level,
        administrator : req.body.administrator,
        pimpinan : req.body.pimpinan
    }
    level.create(data)
    .then(result => {
        res.json({
            massage : "data berhasil ditambah",
            data : result
        })
    })
    .catch(error => {
        res.json({
            massage : error.massage
        })
    })
})
app.put ("/", async(req, res) =>{
    let data = {
        nama_level : req.body.nama_level,
        administrator : req.body.administrator,
        pimpinan : req.body.pimpinan
    }
    let param = {
        id_level : req.body.id_level
    }
    level.update(data,{where : param})
    .then(result => {
        res.json({
            massage : "data berhasil dirubah",
            data : result
        })
    })
    .catch(error => {
        res.json({
            massage : error.massage
        })
    })
})
app.delete ("/:id_level", async(req, res) =>{
    let id_level = req.params.id_level
    let param = {
        id_level : id_level
    }
    level.destroy({where : param})
    .then(result => {
        res.json({
            massage : "data berhasil dihapus",
            data : result
        })
    })
    .catch(error => {
        res.json({
            massage : error.massage
        })
    })
})

module.exports = app