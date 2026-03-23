# SE NPRU TaskFlow Mini

ระบบจัดการงานส่วนบุคคล Fullstack

## ฟีเจอร์

- สมัครสมาชิก/เข้าสู่ระบบ
- จัดการงาน (สร้าง/แก้ไข/ลบ/ดู)
- UI สวยด้วย daisyUI และ Tailwind CSS
- State management ด้วย Redux Toolkit
- Authentication ด้วย JWT

## เทคโนโลยี

- Frontend: React, Redux Toolkit, React Router, Tailwind CSS, daisyUI
- Backend: Node.js, Express, MongoDB, JWT
- Deploy: Vercel (Frontend), Render (Backend)

## การติดตั้งและรัน

### Backend

1. cd server
2. npm install
3. คัดลอก .env.example เป็น .env และตั้งค่า
4. npm run dev

### Frontend

1. cd client
2. npm install
3. คัดลอก .env.example เป็น .env และตั้งค่า VITE_API_URL
4. npm run dev

## Deploy

- Push โค้ดขึ้น GitHub
- Backend: Deploy บน Render, ตั้งค่า environment variables
- Frontend: Deploy บน Vercel, ตั้งค่า VITE_API_URL เป็น URL ของ backend

## เหตุผลการเลือก Redux

Redux Toolkit ช่วยจัดการ state ระดับแอปได้ง่าย, มี async thunk สำหรับ API calls, และมี devtools สำหรับ debug

## ภาพหน้าจอ

(เพิ่มภาพ)

## API Endpoints

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/me
- POST /api/v1/tasks
- GET /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id