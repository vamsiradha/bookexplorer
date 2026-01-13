const express = require('express'); 
const cors = require('cors'); 
 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
 
// Mock data 
const categories = [ 
  { id: 1, title: 'Fiction', slug: 'fiction', bookCount: 12500 }, 
  { id: 2, title: 'Science Fiction', slug: 'science-fiction', bookCount: 8500 }, 
  { id: 4, title: 'Romance', slug: 'romance', bookCount: 15000 }, 
  { id: 5, title: 'Biography', slug: 'biography', bookCount: 6200 }, 
  { id: 6, title: 'History', slug: 'history', bookCount: 7300 }, 
  { id: 7, title: 'Science', slug: 'science', bookCount: 5400 }, 
  { id: 8, title: "Children's Books", slug: 'childrens-books', bookCount: 11000 }, 
]; 
 
const books = [ 
  { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', price: 14.99, rating: 4.5, category: 'fiction' }, 
  { id: 2, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: 12.99, rating: 4.7, category: 'fiction' }, 
  { id: 3, title: 'The Midnight Library', author: 'Matt Haig', price: 13.99, rating: 4.3, category: 'fiction' }, 
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', price: 15.99, rating: 4.8, category: 'science-fiction' }, 
]; 
 
// Routes 
app.get('/api/health', (req, res) =
  res.json({  
    status: 'OK',  
    timestamp: new Date().toISOString(), 
    message: 'Book Explorer API v1.0', 
  }); 
}); 
 
app.get('/api/categories', (req, res) =
  res.json(categories); 
}); 
 
app.get('/api/books', (req, res) =
  res.json(books); 
}); 
 
app.get('/api/books/:id', (req, res) =
  const book = books.find(b = === parseInt(req.params.id)); 
  if (book) { 
    res.json(book); 
  } else { 
    res.status(404).json({ error: 'Book not found' }); 
  } 
}); 
 
// Serve frontend if exists 
app.use(express.static('public')); 
 
// Root route 
app.get('/', (req, res) =
  res.json({ 
    message: 'Welcome to Book Explorer API', 
    endpoints: { 
      health: '/api/health', 
      categories: '/api/categories', 
      books: '/api/books' 
    } 
  }); 
}); 
 
app.listen(PORT, () =
  console.log(`?? Server running on port ${PORT}`); 
  console.log(`?? API: http://localhost:${PORT}/api/health`); 
}); 
