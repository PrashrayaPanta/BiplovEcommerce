import { imgUrl } from "@/library";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useInView } from "react-intersection-observer";

export default function ProductBox({ product }) {

  console.log("I am inside ProductBox component");
  console.log(product);


  const navigate = useNavigate();
  // Intersection Observer
  // const { ref, inView } = useInView({
  //   triggerOnce: true, // Load only once
  //   threshold: 0.1, // Trigger when 10% of the component is visible
  // });

  // Calculate discount percentage
  const discount = product.fakePrice
    ? Math.round(
        ((product.fakePrice - product.price) / product.fakePrice) * 100
      )
    : 0;

  return (
    <div>
      {/* Attach ref to the outer div */}
      {
        <div
          key={product.id}
          className="group relative rounded-lg transition-transform transform hover:scale-105"
        >
          <div className="aspect-square w-full bg-gray-200 relative">
            {/* Display discount badge */}
            {product.fakePrice && discount > 0 && (
              <span className="absolute top-2 left-2 bg-[#3c07ff] text-white text-xs font-semibold py-1 px-2 rounded">
                {discount}% Off
              </span>
            )}

        


                {/* console.log(Image[0].public_id) */}

                 {/* console.log(Image[0].url), */}
               <img
               alt="kjsndflk"
              src={imgUrl(product?.images?.[0]?.public_id)}
              loading="lazy"
               className="h-full w-full object-cover"
              />
    
          </div>
          <div className="p-4 flex flex-col justify-between min-h-36 bg-blue-500">
            <h3 className="text-sm font-semibold text-gray-800">
              <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            {/* </div> */}
            <div>
              <p className="text-md bg-blue-400 items-center flex gap-2 justify-center flex-wrap">
                {product.originalPrice > product.price ? (
                  <span className="line-through">Rs. {product.originalPrice}</span>
                ) : (
                  ""
                )}
                Rs. {product.price}
              </p>
            </div>
          </div>
        </div>
      }
      {
        <div className="flex justify-center mb-4 mt-20">
          <button
            onClick={() => {
              navigate(`/product/${product.slug}`);
            }}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            View Product
          </button>
        </div>
      }
    </div>
  );
}
