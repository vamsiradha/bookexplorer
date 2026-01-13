'use client'; 
 
import { useState, useEffect } from 'react'; 
 
export default function Home() { 
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() =
    fetch('/api/categories') 
      .then(res =
      .then(data =
        setCategories(data); 
        setLoading(false); 
      }) 
      .catch(() =
        setLoading(false); 
      }); 
  }, []); 
 
  return ( 
 
      {loading ? ( 
      ) : ( 
          {categories.map(cat =
          ))} 
      )} 
  ); 
} 
