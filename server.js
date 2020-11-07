// inisiasi library
const express = require("express")
const app = express()
const tarif = require("./router/tarif")
const level = require("./router/level")
const pelanggan = require("./router/pelanggan")
const admin = require("./router/admin")
const penggunaan = require("./router/penggunaan")
const tagihan = require("./router/tagihan")
const pembayaran = require("./router/pembayaran")
const auth = require("./router/auth")
const verifyPembayaran = require("./router/verifyPembayaran")


app.use("/tarif",tarif)
app.use("/level",level)
app.use("/pelanggan",pelanggan)
app.use("/admin",admin)
app.use("/penggunaan",penggunaan)
app.use("/tagihan",tagihan)
app.use("/pembayaran",pembayaran)
app.use("/auth",auth)
app.use("/verifyPembayaran",verifyPembayaran)

app.listen(8000, () => {
    console.log("server run on port 8000");
})
