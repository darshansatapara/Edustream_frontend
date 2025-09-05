import { useEffect } from "react";
import { useCourseStore } from "../store/useCourseStore";
import { useQuizStore } from "../store/useQuizStore";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Star,
  Users,
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  ChevronRight,
} from "lucide-react";

const Home = () => {
  const { courses, fetchCourses } = useCourseStore();
  const { quizzes, fetchQuizzes } = useQuizStore();
  const { addToCart, buyNow } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative px-6 py-20 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
              <TrendingUp className="w-4 h-4" />
              <span>Join 10,000+ students worldwide</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
              Welcome to
              <span className="block text-yellow-300">EduStream</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Transform your learning journey with cutting-edge courses,
              interactive quizzes, and personalized progress tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/courses"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <BookOpen className="w-5 h-5" />
                Explore Courses
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button className="group bg-transparent border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-lg">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            <div className="flex justify-center gap-8 mt-12 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-80">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 py-16 max-w-7xl mx-auto space-y-20">
        {/* Featured Courses */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Featured Content
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our most sought-after courses, crafted by industry
              experts and loved by thousands of students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((c) => {
              const imageUrl = `https://picsum.photos/400/250?random=${c.id}`;
              return (
                <div
                  key={c.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={c.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {c.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {Math.floor(Math.random() * 5000) + 1000} students
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 20) + 5}h</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{c.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Math.floor(c.price * 1.5)}
                        </span>
                      </div>

                      {/* ✅ Add to Cart & Buy Now */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(c.id)}
                          className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => buyNow(c.id, navigate)}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No courses available yet.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Check back soon for exciting new content!
              </p>
            </div>
          )}
        </section>

        {/* Latest Quizzes */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Test Your Knowledge
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Quizzes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Challenge yourself with our interactive quizzes and track your
              progress in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.slice(0, 3).map((q, index) => (
              <div
                key={q.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {q.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 30) + 10} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>
                        {Math.floor(Math.random() * 20) + 5} questions
                      </span>
                    </div>
                  </div>

                  <button className="group/btn w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>Start Quiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {quizzes.length === 0 && (
            <div className="text-center py-16">
              <Award className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No quizzes available yet.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Exciting challenges coming soon!
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
