const express = require ("express")
const { removeAllListeners } = require("nodemon")
const app = express()

//memanggil models rak
const tarif = require ("../models/index").tarif

//membuat middleware
app.use (express.urlencoded({extended: true}))

//authentication
const verifyToken = require("./verifyToken")
app.use(verifyToken)

app.get ("/", async(req, res) =>{
    tarif.findAll()
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
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    tarif.create(data)
    .then(result => {
        res.json({
            massage : "data berhasil ditambahkan",
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
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    let param = {
        id_tarif : req.body.id_tarif
    }
    tarif.update(data,{where : param})
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
app.delete ("/:id_tarif", async(req, res) =>{
    let id_tarif = req.params.id_tarif
    let param = {
        id_tarif : id_tarif
    }
    tarif.destroy({where : param})
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