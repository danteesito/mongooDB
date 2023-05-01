const express = require ('express')
const app = express('')
const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://test:Argentina2021@cluster0.b7kzsr5.mongodb.net/?retryWrites=true&w=majority', {
})
.then(() => {
    console.log('se conecto con MongoDB Atlas');
})
.catch((error) => {
    console.log('no se pudo conectar a MongoDB Atlas');
});