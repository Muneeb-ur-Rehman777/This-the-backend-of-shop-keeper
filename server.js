const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json());
app.use(cors());


let customers = []

app.get('/dash', (req, res) => {
  res.status(200).json(customers)
})



app.post('/add', (req, res) => {
  const { name,
    email,
    number,
    date,
    order,
    price,
    status,
    id
  } = req.body;

  let customer = {
    name: name,
    email: email,
    number: number,
    date: date,
    order: order,
    price: price,
    id: id,
    status: status
  }
  customers.push(customer)
  res.status(200).json({
    message: "customer saved"
  })

})

app.get('/sales', (req, res) => {

  const sum = customers.reduce((acc, el) => acc + Number(el.price), 0);
  res.status(200).json(sum)
  
})

app.get('/pending', (req, res) => {
  let pendedorders = customers.filter((obj) => { return obj.status == "Pending" })
  res.status(200).json(pendedorders)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/vip', (req, res) => {
  let vips = customers.filter((obj) => { return obj.price >= 5000 })
  res.status(200).json(vips)
})

app.post('/pendingPost', (req, res) => {
  
  const {date} = req.body;
  let da = customers.filter((obj)=>{return obj.date == (date)})

  let pendedorders = da.filter((obj) => { return obj.status == "Pending" })
  res.status(200).json(pendedorders)
})
app.post('/vipPost', (req, res) => {
  
  const {date} = req.body;
  let da = customers.filter((obj)=>{return obj.date == (date)})
  let vips = da.filter((obj) => { return obj.price >= 5000 })
  res.status(200).json(vips)

  
})
app.post('/specific',(req,res)=>{
  
  const {date} = req.body;
  let da = customers.filter((obj)=>{return obj.date == (date)})
  
  
  res.status(200).json(da)

})


app.get('/productsData',(req,res)=>{
  res.status(200).json(groceries);
})


app.post('/addProductsData',(req,res)=>{
  const{name,price,category,quantity,isPresent}=req.body
  let item = {
    name:name,
    price:price,
    category:category,
    quantity:quantity,
    isPresent:isPresent
  }

  groceries.push(item)
  res.status(200).json({
    message:"Product saved"
  })
})


































const groceries = [
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
