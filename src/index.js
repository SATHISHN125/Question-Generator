const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const collection = require("./config");
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
    res.render("main");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/main", (req, res) => {
    res.render("main");
});

// Signup route
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User Already Exists");
    } else {
        await collection.insertMany(data);
        res.render("login");
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username not found");
            return;
        }
        if (req.body.password === check.password) {
            res.render("studyform");
        } else {
            res.send("Password is incorrect");
        }
    } catch (error) {
        res.send("An error occurred while processing your request");
    }
});

// Study form processing
app.post("/studyform", (req, res) => {
    const { department, year, semester, subject } = req.body;
    if (department === "ECE") {
        const validSubjects = {
            "1-1": ["Engineering Chemistry", "Problem Solving and Python programming", "Professional English - 1","Matrices and Calculus","Engineering Physics"],
            "1-2": ["Electronics and Instrumentation Engineering", "Circuit Analysis", "Engineering Graphics","Professional English - 2","Static and Numerical Methods","Physics for Electronics"],
            "2-3": ["Signals & Systems", "C programming data Structure", "Control System","Digital System and Design","Electronics Devices and Circuits","Random Processes and Linear Algebra"],
            "2-4": ["Network and Security", "Linear Integrated Circuits", "Communication System","Digital Signal Processing","Electromagnetic Field","Environment Sciences and Sustainability"],
            "3-5": ["Computer Vision", "Wireless and Network Design", "Insdustrial Iot and Industry 4.0","Wireless Communication","Transmission Line and RF System","VLSI Chip and Design"],
            "3-6": ["Under Water Image Procesing", "Artificial Intelligience and Machine Learning", "Digital Marketing","EMI/EMC","Embedded Iot"],
            "4-7":  ["HVE", "TQM", "Devops","Industry"]
        };
        const selectedSemesterKey = `${year}-${semester}`;
        if (validSubjects[selectedSemesterKey]?.includes(subject)) {
            switch (selectedSemesterKey) {
                case "1-1":
                    if (subject === "Engineering Chemistry") res.send("Hii chemistry");
                    else if (subject === "Problem Solving and Python programming") res.send("Hi  python");
                    else if (subject === "Professional English - 1") res.send("Hi  english");
                    else if (subject === "Matrices and Calculus") res.send("Hi  matrix");
                    else if (subject === "Engineering Physics") res.send("Hi  physics");
                    break;
                case "1-2":
                    if (subject === "Electronics and Instrumentation Engineering") res.send("Hii electronics");
                    else if (subject === "Circuit Analysis") res.send("Hii circuits");
                    else if (subject === "Engineering Graphics") res.send("Hii graphics");
                    else if (subject === "Professional English - 2") res.send("Professional English");
                    else if (subject === "Static and Numerical Methods") res.send("Static and Numerical Methods");
                    else if (subject === "Physics for Electronics") res.send("Physics for Electronics");
                    break;
                case "2-3":
                    if (subject === "Signals & Systems") res.send("Signals & Systems");
                    else if (subject === "C programming data Structure") res.send("C programming data Structure");
                    else if (subject === "Control System") res.send("Control System");
                    else if (subject === "Digital System and Design") res.send("digii");
                    else if (subject === "Electronics Devices and Circuits") res.send("edc");
                    else if (subject === "Random Processes and Linear Algebra") res.send("random");
                    break;
                case "2-4":
                    if (subject === "Network and Security") res.send("Hii network");
                    else if (subject === "Linear Integrated Circuits") res.send("hii lic");
                    else if (subject === "Communication System") res.send("1parta/pythonsolve-a");
                    else if (subject === "Digital Signal Processing") res.send("hiii dsp");
                    else if (subject === "Electromagnetic Field") res.send("emf");
                    else if (subject === "Environment Sciences and Sustainability") res.send("evs");
                    break;
                case "3-5":
                    if (subject === "Computer Vision") res.send("Hii network");
                    else if (subject === "Wireless and Network Design") res.send("hii network");
                    else if (subject === "Insdustrial Iot and Industry 4.0") res.send("iot");
                    else if (subject === "Wireless Communication") res.send("wc");
                    else if (subject === "Transmission Line and RF System") res.render("semester5/tlrf");
                    else if (subject === "VLSI Chip and Design") res.send("vlsi");
                    break;
                case "3-6":
                    if (subject === "Under Water Image Procesing") res.send("Hi under");
                    else if (subject === "Artificial Intelligience and Machine Learning") res.send("hii aiml");
                    else if (subject === "Digital Marketing") res.send("dm");
                    else if (subject === "EMI/EMC") res.send("emi");
                    else if (subject === "Embedded Iot") res.send("eiot");
                    break;
                case "4-7":
                    if (subject === "HVE") res.send("Hii hve");
                    else if (subject === "TQM") res.send("hii tqm");
                    else if (subject === "Devops") res.send("devops");
                    else if (subject === "Industry") res.send("industry");
                    break;
                default:
                    res.send("Invalid subject for Part A");
            }
        } else {
            res.send("Subject not found for this semester.");
        }
    } else {
        res.send("Invalid department selected.");
    }
});

const Question = require('./models/Question');
app.post('/tll', async (req, res) => {
    const { subtopic, rank } = req.body; // Extract data from the request body
  
    if (!subtopic || !rank) {
      return res.status(400).send("subtopic and rank are required.");
    }
  
    try {
      // Create and save a new Question
      const okk = new Question({
        subtopic,
        rank,
      });
      await okk.save();
      console.log("Data saved successfully.");
      res.status(201).send("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).send("Failed to save data.");
    }
  });
// Start the server
const port = 8080;
app.listen(port, () => {
    console.log("Server Running on port", port);
});
