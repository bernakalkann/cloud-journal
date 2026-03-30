require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'DUMMY',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'DUMMY'
  }
});
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory data
let tasks = [
  { id: 1, title: 'Bulut Bilişim projesi araştır', completed: true },
  { id: 2, title: 'React ile Frontend yaz', completed: false },
  { id: 3, title: 'AWS S3 de host et', completed: false },
  { id: 4, title: "Checklist: Projenin 'Anti-Gravity' Modülünü Entegre Et", completed: false }
];
let nextId = 5;

let diaries = [
  { id: 1, content: 'Dear diary, bugün bulut bilişim projemin yeni estetik arayüzüne başladım. Harika gidiyor! ✨', date: new Date().toISOString() }
];
let nextDiaryId = 2;

// GET tüm görevleri al
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST yeni görev ekle
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH görevin durumunu değiştir (tamamlandı/tamamlanmadı)
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  res.json(task);
});

// DELETE görevi sil
app.delete('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx !== -1) {
    const deletedTask = tasks.splice(idx, 1)[0];
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// --- AUTHENTICATION ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'cloud123') {
    res.json({ message: 'Başarılı', token: 'cloud-journal-auth-token-999' });
  } else {
    res.status(401).json({ message: 'Hatalı kullanıcı adı veya şifre!' });
  }
});

// --- DIARY ENDPOINTS ---

// GET tüm günlükleri al
app.get('/api/diary', (req, res) => {
  res.json(diaries);
});

// POST yeni günlük ekle (AWS S3 Destekli)
app.post('/api/diary', upload.single('photo'), async (req, res) => {
  try {
    const content = req.body.content;
    const date = req.body.date;
    if (!content && !req.file) {
      return res.status(400).json({ error: 'Content or photo is required' });
    }
    
    let photoUrl = null;
    
    if (req.file) {
      if (!process.env.AWS_BUCKET_NAME || process.env.AWS_ACCESS_KEY_ID === 'DUMMY') {
        console.warn("⚠️ AWS S3 Keys missing. Simulating photo upload for local test.");
        photoUrl = "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg"; // Space placeholder 
      } else {
        const fileKey = `uploads/${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        };
        await s3Client.send(new PutObjectCommand(params));
        photoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
      }
    }

    const newDiary = { 
      id: nextDiaryId++, 
      content: content || '[Sadece Fotoğraf]', 
      photoUrl,
      date: date || new Date().toISOString() 
    };
    diaries.push(newDiary);
    res.status(201).json(newDiary);
  } catch(err) {
    console.error('S3 Upload Error:', err);
    res.status(500).json({ error: 'Fotoğraf S3 e yüklenemedi!' });
  }
});

// DELETE günlüğü sil
app.delete('/api/diary/:id', (req, res) => {
  const idx = diaries.findIndex(d => d.id === parseInt(req.params.id));
  if (idx !== -1) {
    const deletedDiary = diaries.splice(idx, 1)[0];
    res.json(deletedDiary);
  } else {
    res.status(404).json({ error: 'Diary entry not found' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`✅ Backend server running on http://localhost:${port}`);
});
