// Book Explorer - Complete Solution for GitHub & Railway
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// ==================== SIMULATED WORLD OF BOOKS DATA ====================
const worldOfBooksData = {
    books: {
        1: { 
            id: 1, 
            title: 'The Thursday Murder Club', 
            author: 'Richard Osman', 
            price: 8.99, 
            rating: 4.5,
            category: 'fiction',
            description: 'In a peaceful retirement village, four unlikely friends meet weekly to investigate unsolved murders.',
            pages: 400,
            publisher: 'Penguin',
            year: 2020,
            image: '📚',
            source: 'worldofbooks.com'
        },
        2: { 
            id: 2, 
            title: 'The Midnight Library', 
            author: 'Matt Haig', 
            price: 7.49, 
            rating: 4.7,
            category: 'fiction',
            description: 'Between life and death there is a library where Nora Seed has a chance to make things right.',
            pages: 304,
            publisher: 'Canongate',
            year: 2020,
            image: '📖',
            source: 'worldofbooks.com'
        },
        3: { 
            id: 3, 
            title: 'Sapiens: A Brief History of Humankind', 
            author: 'Yuval Noah Harari', 
            price: 18.50, 
            rating: 4.8,
            category: 'history',
            description: 'A groundbreaking narrative of humanity\'s creation and evolution.',
            pages: 512,
            publisher: 'Vintage',
            year: 2014,
            image: '📜',
            source: 'worldofbooks.com'
        },
        4: { 
            id: 4, 
            title: 'A Brief History of Time', 
            author: 'Stephen Hawking', 
            price: 15.99, 
            rating: 4.7,
            category: 'science',
            description: 'Exploring questions about the nature of time and the universe.',
            pages: 256,
            publisher: 'Bantam',
            year: 1988,
            image: '🔭',
            source: 'worldofbooks.com'
        },
        5: { 
            id: 5, 
            title: 'The Pragmatic Programmer', 
            author: 'David Thomas & Andrew Hunt', 
            price: 32.99, 
            rating: 4.6,
            category: 'technology',
            description: 'Your journey to mastery, from journeyman to master.',
            pages: 352,
            publisher: 'Addison-Wesley',
            year: 2019,
            image: '💻',
            source: 'worldofbooks.com'
        }
    },
    
    getBooksByCategory: function(category) {
        return Object.values(this.books).filter(book => book.category === category);
    },
    
    getCategories: function() {
        const categories = {};
        Object.values(this.books).forEach(book => {
            if (!categories[book.category]) {
                categories[book.category] = {
                    name: book.category.charAt(0).toUpperCase() + book.category.slice(1),
                    count: 0,
                    icon: book.image
                };
            }
            categories[book.category].count++;
        });
        return categories;
    }
};

// ==================== HTML TEMPLATES ====================
function getHomepage() {
    const categories = worldOfBooksData.getCategories();
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>Book Explorer - World of Books Scraper</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-dark: #4338ca;
            --secondary: #10b981;
            --text: #1f2937;
            --text-light: #6b7280;
            --bg: #f9fafb;
            --card-bg: #ffffff;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary), #7c3aed);
            color: white;
            padding: 2rem 1rem;
            text-align: center;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        
        .hero {
            background: var(--card-bg);
            border-radius: 1rem;
            padding: 3rem;
            margin-bottom: 3rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            text-align: center;
        }
        
        .hero h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto 2rem;
        }
        
        .features {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin: 2rem 0;
        }
        
        .feature-tag {
            background: rgba(79, 70, 229, 0.1);
            color: var(--primary);
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .category-card {
            background: var(--card-bg);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.05);
        }
        
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .category-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .category-name {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text);
        }
        
        .category-count {
            color: var(--text-light);
            margin-bottom: 1.5rem;
        }
        
        .btn {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        .footer {
            text-align: center;
            padding: 2rem;
            margin-top: 4rem;
            color: var(--text-light);
            border-top: 1px solid rgba(0,0,0,0.1);
        }
        
        .api-badge {
            background: var(--secondary);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .hero {
                padding: 2rem 1rem;
            }
            
            .hero h2 {
                font-size: 2rem;
            }
            
            .categories-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">📚 Book Explorer</div>
        <p class="subtitle">Live data from World of Books • Real web scraping simulation • Ready for production</p>
    </div>
    
    <div class="container">
        <div class="hero">
            <h2>Discover Books from World of Books</h2>
            <p>A fully functional book explorer with simulated web scraping from worldofbooks.com. Ready for GitHub deployment and Railway hosting.</p>
            
            <div class="features">
                <span class="feature-tag">✅ No npm install needed</span>
                <span class="feature-tag">🚀 Ready for Railway</span>
                <span class="feature-tag">🔗 GitHub ready</span>
                <span class="feature-tag">📱 Responsive design</span>
            </div>
            
            <a href="#categories" class="btn" style="font-size: 1.1rem; padding: 1rem 2rem;">Start Exploring Books →</a>
        </div>
        
        <h2 style="text-align: center; margin-bottom: 1rem; font-size: 2rem;">Browse Categories</h2>
        <p style="text-align: center; color: var(--text-light); margin-bottom: 3rem;">Click any category to view books scraped from World of Books</p>
        
        <div id="categories" class="categories-grid">
            ${Object.values(categories).map(cat => `
            <div class="category-card">
                <div class="category-icon">${cat.icon}</div>
                <h3 class="category-name">${cat.name}</h3>
                <div class="category-count">${cat.count} books available</div>
                <a href="/category/${cat.name.toLowerCase()}" class="btn">Browse ${cat.name} →</a>
            </div>
            `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 4rem; padding: 2rem; background: rgba(79, 70, 229, 0.05); border-radius: 1rem;">
            <h3 style="margin-bottom: 1rem;">API Endpoints</h3>
            <p style="margin-bottom: 1.5rem; color: var(--text-light);">Programmatic access to book data:</p>
            <div style="display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <a href="/api/health" class="btn" style="background: var(--secondary);">/api/health</a>
                <a href="/api/books" class="btn" style="background: #f59e0b;">/api/books</a>
                <a href="/api/categories" class="btn" style="background: #8b5cf6;">/api/categories</a>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Book Explorer • Simulated World of Books Scraper • Deploy-ready version</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem;">Push to GitHub: <code>git push origin main</code> • Deploy to Railway with one click</p>
    </div>
</body>
</html>`;
}

function getCategoryPage(category) {
    const books = worldOfBooksData.getBooksByCategory(category);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>${categoryName} Books - World of Books</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            --primary: #4f46e5;
            --text: #1f2937;
            --text-light: #6b7280;
            --bg: #f9fafb;
            --card-bg: #ffffff;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary), #7c3aed);
            color: white;
            padding: 1.5rem 1rem;
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .back-btn {
            color: white;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .page-title {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .scraper-info {
            background: rgba(255,255,255,0.2);
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            display: inline-block;
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        
        .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .book-card {
            background: var(--card-bg);
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        
        .book-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .book-image {
            background: linear-gradient(135deg, #a78bfa, #818cf8);
            padding: 2rem;
            text-align: center;
            font-size: 3rem;
        }
        
        .book-content {
            padding: 1.5rem;
        }
        
        .book-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }
        
        .book-author {
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .book-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1.5rem 0;
            padding: 1rem 0;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .rating {
            color: #f59e0b;
            font-weight: 600;
        }
        
        .price {
            color: #10b981;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .view-btn {
            display: block;
            background: var(--primary);
            color: white;
            text-align: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .view-btn:hover {
            background: #4338ca;
        }
        
        @media (max-width: 768px) {
            .books-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <a href="/" class="back-btn">← Back to Home</a>
            <h1 class="page-title">${categoryName} Books</h1>
            <div class="scraper-info">🔄 Data from World of Books • ${books.length} books found</div>
        </div>
    </div>
    
    <div class="container">
        <div class="books-grid">
            ${books.map(book => `
            <div class="book-card">
                <div class="book-image">${book.image}</div>
                <div class="book-content">
                    <h3 class="book-title">${book.title}</h3>
                    <div class="book-author">By ${book.author}</div>
                    
                    <div class="book-meta">
                        <div class="rating">${'★'.repeat(Math.floor(book.rating))} ${book.rating}/5</div>
                        <div class="price">$${book.price.toFixed(2)}</div>
                    </div>
                    
                    <a href="/book/${book.id}" class="view-btn">View Details →</a>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
}

function getBookPage(bookId) {
    const book = worldOfBooksData.books[bookId];
    if (!book) {
        return `<!DOCTYPE html>
<html>
<head>
    <title>Book Not Found</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 100px; }
        h1 { color: #ef4444; }
        a { color: #4f46e5; text-decoration: none; }
    </style>
</head>
<body>
    <h1>Book Not Found</h1>
    <p>The requested book does not exist.</p>
    <a href="/">← Back to Home</a>
</body>
</html>`;
    }
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>${book.title} - Book Explorer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            --primary: #4f46e5;
            --text: #1f2937;
            --text-light: #6b7280;
            --bg: #f9fafb;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary), #7c3aed);
            color: white;
            padding: 1.5rem 1rem;
        }
        
        .back-btn {
            color: white;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .container {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        
        .book-header {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .book-cover {
            font-size: 5rem;
            background: linear-gradient(135deg, #a78bfa, #818cf8);
            border-radius: 1rem;
            padding: 2rem;
            min-width: 180px;
            text-align: center;
        }
        
        .book-info h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .book-author {
            font-size: 1.2rem;
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .book-rating {
            color: #f59e0b;
            font-size: 1.1rem;
            margin: 1rem 0;
        }
        
        .book-price {
            font-size: 2rem;
            color: #10b981;
            font-weight: 800;
            margin: 1.5rem 0;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .detail-item {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
        }
        
        .detail-label {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-bottom: 0.25rem;
        }
        
        .detail-value {
            font-weight: 600;
        }
        
        .description {
            line-height: 1.8;
            color: var(--text);
            margin: 2rem 0;
        }
        
        .btn {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
            .book-header {
                flex-direction: column;
                text-align: center;
            }
            
            .details-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div style="max-width: 800px; margin: 0 auto;">
            <a href="/category/${book.category}" class="back-btn">← Back to ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</a>
        </div>
    </div>
    
    <div class="container">
        <div class="book-header">
            <div class="book-cover">${book.image}</div>
            <div class="book-info">
                <h1>${book.title}</h1>
                <div class="book-author">By ${book.author}</div>
                <div class="book-rating">${'★'.repeat(Math.floor(book.rating))} ${book.rating}/5 Rating</div>
                <div class="book-price">$${book.price.toFixed(2)}</div>
            </div>
        </div>
        
        <div class="details-grid">
            <div class="detail-item">
                <div class="detail-label">Category</div>
                <div class="detail-value">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pages</div>
                <div class="detail-value">${book.pages}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Publisher</div>
                <div class="detail-value">${book.publisher}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Year</div>
                <div class="detail-value">${book.year}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Source</div>
                <div class="detail-value">${book.source}</div>
            </div>
        </div>
        
        <h3>Description</h3>
        <p class="description">${book.description}</p>
        
        <a href="/" class="btn">← Back to Homepage</a>
    </div>
</body>
</html>`;
}

// ==================== SERVER ====================
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    
    // CORS headers for API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Route handling
    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getHomepage());
    }
    
    else if (pathname.startsWith('/category/')) {
        const category = pathname.split('/')[2];
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getCategoryPage(category));
    }
    
    else if (pathname.startsWith('/book/')) {
        const bookId = parseInt(pathname.split('/')[2]);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getBookPage(bookId));
    }
    
    else if (pathname === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            service: 'Book Explorer - World of Books Scraper',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            features: [
                'world_of_books_scraping',
                'responsive_design',
                'rest_api',
                'github_ready',
                'railway_deployable'
            ]
        }));
    }
    
    else if (pathname === '/api/books') {
        const category = parsedUrl.query.category;
        const books = category ? worldOfBooksData.getBooksByCategory(category) : Object.values(worldOfBooksData.books);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            source: 'worldofbooks.com (simulated)',
            count: books.length,
            books: books,
            scraped_at: new Date().toISOString()
        }));
    }
    
    else if (pathname === '/api/categories') {
        const categories = worldOfBooksData.getCategories();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            categories: Object.values(categories),
            total_categories: Object.keys(categories).length
        }));
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
<html>
<head>
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
        }
        
        .error-container {
            text-align: center;
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #ef4444;
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        a {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <p style="font-size: 1.2rem; color: #6b7280; margin-bottom: 0.5rem;">Page not found</p>
        <p style="color: #9ca3af;">The page you're looking for doesn't exist on Book Explorer.</p>
        <a href="/">← Return to Homepage</a>
    </div>
</body>
</html>`);
    }
});

// Start server
server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 BOOK EXPLORER - READY FOR GITHUB & RAILWAY');
    console.log('='.repeat(60));
    console.log(`📚 Local: http://localhost:${PORT}`);
    console.log(`🔗 GitHub: https://github.com/yourusername/book-explorer`);
    console.log(`🚂 Railway: https://railway.app/new`);
    console.log('='.repeat(60));
    console.log('✅ Simulated World of Books scraping');
    console.log('✅ Production-ready code');
    console.log('✅ Environment variable support (PORT)');
    console.log('✅ CORS enabled for APIs');
    console.log('✅ Responsive mobile design');
    console.log('='.repeat(60));
});