import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi';
import { getImgUrl } from '../../../utils/getImgUrl';
import {FiShoppingCart} from 'react-icons/fi' 
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';


const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
}
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book details</div>;

  return (
      <div className="max-w-lg shadow-md p-5 ">
           <h1 className="text-2x1 font-bold mb-6">{book.title}</h1>

           <div className=''>
              <div>
                <img
                    src={`${getImgUrl(book.coverImage)}`}
                    alt={book.title}
                    className="mb-8"
                    />
              </div>

              <div className='mb-5'>
                <p className="text-gray-700 mb-2"><strong>Author:</strong>{book.author || 'admin'}</p>
                <p className="text-gray-700 mb-4">
                  <strong>Published:</strong> {new Date(book?.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
              </div>
              <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1">
                <FiShoppingCart className=""/>
                <span>Add to cart</span>
              </button>
           </div>     
      </div>
  )
}

export default SingleBook