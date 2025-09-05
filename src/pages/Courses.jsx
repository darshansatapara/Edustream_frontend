import { useEffect, useState } from "react";
import { useCourseStore } from "../store/useCourseStore";
import { useCartStore } from "../store/useCartStore";
import { useQuizStore } from "../store/useQuizStore";
import { useNavigate } from "react-router-dom";

// Modern Courses Component
const Courses = () => {
  const { courses, fetchCourses } = useCourseStore();
  const { addToCart, buyNow } = useCartStore();
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddToCart = async (courseId) => {
    setLoadingStates(prev => ({ ...prev, [`cart-${courseId}`]: true }));
    try {
      await addToCart(courseId);
    } finally {
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [`cart-${courseId}`]: false }));
      }, 1000);
    }
  };

  const handleBuyNow = async (courseId) => {
    setLoadingStates(prev => ({ ...prev, [`buy-${courseId}`]: true }));
    try {
      await buyNow(courseId, navigate);
    } finally {
      setLoadingStates(prev => ({ ...prev, [`buy-${courseId}`]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Discover Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock your potential with our expertly crafted courses designed to accelerate your learning journey
          </p>
        </div>

        {(!courses || courses.length === 0) ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No courses available yet</h3>
            <p className="text-gray-500">New courses are being added regularly. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {courses.map((course, index) => {
              const imageUrl = `https://picsum.photos/400/300?random=${course.id}`;
              
              return (
                <div
                  key={course.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={course.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/6366f1/white?text=${encodeURIComponent(course.title.slice(0, 2))}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-indigo-600">₹{course.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {course.description || "Learn and grow with this comprehensive course designed to enhance your skills and knowledge."}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>Self-paced</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Certificate</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAddToCart(course.id)}
                        disabled={loadingStates[`cart-${course.id}`]}
                        className="flex-1 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 text-indigo-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-indigo-200 hover:border-indigo-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        {loadingStates[`cart-${course.id}`] ? (
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15" />
                            </svg>
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleBuyNow(course.id)}
                        disabled={loadingStates[`buy-${course.id}`]}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                      >
                        {loadingStates[`buy-${course.id}`] ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Buy Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Courses; 