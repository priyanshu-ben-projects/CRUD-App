require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let fruits = [
    {
        id: 1,
        name: "Mango",
        color: "Yellow",
        price: "₹150/kg",
        inStock: true,
        rating: 4.8,
        quantity: "50 kg",
        origin: "Ratnagiri, Maharashtra",
        taste: "Sweet & Juicy"
    },
    {
        id: 2,
        name: "Apple",
        color: "Red",
        price: "₹180/kg",
        inStock: true,
        rating: 4.5,
        quantity: "120 kg",
        origin: "Kashmir",
        taste: "Crisp & Sweet"
    },
    {
        id: 3,
        name: "Banana",
        color: "Yellow",
        price: "₹60/dozen",
        inStock: true,
        rating: 4.2,
        quantity: "30 dozen",
        origin: "Jalgaon, Maharashtra",
        taste: "Creamy & Sweet"
    },
    {
        id: 4,
        name: "Grapes",
        color: "Green",
        price: "₹90/kg",
        inStock: false,
        rating: 4.0,
        quantity: "0 kg",
        origin: "Nashik, Maharashtra",
        taste: "Sweet & Tangy"
    },
    {
        id: 5,
        name: "Pomegranate",
        color: "Ruby Red",
        price: "₹220/kg",
        inStock: true,
        rating: 4.7,
        quantity: "40 kg",
        origin: "Solapur, Maharashtra",
        taste: "Tart & Sweet"
    },
    {
        id: 6,
        name: "Orange",
        color: "Orange",
        price: "₹120/kg",
        inStock: true,
        rating: 4.4,
        quantity: "85 kg",
        origin: "Nagpur, Maharashtra",
        taste: "Citrusy & Refreshing"
    },
    {
        id: 7,
        name: "Strawberry",
        color: "Red",
        price: "₹80/pack",
        inStock: true,
        rating: 4.6,
        quantity: "25 packs",
        origin: "Mahabaleshwar",
        taste: "Sweet & Slightly Sour"
    },
    {
        id: 8,
        name: "Watermelon",
        color: "Green",
        price: "₹40/kg",
        inStock: true,
        rating: 4.3,
        quantity: "200 kg",
        origin: "Andhra Pradesh",
        taste: "Sugary & Hydrating"
    },
    {
        id: 9,
        name: "Kiwi",
        color: "Brown",
        price: "₹150/pack",
        inStock: false,
        rating: 4.1,
        quantity: "0 packs",
        origin: "New Zealand (Imported)",
        taste: "Exotic & Tangy"
    },
    {
        id: 10,
        name: "Pineapple",
        color: "Yellow",
        price: "₹80/piece",
        inStock: true,
        rating: 4.5,
        quantity: "15 pieces",
        origin: "Kerala",
        taste: "Sharp & Tropical"
    },
    {
        id: 11,
        name: "Blueberries",
        color: "Blue",
        price: "₹250/pack",
        inStock: true,
        rating: 4.9,
        quantity: "10 packs",
        origin: "Peru (Imported)",
        taste: "Mildly Sweet"
    },
    {
        id: 12,
        name: "Papaya",
        color: "Orange",
        price: "₹50/kg",
        inStock: true,
        rating: 3.9,
        quantity: "60 kg",
        origin: "Gujarat",
        taste: "Musky & Soft"
    },
    {
        id: 13,
        name: "Guava",
        color: "Green",
        price: "₹70/kg",
        inStock: true,
        rating: 4.3,
        quantity: "45 kg",
        origin: "Prayagraj, Uttar Pradesh",
        taste: "Sweet & Gritty"
    },
    {
        id: 14,
        name: "Peach",
        color: "Pinkish Yellow",
        price: "₹200/kg",
        inStock: false,
        rating: 4.2,
        quantity: "0 kg",
        origin: "Himachal Pradesh",
        taste: "Velvety & Delicate"
    },
    {
        id: 15,
        name: "Cherry",
        color: "Dark Red",
        price: "₹300/kg",
        inStock: true,
        rating: 4.7,
        quantity: "18 kg",
        origin: "Uttarakhand",
        taste: "Rich & Tart-Sweet"
    }
];

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("show.ejs");
});

app.get("/home", (req, res) => {
    const data = fruits;
    res.render("show.ejs", { data });
});

app.get("/home/form", (req, res) => {
    res.render("form.ejs");
});

app.post("/form", (req, res) => {
    let { name, price, inStock, color } = req.body;
    fruits.push({
        id: fruits.length + 1,
        name,
        price,
        inStock: (inStock === "on" || inStock === "true"),
        color
    });
    res.redirect("/home");
});

app.get("/home/:id", (req, res) => {
    let { id } = req.params;
    let fruit = fruits.find((p) => Number(id) === p.id);
    res.render("showMore.ejs", { fruit });
});

app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let fruit = fruits.find((p) => Number(id) === p.id);
    res.render("edit.ejs", { fruit });
});

app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let { name, color, price, inStock } = req.body;
    let fruit = fruits.find((p) => Number(id) === p.id);

    if (fruit) {
        fruit.name = name;
        fruit.color = color;
        fruit.price = price;
        fruit.inStock = (inStock === "on" || inStock === "true");
    }
    res.redirect("/home");
});

app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    fruits = fruits.filter((p) => Number(id) !== p.id);
    res.redirect("/home");
});
