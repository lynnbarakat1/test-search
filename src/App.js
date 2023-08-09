import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([]);
  const [productPopup, setProductPopup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9

  useEffect(() => {
    Products();
  }, []);

  const Products = async () => {
    try {
      const response = await fetch(
        'https://api.manoapp.com/api/v1/users/products/whats_new',
        {
          headers: {
            StoreID: '4',
            Authorization: 'f44a4aabfc5992514d262d7f517327e7',
            UserAddressID: '60877',
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.querySelector('body').style.overflow = productPopup ? 'hidden' : null;
    document.querySelector('html').style.overflow = productPopup ? 'hidden' : null;
  }, [productPopup]);

  return (

    <>
      <div className='container py-5'>
        <div className='text-center'>
          <h1 className='mb-5'>Products</h1>
        </div>
        <div className='row'>
          {
            products?.items
              ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((product) => (
                <div className='col-lg-4 col-sm-6 pb-4 product' onClick={() => setProductPopup(product)} key={product.id}>
                  <div className='ratio ratio-1x1 product-img'>
                    <img className='contain' src={product.images[0].small} alt={product.title} />
                  </div>
                  <div className='d-flex pt-5'>
                    <h5 className='pe-3 fs flex-grow-1'>{product.title}</h5>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className='text-center mb-3'>
        <button className=' me-2' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <button className='' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= products?.items?.length}>Next</button>
      </div>

      <div className={"popup " + (productPopup ? " " : " hide")}>
        <div className='row h-100 flex-column d-flex justify-content-center align-items-center'>
          <div className='col-lg-7 col-md-8 col-sm-10 col-10'>
            <div className='row white-bg  position-relative'>
              <div className='close-icon text-end' onClick={() => setProductPopup(null)}>
                <p>x</p>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='ratio ratio-1x1 product-img'>
                  <img className='contain' src={productPopup?.images[0]?.large} alt={productPopup?.title} />
                </div>
              </div>
              <div className='col-sm-6 col-12 pt-sm-0 pt-4'>
                <h5 className='pe-3 fs pb-4'>{productPopup?.title}</h5>
                <p className='mb-0'>Price: {productPopup?.price}</p>
                <p className='mb-0'>{productPopup?.categories[0].class_name}: {productPopup?.categories[0].category_type}</p>
                <p>Quantity: {productPopup?.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
