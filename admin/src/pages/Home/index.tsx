import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { User } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = 'week' | 'month' | 'year';
type SimpleStatsData = {
  newUsers: {
    labels: string[];
    data: number[];
  };
  monthlyRevenue: {
    labels: string[];
    data: number[];
  };
};

const SimpleDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState<SimpleStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  useEffect(() => {
    fetchStatsData();
  }, [timeRange]);

  const fetchStatsData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/users/plain');
      const data = await response.json();
      const sortedData = data.sort((a: User, b: User) => {
        const dateA = new Date(a.createat);
        const dateB = new Date(b.createat);
        return dateA.getTime() - dateB.getTime();
      });

      const usersByDate = sortedData.reduce((acc: Record<string, number>, user: User) => {
        const date = new Date(user.createat);
        const key = date.toISOString().split('T')[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const calculateGrowthData = () => {
        const now = new Date();
        const dates = Object.keys(usersByDate).sort();

        if (timeRange === 'week') {
          return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now);
            date.setDate(date.getDate() - (6 - i));
            const key = date.toISOString().split('T')[0];
            return usersByDate[key] || 0;
          });
        } else if (timeRange === 'month') {
          const weeks = [0, 0, 0, 0];
          dates.forEach(date => {
            const d = new Date(date);
            if (d.getMonth() === now.getMonth()) {
              const weekIndex = Math.floor(d.getDate() / 7);
              weeks[weekIndex] += usersByDate[date];
            }
          });
          return weeks;
        } else {
          const months = Array(12).fill(0);
          dates.forEach(date => {
            const d = new Date(date);
            if (d.getFullYear() === now.getFullYear()) {
              months[d.getMonth()] += usersByDate[date];
            }
          });
          return months;
        }
      };

      const growthData = calculateGrowthData();
      setTimeout(() => {
        setStatsData({
          newUsers: {
            labels: timeRange === 'week'
              ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
              : timeRange === 'month'
                ? Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`)
                : ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            data: timeRange === 'week'
              ? growthData
              : timeRange === 'month'
                ? growthData
                : growthData
          },
          monthlyRevenue: {
            labels: timeRange === 'week'
              ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
              : timeRange === 'month'
                ? Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`)
                : ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            data: timeRange === 'week'
              ? [1200, 980, 1350, 1500, 1100, 1800, 2200]
              : timeRange === 'month'
                ? [5000, 6200, 7500, 8800]
                : [12000, 15000, 14500, 16800, 18500, 22000, 24500, 23000, 25500, 28000, 32000, 35000]
          }
        });

        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };

  const chartTextColor = 'rgba(0, 0, 0, 0.7)';
  const chartGridColor = 'rgba(0, 0, 0, 0.1)';

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: chartTextColor
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: chartTextColor
        },
        grid: {
          color: chartGridColor,
          drawBorder: false
        }
      }
    }
  };

  const barOptions: ChartOptions<'bar'> = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Người Dùng Mới',
        color: chartTextColor,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  const lineOptions: ChartOptions<'line'> = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Doanh Thu Tháng',
        color: chartTextColor,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  const summaryCards = [
    {
      title: 'Người Dùng Mới',
      value: timeRange === 'week' ? '77' : timeRange === 'month' ? '210' : '1,850',
      change: '+8.3%',
      positive: true
    },
    {
      title: 'Doanh Thu Tháng',
      value: timeRange === 'week' ? '10,130,000₫' : timeRange === 'month' ? '27,500,000₫' : '245,300,000₫',
      change: '+15.2%',
      positive: true
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Thống Kê</h2>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${timeRange === 'week'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tuần
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${timeRange === 'month'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tháng
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${timeRange === 'year'
              ? 'bg-[#317db4] text-white'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Năm
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <h3 className="text-xl font-bold mt-1 text-gray-800">{card.value}</h3>
            <div className={`flex items-center mt-2 text-sm ${card.positive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{card.change}</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.positive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
              </svg>
              <span className="ml-1 text-gray-500">so với kỳ trước</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="h-64">
            {statsData?.newUsers && (
              <Bar
                options={barOptions}
                data={{
                  labels: statsData.newUsers.labels,
                  datasets: [
                    {
                      label: 'Người dùng mới',
                      data: statsData.newUsers.data,
                      backgroundColor: 'rgba(79, 70, 229, 0.7)',
                      borderRadius: 4,
                      barThickness: timeRange === 'week' ? 20 : timeRange === 'month' ? 40 : 30,
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="h-64">
            {statsData?.monthlyRevenue && (
              <Line
                options={lineOptions}
                data={{
                  labels: statsData.monthlyRevenue.labels,
                  datasets: [
                    {
                      label: 'Doanh thu (nghìn đồng)',
                      data: statsData.monthlyRevenue.data,
                      borderColor: 'rgb(16, 185, 129)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      tension: 0.3,
                      fill: true,
                      borderWidth: 2,
                      pointRadius: 3,
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;