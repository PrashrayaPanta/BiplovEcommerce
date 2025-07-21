const ExclusiveOffer = () => {
    return (
      <div className="flex flex-col md:flex-row items-center bg-white gap-8 p-10 rounded-lg shadow-lg max-w-6xl mx-auto">
        {/* Left Section - Image */}
        <div className="relative w-full md:w-2/5 flex justify-center">
          <img
            src="https://placehold.co/400"
            alt="Offer"
            className="w-120 h-auto object-cover rounded-lg"
          />
        </div>
  
        {/* Right Section - Offer Text & Timer */}
        <div className="w-full md:w-3/5 flex flex-col items-start md:px-16 gap-4">
          <h2 className="text-xl md:text-4xl font-bold text-[#3c07ff]">
            Exclusive offer
          </h2>
          <p className="text-gray-700 mt-2">
            Unlock the ultimate style upgrade with our exclusive offer. Enjoy savings of up to 40% off on our latest New Arrivals.
          </p>
  
          {/* Countdown Timer */}
          <div className="flex space-x-4 mt-4">
            {[
              { value: "06", label: "Days" },
              { value: "18", label: "Hours" },
              { value: "48", label: "Min" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 px-6 py-4 text-center rounded-lg shadow"
              >
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
  
          {/* Button */}
          <button className="mt-6 bg-[#3c07ff] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#444444] transition">
            BUY NOW
          </button>
        </div>
      </div>
    );
  };
  
  export default ExclusiveOffer;
  