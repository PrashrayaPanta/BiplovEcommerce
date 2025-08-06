const InfoCard = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse max-w-6xl mx-auto gap-8">
      {/* Right Section - Image & Title (Placed first on mobile) */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 flex flex-col items-center justify-center text-center">
        <img
          src="https://placehold.co/400"
          alt="Placeholder"
          className="w-full max-w-sm object-contain"
        />
        <h2 className="text-2xl sm:text-3xl tracking-wide font-bold text-blue-600 mt-4">
          Connect with Music
        </h2>
      </div>

      {/* Left Section - Text Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Lorem Ipsum is simply dummy text of the printing and setting industry.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <p className="text-gray-600 text-sm sm:text-base mt-4">
          When an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <button className="mt-6 bg-[#3c07ff] text-white px-5 py-2 rounded-lg text-lg font-semibold hover:bg-[#444444] transition">
          Read More
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
