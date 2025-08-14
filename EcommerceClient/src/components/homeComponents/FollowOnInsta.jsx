import React from 'react';
// import { useInView } from 'react-intersection-observer';

function FollowOnInsta() {
  const instaImages = [
    'https://media.gettyimages.com/id/1151859015/photo/sri-lanka-portraits-icc-cricket-world-cup-2019.jpg?s=1024x1024&w=gi&k=20&c=16XFYoDmLnYHYgZvVPzAViRw_YJUqt3dlDUSyA0PuyE=',
    'https://media.gettyimages.com/id/1151859015/photo/sri-lanka-portraits-icc-cricket-world-cup-2019.jpg?s=1024x1024&w=gi&k=20&c=16XFYoDmLnYHYgZvVPzAViRw_YJUqt3dlDUSyA0PuyE=',
    'https://media.gettyimages.com/id/1151859015/photo/sri-lanka-portraits-icc-cricket-world-cup-2019.jpg?s=1024x1024&w=gi&k=20&c=16XFYoDmLnYHYgZvVPzAViRw_YJUqt3dlDUSyA0PuyE=',
    'https://media.gettyimages.com/id/1151859015/photo/sri-lanka-portraits-icc-cricket-world-cup-2019.jpg?s=1024x1024&w=gi&k=20&c=16XFYoDmLnYHYgZvVPzAViRw_YJUqt3dlDUSyA0PuyE=',
   
  ];

  // const [ref, inView] = useInView({
  //   triggerOnce: true, // Load once the section is visible
  //   threshold: 0.1,    // Trigger when 10% of the section is visible
  // });

  return (
    <div  className="container mx-auto py-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Follow Us On Instagram</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {
          instaImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <a
                  href="https://www.instagram.com/hawastore404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-semibold"
                >
                  View on Instagram
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FollowOnInsta;
