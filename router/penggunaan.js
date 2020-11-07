const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()
const md5 = require("md5")

const penggunaan = require("../models/index").penggunaan

app.use(express.urlencoded({extended : true}))

//authentication
const verifyToken = require("./verifyToken")
app.use(verifyToken)

app.get("/", async(req, res) => {
    penggunaan.findAll({
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
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal : req.body.meter_awal,
        meter_akhir : req.body.meter_akhir
    }
    penggunaan.create(data)
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

app.put("/", async(req, res) =>{
    let data = {
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal : req.body.meter_awal,
        meter_akhir : req.body.meter_akhir
    }
    let param = {
        id_penggunaan : req.body.id_penggunaan
    }
    penggunaan.update(data, {where: param})
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
app.delete("/:id_penggunaan", async(req, res) => {
    let id_penggunaan = req.params.id_penggunaan
    let param = {
        id_penggunaan : id_penggunaan
    }
    penggunaan.destroy({where:param})
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