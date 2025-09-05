import { useEffect, useState } from "react";
import { useQuizStore } from "../store/useQuizStore";
import { 
  Play, 
  Clock, 
  Trophy, 
  Users, 
  Star, 
  Filter, 
  Search,
  Award,
  Target,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Brain,
  Zap
} from "lucide-react";

const Quizzes = () => {
  const { quizzes, fetchQuizzes } = useQuizStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    let filtered = quizzes;
    
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      // Assuming quizzes have categories - adapt as needed
      filtered = filtered.filter(quiz => 
        quiz.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredQuizzes(filtered);
  }, [quizzes, searchTerm, selectedCategory]);

  const categories = ["all", "technology", "science", "mathematics", "language", "business"];
  
  const difficultyColors = {
    easy: "from-green-400 to-emerald-500",
    medium: "from-yellow-400 to-orange-500",
    hard: "from-red-400 to-pink-500"
  };

  const getDifficulty = () => {
    const difficulties = ["easy", "medium", "hard"];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  };

  const getRandomStats = () => ({
    duration: Math.floor(Math.random() * 30) + 10,
    questions: Math.floor(Math.random() * 25) + 10,
    participants: Math.floor(Math.random() * 10000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1)
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="relative px-6 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Brain className="w-4 h-4" />
              <span>Challenge Your Mind</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 leading-tight">
              Interactive
              <span className="block text-yellow-300">Quizzes</span>
            </h1>
            
            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Test your knowledge, compete with others, and track your learning progress with our engaging quiz collection.
            </p>
            
            <div className="flex justify-center gap-8 text-purple-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{quizzes.length}+</div>
                <div className="text-sm opacity-80">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">25k+</div>
                <div className="text-sm opacity-80">Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white capitalize"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((q) => {
            const stats = getRandomStats();
            const difficulty = getDifficulty();
            const imageUrl = `https://picsum.photos/400/250?random=${q.id + 100}`;
            
            return (
              <div
                key={q.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={q.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`bg-gradient-to-r ${difficultyColors[difficulty]} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg capitalize`}>
                      {difficulty}
                    </span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{stats.rating}</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>{stats.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{stats.duration}m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {q.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    Test your knowledge and challenge yourself with this comprehensive quiz designed to enhance your learning experience.
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{stats.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Popular</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="group/btn flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      <span>Start Quiz</span>
                    </button>
                    
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                      <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${difficultyColors[difficulty]} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && quizzes.length > 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No quizzes found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search terms or category filter.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* No quizzes available */}
        {quizzes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <Zap className="w-16 h-16 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No quizzes available yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              We're working hard to bring you exciting quizzes. Check back soon for mind-challenging content!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Award className="w-5 h-5" />
                Create Quiz
              </button>
              <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;