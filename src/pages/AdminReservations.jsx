import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { formatPrice } from '../utils/priceUtils';
import { formatDate, formatTime } from '../utils/dateUtils';

const AdminReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

    fetchReservations();
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReservations(sorted);
      setFilteredReservations(sorted);
    } catch (error) {
      console.error('예약 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterReservations(value, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterReservations(searchTerm, status);
  };

  const filterReservations = (search, status) => {
    let filtered = reservations;

    if (search) {
      filtered = filtered.filter(r =>
        r.reservationNumber?.toLowerCase().includes(search.toLowerCase()) ||
        r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        r.customerPhone?.includes(search) ||
        r.vehicleNumber?.includes(search)
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }

    setFilteredReservations(filtered);
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await updateDoc(doc(db, 'reservations', reservationId), {
        status: newStatus
      });
      alert('상태가 변경되었습니다');
      fetchReservations();
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다');
    }
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
            <h1 className="text-xl lg:text-2xl font-bold">예약 관리</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              ← 대시보드
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-8 py-6 lg:py-8">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="예약번호, 이름, 전화번호, 차량번호 검색"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">전체 상태</option>
              <option value="confirmed">확정</option>
              <option value="cancelled">취소</option>
              <option value="completed">완료</option>
            </select>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            총 <strong>{filteredReservations.length}</strong>건의 예약
          </p>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">예약번호</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">예약자</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">전화번호</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">공항</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">플랜</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">입차 일시</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">출차 일시</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">차량정보</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">금액</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReservations.map(reservation => {
                  const startDT = getDateTime(reservation, 'startDateTime');
                  const endDT = getDateTime(reservation, 'endDateTime');

                  return (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{reservation.reservationNumber}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{reservation.customerName}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{reservation.customerPhone}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{reservation.airportName}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">{reservation.planName}</td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {startDT ? (
                          <div>
                            <div className="font-medium">{formatDate(startDT)}</div>
                            <div className="text-xs text-gray-600">{formatTime(startDT)}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {endDT ? (
                          <div>
                            <div className="font-medium">{formatDate(endDT)}</div>
                            <div className="text-xs text-gray-600">{formatTime(endDT)}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="font-medium">{reservation.vehicleNumber || '-'}</div>
                        <div className="text-xs text-gray-600">{reservation.vehicleModel || '-'}</div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{formatPrice(reservation.totalPrice)}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          value={reservation.status}
                          onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                        >
                          <option value="confirmed">확정</option>
                          <option value="cancelled">취소</option>
                          <option value="completed">완료</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReservations;