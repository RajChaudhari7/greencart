import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products, navigate } = useAppContext();

    return (
        <div className='mt-16 px-4'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mt-6'>
                {products.filter((product) => product.inStock).slice(0,5).map((product, index) => (
                    <div key={index} className="flex justify-center">
                        <ProductCard product={product} />
                    </div>
                ))}
                
            </div>
            <div>
                <button onClick={() => { navigate('/products'); scrollTo(0, 0); }} className='flex justify-center mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition'>See More</button>
            </div>
            
        </div>
    );
};

export default BestSeller;
