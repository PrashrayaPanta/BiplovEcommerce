import { categories } from '../../../public/jsons/categories'
import React from 'react'

function HomeCategoryBox() {
  return (
    <div className="mx-auto py-24 w-4/5 md:w-7/10 lg:w-3/5">
        <div className="text-center text-2xl font-semibold mb-6">Shop By Categories</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.name} className="group border border-gray-300 rounded-lg shadow-md hover:shadow-2xl transition duration-300">
            <a href={cat.link} className="block">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-auto object-cover rounded-md transition-transform duration-300 "
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCategoryBox
