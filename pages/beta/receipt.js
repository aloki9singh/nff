import React, { useState } from 'react'

const receipt = () => {
    const [items, setItems] = useState([
        { name: "Transaction Id", price: "TXN98" },
        { name: 'Amount', price: 9 },
        { name: 'Discount', price: 0 },
        { name: "Payment Time", price: "NOT FOUND" },
        { name: "Sender name", price: "HELO X" }
    ]);

    return (
        <>
            <div class="flex flex-col justify-center text-center items-center m-auto">
                <img src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg" alt="" />
                <h2 class="text-[2rem] pt-6 text-white">Payment Receipt</h2>

                <div
                    class="bg-[#25282E] rounded-xl w-full text-white text-center m-auto md:w-[50%] items-center justify-center my-8"
                >
                    <h2 class="text-[2rem] pt-6">Payment Success</h2>
                    <h2 class="text-[2rem] py-6">INR {items[1].price}</h2>

                    <hr class="w-[60%] m-auto pt-8" />

                    <div class="w-[50%] m-auto">

                        {items.map((item, i) => {
                            return (
                                <div class="flex text-white py-2 overflow-x-clip">
                                    <h2>{item.name}</h2>
                                    <h2 class="px-8">{(i == 1 || i == 2) ?  + Number(item.price)?.toFixed(2) : item.price}</h2>
                                </div>
                            )
                        }
                        )
                        }

                        <hr class="w-full pt-8 m-auto" />

                        <div class="flex text-white py-2">
                            <h2>Total</h2>
                            <h2 class="px-8">Rs{Number(items[1].price - items[2].price)?.toFixed(2)}</h2>
                        </div>
                    </div>
                    <hr class="w-[60%] m-auto pt-8" />

                    <button className='bg-[#E1348B] w-[500px] py-2 my-8'>Back To Home</button>
                </div>
            </div>
        </>
    )
}

export default receipt