# 💰 Simple Expense Manager - Web App

## 📌 Mô tả dự án

**Simple Expense Manager** là ứng dụng web giúp người dùng **quản lý thu chi cá nhân** một cách dễ dàng thông qua giao diện **chatbot**.

📍 **Giai đoạn 1**:

- Ứng dụng hoạt động trên **web frontend**, dữ liệu được lưu trữ **cục bộ trên trình duyệt**.
- Giao diện tối giản, mọi thao tác đều thông qua **một màn hình chat**.
- Hệ thống tự động **phân tích tin nhắn**, xác định khoản **thu/chi**, **số tiền**, **nội dung**, và **danh mục**.
- Hỗ trợ **gợi ý nhập nhanh** từ lịch sử.
- Hiển thị **thống kê thu chi** theo tháng, tuần, danh mục.

📍 **Giai đoạn 2**:

- Tích hợp **AI** để tư vấn chi tiêu hợp lý.
- Hỗ trợ **tạo mục tiêu tài chính** theo tháng.
- Nhắc nhở chi tiêu thông minh.
- Lưu dữ liệu lên **backend & database**.

---

## 🛠 Công nghệ sử dụng

- **Next.js (TypeScript)** - Framework React hiện đại.
- **Tailwind CSS** - Thiết kế UI đơn giản & nhanh chóng.
- **indexed DB** - Lưu trữ dữ liệu cục bộ.
- **Framer Motion** - Hiệu ứng UI mượt mà.

---

## 📋 Task List

### **1️⃣ Setup dự án & Cấu hình môi trường**

- Khởi tạo dự án Next.js + TypeScript + Tailwind CSS.
- Cấu hình **ESLint**, **Prettier**, **.gitignore**.
- Đảm bảo ứng dụng chạy thành công với trang Home.

### **2️⃣ Thiết kế giao diện Chatbot**

- Tạo giao diện giống Messenger.
- Tin nhắn hiển thị theo kiểu chat (trái: bot, phải: user).
- Ô nhập tin nhắn + nút gửi.

### **3️⃣ Xử lý nhập tin nhắn & phân tích nội dung**

- Viết hàm **parseMessage()** để xác định:
  - Loại giao dịch (**Thu nhập / Chi tiêu**).
  - Số tiền.
  - Danh mục (ăn uống, mua sắm, điện nước...).
- Hiển thị cảnh báo nếu nội dung không hợp lệ.

### **4️⃣ Lưu trữ dữ liệu bằng LocalStorage**

- Viết hook **useTransactions.ts** để lưu & lấy dữ liệu.
- Định dạng JSON lưu trữ giao dịch.
- Load lại trang vẫn giữ dữ liệu cũ.

### **5️⃣ Hiển thị danh sách giao dịch**

- Tạo component `TransactionList.tsx`.
- Hiển thị danh sách giao dịch theo ngày.

### **6️⃣ Gợi ý nhập nhanh từ lịch sử**

- Khi nhập `"Mua c"` → Gợi ý `"Mua cà phê 50k"`.
- Dùng LocalStorage để lưu lịch sử nhập.

### **7️⃣ Thống kê thu chi**

- Trang `stats.tsx` hiển thị biểu đồ thống kê.
- **Biểu đồ cột**: Hiển thị thu/chi từng tháng.
- **Biểu đồ tròn**: Hiển thị tỷ lệ thu/chi theo danh mục.
- Bộ lọc theo tháng, tuần, năm.

### **8️⃣ Chỉnh sửa & Xóa giao dịch**

- Nút **✏️** để chỉnh sửa giao dịch.
- Nút **🗑️** để xóa giao dịch + cảnh báo xác nhận.

### **9️⃣ Cải thiện UI/UX**

- Thêm hiệu ứng gửi tin nhắn bằng **Framer Motion**.
- Hiển thị loading khi hệ thống đang xử lý.
- Animation khi tin nhắn xuất hiện.

---

## 📌 Tổng kết tiến độ

| **ID** | **Task**           | **Description**                             | **Status** |
| ------ | ------------------ | ------------------------------------------- | ---------- |
| 1️⃣    | Setup dự án        | Next.js + Tailwind + TS                     | ✅          |
| 2️⃣    | UI Chatbot         | Giao diện chat giống Messenger              | ✅          |
| 3️⃣    | Phân tích tin nhắn | Nhận diện thu/chi/số tiền/danh mục          | ✅          |
| 4️⃣    | indexed DB         | Lưu trữ & lấy lại dữ liệu khi tải lại trang | ⏳          |
| 5️⃣    | Hiển thị giao dịch | Danh sách giao dịch hiển thị đẹp            | ⏳          |
| 6️⃣    | Gợi ý nhập nhanh   | Hiển thị gợi ý dựa trên lịch sử nhập        | ⏳          |
| 7️⃣    | Thống kê thu/chi   | Biểu đồ thống kê thu chi theo tháng, tuần   | ⏳          |
| 8️⃣    | Chỉnh sửa & Xóa    | Sửa/xóa giao dịch                           | ⏳          |
| 9️⃣    | Cải thiện UI/UX    | Animation, loading, tối ưu UI               | ⏳          |

📌 **Ghi chú**:

- **✅**: Đã hoàn thành.
- **⏳**: Đang thực hiện.
