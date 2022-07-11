db.createCollection("mensajes")
db.mensajes.createIndex({id:1}, {unique:true})
for(let i = 0; i < 10; i++)
{
	db.mensajes.insertOne(
	{
		id: i+1,
		fecha: new Date(),
		email: `user_${i}@email.com`,
		texto: `Mensaje numero ${i}`,
	});
}


db.createCollection("productos")
db.productos.createIndex({id:1}, {unique:true})
for(let i = 0; i < 10; i++)
{
	db.productos.insertOne(
	{
		id: i+1,
		title: `Producto ${i+1}`,
		price: Math.random() * (5000 - 100) + 100,
		thumbnail: `img_link${i}.png`
	});
}


db.mensajes.find()
db.productos.find()
db.mensajes.countDocuments()
db.productos.countDocuments()

db.productos.find({title:"Producto 8"})
db.productos.find({price:{ $lt: 1000 }})
db.productos.find({price:{ $gt: 1000, $lt: 3000 } } )
db.productos.find({price:{ $gt: 3000 }})
db.productos.find({}, {"title":1, "_id":0}).sort({price:1}).skip(2).limit(1)
db.productos.updateMany({}, {$set:{stock: 100}})
db.productos.updateMany({price:{$gt:4000}}, {$set:{stock: 0}})
db.productos.deleteMany({price:{$lt:1000}})

db.createUser({ user: "pepe",  pwd: "asd456", roles: [{role: "read", db: "productos"}]})
