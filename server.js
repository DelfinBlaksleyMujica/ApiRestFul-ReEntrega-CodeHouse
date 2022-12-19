const Container = require("./container.js");
const productos = new Container("./productos.json");
const productosEnBase = require("./productos.json");


const express = require("express");
const Router = require("express").Router;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


/*Peticiones Get*/

app.get("/api/productos", ( req , res ) => {
    try{
        console.log("Se muestran todos los productos correctamente");
        res.status(200).send({ productos: productosEnBase });
    }
    catch(error){
        console.log("Error en el get de producto");
        res.status(500).send({ message: error.message })
    }
})

app.get("/api/productos/:id", ( req , res ) => {
    try{
        if (req.params) {
            const { id } = req.params;
            const producto = productosEnBase.find( obj => obj.id == id );
            if (!producto) {
                console.log("No se encuentra el producto");
                return res.status(400).send({ error: "Producto no encontrado"});
            }
            return res.status(200).send({ producto : { producto }}) 
        }
    }catch ( error ) {
        console.log("Error en el get del producto");
        res.status(500).send({ message : error.message })
    }
    
})


/*Peticiones Post*/
app.post("/api/productos", ( req , res ) => {
    try{
        if ( req.body.title || req.body.price || req.body.thumbnail ) {
        const obj = req.body;
        async function cargarProducto( producto ) {
            await productos.save( obj );
        }
        const nuevoProducto = cargarProducto( obj );
        res.status(200).send({ nuevoProducto: obj });
    }
    res.status(200).send({ message:"No hay informacion de usuarios en los params" })
    }catch ( error ) {
        console.log("Error en el get del producto");
        res.status(500).send({ message : error.message })
    }
    
    
})

/*Peticiones PUT*/

/*app.put("/api/productos/:id", ( req , res ) => {
    const { id } = req.params;
    const { titleAct , priceAct , thumbnailAct } = req.body;
    let productoAmodificar = productosEnBase.find( obj => obj.id == id );
    productoAmodificar = {
        title: titleAct,
        price: priceAct,
        thumbnail : thumbnailAct,
        id : id,
    };
})
*/

/*Peticiones DELETE*/

app.delete("/api/productos/:id" , ( req , res ) => {
    try {
        if (req.params) {
            const { id } = req.params;
            const producto = productosEnBase.find( obj => obj.id == id );
            if (!producto) {
                res.status(404).send({ message: "Ese producto no fue encontrado en la base"})
            }
            async function borrarDeBase(id){
            await productos.deleteById(id)
            }
            const productoBorrado = borrarDeBase(id);
            res.status(200).send({ productoBorrado: producto})
        }
    }catch ( error ) {
            console.log("Error en el get del producto");
            res.status(500).send({ message : error.message })
    }
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening app port ${server.address().port}`);
})



server.on("error" , (error)=> {
    console.log("Error ======>" , error.message);
})