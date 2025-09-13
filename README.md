# Ứng dụng Quản Lý Công Việc (Task Management / Project Management)

## 📌 Giới thiệu
Ứng dụng Quản Lý Công Việc là một hệ thống web app hỗ trợ **cá nhân và nhóm nhỏ** (3-5 thành viên, phù hợp cho sinh viên, nhóm dự án) trong việc:
- Quản lý công việc tập trung.
- Lập kế hoạch chi tiết và theo dõi tiến độ.
- Nhắc nhở deadline, gửi báo cáo tự động qua email.

Hệ thống tận dụng **RabbitMQ** để xử lý **mail queue** và **job background**, đảm bảo việc gửi thông báo email được nhanh chóng và ổn định ngay cả khi có nhiều người dùng.

---

## 🎯 Mục tiêu
- Cung cấp công cụ quản lý công việc cho cá nhân và team nhỏ.
- Tự động hóa thông báo và nhắc nhở thông qua email.
- Hỗ trợ phân quyền trong nhóm để làm việc hiệu quả hơn.

---

## 👥 Đối tượng người dùng
- **Cá nhân**: quản lý công việc cá nhân, học tập, dự án nhỏ.
- **Nhóm nhỏ (team project)**: phân công nhiệm vụ, theo dõi tiến độ, báo cáo cho Leader.

---

## ⚙️ Chức năng chính

### 1. Đăng nhập
- Người dùng đăng nhập bằng **email + OTP** (không cần mật khẩu phức tạp).

### 2. Công việc cá nhân (Personal Task)
- CRUD công việc cá nhân.
- Thông tin: Tên công việc, Loại công việc, Thời gian bắt đầu/kết thúc, Người tạo.
- Lập kế hoạch chi tiết cho từng công việc.
- Lập lịch nhắc nhở (trước 1h, 1 ngày, tùy chọn).
- Thông báo nhắc nhở được gửi qua email bằng **RabbitMQ Mail Queue**.
- (Mở rộng) Đính kèm file tài liệu.

### 3. Công việc nhóm (Team Task)
#### Leader
- Tạo nhóm, mời thành viên.
- Tạo, sửa, xóa task chung của team.
- Cập nhật kế hoạch & tiến độ.
- Xem báo cáo của tất cả thành viên.
- Nhận thông báo qua email khi có thành viên gửi báo cáo.

#### Member
- Xem danh sách task chung của team.
- Cập nhật báo cáo cá nhân cho task được giao.
- Nhận thông báo qua email khi Leader giao task.

⚠️ **Phân quyền chỉ áp dụng cho module Team Work.**  
Công việc cá nhân không bị ràng buộc phân quyền.

### 4. Thống kê & báo cáo
- Biểu đồ tiến độ công việc theo % hoàn thành.
- Thống kê theo cá nhân hoặc nhóm.
- (Mở rộng) Gửi báo cáo tuần/tháng qua email tự động.

---

## 📩 Vai trò của RabbitMQ + Mail Queue
- **Đăng nhập** → gửi OTP qua mail queue.
- **Task đến hạn** → job reminder chạy, đẩy email vào queue.
- **Leader giao task** → mail queue gửi thông báo cho Member.
- **Member nộp báo cáo** → mail queue gửi thông báo cho Leader.
- **Báo cáo định kỳ** → RabbitMQ xử lý job theo cron.

---

## 🛠️ Công nghệ sử dụng
- **Frontend**: ReactJS (Vite, TailwindCSS/ AntD/ MUI (chọn 1 trong 3)).  
- **Backend**: NestJS (RESTful API + WebSocket).  
- **Database**: MongoDB.  
- **Message Broker**: RabbitMQ (xử lý queue cho email & job nền).  
- **Mail Service**: SMTP (Gmail / Mailgun / SendGrid).  

---

## 🖥️ Giao diện (ReactJS)
- **Dashboard**: hiển thị task sắp đến hạn, % tiến độ.
- **Task Board (Kanban)**: Todo – In Progress – Done.
- **Form tạo task**: nhập thông tin, assign user, bật nhắc nhở.
- **Notification Center**: hiển thị danh sách thông báo.

---

## 🏗️ Kiến trúc tổng quan

```text
[ReactJS Frontend]
      |
      v
[Backend API - NestJS]
      |---> [REST API]  → CRUD Task, User, Team
      |---> [WebSocket] → Real-time Notification / Chat (mở rộng)
      |
      |---> [RabbitMQ Exchange] ---> [Mail Worker] ---> [Mail Server (SMTP)]
      |
      v
[MongoDB Database]
```
---
## Cài đặt môi trường
### 
```
----- database----
cd .\np-server\
docker-compose up -d
docker exec -it mongo1 mongosh
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
})

cfg = rs.conf()
cfg.members[0].priority = 2   // mongo1
cfg.members[1].priority = 1   // mongo2
cfg.members[2].priority = 1   // mongo3
rs.reconfig(cfg)

rs.status()


----- server -----
cd .\np-server\
npm i
docker-compose up -d 
npm run dev

----- client -----
cd .\np-client\
npm i
npm run dev

```