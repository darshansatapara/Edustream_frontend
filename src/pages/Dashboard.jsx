import { useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";

const Dashboard = () => {
  const { stats, fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Enrolled Courses</h3>
          <p className="text-2xl">{stats.enrolledCourses || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Completed Quizzes</h3>
          <p className="text-2xl">{stats.completedQuizzes || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Progress</h3>
          <p className="text-2xl">{stats.progress || 0}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
