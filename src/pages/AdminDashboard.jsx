import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { formatPrice } from '../utils/priceUtils';
import { formatDate, formatTime } from '../utils/dateUtils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReservations: 0,
    todayReservations: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    document.body.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    const token = await currentUser.getIdTokenResult();
    if (!token.claims.admin && !token.claims.manager) {
      navigate('/admin/login');
      return;
    }

    setUser(currentUser);
    setIsAdmin(token.claims.admin === true);
    fetchData();
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const reservationsRef = collection(db, 'reservations');
      const snapshot = await getDocs(reservationsRef);
      
      const allReservations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const todayCount = allReservations.filter(r => {
        const createdDate = new Date(r.createdAt);
        return createdDate >= today;
      }).length;

      const monthlyRevenue = allReservations.filter(r => {
        const createdDate = new Date(r.createdAt);
        return createdDate >= thisMonth;
      }).reduce((sum, r) => sum + (r.totalPrice || 0), 0);

      const totalRevenue = allReservations.reduce((sum, r) => sum + (r.totalPrice || 0), 0);

      setStats({
        totalReservations: allReservations.length,
        todayReservations: todayCount,
        totalRevenue,
        monthlyRevenue
      });

      const sorted = allReservations.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentReservations(sorted.slice(0, 10));

    } catch (error) {
      console.error('데이터 조회 실패:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const getDateTime = (reservation, field) => {
    if (reservation[field]) {
      return new Date(reservation[field]);
    }
    if (field === 'startDateTime' && reservation.startTime) {
      return new Date(reservation.startTime);
    }
    if (field === 'endDateTime' && reservation.endTime) {
      return new Date(reservation.endTime);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-bold">PARKING 24 관리자</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              {isAdmin && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  최고 관리자
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600 mb-2">전체 예약</p>
            <p className="text-3xl font-bold">{stats.totalReservations}건</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600 mb-2">오늘 예약</p>
            <p className="text-3xl font-bold">{stats.todayReservations}건</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600 mb-2">이번 달 매출</p>
            <p className="text-2xl font-bold">{formatPrice(stats.monthlyRevenue)}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600 mb-2">누적 매출</p>
            <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow mb-8">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold">최근 예약</h2>
            <button
              onClick={() => navigate('/admin/reservations')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              전체 보기 →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    예약번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    예약자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    공항
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    입차일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentReservations.map(reservation => {
                  const startDT = getDateTime(reservation, 'startDateTime');

                  return (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {reservation.reservationNumber}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {reservation.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {reservation.airportName}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {startDT ? (
                          <div>
                            <div className="font-medium">{formatDate(startDT)}</div>
                            <div className="text-xs text-gray-600">{formatTime(startDT)}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {formatPrice(reservation.totalPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {reservation.status === 'confirmed' ? '확정' : 
                           reservation.status === 'cancelled' ? '취소' :
                           reservation.status === 'completed' ? '완료' : reservation.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/admin/reservations')}
              className="bg-white rounded-xl shadow p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">예약 관리</h3>
              <p className="text-sm text-gray-600">모든 예약 조회 및 관리</p>
            </button>
            <button
              onClick={() => navigate('/admin/settings')}
              className="bg-white rounded-xl shadow p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">설정</h3>
              <p className="text-sm text-gray-600">공항, 전용주차, 이용권 관리</p>
            </button>
            <div className="bg-gray-100 rounded-xl shadow p-6 text-left">
              <h3 className="font-bold text-lg mb-2">사용자 관리</h3>
              <p className="text-sm text-gray-600">관리자 권한은 set-admin.js로 부여</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;