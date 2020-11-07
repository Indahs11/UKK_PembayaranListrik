const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()
const md5 = require("md5")

const pelanggan = require("../models/index").pelanggan

app.use(express.urlencoded({extended : true}))

//authentication
const verifyToken = require("./verifyToken")

app.get("/", verifyToken, async(req, res) => {
    pelanggan.findAll({
        include:[{ all: true, nested: true }]
    })
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            massage : error.massage
        })
    })
})

app.post("/", async(req, res) => {
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nomorkwh : req.body.nomorkwh,
        nama_pelanggan : req.body.nama_pelanggan,
        alamat : req.body.alamat,
        id_tarif : req.body.id_tarif
    }
    pelanggan.create(data)
    .then(result => {
        res.json ({
            massage : "data berhasil ditambahkan",
            data : result
        })
    .catch(error => {
        res.json({
            massage: error.massage
        })
    })
})
})

app.put("/", verifyToken, async(req, res) =>{
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nomorkwh : req.body.nomorkwh,
        nama_pelanggan : req.body.nama_pelanggan,
        alamat : req.body.alamat,
        id_tarif : req.body.id_tarif
    }
    let param = {
        id_pelanggan : req.body.id_pelanggan
    }
    pelanggan.update(data, {where: param})
    .then(result => {
        res.json({
            massage: "data berhasil diupdate",
            data: result
        })
    .catch(error => {
        res.json({
            massage: error.massage
        })
    })
    })
})
app.delete("/:id_pelanggan",verifyToken, async(req, res) => {
    let id_pelanggan = req.params.id_pelanggan
    let param = {
        id_pelanggan : id_pelanggan
    }
    pelanggan.destroy({where:param})
    .then(result => {
        res.json({
            massage: "data berhasil dihapus",
            data : result
        })
    })
    .catch(error => {
        res.json({
            massage: error.massage
        })
    })
})
module.exports = app