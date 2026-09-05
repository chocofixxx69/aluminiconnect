const MOCK_USERS = [
  {
    _id: '660000000000000000000001',
    id: '660000000000000000000001',
    name: 'Bharath K',
    email: 'bharath@mamcet.com',
    password: 'alumni@123',
    role: 'alumni',
    company: 'HILIFE AI',
    designation: 'Senior Software Engineer',
    batch: '2020-2024',
    department: 'Computer Science and Engineering',
    degree: 'B.E. CSE',
    status: 'Active',
    connectionCount: '500+',
    views: 1240,
    skills: ['React.js', 'Node.js', 'System Design', 'Cloud Computing', 'AI Integration'],
    bio: 'Building scalable AI solutions and passionate about mentoring the next generation of engineers.',
    experience: [
      { title: 'Senior Software Engineer', company: 'HILIFE AI', duration: '2024 - Present', desc: 'Leading AI integration modules.' },
      { title: 'Full Stack Developer', company: 'TechInnovate Solutions', duration: '2022 - 2024', desc: 'MERN stack development.' }
    ],
    education: [
      { school: 'MAMCET', degree: 'B.E. Computer Science and Engineering', duration: '2020 - 2024' }
    ]
  },
  {
    _id: '660000000000000000000002',
    id: '660000000000000000000002',
    name: 'Student User',
    email: 'student@mamcet.com',
    password: 'alumni@123',
    role: 'student',
    batch: '2022-2026',
    department: 'Computer Science and Engineering',
    degree: 'B.E. CSE',
    status: 'Active',
    connectionCount: '120',
    views: 350,
    skills: ['Python', 'Data Structures', 'Web Development', 'SQL'],
    bio: 'Pre-final year CSE student exploring cloud and full-stack engineering opportunities.',
    education: [
      { school: 'MAMCET', degree: 'B.E. Computer Science and Engineering', duration: '2022 - 2026' }
    ]
  },
  {
    _id: '660000000000000000000003',
    id: '660000000000000000000003',
    name: 'Staff Coordinator',
    email: 'staff@mamcet.com',
    password: 'alumni@123',
    role: 'staff',
    department: 'Computer Science and Engineering',
    designation: 'Assistant Professor',
    staffRole: 'Placement Coordinator',
    status: 'Active',
    connectionCount: '350',
    views: 890,
    bio: 'Faculty placement coordinator managing alumni relations, internships, and corporate linkages.'
  },
  {
    _id: '660000000000000000000004',
    id: '660000000000000000000004',
    name: 'Admin User',
    email: 'admin@mamcet.com',
    password: 'alumni@123',
    secretKey: process.env.ADMIN_SECRET_KEY || 'MAMCET_ADMIN_2026',
    role: 'admin',
    company: 'MAMCET',
    designation: 'System Administrator',
    status: 'Active'
  }
];

const MOCK_POSTS = [
  {
    _id: '660000000000000000000010',
    userId: { _id: '660000000000000000000001', name: 'Bharath K', role: 'alumni', designation: 'Senior Software Engineer' },
    userName: 'Bharath K',
    userRole: 'Alumni (2020-2024)',
    content: 'Excited to announce that HILIFE AI is looking for fresh engineering talent for full-stack and AI internship roles! Please feel free to connect or drop a message.',
    likes: 42,
    likedBy: [],
    shares: 9,
    comments: [],
    createdAt: new Date().toISOString()
  },
  {
    _id: '660000000000000000000011',
    userId: { _id: '660000000000000000000003', name: 'Staff Coordinator', role: 'staff', designation: 'Placement Coordinator' },
    userName: 'Staff Coordinator',
    userRole: 'Staff / Placement Cell',
    content: 'Campus placement drive for 2026 batch registrations are now live! Check the Job Board for opening listings.',
    likes: 85,
    likedBy: [],
    shares: 24,
    comments: [],
    createdAt: new Date().toISOString()
  }
];

const MOCK_JOBS = [
  {
    _id: '660000000000000000000020',
    title: 'Junior Full Stack Developer',
    company: 'TechInnovate Solutions',
    location: 'Bangalore, KA (Hybrid)',
    type: 'Full-time',
    experience: '0-2 Years',
    salary: '₹6,00,000 - ₹9,00,000 PA',
    description: 'Looking for enthusiastic engineers skilled in React, Node.js, and REST APIs.',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    postedByName: 'Bharath K',
    createdAt: new Date().toISOString()
  }
];

const MOCK_EVENTS = [
  {
    _id: '660000000000000000000030',
    title: "Annual Alumni Meet '26",
    category: 'Networking',
    date: '2026-04-15',
    time: '10:00 AM',
    venue: 'MAMCET Main Auditorium',
    desc: 'Annual gathering to reconnect with classmates, network, and discuss career trends.',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f2?auto=format&fit=crop&w=1350&q=80',
    registeredBy: []
  }
];

const isDbConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

module.exports = {
  MOCK_USERS,
  MOCK_POSTS,
  MOCK_JOBS,
  MOCK_EVENTS,
  isDbConnected
};
