import './home.css'
import Navbar from '../navbar/Navbar'

import React, { useEffect, useState } from 'react'

function Home() {

  const [product, setProduct] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        res = res.json().then((res) => {
          setProduct(res.products)
          console.log(res.products);
        })
      })
  }, [])


  return (
    <div>
      <Navbar heading={'Home page'} />
      <div className='px-5' style={{ paddingTop: 100, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1.8rem' }}>
        {product?.map((product, idx) => {
          return (
            <div key={idx} className="card m-2">
              <img src={product.thumbnail} className="card-img-top" alt={`image of ${product}`} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="mt-auto">
                  <p className="card-text">Price: $<span style={{ fontWeight: 500 }}>{product.price}</span></p>
                  <a href="#" className="btn btn-dark">Visit <i style={{paddingLeft:20}} className='fa fa-arrow-right' ></i></a>
                </div>
              </div>
            </div>


          );
        })}
      </div>
    </div>
  )
}

export default Home
