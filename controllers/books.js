const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Book = require('../models/books');

const createBook = async(req, res, next) => {
    const { Title, Author, Url, Description, Published } = req.body;
    try{
    const newBook = new Book({
        Title,
        Author,
        Url,
        Description,
        Published
    });

    await newBook.save();
        return res.status(201).json({
           message: "This book has been added to the library"
            })
        
} catch (err) {
    return next(err)
}
}


const allBooks = async(req, res, next) => {
    try{
    const data = await Book.find(),
         return res.status(200).json({ data })
} catch (err) {
    return next(err)
}
} 

const bookEntry = async(req, res, next) => {
    try{
    const id = req.params.id
     const data = await Book.findOne({_id: id });
             res.status(200).json({
                Title: data.Title,
                WrittenBy: data.Author,
                File:data.Url,
                Description: data.Description,
                PublishedAt: data.Published
            })
} catch(err) {
    return next(err)
}
}

const updateBook = (req, res, next) => {
    if (!req.admin) {
        return res.status(401).json({
            message: "You need to be an admin to update  books"
        });
    } else {
        const id = req.params.id
        const { Title, Author,Url, Description, Published } = req.body
        Book.findOne({ _id: id }, (err, data) => {
            if (err) next(err);
            if (!data) {
                return res.status(404).json({
                    message: "Book doesn't exist"
                })
            } else {
                if (Title) {
                    data.Title = title;
                }
                if (Url) {
                    data.Url = url;
                }

                if (Author) {
                    data.Author = author;
                }

                if (Description) {
                    data.Description = description;
                }
                if (Published) {
                    data.Published = published;
                }

                data.save((err, editedBook) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).send(editedBook);
                    }
                })
            }
        })
    }

}


const deleteBook = (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        message: "You need to be an admin to delete a book"
      });
    } else {
      const id = req.params.id;
      Book.findByIdAndDelete({ _id: id }, err => {
        if (err) {
          next(err);
        } else {
          res.status(204).json({
            message: "Book deleted successfully"
          });
        }
      });
    }
  };

  module.exports = {createBook, allBooks, bookEntry, updateBook, deleteBook}

