import {useState, useEffect} from 'react'

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const response = await fetch('/api/products', {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include", //Recibir cookies de mi servidor
        })

        if(response.status == 200) {
          const data = await response.json()
          setProducts(data)
          console.log(data);
          
          console.log(products);
          
        } else {
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

export default Home;