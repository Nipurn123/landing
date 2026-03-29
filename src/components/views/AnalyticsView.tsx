import { useState, useEffect } from 'react';
import { Shield, Users, MousePointer, Eye, Globe, TrendingUp, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface VisitorStats {
  total_visitors: number;
  unique_visitors: number;
  total_page_views: number;
  total_clicks: number;
  avg_session_duration: number;
}

interface CountryData {
  country: string;
  country_code: string;
  visitor_count: number;
  percentage: number;
}

interface RegionData {
  region: string;
  region_code: string;
  visitor_count: number;
  percentage: number;
}

interface ClickSummary {
  element_type: string;
  element_text: string;
  click_count: number;
  unique_clickers: number;
}

interface DailyData {
  date: string;
  visitors: number;
  page_views: number;
  clicks: number;
}

function StatCard({ icon: Icon, title, value, subtitle, color }: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white/60 text-sm font-mono uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color = 'bg-emerald-500' }: { value: number; max: number; color?: string }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function AnalyticsView() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [clicks, setClicks] = useState<ClickSummary[]>([]);
  const [daily, setDaily] = useState<DailyData[]>([]);
  const [days, setDays] = useState(30);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const adminSecret = import.meta.env.VITE_ADMIN_SECRET || 'admin123';
    if (password === adminSecret) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET || 'admin123'}`
        };

        const [statsRes, countriesRes, clicksRes, dailyRes] = await Promise.all([
          fetch(`${API_BASE}/api/analytics/stats?days=${days}`, { headers }),
          fetch(`${API_BASE}/api/analytics/by-country?days=${days}`, { headers }),
          fetch(`${API_BASE}/api/analytics/clicks?days=${days}`, { headers }),
          fetch(`${API_BASE}/api/analytics/daily?days=${days}`, { headers }),
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }
        if (countriesRes.ok) {
          const data = await countriesRes.json();
          setCountries(data || []);
        }
        if (clicksRes.ok) {
          const data = await clicksRes.json();
          setClicks(data || []);
        }
        if (dailyRes.ok) {
          const data = await dailyRes.json();
          setDaily(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, days]);

  useEffect(() => {
    if (!isAuthenticated || !selectedCountry) return;

    const fetchRegions = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/analytics/by-region?country=${selectedCountry}&days=${days}`,
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET || 'admin123'}`
            }
          }
        );
        if (res.ok) {
          const data = await res.json();
          setRegions(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch regions:', err);
      }
    };

    fetchRegions();
  }, [isAuthenticated, selectedCountry, days]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">Analytics Dashboard</h1>
            <p className="text-white/60 text-center mb-8">Enter admin password to continue</p>
            
            <form onSubmit={handleAuth}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-white/60 text-sm mt-1">Track visitor behavior and engagement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value={7} className="bg-[#0a0a0a]">Last 7 days</option>
              <option value={30} className="bg-[#0a0a0a]">Last 30 days</option>
              <option value={90} className="bg-[#0a0a0a]">Last 90 days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Users}
                title="Unique Visitors"
                value={stats?.unique_visitors || 0}
                subtitle={`${stats?.total_visitors || 0} total visits`}
                color="bg-gradient-to-br from-blue-500 to-indigo-500"
              />
              <StatCard
                icon={Eye}
                title="Page Views"
                value={stats?.total_page_views || 0}
                color="bg-gradient-to-br from-purple-500 to-pink-500"
              />
              <StatCard
                icon={MousePointer}
                title="Click Events"
                value={stats?.total_clicks || 0}
                color="bg-gradient-to-br from-orange-500 to-red-500"
              />
              <StatCard
                icon={TrendingUp}
                title="Avg. Session"
                value={stats?.avg_session_duration ? `${Math.round(stats.avg_session_duration / 60)}m` : '0m'}
                subtitle={stats?.avg_session_duration ? `${Math.round(stats.avg_session_duration)}s` : ''}
                color="bg-gradient-to-br from-emerald-500 to-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">Visitors by Country</h2>
                </div>
                
                {countries.length === 0 ? (
                  <p className="text-white/40 text-center py-8">No country data yet</p>
                ) : (
                  <div className="space-y-4">
                    {countries.slice(0, 10).map((country, i) => (
                      <button
                        key={country.country_code || i}
                        onClick={() => setSelectedCountry(country.country_code)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          selectedCountry === country.country_code
                            ? 'bg-emerald-500/20 border border-emerald-500/30'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{country.country}</span>
                          <span className="text-white/60 text-sm">{country.visitor_count}</span>
                        </div>
                        <ProgressBar value={country.visitor_count} max={countries[0]?.visitor_count || 1} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Daily Activity</h2>
                </div>
                
                {daily.length === 0 ? (
                  <p className="text-white/40 text-center py-8">No daily data yet</p>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {daily.slice(0, 14).map((day) => (
                      <div key={day.date} className="p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-sm font-mono">{day.date}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-white font-semibold">{day.visitors}</p>
                            <p className="text-white/40 text-xs">visitors</p>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{day.page_views}</p>
                            <p className="text-white/40 text-xs">views</p>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{day.clicks}</p>
                            <p className="text-white/40 text-xs">clicks</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedCountry && regions.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Regions in {countries.find(c => c.country_code === selectedCountry)?.country}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {regions.map((region, i) => (
                    <div key={region.region_code || i} className="p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{region.region}</span>
                        <span className="text-white/60 text-sm">{region.visitor_count}</span>
                      </div>
                      <ProgressBar value={region.visitor_count} max={regions[0]?.visitor_count || 1} color="bg-purple-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <MousePointer className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">Top Clicked Elements</h2>
              </div>
              
              {clicks.length === 0 ? (
                <p className="text-white/40 text-center py-8">No click data yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 text-sm font-mono uppercase tracking-wider pb-3">Type</th>
                        <th className="text-left text-white/60 text-sm font-mono uppercase tracking-wider pb-3">Text</th>
                        <th className="text-right text-white/60 text-sm font-mono uppercase tracking-wider pb-3">Clicks</th>
                        <th className="text-right text-white/60 text-sm font-mono uppercase tracking-wider pb-3">Unique</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clicks.slice(0, 20).map((click, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3">
                            <span className="px-2 py-1 bg-white/10 rounded text-white/80 text-sm font-mono">
                              {click.element_type}
                            </span>
                          </td>
                          <td className="py-3 text-white/80 max-w-md truncate">
                            {click.element_text || '—'}
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-white font-semibold">{click.click_count}</span>
                          </td>
                          <td className="py-3 text-right text-white/60">
                            {click.unique_clickers}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
