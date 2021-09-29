var db=require('../config/connection')
module.exports={
    addProduct:(products,callback)=>{
        console.log(products);
        db.get().collection('product').insertOne(products).then((data)=>{
            callback(true)
        })
    }
}