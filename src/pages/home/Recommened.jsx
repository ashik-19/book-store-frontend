import React from 'react'
import BookCard from './books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommened = () => {
    
    
  const {data: books = []} = useFetchAllBooksQuery();
    return (
       <div className='py-16'>
        <h2 className='text-3x1 font-semibold mb-6'>Recommended for you</h2>


           <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

         {
          books.length > 0 && books.slice(8,18).map((book, index) => (
               <SwiperSlide key={index}>
                  <BookCard book={book}/>
                </SwiperSlide> 
          ))
         }

  
      </Swiper>
       </div>
    )
}

export default Recommened