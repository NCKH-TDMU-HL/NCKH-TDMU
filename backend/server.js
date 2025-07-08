const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Chỉ import schema
const WritingSchema = require("./models/Writing").schema;
const ListeningSchema = require("./models/Listening").schema;
const MultipleChoiceSchema = require("./models/MultipleChoice").schema;
const MatchingSchema = require("./models/Matching").schema;
const User = require("./models/User");
const TopicByClass = require("./models/TopicByClass");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Tạo kết nối 
const connClass1 = mongoose.createConnection("mongodb://localhost:27017/Class1");
const connClass2 = mongoose.createConnection("mongodb://localhost:27017/Class2");
const connClass3 = mongoose.createConnection("mongodb://localhost:27017/Class3");
const connClass4 = mongoose.createConnection("mongodb://localhost:27017/Class4");
const connClass5 = mongoose.createConnection("mongodb://localhost:27017/Class5");
mongoose.connect("mongodb://localhost:27017/User");


// Tạo model tương ứng cho từng DB
const Models = {  
  class1: {
    Writing: connClass1.model("Writing", WritingSchema),
    Listening: connClass1.model("Listening", ListeningSchema),
    Matching: connClass1.model("Matching", MatchingSchema),
    MultipleChoice: connClass1.model("MultipleChoice", MultipleChoiceSchema),
  },
  class2: {
    Writing: connClass2.model("Writing", WritingSchema),
    Listening: connClass2.model("Listening", ListeningSchema),
    Matching: connClass2.model("Matching", MatchingSchema),
    MultipleChoice: connClass2.model("MultipleChoice", MultipleChoiceSchema),
  },
  class3: {
    Writing: connClass3.model("Writing", WritingSchema),
    Listening: connClass3.model("Listening", ListeningSchema),
    Matching: connClass3.model("Matching", MatchingSchema),
    MultipleChoice: connClass3.model("MultipleChoice", MultipleChoiceSchema),
  },
  class4: {
    Writing: connClass4.model("Writing", WritingSchema),
    Listening: connClass4.model("Listening", ListeningSchema),
    Matching: connClass4.model("Matching", MatchingSchema),
    MultipleChoice: connClass4.model("MultipleChoice", MultipleChoiceSchema),
  },
  class5: {
    Writing: connClass5.model("Writing", WritingSchema),
    Listening: connClass5.model("Listening", ListeningSchema),
    Matching: connClass5.model("Matching", MatchingSchema),
    MultipleChoice: connClass5.model("MultipleChoice", MultipleChoiceSchema),
  },
};

// Tạo route cho các class
["class1", "class2", "class3", "class4", "class5"].forEach((cls) => {
  const db = Models[cls];

  ["Writing", "Listening", "Matching", "MultipleChoice"].forEach((type) => {
    const lower = type.toLowerCase();

    app.post(`/${cls}/${lower}`, async (req, res) => {
      try {
        const data = req.body;
        const result = Array.isArray(data)
          ? await db[type].insertMany(data)
          : await new db[type](data).save();
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get(`/${cls}/${lower}`, async (req, res) => {
      const filter = {};
      if (req.query.topic) filter.topic = req.query.topic;
      const data = await db[type].find(filter);
      res.json(data);
    });
  });

  // Route lấy toàn bộ câu hỏi theo topic + task
  app.get(`/${cls}/questions`, async (req, res) => {
    const { topic, task } = req.query;
    if (!topic || !task) return res.status(400).json({ error: "thiếu topic hoặc task" });

    try {
      const taskNum = parseInt(task);
      const [multipleChoice, writing, listening, matching] = await Promise.all([
        db.MultipleChoice.find({ topic, task: taskNum }),
        db.Writing.find({ topic, task: taskNum }),
        db.Listening.find({ topic, task: taskNum }),
        db.Matching.find({ topic, task: taskNum }),
      ]);

      res.json({ multipleChoice, writing, listening, matching });
    } catch (err) {
      res.status(500).json({ error: "lỗi truy vấn dữ liệu" });
    }
  });
});

// Đăng ký
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) {
    return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
  }
  await User.create({ username, password });
  res.json({ message: "Đăng ký thành công!" });
});


// Đăng nhập
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "Tài khoản không tồn tại!" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Mật khẩu không đúng!" });
  }

  res.json({ message: "Đăng nhập thành công!", username });
});

app.get("/api/:classId/topics", (req, res) => {
  const { classId } = req.params;
  const topics = TopicByClass[classId];
  if (!topics) return res.status(404).json({ error: "Không tìm thấy lớp học" });
  res.json(topics);
});

app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});