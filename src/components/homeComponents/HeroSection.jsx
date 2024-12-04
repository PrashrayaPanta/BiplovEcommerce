import React from 'react'

function HeroSection() {
  return (
    <div 
      className="w-full h-[1/2vw] bg-cover bg-center flex items-center max-h-[28rem] min-h-[24rem]" 
      style={{ backgroundImage: "url('https://hawastore.shop/wp-content/uploads/2024/06/KZEDXProBackground9.png')" }}
    >
      <div className="lg:w-1/2 md:p-24 w-3/4 p-6">
        <h1 className="xl:text-6xl text-4xl md:text-xl font-bold">Step into the world of Audiophile with KZ-EDX Pro IEM</h1>
        <p className="mt-4 text-xl text-gray-500">Available on Hawa Store</p>
        <button className="tracking-wider mt-6 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-gray-600 transition">
          View Product
        </button>
      </div>
    </div>
  )
}

export default HeroSection
