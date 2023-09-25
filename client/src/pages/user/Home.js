import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Product from '../../components/Product'

import Footer from '../../components/Footer'
import Hero from '../../components/Hero';
import Recommented from '../../components/Recommented';

const Home = () => {
  const { products } = useContext(ProductContext)
  const [category, setCategory] = useState('All')

  const handleClick = (e) => {
    setCategory(e.target.value)
  }

  let filteredProducts = products.filter((product) => {
    return category==='All' || product.categories === category
  });

  return <div>
    <Hero />
    <section className='py-9'>
      <div className='container mx-auto'>
      <Recommented handleClick={handleClick} selectedCategory={category}/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl: gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {filteredProducts.map(product => {
            return <Product product={product} key={product._id}/>
          })}
        </div>
      </div>
    </section>
    <Footer />
  </div>;
};

export default Home;
