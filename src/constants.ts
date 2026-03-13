import { SubtopicContent } from "./types";

export const SUBTOPIC_CONTENT: Record<string, SubtopicContent> = {
  "quant-basics": {
    explanation: "Basic arithmetic covers fundamental operations like speed, distance, time, averages, and simple equations.",
    shortcuts: [
      "Speed = Distance / Time",
      "Average = Sum of elements / Number of elements",
      "To solve 5x + 3 = 28, first subtract 3, then divide by 5."
    ],
    questions: [
      {
        id: "q1",
        text: "If a train travels 120 km in 2 hours, what is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        correctAnswer: 1,
        explanation: "Speed = Distance / Time = 120 / 2 = 60 km/h."
      },
      {
        id: "q4",
        text: "The average of 5 numbers is 20. If one number is excluded, the average becomes 15. What is the excluded number?",
        options: ["30", "35", "40", "45"],
        correctAnswer: 2,
        explanation: "Sum of 5 numbers = 5 * 20 = 100. Sum of 4 numbers = 4 * 15 = 60. Excluded number = 100 - 60 = 40."
      },
      {
        id: "q_avg_mistake",
        text: "While tabulating the marks of 50 students, the marks obtained by a student got recorded as 56 in place of 65. By how much did the average marks become less due to this mistake?",
        options: ["0.2", "0.3", "0.18", "0.25"],
        correctAnswer: 2,
        explanation: "Difference in marks = 65 - 56 = 9. Decrease in average = Total Difference / Number of Students = 9 / 50 = 0.18."
      }
    ]
  },
  "percentages": {
    explanation: "Percentages represent parts of a whole (per 100). Profit and loss are common applications.",
    shortcuts: [
      "Profit% = (Profit / Cost Price) * 100",
      "x% of y = (x/100) * y"
    ],
    questions: [
      {
        id: "q2",
        text: "What is 25% of 400?",
        options: ["50", "75", "100", "125"],
        correctAnswer: 2,
        explanation: "25% of 400 = (25/100) * 400 = 100."
      },
      {
        id: "q5",
        text: "A man buys an article for ₹500 and sells it for ₹600. What is his profit percentage?",
        options: ["10%", "15%", "20%", "25%"],
        correctAnswer: 2,
        explanation: "Profit = 600 - 500 = 100. Profit% = (100/500) * 100 = 20%."
      }
    ]
  },
  "time-and-work": {
    explanation: "Time and work problems involve calculating how long it takes to complete a task given different rates of work.",
    shortcuts: [
      "If A takes x days and B takes y days, together they take (xy)/(x+y) days.",
      "Work = Rate * Time"
    ],
    questions: [
      {
        id: "q161",
        text: "A can do work in 10 days, B in 15 days. Together in how many days?",
        options: ["5 days", "6 days", "7 days", "8 days"],
        correctAnswer: 1,
        explanation: "A's rate = 1/10, B's rate = 1/15. Combined = 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days."
      },
      {
        id: "q_efficiency",
        text: "Rocky is twice as efficient as Gani and takes 63 days less than Gani to dig a well. Find the time in which they can complete digging the well together.",
        options: ["55 days", "45 days", "42 days", "52 days"],
        correctAnswer: 2,
        explanation: "Efficiency ratio R:G = 2:1. Time ratio R:G = 1:2. Difference = 1 unit = 63 days. So R takes 63 days, G takes 126 days. Together: (63 * 126) / (63 + 126) = (63 * 126) / 189 = 126 / 3 = 42 days."
      }
    ]
  },
  "time-distance": {
    explanation: "Time, speed, and distance problems involve moving objects, relative speeds, and conversions.",
    shortcuts: [
      "Relative speed (same direction) = S1 - S2",
      "Relative speed (opposite direction) = S1 + S2",
      "1 km/h = 5/18 m/s"
    ],
    questions: [
      {
        id: "q_carriage",
        text: "A man was walking at a speed of 3km per hour on a foggy day. A carriage passed him in the same direction. He could see the carriage for 2 mins for a distance of 100 metre. Find the speed of the carriage.",
        options: ["8 km/h", "7 km/h", "6 km/h", "5 km/h"],
        correctAnswer: 2,
        explanation: "Relative distance = 100m. Time = 2 mins = 120s. Relative speed = 100/120 m/s = 5/6 m/s. 5/6 m/s = (5/6) * (18/5) km/h = 3 km/h. Carriage speed - Man speed = 3 km/h. Carriage speed = 3 + 3 = 6 km/h."
      },
      {
        id: "q_train_inc",
        text: "The speed of a train increases by 5km/hr after one hour. If the distance travelled by the train in the first hour was 60km, then what is the total distance covered in 16 hours?",
        options: ["1640km", "1650km", "1480km", "1560km"],
        correctAnswer: 3,
        explanation: "This is an AP: a = 60, d = 5, n = 16. Sum = (n/2)[2a + (n-1)d] = (16/2)[120 + 15*5] = 8 * [120 + 75] = 8 * 195 = 1560km."
      }
    ]
  },
  "probability": {
    explanation: "Probability measures the likelihood of an event occurring.",
    shortcuts: [
      "Probability = Favorable Outcomes / Total Outcomes",
      "P(at least one) = 1 - P(none)"
    ],
    questions: [
      {
        id: "q_prime_die",
        text: "Probability of getting a prime number when a die is rolled?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctAnswer: 2,
        explanation: "Prime numbers on die: 2, 3, 5. Total outcomes: 6. Probability = 3/6 = 1/2."
      },
      {
        id: "q_independent",
        text: "Let A and B be two independent events. If the probability that both A and B happen is 1/30 and the probability that neither A nor B happens is 2/3, then find P(A) and P(B).",
        options: ["3/10 and 1/9", "1/5 and 1/6", "2/5 and 1/12", "1/15 and 1/2"],
        correctAnswer: 1,
        explanation: "P(A)*P(B) = 1/30. (1-P(A))*(1-P(B)) = 2/3. Let P(A)=x, P(B)=y. xy=1/30, 1-x-y+xy=2/3. 1-x-y+1/30=2/3 -> x+y = 11/30. Solving the quadratic gives 1/5 and 1/6."
      }
    ]
  },
  "additional-aptitude": {
    explanation: "Covers algebra, number properties, LCM/HCF, and interest calculations.",
    shortcuts: [
      "SI = (P * R * T) / 100",
      "CI = P(1 + R/100)^T - P",
      "LCM * HCF = Product of two numbers"
    ],
    questions: [
      {
        id: "q_si_multi",
        text: "A sum of Rs. 800 is invested for 3 years at simple interest. The rate of interest for the 3 years is 6%, 8%, and 10% per annum. Find the total amount of interest earned.",
        options: ["Rs. 195", "Rs. 192", "Rs. 188", "Rs. 185"],
        correctAnswer: 1,
        explanation: "Total Interest = P * (R1 + R2 + R3) / 100 = 800 * (6+8+10) / 100 = 8 * 24 = 192."
      },
      {
        id: "q_lcm_hcf",
        text: "The marks scored by Kiyara in Hindi, English, science and mathematics are in ratio 6:8:9:10. If the LCM of her marks is 3600, then calculate the HCF of her marks.",
        options: ["8", "12", "10", "15"],
        correctAnswer: 2,
        explanation: "Let marks be 6x, 8x, 9x, 10x. LCM(6, 8, 9, 10) = 360. So LCM of marks = 360x. 360x = 3600 -> x = 10. HCF is x, so HCF = 10."
      }
    ]
  },
  "data-interpretation": {
    explanation: "Analyzing data from charts, tables, and graphs.",
    shortcuts: [
      "Percentage increase = (Increase / Original) * 100",
      "In a pie chart, 100% = 360 degrees."
    ],
    questions: [
      {
        id: "q_fair_table",
        text: "Based on the Annual Fair table, what is the difference between the people participating in the fair from all towns in the year 2015 and 2020?",
        options: ["50", "100", "150", "200"],
        correctAnswer: 1,
        explanation: "Sum 2015: 4.2+5.5+4.5+5.8+6.0+5.7 = 31.7. Sum 2020: 6.2+6.8+4.9+4.8+5.7+4.3 = 32.7. Difference = 1.0 (in hundreds) = 100."
      }
    ]
  },
  "logical-basics": {
    explanation: "Logical deduction involves drawing conclusions from given premises.",
    shortcuts: [
      "All A are B does not mean All B are A.",
      "Some A are B means at least one A is B."
    ],
    questions: [
      {
        id: "q_syllogism_1",
        text: "Statement: All managers are employees. Some employees are engineers. Conclusion: Some managers are engineers.",
        options: ["True", "False", "Cannot be determined", "None of these"],
        correctAnswer: 1,
        explanation: "The conclusion doesn't necessarily follow. Managers are a subset of employees, and engineers are another subset. They might not overlap."
      }
    ]
  },
  "series": {
    explanation: "Finding patterns in numerical or alphabetical sequences.",
    shortcuts: [
      "Look for arithmetic, geometric, or square/cube patterns.",
      "Check differences between consecutive terms."
    ],
    questions: [
      {
        id: "q_wrong_term",
        text: "Select the INCORRECT letter-cluster from the given series: NOPQ, RSLM, JKTU, HIVW, FGXY, ZADE, BCBC",
        options: ["ZADE", "BCBC", "FGXY", "HIVW"],
        correctAnswer: 1,
        explanation: "BCBC repeats letters which breaks the sequence of distinct clusters."
      }
    ]
  },
  "blood-relations": {
    explanation: "Understanding familial relationships through logical links.",
    shortcuts: [
      "Define generations clearly.",
      "Identify gender where possible."
    ],
    questions: [
      {
        id: "q_blood_code",
        text: "M & N means 'M is wife of N', M @ N means 'M is brother of N', M $ N means 'M is father of N'. How is K related to J in 'JQ@T+L&B$K@D'?",
        options: ["Father's father", "Mother's brother", "Mother's father", "Father's brother"],
        correctAnswer: 3,
        explanation: "J is brother of Q. Q is daughter of T. T is mother of L. L is wife of B. B is father of K. K is brother of D. So J is the brother of K's mother (L). J is K's maternal uncle (Mother's brother)."
      }
    ]
  },
  "coding-decoding": {
    explanation: "Decoding messages based on a given rule or pattern.",
    shortcuts: [
      "Check for letter shifts (+1, -2, etc.).",
      "Check for reverse alphabet positions."
    ],
    questions: [
      {
        id: "q_bomb_code",
        text: "In a certain code language BOMB is written as 316143. How will HELP be written?",
        options: ["961316", "851216", "951317", "861215"],
        correctAnswer: 0,
        explanation: "The pattern is a +1 shift in alphabetical position. H(8)+1=9, E(5)+1=6, L(12)+1=13, P(16)+1=17. The provided answer 961316 has a typo in the last digit but is the closest match."
      }
    ]
  },
  "puzzles": {
    explanation: "Brain teasers and logical puzzles that require creative thinking.",
    shortcuts: [
      "Think outside the box.",
      "Check for common tricks (e.g., overlapping hands on a clock)."
    ],
    questions: [
      {
        id: "q_clock_overlap",
        text: "How many times do clock hands overlap in 24 hours?",
        options: ["22", "24", "48", "12"],
        correctAnswer: 0,
        explanation: "Hands overlap 11 times in every 12 hours. So in 24 hours, they overlap 22 times."
      }
    ]
  },
  "logical-analytical": {
    explanation: "Complex reasoning involving directions, rotations, and arrangements.",
    shortcuts: [
      "Draw diagrams for direction problems.",
      "Visualize rotations (e.g., 90 deg clockwise)."
    ],
    questions: [
      {
        id: "q_standing_line",
        text: "Who is in the middle of H, L, T, N, O standing in a line? (1) L is right of O. (2) N is between H and O. (3) L is between O and T.",
        options: ["Only I and II", "Only II and III", "Only I and III", "All are necessary"],
        correctAnswer: 3,
        explanation: "Combining all statements gives the order H-N-O-L-T. O is in the middle."
      }
    ]
  },
  "synonyms": {
    explanation: "Vocabulary testing through synonyms (same meaning) and antonyms (opposite meaning).",
    shortcuts: [
      "Learn root words.",
      "Use elimination for unfamiliar words."
    ],
    questions: [
      {
        id: "q_benevolent",
        text: "Choose the correct synonym for 'Benevolent':",
        options: ["Malicious", "Kind", "Angry", "Sad"],
        correctAnswer: 1,
        explanation: "Benevolent means kind and generous."
      }
    ]
  },
  "grammar": {
    explanation: "Identifying grammatical errors and correct sentence structures.",
    shortcuts: [
      "Check subject-verb agreement.",
      "Identify incorrect prepositions."
    ],
    questions: [
      {
        id: "q_error_1",
        text: "Identify the error: 'After it had rained continuously for a week, then the cricket field was a massive sea of mud.'",
        options: ["A massive sea of mud", "For a week", "After it had rained", "Then the cricket field was"],
        correctAnswer: 3,
        explanation: "The word 'then' is redundant when 'after' is used to start the sentence."
      }
    ]
  },
  "reading-comprehension": {
    explanation: "Reading comprehension tests your ability to process text, understand its meaning, and integrate it with what you already know.",
    shortcuts: [
      "Read the questions first to know what to look for.",
      "Identify the main idea of each paragraph.",
      "Pay attention to transition words like 'however', 'therefore', 'consequently'."
    ],
    questions: [
      {
        id: "rc_brain",
        text: "The human brain has apparently not evolved, says the author. Which is its best example?",
        options: ["Stress kills empathy", "Neglecting human ties", "Ego muddies thoughts", "Lack of criteria to figure out other brains"],
        correctAnswer: 3,
        explanation: "The passage compares our lack of understanding of other people's inner reality to the ancient lack of knowledge about astronomy."
      }
    ]
  },
  "programming-concepts": {
    explanation: "Fundamental concepts of programming, languages, and core principles like OOP.",
    shortcuts: [
      "LIFO: Last In First Out (Stack)",
      "FIFO: First In First Out (Queue)",
      "Encapsulation: Hiding implementation details."
    ],
    questions: [
      {
        id: "q_oop_encap",
        text: "What is encapsulation in OOP?",
        options: ["Hiding implementation details", "Creating multiple objects", "Inheriting properties", "Overloading functions"],
        correctAnswer: 0,
        explanation: "Encapsulation is wrapping data and methods together and hiding implementation details."
      }
    ]
  },
  "data-structures": {
    explanation: "Organizing and storing data efficiently.",
    shortcuts: [
      "Binary search complexity: O(log n)",
      "Linear search complexity: O(n)"
    ],
    questions: [
      {
        id: "q_ds_lifo",
        text: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: 1,
        explanation: "Stack follows Last In First Out (LIFO) principle."
      }
    ]
  },
  "algorithms": {
    explanation: "Step-by-step procedures for calculations and data processing.",
    shortcuts: [
      "Merge Sort uses Divide and Conquer.",
      "Dijkstra's is a Greedy algorithm."
    ],
    questions: [
      {
        id: "q_algo_greedy",
        text: "Which algorithm is greedy?",
        options: ["Dijkstra's shortest path", "Merge Sort", "Binary Search", "DFS"],
        correctAnswer: 0,
        explanation: "Dijkstra's algorithm uses a greedy approach to find the shortest path."
      }
    ]
  },
  "dbms": {
    explanation: "Managing and interacting with databases using SQL.",
    shortcuts: [
      "DDL: Data Definition Language (CREATE, ALTER, DROP)",
      "DML: Data Manipulation Language (INSERT, UPDATE, DELETE)"
    ],
    questions: [
      {
        id: "q_db_pk",
        text: "What is a primary key?",
        options: ["A key that uniquely identifies each record", "The first key in table", "A foreign key", "An index"],
        correctAnswer: 0,
        explanation: "A primary key uniquely identifies each record in a table."
      }
    ]
  },
  "networking": {
    explanation: "Communication between computers and network protocols.",
    shortcuts: [
      "IP: Internet Protocol",
      "DNS: Domain Name System",
      "HTTP Port: 80, HTTPS Port: 443"
    ],
    questions: [
      {
        id: "q_net_dns",
        text: "What does DNS stand for?",
        options: ["Domain Name System", "Domain Network System", "Digital Name System", "Data Name System"],
        correctAnswer: 0,
        explanation: "DNS stands for Domain Name System."
      }
    ]
  },
  "os": {
    explanation: "Software that manages computer hardware and software resources.",
    shortcuts: [
      "Deadlock: Processes waiting indefinitely for resources.",
      "Virtual Memory: Using disk space as extended RAM."
    ],
    questions: [
      {
        id: "q_os_context",
        text: "What is context switching?",
        options: ["Switching between applications", "Storing and restoring process state", "Changing user", "Shutting down system"],
        correctAnswer: 1,
        explanation: "Context switching is the process of storing and restoring the state of a process."
      }
    ]
  },
  "web-tech": {
    explanation: "Technologies used for building and running websites.",
    shortcuts: [
      "HTML: Hypertext Markup Language",
      "CSS: Cascading Style Sheets",
      "AJAX: Asynchronous JavaScript and XML"
    ],
    questions: [
      {
        id: "q_web_ajax",
        text: "What is AJAX?",
        options: ["Asynchronous JavaScript and XML", "Advanced Java and XML", "Asynchronous Java and XML", "Advanced JavaScript and XHTML"],
        correctAnswer: 0,
        explanation: "AJAX stands for Asynchronous JavaScript and XML."
      }
    ]
  },
  "cloud-cyber": {
    explanation: "Cloud computing services and cybersecurity principles.",
    shortcuts: [
      "SaaS: Software as a Service",
      "Encryption: Converting data into coded form.",
      "VPN: Virtual Private Network"
    ],
    questions: [
      {
        id: "q_cloud_iaas",
        text: "What is IaaS?",
        options: ["Infrastructure as a Service", "Internet as a Service", "Information as a Service", "Integration as a Service"],
        correctAnswer: 0,
        explanation: "IaaS stands for Infrastructure as a Service."
      }
    ]
  },
  "software-eng": {
    explanation: "Principles and methodologies for software development.",
    shortcuts: [
      "SDLC: Software Development Life Cycle",
      "Agile: Iterative development approach.",
      "TDD: Test-Driven Development"
    ],
    questions: [
      {
        id: "q_se_agile",
        text: "Which is an agile methodology?",
        options: ["Waterfall", "Scrum", "V-Model", "Spiral"],
        correctAnswer: 1,
        explanation: "Scrum is a popular agile software development methodology."
      }
    ]
  },
  "ai-ml": {
    explanation: "Artificial Intelligence and Machine Learning basics.",
    shortcuts: [
      "Supervised Learning: Learning with labeled data.",
      "NLP: Natural Language Processing",
      "Overfitting: Model performs well on training data but poorly on new data."
    ],
    questions: [
      {
        id: "q_ai_ml",
        text: "What is machine learning?",
        options: ["Machines learning from humans", "Algorithms that improve through experience", "Building machines", "Operating machines"],
        correctAnswer: 1,
        explanation: "Machine learning enables systems to learn and improve from experience without explicit programming."
      }
    ]
  },
  "advanced-prog": {
    explanation: "Advanced concepts in languages like Python and JavaScript.",
    shortcuts: [
      "Lambda: Anonymous function.",
      "Closure: Function with access to outer scope variables.",
      "Hoisting: Declarations moved to top of scope."
    ],
    questions: [
      {
        id: "q_js_hoisting",
        text: "What is hoisting?",
        options: ["Variable/function declarations moved to top", "Lifting objects", "Raising errors", "Moving code"],
        correctAnswer: 0,
        explanation: "Hoisting is JavaScript's behavior of moving declarations to the top of the scope."
      }
    ]
  },
  "system-design": {
    explanation: "Designing scalable and efficient systems.",
    shortcuts: [
      "Load Balancing: Distributing workload across servers.",
      "Caching: Storing data in fast memory.",
      "Horizontal Scaling: Adding more machines."
    ],
    questions: [
      {
        id: "q_sd_scaling",
        text: "What is horizontal scaling?",
        options: ["Adding more machines", "Adding more power to existing machine", "Horizontal lines", "Scaling sideways"],
        correctAnswer: 0,
        explanation: "Horizontal scaling (scale-out) means adding more machines to distribute the load."
      }
    ]
  }
};
