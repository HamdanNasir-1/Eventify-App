#  Campus Event & Hackathon Management System

A full‑stack MERN web application to manage college events and hackathons with QR‑based entry and admin approval workflow.

---

##  Live Features

###  Authentication

* Secure login & signup (Admin / Student roles)
* Auto logout on tab close & 5 min inactivity

###  Student Features

* View all events
* Apply for individual events
* Register teams for hackathons 
* View approved QR tickets 
* Premium full‑screen ticket view

###  Admin Features

* Create / Edit / Delete events
* Approve or reject registrations
* QR scanner for event entry 
* Attendance dashboard 

---

##  Special Features

###  QR Ticket System

* Unique ticket generated on approval
* QR scanned at entry gate
* Duplicate entry prevention

###  Hackathon Mode

Supports two event types:

| Event Type | Registration                       |
| ---------- | ---------------------------------- |
| Individual | Single student applies             |
| Team       | Team leader registers team members |

Hackathon features:

* Team name + members list
* One QR ticket per team
* Team attendance tracking

###  Security

* JWT authentication
* Protected routes
* Idle auto logout

---

##  Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* React Router
* Axios
* html5‑qrcode

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

---

##  Database Models

### User

* name
* email
* password
* role (admin / student)

### Event

* title, description, date, time, venue
* type (individual / team)
* maxSeats / maxTeams
* teamSizeLimit

### Registration

* studentId / teamLeaderId
* teamName + members[]
* status (pending / approved)
* ticketId
* attendance

---

##  Installation

### Clone Repo

```
git clone https://github.com/HamdanNasir-1/Event-management-system.git
```

### Backend Setup

```
cd backend
npm install
npm run dev
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

##  Environment Variables

Create `.env` in backend:

```
MONGO_URI=mongodb+srv://hamdanas_db_user:HamdanNasirAl%40123@campusevents.rfaoc5e.mongodb.net/campusevents?retryWrites=true&w=majority
JWT_SECRET=supersecretkey
PORT=5000
```

---

##  Future Improvements

* Email notifications
* Event analytics dashboard
* Payment integration
* Multi‑admin support

---

## 👨 Author

**Hamdan**

**Shoaib**

**Arsalan**

Built as a full‑stack college project & portfolio application.
