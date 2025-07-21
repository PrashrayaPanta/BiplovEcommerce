const NewsletterSubscription = () => {
    return (
      <div className="flex flex-col md:flex-row md:h-[30rem] items-center bg-white rounded-lg shadow-lg max-w-6xl mx-auto border mb-8">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 h-full">
          <img
            src="https://placehold.co/400"
            alt="Newsletter"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
  
        {/* Right Section - Text & Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3c07ff] flex items-center">
            <span className="text-4xl mr-2">@</span> Subscribe to our Newsletter
          </h2>
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s.
          </p>
  
          {/* Email Input & Subscribe Button */}
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button className="bg-[#3c07ff] text-white px-6 py-3 rounded-r-lg text-lg font-semibold hover:bg-[#444444] transition">
              Subscribe
            </button>
          </div>
  
          {/* Disclaimer Text */}
          <p className="text-gray-500 text-sm">
            By completing this form, you are signing up to receive our emails. You
            can unsubscribe at any time.
          </p>
        </div>
      </div>
    );
  };
  
  export default NewsletterSubscription;
  