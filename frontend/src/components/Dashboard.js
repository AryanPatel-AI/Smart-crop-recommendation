import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Droplets,
  Thermometer,
  Wind,
  CloudRain,
  Bell,
  ArrowLeft,
  ChevronRight,
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  History,
  Leaf
} from 'lucide-react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const API_BASE = '/api';

const Dashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('recommendation');
  const [formData, setFormData] = useState({
    soilType: 'loamy',
    temperature: 28,
    humidity: 65,
    rainfall: 120
  });
  const [recommendation, setRecommendation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warn', message: 'Heavy rain expected Thursday – delay irrigation', time: '1h ago' },
    { id: 2, type: 'info', message: 'Ideal time to plant rabi crops', time: '4h ago' }
  ]);

  useEffect(() => {
    fetchWeather();
    fetchHistory();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`${API_BASE}/weather`);
      setWeather(res.data);
    } catch (err) {
      console.error('Weather fetch error:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('History fetch error:', err);
    }
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/recommend`, formData);
      setRecommendation(res.data.data);
      fetchHistory(); // Refresh history
    } catch (err) {
      console.error('Recommendation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'recommendation', label: 'Crop Advisor', icon: <Sprout className="w-5 h-5" /> },
    { id: 'weather', label: 'Weather Analysis', icon: <CloudRain className="w-5 h-5" /> },
    { id: 'insights', label: 'Smart Insights', icon: <Zap className="w-5 h-5" /> },
    { id: 'history', label: 'Farming History', icon: <History className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#042f2e] text-slate-200 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-[#064e3b]/50 backdrop-blur-md border-b border-emerald-900/30 py-4 px-6 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1 rounded-lg">
                <Sprout className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-white">Farming Hub</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Live</span>
            </div>
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
            </button>
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg">
              AP
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Sidebar */}
        <aside className="w-64 bg-[#042f2e]/80 border-r border-emerald-900/30 hidden lg:flex flex-col py-8 px-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 font-bold'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Pro Tip</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Early planting can increase yield by up to 15% this season.
            </p>
          </div>
        </aside>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-2 flex justify-between z-40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 ${activeTab === tab.id ? 'text-emerald-500 font-bold' : 'text-slate-500'
                }`}
            >
              {tab.icon}
              <span className="text-[10px]">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10 bg-[#042f2e]">
          <div className="max-w-5xl mx-auto">

            <AnimatePresence mode="wait">
              {activeTab === 'recommendation' && (
                <motion.div
                  key="recommendation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:row items-start md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Crop Recommendation</h2>
                      <p className="text-slate-400 mt-1">Get AI-powered insights for your farming strategy.</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Form */}
                    <div className="lg:col-span-1 bg-[#064e3b]/40 rounded-3xl p-8 border border-emerald-900/30 shadow-xl backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-emerald-500" />
                        Soil & Climate Metrics
                      </h3>

                      <form onSubmit={handleRecommend} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-400 mb-2">Soil Type</label>
                          <select
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            value={formData.soilType}
                            onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                          >
                            <option value="loamy">Loamy</option>
                            <option value="clay">Clay</option>
                            <option value="sandy">Sandy</option>
                            <option value="silty">Silty</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Temp (°C)</label>
                            <input
                              type="number"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                              value={formData.temperature}
                              onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Humidity (%)</label>
                            <input
                              type="number"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                              value={formData.humidity}
                              onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-400 mb-2">Rainfall (mm)</label>
                          <input
                            type="number"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                            value={formData.rainfall}
                            onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                        >
                          {isLoading ? 'Analyzing...' : 'Get Prediction'}
                          {!isLoading && <ChevronRight className="w-5 h-5" />}
                        </button>
                      </form>
                    </div>

                    {/* Result Display */}
                    <div className="lg:col-span-2 space-y-8">
                      {!recommendation ? (
                        <div className="h-full bg-[#064e3b]/20 border-2 border-dashed border-emerald-900/30 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                          <div className="bg-[#064e3b]/40 p-6 rounded-full mb-6">
                            <Sprout className="w-12 h-12 text-slate-600" />
                          </div>
                          <h4 className="text-xl font-bold text-slate-300">No Prediction Yet</h4>
                          <p className="text-slate-500 max-w-sm mt-2">
                            Enter your soil data in the form to receive intelligent crop and fertilizer recommendations.
                          </p>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10 flex flex-col md:row items-start md:items-center justify-between gap-6">
                              <div>
                                <span className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Recommended Crop</span>
                                <h3 className="text-5xl font-black mt-2 tracking-tight">{recommendation.crop}</h3>
                                <div className="flex items-center gap-2 mt-4 bg-white/10 px-3 py-1 rounded-full w-fit">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                                  <span className="text-xs font-bold text-emerald-100 uppercase">94% Confidence Score</span>
                                </div>
                              </div>
                              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20">
                                <Leaf className="w-12 h-12 text-white" />
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#064e3b]/30 rounded-3xl p-6 border border-emerald-900/20 flex items-center gap-6">
                              <div className="bg-amber-500/10 p-4 rounded-2xl">
                                <FlaskConical className="w-8 h-8 text-amber-500" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fertilizer</h5>
                                <p className="text-lg font-bold text-white mt-1">{recommendation.fertilizer}</p>
                              </div>
                            </div>
                            <div className="bg-[#064e3b]/30 rounded-3xl p-6 border border-emerald-900/20 flex items-center gap-6">
                              <div className="bg-blue-500/10 p-4 rounded-2xl">
                                <Droplets className="w-8 h-8 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Watering Schedule</h5>
                                <p className="text-lg font-bold text-white mt-1">{recommendation.watering}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#064e3b]/40 rounded-3xl p-8 border border-emerald-900/30">
                            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-emerald-500" />
                              Smart Insights
                            </h4>
                            <div className="space-y-4">
                              {recommendation.insights.map((insight, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-[#042f2e]/60 rounded-2xl border border-emerald-900/20">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                                  <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'weather' && (
                <motion.div
                  key="weather"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Weather Analysis</h2>
                      <p className="text-slate-400 mt-1">Local environmental monitoring and forecasts.</p>
                    </div>
                  </div>

                  {weather && (
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Current Weather</p>
                              <h3 className="text-6xl font-black mt-2">{weather.current.temp}°C</h3>
                              <p className="text-xl font-medium mt-2 text-blue-50">{weather.current.condition}</p>
                            </div>
                            <CloudRain className="w-16 h-16 text-white/50" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <Droplets className="w-5 h-5 text-blue-200" />
                              <span className="text-sm font-medium">{weather.current.humidity}% Humidity</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="w-5 h-5 text-blue-200" />
                              <span className="text-sm font-medium">{weather.current.wind} km/h Wind</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 bg-[#064e3b]/30 rounded-3xl p-8 border border-emerald-900/20">
                        <h4 className="text-lg font-bold text-white mb-6">5-Day Forecast</h4>
                        <div className="space-y-6">
                          {weather.forecast.map((day) => (
                            <div key={day.day} className="flex items-center justify-between">
                              <span className="text-slate-400 font-bold w-12">{day.day}</span>
                              <div className="flex items-center gap-2 text-white">
                                {day.condition.includes('Rain') ? <CloudRain className="w-5 h-5 text-blue-400" /> : <Thermometer className="w-5 h-5 text-amber-400" />}
                                <span className="text-sm font-bold">{day.condition}</span>
                              </div>
                              <span className="text-white font-black">{day.temp}°C</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 bg-[#064e3b]/30 rounded-3xl p-8 border border-emerald-900/20">
                        <h4 className="text-lg font-bold text-white mb-6">Temperature Trends</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weather.forecast}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="day" stroke="#64748b" />
                              <YAxis stroke="#64748b" />
                              <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                                itemStyle={{ color: '#10b981' }}
                              />
                              <Line type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Smart Insights</h2>
                    <p className="text-slate-400 mt-1">Real-time alerts and actionable farming tips.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Alerts</h3>
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-6 rounded-3xl border flex gap-6 items-start ${notif.type === 'warn'
                            ? 'bg-amber-500/5 border-amber-500/20'
                            : 'bg-emerald-500/5 border-emerald-500/20'
                            }`}
                        >
                          <div className={`p-3 rounded-2xl ${notif.type === 'warn' ? 'bg-amber-500/10' : 'bg-emerald-500/10'
                            }`}>
                            {notif.type === 'warn' ? <AlertTriangle className="w-6 h-6 text-amber-500" /> : <Zap className="w-6 h-6 text-emerald-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className={`font-bold ${notif.type === 'warn' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                {notif.type === 'warn' ? 'Weather Warning' : 'System Insight'}
                              </h4>
                              <span className="text-xs text-slate-500 font-bold uppercase">{notif.time}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#064e3b]/30 rounded-3xl p-8 border border-emerald-900/20">
                      <h3 className="text-lg font-bold text-white mb-8">Irrigation Optimization</h3>
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Soil Moisture</span>
                            <span className="text-lg font-black text-white">62%</span>
                          </div>
                          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '62%' }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">Optimal range: 60% - 75%</p>
                        </div>

                        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
                          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            Next Watering
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Wednesday, 06:00 AM</span>
                            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                              Estimated
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Farming History</h2>
                    <p className="text-slate-400 mt-1">Review your past recommendations and data points.</p>
                  </div>

                  <div className="bg-[#064e3b]/30 rounded-3xl border border-emerald-900/20 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-800/50">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Soil Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Crop</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Temp</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {history.length > 0 ? history.map((item) => (
                            <tr key={item._id} className="hover:bg-slate-800/20 transition-colors">
                              <td className="px-6 py-6 text-sm text-slate-300 font-medium">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-6 text-sm text-white font-bold capitalize">
                                {item.soilType}
                              </td>
                              <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                  <span className="text-sm font-black text-white">{item.recommendedCrop}</span>
                                </div>
                              </td>
                              <td className="px-6 py-6 text-sm text-slate-300 font-medium">
                                {item.temperature}°C
                              </td>
                              <td className="px-6 py-6">
                                <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                                  Success
                                </span>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                No history records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
