import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const {currentUser} = useAuth()
    const totalPrice = cartItems.reduce((acc,item) => acc + item.newPrice, 0).toFixed(2);
    
    const {
         register, handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    const [createOrder, {isloading,error}] = useCreateOrderMutation()
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);
    const onSubmit = async (data) => {
      
        const newOrder ={
            name: data.fullName,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
               
        }
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirm Order?",
                text: "Order Placed Successfully!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK!"
             });
             navigate('/orders');
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place an order")
        }
    }
 if (isloading) return <div>Loading...</div>
 if (error) return <div>Error: {error.message}</div>
return (
    <section> 
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
        <div>
            <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
            <p className="text-gray-500 mb-6">Items:{cartItems.length}</p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input {...register("fullName", { required: true })}
                                        type="text" name="fullName" id="fullname" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                                </div>

                                <div className="md:col-span-5">
                                    <label htmlFor="email">Email Address</label>
                                    <input {...register("email")}
                                        
                                        type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                        disabled
                                        defaultValue={currentUser?.email}
                                        placeholder="email@domain.com" />
                                </div>
                                <div className="md:col-span-5">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input {...register("phone", { required: true })}
                                        type="tel" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="address">Address / Street</label>
                                    <input {...register("address", { required: true })}
                                        type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="123 Main St" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="city">City</label>
                                    <input {...register("city", { required: true })}
                                        type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="New York" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="country">Country / region</label>
                                    {/* This input is part of a custom select/dropdown component,
                                        so direct registration might be tricky. Consider using a controlled component or a custom register.
                                        For now, I'm adding a basic register. */}
                                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input
                                            {...register("country", { required: true })}
                                            type="text" name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="state">State / province</label>
                                    {/* Similar to country, this might be part of a custom component. */}
                                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input {...register("state", { required: true })}
                                            type="text" name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                        <button  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input {...register("zipcode", { required: true })}
                                        type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="10001" />
                                </div>

                                <div className="md:col-span-5 mt-3">
                                    <div className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="billing_same"
                                            id="billing_same"
                                            className="form-checkbox"
                                            checked={isChecked} // Bind checked state
                                            onChange={(e) => setIsChecked(e.target.checked)} // Update state on change
                                        />
                                        <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                    </div>
                                </div>



                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button 
                                        disabled={!isChecked}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            

           
        </div>

        
    </div>
</div>
    </section>
  )
}

export default CheckoutPage