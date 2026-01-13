const express = require('express'); 
const app = express(); 
ECHO is on.
// Middleware 
app.use(express.json()); 
ECHO is on.
// Mock data 
const categories = [ 
  { id: 1, title: 'Fiction', bookCount: 12500 }, 
  { id: 2, title: 'Science Fiction', bookCount: 8500 }, 
  { id: 4, title: 'Romance', bookCount: 15000 }, 
  { id: 5, title: 'Biography', bookCount: 6200 }, 
  { id: 6, title: 'History', bookCount: 7300 }, 
  { id: 7, title: 'Science', bookCount: 5400 }, 
  { id: 8, title: "Children's Books", bookCount: 11000 }, 
]; 
ECHO is on.
const books = [ 
  { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', price: 14.99, rating: 4.5 }, 
  { id: 2, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: 12.99, rating: 4.7 }, 
  { id: 3, title: 'The Midnight Library', author: 'Matt Haig', price: 13.99, rating: 4.3 }, 
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', price: 15.99, rating: 4.8 }, 
]; 
ECHO is on.
// API Routes 
app.get('/api/health', (req, res) =
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(), 
    message: 'Book Explorer API v1.0', 
  }); 
}); 
ECHO is on.
app.get('/api/categories', (req, res) =
  res.json(categories); 
}); 
ECHO is on.
app.get('/api/books', (req, res) =
  res.json(books); 
}); 
ECHO is on.
app.get('/api/books/:id', (req, res) =
  const book = books.find(b = === parseInt(req.params.id)); 
  if (book) { 
    res.json(book); 
  } else { 
    res.status(404).json({ error: 'Book not found' }); 
  } 
}); 
ECHO is on.
// Serve HTML homepage 
app.get('/', (req, res) =
  res.send(\` 
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; } 
ECHO is on.
ECHO is on.
ECHO is on.
ECHO is on.
ECHO is on.
      async function loadBooks() { 
        try { 
          const response = await fetch('/api/books'); 
          const books = await response.json(); 
          const container = document.getElementById('books'); 
ECHO is on.
          container.innerHTML = books.map(book =
          \`).join(''); 
        } catch (error) { 
          console.error('Error loading books:', error); 
        } 
      } 
ECHO is on.
      // Load books when page loads 
      document.addEventListener('DOMContentLoaded', loadBooks); 
  \`); 
}); 
ECHO is on.
// Start server 
app.listen(PORT, () =
  console.log(\`?? Server running on port \${PORT}\`); 
  console.log(\`?? Homepage: http://localhost:\${PORT}\`); 
  console.log(\`?? API: http://localhost:\${PORT}/api/health\`); 
}); 
