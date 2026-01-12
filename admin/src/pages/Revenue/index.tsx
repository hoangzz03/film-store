import React from 'react';

const RevenueDashboard = () => {
  // Dữ liệu mẫu
  const revenueData = [
    { id: 1, date: '01/03/2025', description: 'Doanh thu bán hàng', amount: 8500000 },
    { id: 2, date: '05/03/2025', description: 'Doanh thu dịch vụ', amount: 3200000 },
    { id: 3, date: '10/03/2025', description: 'Doanh thu bán hàng online', amount: 4750000 },
    { id: 4, date: '15/03/2025', description: 'Doanh thu tư vấn', amount: 2100000 },
    { id: 5, date: '18/03/2025', description: 'Doanh thu bán hàng', amount: 5300000 },
  ];

  // Tính tổng doanh thu
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-normal text-gray-900">Thống kê doanh thu</h1>
        <p className="text-sm text-gray-500 mt-1">Tháng 3/2025</p>
      </header>

      <div className="mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-normal text-gray-900">Tổng quan</h2>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng doanh thu</p>
              <p className="text-3xl font-light">{totalRevenue.toLocaleString()} VNĐ</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Số giao dịch</p>
              <p className="text-3xl font-light">{revenueData.length}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Doanh thu trung bình/giao dịch</p>
              <p className="text-3xl font-light">
                {Math.round(totalRevenue / revenueData.length).toLocaleString()} VNĐ
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Cập nhật lần cuối</p>
              <p className="text-3xl font-light">20/03/2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-normal text-gray-900">Chi tiết doanh thu</h2>
          <button className="text-sm text-gray-600 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors">
            Xuất báo cáo
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenueData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{item.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 text-right">{item.amount.toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-900" colSpan={2}>Tổng cộng</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 text-right">{totalRevenue.toLocaleString()} VNĐ</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-normal text-gray-900">Phân tích nhanh</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-4">Doanh thu cao nhất</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {revenueData.sort((a, b) => b.amount - a.amount)[0].description}
                </p>
                <p className="text-sm text-gray-500">
                  {revenueData.sort((a, b) => b.amount - a.amount)[0].date}
                </p>
              </div>
              <p className="text-xl font-light">
                {revenueData.sort((a, b) => b.amount - a.amount)[0].amount.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-4">Doanh thu thấp nhất</h3>
            <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {revenueData.sort((a, b) => a.amount - b.amount)[0].description}
              </p>
              <p className="text-sm text-gray-500">
                {revenueData.sort((a, b) => a.amount - b.amount)[0].date}
              </p>
              <p className="text-xl font-light">
                {revenueData.sort((a, b) => a.amount - b.amount)[0].amount.toLocaleString()} VNĐ
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-normal text-gray-900">Thông tin thanh toán</h2>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Tổng doanh thu gộp</p>
              <p className="text-sm font-medium">{totalRevenue.toLocaleString()} VNĐ</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Thuế GTGT (10%)</p>
              <p className="text-sm font-medium">{Math.round(totalRevenue * 0.1).toLocaleString()} VNĐ</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Phí dịch vụ (2%)</p>
              <p className="text-sm font-medium">{Math.round(totalRevenue * 0.02).toLocaleString()} VNĐ</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <p className="text-base font-medium">Doanh thu ròng</p>
                <p className="text-base font-medium">
                  {Math.round(totalRevenue * 0.88).toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2025 Công ty của bạn. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default RevenueDashboard;
              