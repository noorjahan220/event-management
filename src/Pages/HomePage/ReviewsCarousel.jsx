import { useState, useEffect, useCallback } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ReviewsCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [nextSlide, reviews]);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-neutral mb-4">
            What Our Attendees Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of people trust EventFlow for their event
            experiences
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-error hover:bg-error hover:text-white transition-all duration-300 border border-gray-200"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-error hover:bg-error hover:text-white transition-all duration-300 border border-gray-200"
          >
            <FaChevronRight className="text-xl" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl  p-8 lg:p-12 border border-gray-100  transition-all duration-300 h-full">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
                        <FaQuoteLeft className="text-2xl text-white" />
                      </div>
                    </div>

                    <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light text-center italic">
                      "{review.comment}"
                    </blockquote>

                    <div className="flex justify-center gap-2 mb-6">
                      {renderStars(review.rating || 5)}
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {review.userName
                            ? review.userName.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-xl text-neutral">
                          {review.userName || "Anonymous User"}
                        </h4>
                        <p className="text-gray-500">Event Attendee</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-error scale-125"
                    : "bg-gray-300 hover:bg-error/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
