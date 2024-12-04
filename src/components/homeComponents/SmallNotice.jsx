import React from 'react'

function SmallNotice() {
  const notices = [
    {
      image: 'https://hawastore.shop/wp-content/uploads/2024/06/FreeShipping.png',
      title: 'Free Shipping',
      description: 'Inside Kathmandu Valley'
    },
    {
      image: 'https://hawastore.shop/wp-content/uploads/2024/06/DedicatedSupport-1.png',
      title: 'Dedicated Support',
      description: 'Quick response 24/7'
    },
    {
      image: 'https://hawastore.shop/wp-content/uploads/2024/06/MoneyBackGuarantee-1.png',
      title: 'Money-Back Guarantee',
      description: 'Worry-free shopping'
    }
  ]

  return (
    <div className="container mx-auto py-8">
      {/* Horizontal line on top */}
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center my-10">
        {notices.map((notice, index) => (
          <div key={index} className="flex flex-col items-center">
            <img 
              src={notice.image} 
              alt={notice.title} 
              className="w-20 h-auto mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">{notice.title}</h3>
            <p className="text-gray-600">{notice.description}</p>
          </div>
        ))}
      </div>
      {/* Horizontal line on bottom */}
      <hr className="border-t-2 border-gray-300 mt-6" />
    </div>
  )
}

export default SmallNotice
