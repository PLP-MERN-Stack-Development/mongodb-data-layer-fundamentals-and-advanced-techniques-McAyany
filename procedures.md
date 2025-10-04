# MongoDB Bookstore Project  

This project demonstrates **basic and advanced MongoDB operations** including CRUD, projections, sorting, pagination, aggregation pipelines, and indexing.  

---

## 🚀 Getting Started  

### 1. Prerequisites  
- Install **MongoDB** or create a free **MongoDB Atlas** account  
- Install **MongoDB Compass** (optional, GUI for viewing data)  
- Install **Node.js** (for running JavaScript scripts)  

### 2. Connecting to MongoDB  
If you are using **MongoDB Atlas**, get your connection string:  

```bash
mongodb+srv://<username>:<password>@<cluster-url>/bookstore?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<cluster-url>` with your details.  

---

## 📘 Task 2: Basic CRUD Operations  

### Insert Books  
Run the script to insert sample data:  

```bash
node insert_books.js
```

Each book document has the following fields:  
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "published_year": 2021,
  "price": 19.99,
  "in_stock": true,
  "pages": 320,
  "publisher": "Publisher Name"
}
```

### Queries  

- **Find all books in a specific genre**  
```js
db.books.find({ genre: "Fiction" })
```

- **Find books published after a certain year**  
```js
db.books.find({ published_year: { $gt: 2015 } })
```

- **Find books by a specific author**  
```js
db.books.find({ author: "J.K. Rowling" })
```

- **Update the price of a specific book**  
```js
db.books.updateOne(
  { title: "Book Title" },
  { $set: { price: 24.99 } }
)
```

- **Delete a book by its title**  
```js
db.books.deleteOne({ title: "Book Title" })
```

---

## 📗 Task 3: Advanced Queries  

- **Find books that are in stock and published after 2010**  
```js
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
```

- **Projection (return only title, author, and price)**  
```js
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
```

- **Sorting by price**  
```js
db.books.find().sort({ price: 1 })   // Ascending
db.books.find().sort({ price: -1 })  // Descending
```

- **Pagination (5 books per page)**  
```js
db.books.find().skip(0).limit(5)   // Page 1
db.books.find().skip(5).limit(5)   // Page 2
```

---

## 📙 Task 4: Aggregation Pipeline  

- **Average price of books by genre**  
```js
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])
```

- **Author with the most books**  
```js
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { bookcount: -1 } },
  { $limit: 1 }
])
```

- **Group books by publication decade**  
```js
db.books.aggregate([
  { $project: { decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
```

---

## 📒 Task 5: Indexing  

- **Create an index on `title`**  
```js
db.books.createIndex({ title: 1 })
```

- **Create a compound index on `author` and `published_year`**  
```js
db.books.createIndex({ author: 1, published_year: -1 })
```

- **Use `explain()` to check performance**  
```js
db.books.find({ title: "Book Title" }).explain("executionStats")
```

---

## ✅ Summary  

This project shows how to:  
- Insert and manage documents  
- Run basic and advanced queries  
- Use projections, sorting, and pagination  
- Build aggregation pipelines for analytics  
- Optimize queries with indexing  

---

 
