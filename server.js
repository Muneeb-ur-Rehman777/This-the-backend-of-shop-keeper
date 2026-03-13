const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors());



const gro = [
  // Grains & Flour
  { id: 21, name: "Maida (1kg)", category: "Grains", price: 170, isPresent: true, quantity: 40 },
  { id: 22, name: "Corn Flour (1kg)", category: "Grains", price: 220, isPresent: true, quantity: 35 },
  { id: 23, name: "Brown Rice (1kg)", category: "Grains", price: 350, isPresent: false, quantity: 0 },

  // Pulses
  { id: 24, name: "Chana Dal (1kg)", category: "Pulses", price: 300, isPresent: true, quantity: 50 },
  { id: 25, name: "Masoor Dal (1kg)", category: "Pulses", price: 290, isPresent: true, quantity: 45 },
  { id: 26, name: "Moong Dal (1kg)", category: "Pulses", price: 320, isPresent: false, quantity: 0 },

  // Dairy
  { id: 27, name: "Yogurt (1kg)", category: "Dairy", price: 220, isPresent: true, quantity: 25 },
  { id: 28, name: "Butter (200g)", category: "Dairy", price: 280, isPresent: false, quantity: 0 },
  { id: 29, name: "Cheese (200g)", category: "Dairy", price: 420, isPresent: true, quantity: 20 },

  // Meat & Frozen
  { id: 30, name: "Mutton (1kg)", category: "Meat", price: 2000, isPresent: true, quantity: 10 },
  { id: 31, name: "Fish (1kg)", category: "Meat", price: 900, isPresent: false, quantity: 0 },
  { id: 32, name: "Frozen Nuggets (500g)", category: "Frozen", price: 750, isPresent: true, quantity: 30 },

  // Vegetables
  { id: 33, name: "Carrots (1kg)", category: "Vegetables", price: 110, isPresent: true, quantity: 60 },
  { id: 34, name: "Cabbage (1kg)", category: "Vegetables", price: 90, isPresent: true, quantity: 55 },
  { id: 35, name: "Green Chilies (250g)", category: "Vegetables", price: 80, isPresent: false, quantity: 0 },

  // Fruits
  { id: 36, name: "Mangoes (1kg)", category: "Fruits", price: 350, isPresent: false, quantity: 0 },
  { id: 37, name: "Oranges (1kg)", category: "Fruits", price: 220, isPresent: true, quantity: 70 },
  { id: 38, name: "Guava (1kg)", category: "Fruits", price: 180, isPresent: true, quantity: 65 },

  // Beverages
  { id: 39, name: "Coffee (200g)", category: "Beverages", price: 950, isPresent: true, quantity: 15 },
  { id: 40, name: "Soft Drink (1.5L)", category: "Beverages", price: 200, isPresent: true, quantity: 100 },
  { id: 41, name: "Mineral Water (1.5L)", category: "Beverages", price: 120, isPresent: true, quantity: 120 },

  // Snacks
  { id: 42, name: "Biscuits Pack", category: "Snacks", price: 150, isPresent: true, quantity: 80 },
  { id: 43, name: "Chips Large Pack", category: "Snacks", price: 220, isPresent: false, quantity: 0 },
  { id: 44, name: "Chocolate Bar", category: "Snacks", price: 180, isPresent: true, quantity: 90 },

  // Household
  { id: 45, name: "Laundry Powder (1kg)", category: "Household", price: 480, isPresent: true, quantity: 40 },
  { id: 46, name: "Toilet Cleaner", category: "Household", price: 260, isPresent: true, quantity: 35 },
  { id: 47, name: "Garbage Bags (Roll)", category: "Household", price: 150, isPresent: false, quantity: 0 },

  // Personal Care
  { id: 48, name: "Hair Oil", category: "Personal Care", price: 300, isPresent: true, quantity: 50 },
  { id: 49, name: "Face Wash", category: "Personal Care", price: 450, isPresent: true, quantity: 30 },
  { id: 50, name: "Hand Wash", category: "Personal Care", price: 250, isPresent: false, quantity: 0 }
];

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017', {
}).then(() => {
  console.log("Connected succesfully")
}).catch((err) => {
  console.log("not connected", err)
})

// schema of order
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  date: String,
  order: Array,
  price: Number,
  id: Number,
  status: String

})
// collection
const collectionOfOrder = mongoose.model("order", orderSchema)


// schema for products
const products = new mongoose.Schema({
  products: Array
})

// collection
const collectionOfProducts = mongoose.model("Products", products)












// by default on dashboard(main page)
app.get('/sales', async (req, res) => {

  let data = await collectionOfOrder.find({})
  if (data.length > 0) {
    let sum = data.reduce((prev, current) => (prev + Number(current.price)), 0)
    return res.status(200).json(sum)
  }
  return res.status(200).json(0)

})

app.get('/productsData', async (req, res) => {
  try {
    let data = await collectionOfProducts.find({})
    console.log(data)
    if (!data.length > 0) {
      let document = new collectionOfProducts({
        products: gro
      })
      await document.save()
    }
    let data1 = await collectionOfProducts.find({})
    let groceries = data1[0].products
    res.status(200).json(groceries);
  }
  catch (err) {
    res.status(500).json({ message: "There is an error to get all products" })
  }


})

app.get('/dash', async (req, res) => {
  let customers = await collectionOfOrder.find({})
  if (customers.length > 0) {
    return res.status(200).json(customers)
  }
  return []

})

// on click in dashboard(main page)
app.get('/getParticularData/:id', async (req, res) => {
  const id = req.params.id
  let customers = await collectionOfOrder.find({})

  const particularOrder = customers.find((item) => (item.id == Number(id)));
  if (!particularOrder) {
    return res.status(404).json({ message: "Order not available in Data Base" })
  }
  res.status(200).json(particularOrder)
})





// by default on add
app.get('/availableProductsData', async (req, res) => {
  try {
    let data1 = await collectionOfProducts.find({})
    let groceries = data1[0].products

    let availableItems = groceries.filter((obj) => { return obj.isPresent })
    res.status(200).json(availableItems);
  }
  catch (err) {
    res.status(200).json(err)
  }
})

// on click in add order page
app.post('/add', async (req, res) => {
  const { name, email, number, date, order, status, id } = req.body;

  let pr = order.reduce((sum, item) => sum + (item.price * item.quantity), 0)


  const allProducts = await collectionOfProducts.find({})
  const groceries = allProducts[0].products.filter((obj) => (obj.isPresent))


  for (let orderItem of order) {
    const isAvailable = groceries.find((item) => (item.name == orderItem.name))
    if (!isAvailable) {
      return res.status(400).json({ message: "Item not found", itemName: orderItem.name })
    }
    if (orderItem.quantity > isAvailable.quantity) {
      return res.status(400).json({ message: "Insufficent amount", quantityRemain: isAvailable.quantity })
    }
  }
  let a = await collectionOfProducts.find({})
  let all = a[0].products

  for (let orderItem of order) {
    const isAvailable = groceries.find((item) => (item.name == orderItem.name))
    await collectionOfProducts.updateOne({ _id: allProducts._id }, { $set: { products: all.map((obj) => (obj.name == orderItem.name ? obj.quantity -= orderItem.quantity : obj)) } })
    if (isAvailable.quantity == 0) {
      await collectionOfProducts.updateOne({ _id: allProducts._id }, { $set: { products: all.map((obj) => (obj.name == orderItem.name ? obj.isPresent = false : obj)) } })
    }
  }

  const orderObj = new collectionOfOrder({
    name: name,
    email: email,
    number: number,
    date: date,
    order: order,
    price: pr,
    id: id,
    status: status
  })
  await orderObj.save()
  res.status(200).json({ message: "Order Saved" })
})






//by default on customer 
app.get('/vip', async (req, res) => {
  let customers = await collectionOfOrder.find({})
  let vips = customers.filter((obj) => { return obj.price >= 5000 })
  res.status(200).json(vips)
})

app.get('/pending', async (req, res) => {
  let customers = await collectionOfOrder.find({})
  let pendedorders = customers.filter((obj) => { return obj.status == "Pending" })
  res.status(200).json(pendedorders)
})

// on click on pending page
app.post('/pendingPost', async (req, res) => {
  const { date } = req.body;
  let customres = await collectionOfOrder.find({})
  let da = customres.filter((obj) => { return obj.date == (date) })
  let pendedorders = da.filter((obj) => { return obj.status == "Pending" })
  res.status(200).json(pendedorders)
})

// on click on vip page
app.post('/vipPost', async (req, res) => {
  const { date } = req.body;
  let customers = await collectionOfOrder.find({})
  let da = customers.filter((obj) => { return obj.date == (date) })
  let vips = da.filter((obj) => { return obj.price >= 5000 })
  res.status(200).json(vips)
})





// by click on order page
app.post('/specificDate', async (req, res) => {
  const date = req.body.date;
  let customres = await collectionOfOrder.find({})
  let da = customres.filter((obj) => { return obj.date == (date) })
  res.status(200).json(da)
})



//schema
// mongoose.Schema()


// by click or  add on addproducts page
app.post('/addProductsData', async (req, res) => {
  const { name, price, category, quantity, isPresent } = req.body
  let products = await collectionOfProducts.find({})
  let items = products[0].products
  let item = {
    name: name,
    price: price,
    category: category,
    quantity: quantity,
    isPresent: isPresent
  }
  items.push(item)
  console.log(items)
  await collectionOfProducts.updateOne({_id:products[0]._id}, { $set: { products: items } })
  res.status(200).json({ message: "Product saved" })
  console.log("ok report")
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

































