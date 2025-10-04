// find books from fiction genre
        db.books.find({ genre: "Fiction" })

// find books published after 1945 
    *    db.books.find({ published_year: { $gt: 19445 } })

//find books by specific author
    *    db.books.find({ author: "George Orwell" })
 
//update price of "1984" to 9.99
    *    db.books.updateOne({ title: "1984" }, { $set: { price: 9.99 } })

// delete "Animal Farm" from the collection
    *    db.books.deleteOne({ title: "Animal Farm" })

// find books that are both in stock and were published after 2010
    *    db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// use projection to return only the title,author and price of each book
    *    db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// display books sorted by price in ascending order
    *    db.books.find().sort({ price: 1 })

// display books sorted by price in descending order
    *    db.books.find().sort({ price: -1 })

// use limit to return only the first 5 books in the collection
    *    db.books.find().limit(5)

// use skip to return books after skipping the first 5  
    *    db.books.find().skip(5)

// agregate to calculate average price of books by genre
    *    db.books.aggregate([
            { $unwind: "$genres" },
            { $group: { _id: "$genres", averagePrice: { $avg: "$price" } } }
         ])

// aggregate to find author with the most books in collection
    *    db.books.aggregate([
        { $group: { _id: "$author", bookCount: { $sum: 1 } } },
        { $sort: { bookCount: -1 } },
        { $limit: 1 }
    ])

// group books by publication decade and count them
    *   db.books.aggregate([
        { $project: { decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] } } },
        { $group: { _id: "$decade", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ])

// create index on the 'title' field to optimize search queries
    *    db.books.createIndex({ title: 1 })

// create compound inedex on 'author' and 'published_year'
    *    db.books.createIndex({ author: 1, published_year: -1 })

//use the explain() method to demonstrate the performance improvements with indexes
    *    db.books.find({ title: "1984" }).explain("executionStats")
    *    db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } }).explain("executionStats")