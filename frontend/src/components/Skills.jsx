import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

const conceptDetails = {
  'DSA': {
    title: 'Data Structures & Algorithms (C++ Cheat Sheet)',
    subsections: [
      {
        title: 'Data Structures',
        items: ['Array', 'Linked List', 'Stack', 'Queue', 'Circular Queue', 'Tree', 'Binary Tree', 'Binary Search Tree', 'Heap', 'Hashing', 'Graph']
      },
      {
        title: 'Algorithms',
        items: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Recursion', 'Divide & Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'BFS (Breadth First Search)', 'DFS (Depth First Search)', 'Shortest Path', 'Minimum Spanning Tree']
      },
      {
        title: 'Complexity Analysis',
        items: ['Time Complexity', 'Space Complexity', 'Big-O Notation', 'Big-Omega Notation', 'Big-Theta Notation']
      }
    ]
  },
  'OOP': {
    title: 'Object-Oriented Programming (C++)',
    subsections: [
      {
        title: 'Four Pillars',
        items: ['Encapsulation', 'Access Modifiers', 'Abstraction', 'Interface', 'Inheritance', 'Polymorphism']
      },
      {
        title: 'Inheritance Types',
        items: ['Single Inheritance', 'Multilevel Inheritance', 'Hierarchical Inheritance', 'Multiple Inheritance']
      },
      {
        title: 'Polymorphism Types',
        items: ['Function Overloading', 'Method Overriding']
      },
      {
        title: 'Key Concepts',
        items: ['Classes & Objects', 'Constructor', 'Destructor', 'this Pointer', 'static Keyword', 'Association', 'Aggregation', 'Composition', 'Virtual Function', 'Exception Handling']
      }
    ]
  },
  'DBMS': {
    title: 'Database Management System & SQL',
    subsections: [
      {
        title: 'Core Fundamentals',
        items: ['DBMS vs File System', 'Database Architecture & Abstraction', 'Data Abstraction', 'Data Independence', 'ER Model', 'Keys', 'Relational Model']
      },
      {
        title: 'SQL Commands & Filter',
        items: ['DDL', 'DML', 'SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'DISTINCT', 'Aggregate Functions']
      },
      {
        title: 'Joins & Advanced SQL',
        items: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'Views', 'Stored Procedures', 'Triggers']
      },
      {
        title: 'Advanced DBMS',
        items: ['Normalization', '1NF', '2NF', '3NF', 'Transactions', 'ACID Properties', 'Concurrency Control', 'Indexing', 'SQL vs NoSQL', 'MongoDB vs MySQL']
      }
    ]
  },
  'Operating Systems': {
    title: 'Operating Systems (Core Concepts)',
    subsections: [
      {
        title: 'OS Fundamentals',
        items: ['Operating System', 'Kernel', 'System Calls', 'User Mode vs Kernel Mode']
      },
      {
        title: 'Process Management',
        items: ['Process', 'Program vs Process', 'Process States', 'PCB', 'Context Switching']
      },
      {
        title: 'CPU Scheduling',
        items: ['CPU Scheduling', 'FCFS', 'SJF', 'SRTF', 'Priority Scheduling', 'Round Robin']
      },
      {
        title: 'Threads & Sync',
        items: ['Process vs Thread', 'Multithreading', 'Critical Section', 'Race Condition', 'Mutex', 'Semaphore', 'Monitor']
      },
      {
        title: 'Deadlocks',
        items: ['Deadlock', 'Four Necessary Conditions', 'Deadlock Prevention', 'Deadlock Avoidance', 'Banker\'s Algorithm', 'Deadlock Detection', 'Deadlock Recovery']
      },
      {
        title: 'Memory & File Systems',
        items: ['RAM', 'Virtual Memory', 'Paging', 'Segmentation', 'Page Fault', 'Page Replacement', 'FIFO', 'LRU', 'Optimal Page Replacement', 'File Allocation', 'Disk Scheduling']
      }
    ]
  },
  'Computer Networks': {
    title: 'Computer Networks & Protocols',
    subsections: [
      {
        title: 'Networking Basics',
        items: ['Computer Network', 'Network Types', 'Network Topologies']
      },
      {
        title: 'OSI Model Layers',
        items: ['OSI Model Layers', 'Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer', 'Presentation Layer', 'Application Layer']
      },
      {
        title: 'TCP/IP & Protocols',
        items: ['TCP/IP Model', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'DHCP', 'TCP', 'UDP', 'TCP vs UDP']
      },
      {
        title: 'IP Addressing & Routing',
        items: ['IPv4', 'IPv6', 'Subnetting', 'MAC Address', 'ARP', 'Routing', 'TCP Connection Establishment', 'HTTP Request-Response Cycle']
      }
    ]
  },
  'Software Engineering': {
    title: 'Software Engineering & SDLC',
    subsections: [
      {
        title: 'SDLC Models',
        items: ['Waterfall Model', 'Agile Methodology', 'Scrum Framework', 'SDLC Phases']
      },
      {
        title: 'Design & Principles',
        items: ['SOLID Principles', 'DRY & KISS', 'MVC Architecture', 'Monolithic vs Microservices']
      },
      {
        title: 'Testing & QA',
        items: ['Unit Testing', 'Integration Testing', 'System Testing', 'CI/CD Pipelines']
      }
    ]
  },
  'Computer Architecture': {
    title: 'Computer Organization & Architecture',
    subsections: [
      {
        title: 'CPU Organization',
        items: ['CPU Structure', 'Von Neumann Architecture', 'Instruction Cycle', 'ALU & Control Unit']
      },
      {
        title: 'Execution & Speed',
        items: ['Pipelining', 'Superscalar Architecture', 'Hazards']
      },
      {
        title: 'Memory & I/O',
        items: ['Cache Coherence', 'DMA (Direct Memory Access)', 'I/O Interrupts', 'Register Transfer']
      }
    ]
  },
  'Cyber Security': {
    title: 'Cyber Security & Cryptography',
    subsections: [
      {
        title: 'Fundamentals',
        items: ['CIA Triad', 'Symmetric Encryption', 'Asymmetric Encryption', 'Digital Signatures', 'Hashing Algorithms']
      },
      {
        title: 'Security Threats',
        items: ['Phishing & Social Engineering', 'SQL Injection', 'XSS (Cross-Site Scripting)', 'DDoS Attacks', 'Malware & Ransomware']
      },
      {
        title: 'Network Defense',
        items: ['Firewalls', 'VPN (Virtual Private Network)', 'IDS / IPS', 'Zero Trust Security']
      }
    ]
  },
  'Cloud Computing': {
    title: 'Cloud Computing Services & Infrastructure',
    subsections: [
      {
        title: 'Service Models',
        items: ['IaaS', 'PaaS', 'SaaS', 'Serverless Computing']
      },
      {
        title: 'Deployment Models',
        items: ['Public Cloud', 'Private Cloud', 'Hybrid Cloud', 'Multi-Cloud']
      },
      {
        title: 'Infrastructure',
        items: ['Virtualization', 'Containers & Docker', 'Kubernetes Orchestration', 'Load Balancing & Auto-scaling']
      }
    ]
  },
  'AI & ML': {
    title: 'Artificial Intelligence & Machine Learning',
    subsections: [
      {
        title: 'AI Concepts',
        items: ['Artificial Intelligence', 'Turing Test', 'Expert Systems']
      },
      {
        title: 'Machine Learning',
        items: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Overfitting & Underfitting']
      },
      {
        title: 'Deep Learning',
        items: ['Neural Networks', 'Activation Functions', 'NLP (Natural Language Processing)', 'Computer Vision']
      }
    ]
  },
  'Theory of Computation': {
    title: 'Theory of Computation & Automata',
    subsections: [
      {
        title: 'Automata Theory',
        items: ['DFA (Deterministic Finite Automata)', 'NFA (Non-Deterministic Automata)', 'Regular Expressions']
      },
      {
        title: 'Grammars & Parsers',
        items: ['Context Free Grammar (CFG)', 'Pushdown Automata (PDA)', 'Chomsky Hierarchy']
      },
      {
        title: 'Turing Machines',
        items: ['Turing Machine', 'Decidability', 'Halting Problem']
      }
    ]
  },
  'Compiler Design': {
    title: 'Compiler Design Phases',
    subsections: [
      {
        title: 'Front-End Phases',
        items: ['Lexical Analysis', 'Syntax Analysis (Parsing)', 'Semantic Analysis']
      },
      {
        title: 'Back-End Phases',
        items: ['Intermediate Code Generation', 'Code Optimization', 'Target Code Generation']
      },
      {
        title: 'Utility Systems',
        items: ['Symbol Table', 'Error Handling Systems']
      }
    ]
  }
};

const dsaDetails = {
  // ==========================================
  // ================= PART 1 — DSA ============
  // ==========================================
  'Array': {
    definition: 'Array ek linear data structure hai jisme same data type ke elements contiguous memory locations par store hote hain.',
    example: 'Index:   0   1   2   3   4\nArray:  10  20  30  40  50',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    cout << arr[2] << endl;  // Outputs: 30\n    return 0;\n}`,
    complexity: 'Access: O(1) | Search: O(n) | Insert: O(n) | Delete: O(n)',
    interview: 'Array ka biggest advantage hai fast random access O(1) because memory locations contiguous hoti hain.'
  },
  'Linked List': {
    definition: 'Linked List ek linear data structure hai jisme elements nodes ke form me hote hain. Har node me Data aur Next node ka address hota hai.',
    example: '10 → 20 → 30 → NULL',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int value) {\n        data = value;\n        next = NULL;\n    }\n};\n\nint main() {\n    Node* first = new Node(10);\n    Node* second = new Node(20);\n    first->next = second;\n    Node* temp = first;\n    while (temp != NULL) {\n        cout << temp->data << " ";\n        temp = temp->next;\n    }\n    return 0;\n}`,
    complexity: 'Access: O(n) | Search: O(n) | Insert at start: O(1) | Delete at start: O(1)',
    interview: 'Array static size ka hota hai jabki Linked List dynamic size ki hoti hai. List me insertions/deletions at ends faster hote hain.'
  },
  'My Stack': {}, // safety placeholder
  'Stack': {
    definition: 'Stack ek LIFO (Last In First Out) data structure hai. Jo element last me insert hota hai, wahi pehle remove hota hai.',
    example: '   30  ← Top (Last In, First Out)\n   20\n   10',
    code: `#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    stack<int> s;\n    s.push(10);\n    s.push(20);\n    s.push(30);\n    cout << s.top() << endl; // 30\n    s.pop();\n    cout << s.top() << endl; // 20\n    return 0;\n}`,
    complexity: 'Push: O(1) | Pop: O(1) | Top: O(1)',
    interview: 'Stack ke standard usage: Function recursion call management, undo/redo operations, browser history backtracking, balanced parentheses checks.'
  },
  'Queue': {
    definition: 'Queue ek FIFO (First In First Out) data structure hai. Jo element pehle aata hai, wahi pehle remove hota hai.',
    example: 'Front (Dequeue) 10 → 20 → 30 Rear (Enqueue)',
    code: `#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    queue<int> q;\n    q.push(10);\n    q.push(20);\n    cout << q.front() << endl; // 10\n    q.pop();\n    cout << q.front() << endl; // 20\n    return 0;\n}`,
    complexity: 'Enqueue: O(1) | Dequeue: O(1) | Front: O(1)',
    interview: 'Queue scheduling systems me CPU process allocation (FIFO scheduling), printer spooling, aur graph algorithms jaise BFS me support karti hai.'
  },
  'Circular Queue': {
    definition: 'Circular Queue me queue ke endpoints circularly link hote hain jisse full array memory fully utilize hoti hai aur head front se connect ho jata hai.',
    example: '0 → 1 → 2 → 3 → 4\n↑                 ↓\n└─────────────────┘',
    code: `#include <iostream>\nusing namespace std;\n\nclass CircularQueue {\n    int arr[5];\n    int front, rear, size;\npublic:\n    CircularQueue() { front = rear = -1; size = 5; }\n    void enqueue(int val) {\n        if ((rear + 1) % size == front) { cout << "Queue Full\\n"; return; }\n        if (front == -1) front = 0;\n        rear = (rear + 1) % size;\n        arr[rear] = val;\n    }\n    void dequeue() {\n        if (front == -1) { cout << "Queue Empty\\n"; return; }\n        if (front == rear) front = rear = -1;\n        else front = (front + 1) % size;\n    }\n};`,
    complexity: 'Enqueue: O(1) | Dequeue: O(1)',
    interview: 'CPU scheduling, buffering (like circular keyboard buffer), and memory management optimizations me useful hai.'
  },
  'Tree': {
    definition: 'Tree ek non-linear hierarchical data structure hai jo elements ko nodes collections me connect karti hai.',
    example: '        10 (Root)\n       /  \\\n      20   30 (Children)\n     / \\\n    40  50 (Leaf Nodes)',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct TreeNode {\n    int data;\n    vector<TreeNode*> children;\n    TreeNode(int val) { data = val; }\n};\n\nint main() {\n    TreeNode* root = new TreeNode(10);\n    root->children.push_back(new TreeNode(20));\n    root->children.push_back(new TreeNode(30));\n    cout << "Root node: " << root->data << endl;\n    return 0;\n}`,
    complexity: 'Height: Longest path from root node to leaf node.',
    interview: 'File systems directory mapping, JSON/XML parsing tree nodes, decision trees classification checks me use hota hai.'
  },
  'Binary Tree': {
    definition: 'Binary Tree ek special tree data structure hai jisme har parent node ke maximum 2 children (left child aur right child) ho sakte hain.',
    example: '        10\n       /  \\\n      20   30',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int val) {\n        data = val;\n        left = right = NULL;\n    }\n};\n\nvoid inOrder(Node* root) {\n    if (root == NULL) return;\n    inOrder(root->left);\n    cout << root->data << " ";\n    inOrder(root->right);\n}\n\nint main() {\n    Node* root = new Node(10);\n    root->left = new Node(20);\n    root->right = new Node(30);\n    inOrder(root); // Outputs: 20 10 30\n    return 0;\n}`,
    complexity: 'Traversals Time: O(n) | Space: O(h) where h is height.',
    interview: 'Recursion structures traversal properties analysis, expression trees parsing checks me target standard setup hai.'
  },
  'Binary Search Tree': {
    definition: 'Binary Search Tree (BST) ek ordered binary tree hai jisme hamesha: Left Subtree < Root < Right Subtree hota hai.',
    example: '        50\n       /  \\\n      30   70\n     / \\   / \\\n    20 40 60 80',
    code: `Node* insert(Node* root, int val) {\n    if (root == NULL) return new Node(val);\n    if (val < root->data) root->left = insert(root->left, val);\n    else root->right = insert(root->right, val);\n    return root;\n}\nbool search(Node* root, int val) {\n    if (root == NULL) return false;\n    if (root->data == val) return true;\n    if (val < root->data) return search(root->left, val);\n    return search(root->right, val);\n}`,
    complexity: 'Average Search: O(log n) | Worst Case: O(n) (Skewed Tree)',
    interview: 'BST binary search implementation on trees checks dynamic search ranges, in-order traversal sorting configurations me optimal hai.'
  },
  'Heap': {
    definition: 'Heap ek complete binary tree hai jo Heap property maintain karta hai. Max Heap me parent hamesha children se bada ya barabar hota hai. Min Heap me parent sabse chhota hota hai.',
    example: 'Max Heap:\n        50\n       /  \\\n      30   40\n     / \\\n    10 20',
    code: `#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    priority_queue<int> maxHeap; // Max Heap\n    priority_queue<int, vector<int>, greater<int>> minHeap; // Min Heap\n    maxHeap.push(30); maxHeap.push(50);\n    cout << maxHeap.top(); // Outputs: 50\n    return 0;\n}`,
    complexity: 'Insert: O(log n) | Delete: O(log n) | Get Top: O(1)',
    interview: 'Priority queues implementations, Heap Sort, shortest paths evaluations (Dijkstra) me standard structures design hai.'
  },
  'Hashing': {
    definition: 'Hashing key value ko hash function ke input parameters se direct array storage index me transform karke instant search mapping set karta hai.',
    example: 'Key (25) → Hash Function [x % 10] → Index 5',
    code: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    unordered_map<string, int> age;\n    age["Ramnevas"] = 22;\n    cout << age["Ramnevas"] << endl; // O(1) Search\n    return 0;\n}`,
    complexity: 'Insert/Search/Delete Average: O(1) | Worst Case: O(n) (Collisions)',
    interview: 'O(1) data lookup configurations. Cache systems storage, database indexing, user maps storage checks me core baseline logic hai.'
  },
  'Graph': {
    definition: 'Graph vertices/nodes aur edges collections ka interconnected group coordinate system mapping setup hota hai.',
    example: 'A ---- B\n|      |\nC ---- D',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> adjList[5]; // adjList representation\n    adjList[0].push_back(1);\n    adjList[1].push_back(0);\n    return 0;\n}`,
    complexity: 'Space: O(V + E) Adjacency list representation.',
    interview: 'Router packet flows, social network link representations, route navigation paths, topological sorting networks me standard backbone structures hai.'
  },
  'Linear Search': {
    definition: 'Linear Search me values list elements target comparisons sequentially one-by-one check base elements run karta hai.',
    code: `int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
    complexity: 'Time Complexity: O(n) | Best Case: O(1)',
    interview: 'Unsorted and small arrays configurations search maps checking parameters me base method representation checks uses.'
  },
  'Binary Search': {
    definition: 'Binary Search Sorted Array list collections partitions check target indexes comparisons divide and conquer algorithm implement karta hai.',
    code: `int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    complexity: 'Time Complexity: O(log n) | Space: O(1)',
    interview: 'Binary search requires sorted lists. Highly scalable compared to linear search and used in system database indexes calculations.'
  },
  'Bubble Sort': {
    definition: 'Bubble Sort adjacent items comparisons checks swaps indexes array elements sorting values sequential loops passes run karta hai.',
    code: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);\n        }\n    }\n}`,
    complexity: 'Average/Worst Time: O(n²) | Space: O(1)',
    interview: 'Simple sorting model. Heavy swaps configurations updates makes it inefficient for large datasets.'
  },
  'Selection Sort': {
    definition: 'Selection Sort iterative passes checks minimal elements indices lookup selections updates correctly swap sorting coordinates sets.',
    code: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[i], arr[minIdx]);\n    }\n}`,
    complexity: 'Time Complexity: O(n²) all cases | Space: O(1)',
    interview: 'Performs exactly O(n) swaps. Optimal where memory writes / swap commands cost values require minimization.'
  },
  'Insertion Sort': {
    definition: 'Insertion Sort sorting logic jisme elements sorted lists sections positions dynamically insertion checks shifts coordinate formats me insert updates karta hai.',
    code: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
    complexity: 'Best Case: O(n) | Worst/Average: O(n²)',
    interview: 'Adaptive sorting logic. Highly efficient for small dataset lists or nearly sorted array configurations.'
  },
  'Merge Sort': {
    definition: 'Merge Sort recursive Divide and Conquer sorting strategy coordinate mapping partitions splits sorted elements merges array updates run karta hai.',
    code: `void merge(int arr[], int l, int m, int r) {\n    vector<int> temp;\n    int i = l, j = m + 1;\n    while (i <= m && j <= r) {\n        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);\n        else temp.push_back(arr[j++]);\n    }\n    while (i <= m) temp.push_back(arr[i++]);\n    while (j <= r) temp.push_back(arr[j++]);\n    for (int k = 0; k < temp.size(); k++) arr[l + k] = temp[k];\n}\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m); mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
    complexity: 'Time Complexity: O(n log n) all cases | Space: O(n)',
    interview: 'Stable sorting logic. Very popular for sorting linked lists, large file disk indexes database records sorting (external sort).'
  },
  'Quick Sort': {
    definition: 'Quick Sort pivot element select coordinate partitions data divisions sort checks divide and conquer process implementation coordinate maps.',
    code: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    complexity: 'Average Case: O(n log n) | Worst Case: O(n²)',
    interview: 'In-place sorting configurations. Fast cache implementations local system memory sort libraries default configurations me quick sort standard utility uses.'
  },
  'Heap Sort': {
    definition: 'Heap Sort Max Heap ya Min Heap structures data parameters select karke binary tree heap structures algorithms sorting processes complete karta hai.',
    code: `void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int l = 2 * i + 1;\n    int r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\nvoid heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
    complexity: 'Time: O(n log n) all cases | Space: O(1) auxiliary.',
    interview: 'Memory space is O(1) auxiliary compared to merge sort. Highly reliable with strict Worst-case bounds.'
  },
  'Recursion': {
    definition: 'Recursion programming pattern hai jisme function target calculations criteria check logic base coordinates conditions direct execution self parameters updates function call execute run loop structures.',
    code: `int factorial(int n) {\n    if (n == 0) return 1; // Base case\n    return n * factorial(n - 1); // Recursive call\n}`,
    complexity: 'Time: O(n) for factorial | Call Stack Space: O(n)',
    interview: 'Ensure base case is correctly defined to prevent stack overflow. Used in trees traversal, backtracking, and divide-and-conquer.'
  },
  'Divide & Conquer': {
    definition: 'Divide and conquer strategy complex problems coordinates divisions recursively divide solve combine check scale algorithms processes uses.',
    code: `// Dynamic power exponentiation using Divide & Conquer\ndouble power(double x, int n) {\n    if (n == 0) return 1;\n    double temp = power(x, n / 2);\n    if (n % 2 == 0) return temp * temp;\n    else return x * temp * temp;\n}`,
    complexity: 'Binary splits logic standard log-n time scales parameters indexes.',
    interview: 'Allows parallelism as sub-problems can be solved independently. Binary search, Merge Sort, Quick Sort follow this pattern.'
  },
  'Greedy Algorithms': {
    definition: 'Greedy algorithm har local iteration step state updates parameter comparisons values choice select selections elements optimal coordinates checks validation set maps compile karta hai.',
    code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Activity { int start, finish; };\nbool activityCompare(Activity s1, Activity s2) { return (s1.finish < s2.finish); }\n\nvoid printMaxActivities(Activity arr[], int n) {\n    sort(arr, arr + n, activityCompare);\n    int i = 0;\n    cout << "(" << arr[i].start << ", " << arr[i].finish << ") ";\n    for (int j = 1; j < n; j++) {\n        if (arr[j].start >= arr[i].finish) {\n            cout << "(" << arr[j].start << ", " << arr[j].finish << ") ";\n            i = j;\n        }\n    }\n}`,
    complexity: 'Often O(n log n) due to sorting requirements.',
    interview: 'Does not always yield globally optimal results (e.g. coin change with arbitrary denoms). Requires optimal substructure property proof.'
  },
  'Dynamic Programming': {
    definition: 'Dynamic Programming subproblem duplicate recalculations index check values mapping array memoization tables variables checks optimization speedups operations storage arrays reuse structure coordinate logic setup.',
    code: `int dp[100]; // initialized to -1\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    if (dp[n] != -1) return dp[n]; // memoized check\n    return dp[n] = fibonacci(n - 1) + fibonacci(n - 2);\n}`,
    complexity: 'Fibonacci DP: O(n) Time | O(n) Space (compared to O(2^n) normal recursion).',
    interview: 'Overlapping subproblems checks. Tabulation Bottom Up vs Memoization Top Down. Matrix Chain, Knapsack, Coin Change, LCS/LIS questions fresher developer interviews standard benchmarks.'
  },
  'BFS (Breadth First Search)': {
    definition: 'BFS graph traversal method elements level coordinates check mapping queue variables index nodes validations layers checks structural logic coordinate check traversal map structure.',
    code: `void BFS(int start, vector<int> graph[], int n) {\n    vector<bool> visited(n, false);\n    queue<int> q;\n    q.push(start); visited[start] = true;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        cout << node << " ";\n        for (int adj : graph[node]) {\n            if (!visited[adj]) {\n                visited[adj] = true; q.push(adj);\n            }\n        }\n    }\n}`,
    complexity: 'Time Complexity: O(V + E) | Space: O(V)',
    interview: 'Shortest path determination unweighted graph layouts, web crawlers navigation, peer-to-peer networks routers configurations nodes search systems.'
  },
  'DFS (Depth First Search)': {
    definition: 'DFS graph traversal method elements deep routes check recursively branch end verification checks backtracking traversal coordinates stack structural logic map.',
    code: `void DFS(int node, vector<int> graph[], vector<bool>& visited) {\n    visited[node] = true;\n    cout << node << " ";\n    for (int adj : graph[node]) {\n        if (!visited[adj]) {\n            DFS(adj, graph, visited);\n        }\n    }\n}`,
    complexity: 'Time Complexity: O(V + E) | Space: O(V) stack frame.',
    interview: 'Cycles detection graph systems, topological sorting check, maze solving logic, connected components determination.'
  },
  'Shortest Path': {
    definition: 'Shortest path algorithms weighted/unweighted node distances minimum costs routes check graph structures checks coordinate calculations path determination algorithms.',
    code: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvoid dijkstra(int src, vector<pair<int, int>> adj[], int V) {\n    vector<int> dist(V, 1e9);\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    dist[src] = 0; pq.push({0, src});\n    while(!pq.empty()) {\n        int d = pq.top().first; int u = pq.top().second; pq.pop();\n        for(auto edge : adj[u]) {\n            int v = edge.first; int w = edge.second;\n            if(dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n}`,
    complexity: 'Dijkstra: O((V + E) log V) using Min-Heap priority queue.',
    interview: 'GPS mapping routing coordinates validation checks, routers packet paths selection, distance minimization parameters.'
  },
  'Minimum Spanning Tree': {
    definition: 'Minimum Spanning Tree weighted graphs spanning elements total weights minimization edges cycles checks trees configurations standard routing.',
    code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Edge { int u, v, w; bool operator<(const Edge& other) const { return w < other.w; } };\nint findParent(int i, vector<int>& parent) {\n    if (parent[i] == i) return i;\n    return parent[i] = findParent(parent[i], parent);\n}\nvoid kruskal(vector<Edge>& edges, int V) {\n    sort(edges.begin(), edges.end());\n    vector<int> parent(V);\n    for (int i = 0; i < V; i++) parent[i] = i;\n    int mst_weight = 0;\n    for (auto edge : edges) {\n        int uP = findParent(edge.u, parent); int vP = findParent(edge.v, parent);\n        if (uP != vP) { mst_weight += edge.w; parent[uP] = vP; }\n    }\n}`,
    complexity: 'Kruskal/Prim: O(E log V) or O(E log E).',
    interview: 'Cable connections optimizations, routing lines, electricity grid layout designs, pipelines network setups.'
  },
  'Time Complexity': {
    definition: 'Time complexity input data collections scale size growth rates variables calculations checks loop counts operations compile time execution logic scales check.',
    code: `// Linear Loop has time complexity O(N)\nfor (int i = 0; i < n; i++) {\n    // executes N times\n}\n\n// Nested loops has quadratic complexity O(N^2)\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        // executes N^2 times\n    }\n}`,
    complexity: 'Scales O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2^n)',
    interview: 'Interviewers hamesha alternative code updates optimization paths comparisons benchmarks checking time complexity minimize require metrics validation checks code performance target validation.'
  },
  'Space Complexity': {
    definition: 'Space complexity checks memory requirements runtime extra buffers maps variables temporary allocations check scales configurations arrays sizes growth coordinates.',
    code: `int arr[n]; // allocates O(n) extra auxiliary space in stack frame`,
    complexity: 'O(1) Auxiliary Space means algorithm uses constant memory space regardless of inputs scale size.',
    interview: 'Space vs Time tradeoffs. In-place algorithms space limits checks constraints optimizations memory devices systems level code limits.'
  },
  'Big-O Notation': {
    definition: 'Big-O notation algorithm upper bound growth behavior worst case complexity limit representation scale notation system functions.',
    code: `// linear search worst case is index N, so represented as O(N)\n// binary search worst case is logarithmic, so represented as O(log N)`,
    complexity: 'Indicates worst possible execution time growth bounds.',
    interview: 'Big-O checks worst possible code runtime growth bounds safety checks software execution maximum timeouts validations.'
  },
  'Big-Omega Notation': {
    definition: 'Big-Omega notation lower bound growth behavior best case runtime optimization minimum iterations limits representation notation.',
    code: `// linear search best case is at index 0, so represented as Omega(1)`,
    complexity: 'Indicates best possible execution time growth.',
    interview: 'Algorithm best case checks baseline operations execution checks loops bypass evaluations.'
  },
  'Big-Theta Notation': {
    definition: 'Big-Theta notation exact tight bound growth behavior represents exact average time scaling behavior checks functions boundaries.',
    code: `// simple loop executing exactly N times is Theta(N)`,
    complexity: 'Represents exact average/tight asymptotic runtime scaling behavior.',
    interview: 'Tight bounds checking validations software execution exact profiling estimations benchmarks.'
  },

  // ==========================================
  // ================= PART 2 — OOP ============
  // ==========================================
  'Encapsulation': {
    definition: 'Encapsulation ka matlab hai data (variables) aur us data par kaam karne wale methods (functions) ko ek single unit (class) me bind karna aur direct access ko control karna.',
    example: 'ATM account balance logic checks access modifiers.',
    code: `#include <iostream>\nusing namespace std;\n\nclass BankAccount {\nprivate:\n    double balance;\npublic:\n    void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n    double getBalance() { return balance; }\n};\n\nint main() {\n    BankAccount account;\n    account.deposit(5000);\n    cout << account.getBalance(); // Outputs: 5000\n    return 0;\n}`,
    complexity: 'Security: Data hiding + controlled access.',
    interview: 'Encapsulation is essentially Data hiding + controlled access. ATM balance variables are private and updated only via public functions.'
  },
  'Access Modifiers': {
    definition: 'Access Modifiers variables/functions visibility constraints set karte hain class definitions boundaries me: public, private, and protected.',
    example: 'public: accessible anywhere | private: same class only | protected: same class + derived child classes.',
    code: `class Parent {\nprotected:\n    int value;\n};\n\nclass Child : public Parent {\npublic:\n    void setValue() {\n        value = 10; // Allowed because protected\n    }\n};`,
    interview: 'Private members are inherited but cannot be accessed directly by derived child classes (must use base getters/setters).'
  },
  'Abstraction': {
    definition: 'Abstraction ka matlab hai unnecessary implementation details ko hide karke user ko sirf essential functionality properties checks features expose karna.',
    example: 'Starting a car: you just press start button, you do not need to know fuel injection implementation details.',
    code: `#include <iostream>\nusing namespace std;\n\nclass Shape { // Abstract Class\npublic:\n    virtual void area() = 0; // Pure Virtual Function\n};\n\nclass Circle : public Shape {\npublic:\n    void area() override { cout << "Area of Circle\\n"; }\n};`,
    interview: 'Abstraction answers "What to do" while Encapsulation answers "How to protect data". Abstract classes contain at least one Pure Virtual Function (`= 0`) and cannot be instantiated.'
  },
  'Interface': {
    definition: 'Interface abstract designs specifications constraints blueprints functions signatures collections systems setup standard.',
    code: `class Payment {\npublic:\n    virtual void pay() = 0; // Pure virtual function interface model\n    virtual ~Payment() = default;\n};\n\nclass UPI : public Payment {\npublic:\n    void pay() override { cout << "Paying via UPI\\n"; }\n};`,
    interview: 'C++ does not have a dedicated `interface` keyword (unlike Java/C#); it is implemented using pure abstract classes.'
  },
  'Inheritance': {
    definition: 'Inheritance properties functions base class derived child class transfer reusability modularity code sharing coordinates maps.',
    code: `class Animal {\npublic:\n    void eat() { cout << "Eating\\n"; }\n};\n\nclass Dog : public Animal {\npublic:\n    void bark() { cout << "Barking\\n"; }\n};`,
    interview: 'Default inheritance mode in C++ classes is `private` (if no modifier specified). Virtual destructors are mandatory in parent base classes.'
  },
  'Polymorphism': {
    definition: 'Polymorphism = One Interface, Multiple forms. Same function name exhibits different behaviors depending on types.',
    code: `class Animal {\npublic:\n    virtual void sound() { cout << "Animal sound\\n"; }\n};\nclass Dog : public Animal {\npublic:\n    void sound() override { cout << "Dog barks\\n"; }\n};`,
    interview: 'Compile-time polymorphism is achieved via function overloading, while runtime polymorphism is achieved via method overriding using virtual functions.'
  },
  'Single Inheritance': {
    definition: 'Ek parent base class aur ek single derived child class ke beech relationship mapping.',
    code: `class Animal {};\nclass Dog : public Animal {};`,
    interview: 'Simple parent-child link. Code reusability in standard single subclass setups.'
  },
  'Multilevel Inheritance': {
    definition: 'Ek parent class derived from another parent class grandparent parent child hierarchical chain multilevel inheritance.',
    example: 'Grandparent (Animal) → Parent (Mammal) → Child (Dog).',
    code: `class Animal {};\nclass Mammal : public Animal {};\nclass Dog : public Mammal {};`,
    interview: 'Creates tight coupling in class hierarchies. Keep nesting hierarchies shallow to prevent complexity.'
  },
  'Hierarchical Inheritance': {
    definition: 'Ek single base parent class, multiple child subclasses inherited relationships.',
    code: `class Animal {};\nclass Dog : public Animal {};\nclass Cat : public Animal {};`,
    interview: 'Different specialized children sharing common parent capabilities configurations.'
  },
  'Multiple Inheritance': {
    definition: 'Ek child subclass multiple base parent classes components capabilities functions direct features inherited multiple inheritance setup.',
    code: `class Father {};\nclass Mother {};\nclass Child : public Father, public Mother {};`,
    interview: 'Diamond Problem resolution virtual base classes. Java classes do not support multiple inheritance directly to prevent ambiguity; C++ uses virtual inheritance.'
  },
  'Function Overloading': {
    definition: 'Same function name, different parameter listings compile time polymorphism function overloading.',
    code: `class Calculator {\npublic:\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n};`,
    interview: 'Determined at compile time based on parameter types/signature counts (Static binding).'
  },
  'Method Overriding': {
    definition: 'Parent and child class me same function signature standard, child class provides specialized override implementations.',
    code: `class Animal {\npublic:\n    virtual void sound() { cout << "Generic sound\\n"; }\n};\nclass Dog : public Animal {\npublic:\n    void sound() override { cout << "Dog barks\\n"; }\n};`,
    interview: 'Runtime polymorphism (Dynamic binding). Requires `virtual` keyword in the base class function definition.'
  },
  'Classes & Objects': {
    definition: 'Class ek template/blueprint design coordinates variables methods data set mapping hota hai, aur Object class ka dynamic instance variables coordinates maps execution instance hota hai.',
    code: `class Student {\npublic:\n    string name;\n};\nint main() {\n    Student s1; // Object creation\n    s1.name = "Ramnevas";\n    return 0;\n}`,
    interview: 'Class is a logical entity (takes no memory space), Object is a physical entity (allocated space in RAM at runtime).'
  },
  'Constructor': {
    definition: 'Special class function automatically executed on object creation to initialize variables data objects.',
    code: `class Student {\npublic:\n    string name;\n    Student(string n) { // Parameterized Constructor\n        name = n;\n    }\n};`,
    interview: 'Constructor has no return type and same name as the class. Default, parameterized, and copy constructors exist.'
  },
  'Destructor': {
    definition: 'Special class function executed automatically when object is destroyed to release memory resources allocations.',
    code: `class Student {\npublic:\n    ~Student() { // Destructor declaration\n        cout << "Object destroyed, resources freed\\n";\n    }\n};`,
    interview: 'Destructor cannot take arguments and cannot be overloaded. Always define Virtual Destructors in polymorphic base classes.'
  },
  'this Pointer': {
    definition: '`this` current object instance memory location address pointing parameters configurations C++ keyword pointer hota hai.',
    code: `class Student {\n    int age;\npublic:\n    Student(int age) {\n        this->age = age; // resolves name collision\n    }\n};`,
    interview: 'Passed as a hidden argument to non-static member functions. Points to the object executing the function.'
  },
  'static Keyword': {
    definition: 'Static members class variables properties methods individual objects instances se outside parameters class boundaries scope map share standard coordinates follow sets.',
    code: `class Student {\npublic:\n    static int count;\n    Student() { count++; }\n};\nint Student::count = 0; // memory allocation`,
    interview: 'Static variables are allocated memory in global data segment (only once) and shared across all instances.'
  },
  'Association': {
    definition: 'General dynamic connection relationship between two independent classes.',
    example: 'Teacher teaches Student. Both can exist independently.',
    code: `class Student {};\nclass Teacher {\n    vector<Student*> students; // Association link\n};`,
    interview: 'Represents a general link. One object uses services of another.'
  },
  'Aggregation': {
    definition: 'Weak has-a relationship between parent class and child class where child can exist independently if parent is destroyed.',
    example: 'Department has Teachers. If Department is deleted, Teachers still exist.',
    code: `class Teacher {};\nclass Department {\n    Teacher* t; // reference/pointer (weak link)\npublic:\n    Department(Teacher* teacher) { t = teacher; }\n};`,
    interview: 'Aggregation is a weak relationship. Life cycle of child is independent of parent.'
  },
  'Composition': {
    definition: 'Strong has-a relationship where child lifecycle is tightly coupled with parent. Deleting parent deletes child.',
    example: 'Car has Engine. If Car is destroyed, Engine is also destroyed.',
    code: `class Engine {};\nclass Car {\n    Engine e; // direct member ownership (strong link)\n};`,
    interview: 'Composition is a strong relationship. Child cannot exist without the parent.'
  },
  'Virtual Function': {
    definition: 'Parent base class function configured virtual so that child derived classes can override, dynamic call binding runtime decisions.',
    code: `class Base {\npublic:\n    virtual void show() { cout << "Base\\n"; }\n};\nclass Derived : public Base {\npublic:\n    void show() override { cout << "Derived\\n"; }\n};`,
    interview: 'Virtual functions populate the vtable (virtual table) pointers array for resolving function execution dynamically.'
  },
  'Exception Handling': {
    definition: 'Runtime exceptions error scenarios recovery checks try catch block structures C++ logic.',
    code: `try {\n    int a = 10, b = 0;\n    if (b == 0) throw "Division by Zero";\n    cout << a / b;\n} catch (const char* msg) {\n    cout << "Error: " << msg << endl;\n}`,
    interview: 'try catches dynamic exceptions. stack unwinding process releases resources allocated before throw.'
  },

  // ==========================================
  // ================= PART 3 — DBMS ============
  // ==========================================
  'DBMS vs File System': {
    definition: 'DBMS software database files configurations concurrent accesses security transactional locks provide queries checks SQL logic.',
    interview: 'File system has no concurrency logs, high redundancy, no ACID transactions, and limited data security. DBMS ensures structured data management.',
    example: 'DBMS uses relational databases (MySQL) while File System uses simple file structures (CSV, JSON).'
  },
  'Database Architecture & Abstraction': {
    definition: 'Database systems commonly 3-level architecture external level, conceptual level, internal level logical mappings use karti hai.',
    interview: 'Protects user views from physical memory configuration details changes.',
    example: 'External Level (User view) → Conceptual Level (Logical design) → Internal Level (Physical disk layout).'
  },
  'Data Abstraction': {
    definition: 'Physical storage details hide conceptual view representations mapping data abstraction.',
    interview: 'Levels: Physical Level (how physically stored), Logical Level (what data is stored), View Level (how users see it).',
    example: 'A banking app shows account balance without showing actual database files structure.'
  },
  'Data Independence': {
    definition: 'Lower level schema changes upper level schemas views configurations unaffected parameters data independence.',
    interview: 'Physical Data Independence (storage media changes) and Logical Data Independence (schema modification changes).',
    example: 'Moving database from HDD to SSD (Physical Data Independence) does not affect the SQL queries.'
  },
  'ER Model': {
    definition: 'Entity Relationship schema model database design attributes relations constraints visualization standard.',
    interview: 'Primary tool for conceptual schema design. Shapes database tables relational schemas.',
    example: 'Entity: Student | Attribute: RollNo, Name | Relationship: Enrolls Course.'
  },
  'Keys': {
    definition: 'Keys databases columns attributes parameters collections records uniquely identify relationships structures.',
    interview: 'Primary Key uniquely identifies, Foreign Key references another table Primary Key to construct database relations.',
    code: `CREATE TABLE Student (\n    id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\n\nCREATE TABLE Orders (\n    order_id INT PRIMARY KEY,\n    student_id INT,\n    FOREIGN KEY (student_id) REFERENCES Student(id)\n);`
  },
  'Relational Model': {
    definition: 'Data tables (relations), rows (tuples), columns (attributes) relational database mapping model structures.',
    interview: 'Backbone of SQL databases. Emphasizes structured relational data mapping configurations.',
    example: 'Table is a Relation, Row is a Tuple, Column is an Attribute.'
  },
  'DDL': {
    definition: 'DDL (Data Definition Language) database schema tables structures alter creation drops definitions.',
    code: `CREATE TABLE Student (\n    id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\n\nALTER TABLE Student ADD age INT;\nDROP TABLE Student;`,
    interview: 'DDL modifies the database schema definition structure, updates are auto-committed in standard engines.'
  },
  'DML': {
    definition: 'DML (Data Manipulation Language) database records values manipulation insertions updates deletions.',
    code: `INSERT INTO Student VALUES (1, 'Ramnevas', 22);\nUPDATE Student SET age = 23 WHERE id = 1;\nDELETE FROM Student WHERE id = 1;`,
    interview: 'DML modifies database records. Changes can be rolled back before transaction commits.'
  },
  'SELECT': {
    definition: 'SELECT data retrieval queries SQL statement syntax.',
    code: `SELECT name, age FROM Student WHERE age >= 18;`,
    interview: 'Base data fetching statement, used to project attributes and query database records.'
  },
  'WHERE': {
    definition: 'WHERE statement query database rows check conditions filter criteria SQL.',
    code: `SELECT * FROM Student WHERE age > 20 AND name = 'Ramnevas';`,
    interview: 'Filters records before grouping. Cannot be used with aggregate functions (use HAVING instead).'
  },
  'ORDER BY': {
    definition: 'ORDER BY SQL queries output results sorting ascending/descending order setup.',
    code: `SELECT * FROM Student ORDER BY age DESC, name ASC;`,
    interview: 'Performs sorting. Default sorting order is ASC (Ascending).'
  },
  'GROUP BY': {
    definition: 'GROUP BY SQL query parameters identical values split categories groups aggregates configurations.',
    code: `SELECT department, COUNT(*) FROM Employee GROUP BY department;`,
    interview: 'Groups rows sharing same values. Aggregate calculations are computed per group.'
  },
  'HAVING': {
    definition: 'HAVING SQL query group filter conditions constraints aggregates evaluations checks.',
    code: `SELECT department, AVG(salary) FROM Employee GROUP BY department HAVING AVG(salary) > 50000;`,
    interview: 'HAVING filters groups *after* GROUP BY, WHERE filters rows *before* grouping.'
  },
  'DISTINCT': {
    definition: 'DISTINCT SQL query output duplicate results values filter checks.',
    code: `SELECT DISTINCT department FROM Employee;`,
    interview: 'Removes duplicate row results from output list projections.'
  },
  'Aggregate Functions': {
    definition: 'SQL math summary functions multiple row values check calculations aggregate values return coordinates.',
    code: `SELECT COUNT(*), SUM(salary), AVG(salary), MIN(salary), MAX(salary) FROM Employee;`,
    interview: 'COUNT, SUM, AVG, MIN, MAX. Ignore NULL values in calculations except COUNT(*).'
  },
  'INNER JOIN': {
    definition: 'INNER JOIN matching values rows tables links common primary foreign keys associations.',
    code: `SELECT s.name, o.amount FROM Student s\nINNER JOIN Orders o ON s.id = o.student_id;`,
    interview: 'Returns records only when the join condition is satisfied in both tables.'
  },
  'LEFT JOIN': {
    definition: 'LEFT JOIN left table all rows + matching right table values join connections.',
    code: `SELECT s.name, o.amount FROM Student s\nLEFT JOIN Orders o ON s.id = o.student_id;`,
    interview: 'Returns all records from the left table, and matching records from the right table. Right values are NULL if no match.'
  },
  'RIGHT JOIN': {
    definition: 'RIGHT JOIN right table all rows + matching left table values join connections.',
    code: `SELECT s.name, o.amount FROM Student s\nRIGHT JOIN Orders o ON s.id = o.student_id;`,
    interview: 'Returns all records from the right table, and matching records from the left table. Left values are NULL if no match.'
  },
  'FULL OUTER JOIN': {
    definition: 'FULL OUTER JOIN combination of LEFT and RIGHT joins returning all records from both tables.',
    code: `// Emulated in MySQL using UNION:\nSELECT * FROM Student s LEFT JOIN Orders o ON s.id = o.student_id\nUNION\nSELECT * FROM Student s RIGHT JOIN Orders o ON s.id = o.student_id;`,
    interview: 'Returns all records. Unmatched rows from either side are padded with NULL values.'
  },
  'Views': {
    definition: 'Views are virtual database query tables saving SQL selections output configurations.',
    code: `CREATE VIEW active_students AS\nSELECT * FROM Student WHERE status = 'Active';`,
    interview: 'Virtual table. Simplifies query complexity and adds a security layer restricting direct table access.'
  },
  'Stored Procedures': {
    definition: 'Stored SQL queries modules database execution routines calls setups.',
    code: `DELIMITER //\nCREATE PROCEDURE GetEmployeeSalary(IN empId INT, OUT empSalary DECIMAL(10,2))\nBEGIN\n    SELECT salary INTO empSalary FROM Employee WHERE id = empId;\nEND //\nDELIMITER ;`,
    interview: 'Pre-compiled SQL queries. Reduces network traffic and increases execution speed.'
  },
  'Triggers': {
    definition: 'Trigger SQL blocks automatically fired on specific database events like INSERT, UPDATE, DELETE.',
    code: `CREATE TRIGGER update_stock AFTER INSERT ON OrderItems\nFOR EACH ROW\nBEGIN\n    UPDATE Products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;\nEND;`,
    interview: 'Maintains database referential integrity, auditing, and logging constraints automatically.'
  },
  'Normalization': {
    definition: 'Normalization process tables redundancy update anomalies minimize data design normalization schemas.',
    interview: 'Organizes attributes and relations to prevent Insert/Delete/Update database anomalies.',
    example: 'Splitting large table of student info + department info into separate Student and Department tables.'
  },
  '1NF': {
    definition: 'First Normal Form specifies atomic values per cell, no duplicate columns or groups.',
    interview: 'Cell atomic values constraints. Eliminates repeating groups.',
    example: 'Ram | 9999,8888 → Split to Ram | 9999 and Ram | 8888.'
  },
  '2NF': {
    definition: 'Second Normal Form requires 1NF + no Partial Dependency (attributes must depend on whole primary key).',
    interview: 'Relevant to composite keys. Fully dependent attributes checks.'
  },
  '3NF': {
    definition: 'Third Normal Form requires 2NF + no Transitive Dependency (non-key attributes cannot depend on other non-key attributes).',
    interview: 'Eliminates cascading functional dependencies.',
    example: 'StudentID → DeptID; DeptID → DeptName. DeptName belongs in separate Department table.'
  },
  'Transactions': {
    definition: 'Transactions logical DB operation block executions.',
    code: `BEGIN;\nUPDATE Account SET balance = balance - 100 WHERE id = 1;\nUPDATE Account SET balance = balance + 100 WHERE id = 2;\nCOMMIT; // or ROLLBACK on failure`,
    interview: 'Ensures database transaction blocks either complete fully (Commit) or revert completely (Rollback).'
  },
  'ACID Properties': {
    definition: 'ACID stands for Atomicity, Consistency, Isolation, Durability. Standard transactions parameters.',
    interview: 'Atomicity (All or nothing), Consistency (Valid state), Isolation (Concurrency safety), Durability (Persistent commits).'
  },
  'Concurrency Control': {
    definition: 'Multiple concurrent users database modifications safety checks consistency logs.',
    interview: 'Uses locks (Shared/Exclusive), Two-Phase Locking (2PL), or MVCC to prevent dirty reads and write conflicts.'
  },
  'Indexing': {
    definition: 'Indexes data structure setups database searching speedups optimization.',
    code: `CREATE INDEX idx_stu_name ON Student(name);`,
    interview: 'Improves query read performance. Disadvantage: Slower inserts/updates/deletes due to index restructuring.'
  },
  'SQL vs NoSQL': {
    definition: 'SQL relational structured tables schema databases vs NoSQL dynamic flexible collections document storage schemas.',
    interview: 'SQL (Structured, Joins, ACID) vs NoSQL (Scalable, Dynamic Schemas, Document/Key-Value).'
  },
  'MongoDB vs MySQL': {
    definition: 'MongoDB document JSON database vs MySQL relational rows/columns schema tables database.',
    interview: 'MongoDB is BSON document-oriented and scales horizontally. MySQL is relational and optimized for complex structured relational joins.'
  },

  // ==========================================
  // ================= PART 5 — OS ==============
  // ==========================================
  'Operating System': {
    definition: 'Operating System system software interface coordinating hardware components applications resources.',
    interview: 'Provides Process, Memory, File, and Device Management services.',
    example: 'Windows, macOS, Linux, Android, iOS.'
  },
  'Kernel': {
    definition: 'Kernel core OS component interacting directly with hardware resources and running memory processes.',
    interview: 'Monolithic vs Microkernel. Acts as a bridge between applications and hardware.'
  },
  'System Calls': {
    definition: 'API system interfaces applications OS kernel services request operations.',
    code: `#include <unistd.h>\n#include <sys/types.h>\n#include <iostream>\nusing namespace std;\n\nint main() {\n    pid_t p = fork(); // fork() is a system call to create child process\n    if (p < 0) cout << "Fork failed\\n";\n    else if (p == 0) cout << "Child process\\n";\n    else cout << "Parent process\\n";\n    return 0;\n}`,
    interview: 'The interface between user application code and the privileged kernel mode operations.'
  },
  'User Mode vs Kernel Mode': {
    definition: 'User mode restricted permissions applications execution vs Kernel mode unrestricted privileged OS system execution.',
    interview: 'Protects system memory. CPU switches to kernel mode via system call interrupts to access hardware.'
  },
  'Process': {
    definition: 'Program in active execution is called Process.',
    interview: 'Contains Code, Data, Heap, Stack, and PCB. Takes active memory allocations.',
    example: 'Chrome.exe or Spotify.exe running in system background.'
  },
  'Program vs Process': {
    definition: 'Program passive binary code stored on disk vs Process active execution unit loaded in RAM.',
    code: `// A simple compiled binary executable on disk is a program.\n// When executing, OS creates a PCB block and allocates memory heap/stack which represents the active Process.`,
    interview: 'Program is passive (passive set of instructions on disk), Process is active (currently in execution).'
  },
  'Process States': {
    definition: 'Process cycle states: New, Ready, Running, Waiting, Terminated.',
    interview: 'Ready (waiting for CPU), Running (executing instructions), Waiting (blocked on I/O).'
  },
  'PCB': {
    definition: 'Process Control Block containing Process ID, Program Counter, Registers, States, and Memory Allocations.',
    interview: 'OS process profile record block. Used for context switching state saves.'
  },
  'Context Switching': {
    definition: 'CPU process state saving and loading execution switches.',
    interview: 'Saves current process state to PCB, loads next process PCB state. Introduces context switch CPU overhead.'
  },
  'CPU Scheduling': {
    definition: 'CPU scheduling algorithms next process executions allocation selector.',
    interview: 'Determines process queue allocation to maximize CPU utilization.'
  },
  'FCFS': {
    definition: 'First Come First Serve CPU scheduling algorithm.',
    interview: 'Non-preemptive. Simple, but suffers from Convoy Effect (short processes waiting behind long ones).'
  },
  'SJF': {
    definition: 'Shortest Job First CPU scheduling based on minimal execution time.',
    interview: 'Yields optimal average waiting time. Disadvantage: Starvation of longer CPU processes.'
  },
  'SRTF': {
    definition: 'Shortest Remaining Time First preemptive SJF scheduling algorithm.',
    interview: 'CPU switches if arriving process remaining time is lower than current running process remaining time.'
  },
  'Priority Scheduling': {
    definition: 'Priority levels based CPU scheduling allocations.',
    interview: 'High priority runs first. Starvation solved using Aging (gradually increasing priority of waiting processes).'
  },
  'Round Robin': {
    definition: 'Time quantum based fair sharing CPU scheduling algorithm.',
    interview: 'Every process runs for fixed time quantum (e.g. 2ms) then preempts. Best for interactive/time-sharing systems.'
  },
  'Process vs Thread': {
    definition: 'Process independent memory unit vs Thread lightweight execution unit sharing parent process memory spaces.',
    interview: 'Processes have separate address space (expensive context switch). Threads share memory (cheap context switch).'
  },
  'Multithreading': {
    definition: 'Concurrently running multiple thread execution units inside same process boundaries.',
    interview: 'Maximizes application concurrency (e.g. UI thread, download thread, network thread in browsers).'
  },
  'Critical Section': {
    definition: 'Code segment jahan shared resources/data variables access aur updates variables synchronize operations run hoti hain.',
    interview: 'Must satisfy Mutual Exclusion, Progress, and Bounded Waiting criteria.'
  },
  'Race Condition': {
    definition: 'Multiple threads updating shared variable simultaneously resulting in inconsistent outputs depending on execution order/timing.',
    code: `// Race condition example:\ncounter++; // Read-Modify-Write conflict when run by 2 threads`,
    interview: 'Prevented using synchronization mechanisms like Mutexes or Semaphores.'
  },
  'Mutex': {
    definition: 'Mutual Exclusion ownership locking mechanism restricting critical section to single thread.',
    code: `mutex mtx;\nmtx.lock();\n// critical section\nmtx.unlock();`,
    interview: 'Ownership-based locking. Only the thread that locked the mutex can unlock it.'
  },
  'Semaphore': {
    definition: 'Signaling and counting synchronization variable coordinating resource limits.',
    code: `#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nclass Semaphore {\n    int count;\n    mutex mtx;\n    condition_variable cv;\npublic:\n    Semaphore(int c) { count = c; }\n    void wait() {\n        unique_lock<mutex> lock(mtx);\n        while (count == 0) cv.wait(lock);\n        count--;\n    }\n    void signal() {\n        unique_lock<mutex> lock(mtx);\n        count++;\n        cv.notify_one();\n    }\n};`,
    interview: 'Counting Semaphore (coordinates N resources) vs Binary Semaphore (0/1, behaves like mutex but no ownership constraint).'
  },
  'Monitor': {
    definition: 'High-level synchronization construct encapsulating shared variables and sync methods.',
    interview: 'Enforces mutual exclusion implicitly at compiler/runtime level (e.g. Java Synchronized methods).'
  },
  'Deadlock': {
    definition: 'Multiple processes blocked waiting for resources held by each other, causing infinite wait.',
    example: 'Process 1 holds Resource A, waits for B. Process 2 holds Resource B, waits for A.',
    interview: 'No process can proceed, resulting in a system freeze.'
  },
  'Four Necessary Conditions': {
    definition: 'Deadlock conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
    interview: 'Deadlock occurs only if all four necessary conditions are satisfied simultaneously.'
  },
  'Deadlock Prevention': {
    definition: 'Eliminating at least one necessary condition of deadlock structurally.',
    interview: 'Preventing Circular Wait (imposing resource ordering) or Hold & Wait (requesting all resources at once).'
  },
  'Deadlock Avoidance': {
    definition: 'Checking resource allocation dynamic safety states to prevent deadlocks.',
    interview: 'Ensures system stays in a Safe State. Allocates resource only if a safe execution path exists.'
  },
  'Banker\'s Algorithm': {
    definition: 'Deadlock avoidance safe sequence algorithm evaluating resource demands.',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool isSafe(int processes[], int avail[], int max[][3], int allot[][3], int P, int R) {\n    int need[5][3];\n    for (int i = 0 ; i < P ; i++)\n        for (int j = 0 ; j < R ; j++)\n            need[i][j] = max[i][j] - allot[i][j];\n    vector<bool> finish(P, false); int work[3];\n    for (int i = 0; i < R; i++) work[i] = avail[i];\n    while (true) {\n        bool found = false;\n        for (int p = 0; p < P; p++) {\n            if (!finish[p]) {\n                int j;\n                for (j = 0; j < R; j++) if (need[p][j] > work[j]) break;\n                if (j == R) {\n                    for (int k = 0 ; k < R ; k++) work[k] += allot[p][k];\n                    finish[p] = true; found = true;\n                }\n            }\n        }\n        if (!found) break;\n    }\n    for (int i = 0; i < P; i++) if (!finish[i]) return false;\n    return true;\n}`,
    interview: 'Uses Allocation, Max, Available matrices to verify if allocating resources keeps system safe.'
  },
  'Deadlock Detection': {
    definition: 'Periodically executing algorithms checking if deadlock exists currently in systems.',
    interview: 'Uses Resource Allocation Graphs (RAG) to look for cycles.'
  },
  'Deadlock Recovery': {
    definition: 'Aborting deadlock processes or preempting resources to recover system.',
    interview: 'Kills deadlocked processes or rollbacks transactions to restore safe operation.'
  },
  'RAM': {
    definition: 'Random Access Memory volatile runtime temporary memory space.',
    interview: 'Fast, volatile memory storing code and data of currently running processes.'
  },
  'Virtual Memory': {
    definition: 'OS memory management using disk storage space as extension of physical RAM.',
    interview: 'Enables execution of programs larger than physical RAM size. Uses Page tables for address mapping.'
  },
  'Paging': {
    definition: 'Memory split into fixed-size logical blocks (Pages) mapped to physical frames.',
    interview: 'Translates logical addresses to physical frames. Prevents external fragmentation.'
  },
  'Segmentation': {
    definition: 'Memory split into variable-sized logical segments (Code, Stack, Heap).',
    interview: 'Fits user/logical view of programs. Subject to external memory fragmentation.'
  },
  'Page Fault': {
    definition: 'Page fault event occurs when required logical page is not present in RAM.',
    interview: 'Triggers trap to OS. OS fetches required page from disk to RAM frame.'
  },
  'Page Replacement': {
    definition: 'Selecting which page frame to swap out when RAM is full and page fault occurs.',
    interview: 'Algorithms: FIFO (oldest), LRU (least recently used), Optimal (furthest future use).'
  },
  'FIFO': {
    definition: 'First In First Out page replacement algorithm.',
    interview: 'Swaps out the oldest page. Suffers from Belady\'s Anomaly (more page faults with more frames).'
  },
  'LRU': {
    definition: 'Least Recently Used page replacement algorithm.',
    interview: 'Swaps out the page that has not been accessed for the longest time.'
  },
  'Optimal Page Replacement': {
    definition: 'Theoretical best page replacement algorithm swapping out page needed furthest in the future.',
    interview: 'Yields lowest page faults. Cannot be implemented because future page access timeline is unknown.'
  },
  'File Allocation': {
    definition: 'Mapping file blocks to disk sectors: Contiguous, Linked, or Indexed.',
    example: '1. Contiguous: fast sequential reads. 2. Linked: pointers chain. 3. Indexed: index directory block.',
    interview: 'Contiguous (fast, external fragmentation), Linked (no fragmentation, slow access), Indexed (uses index blocks).'
  },
  'Disk Scheduling': {
    definition: 'Ordering disk read/write requests to minimize cylinder seek time.',
    example: 'FCFS: Processes requests in arriving order. SCAN: Sweeps back and forth like an elevator.',
    interview: 'Algorithms: FCFS, SSTF (shortest seek time first), SCAN (elevator algorithm), C-SCAN, LOOK, C-LOOK.'
  },

  // ==========================================
  // ================= PART 4 — Networks ========
  // ==========================================
  'Computer Network': {
    definition: 'Interconnected computing devices communicating and sharing resources.',
    interview: 'Enables data transport, resource sharing, and distributed communication.',
    example: 'Laptop connected to Wi-Fi Router connecting to the Internet.'
  },
  'Network Types': {
    definition: 'Network ranges: PAN (Personal), LAN (Local), MAN (Metropolitan), WAN (Wide/Internet).',
    interview: 'PAN (Bluetooth) < LAN (Home/Office) < MAN (City) < WAN (Internet).'
  },
  'Network Topologies': {
    definition: 'Physical layouts of network nodes: Bus, Star, Ring, Mesh, Hybrid.',
    interview: 'Star is most common in LANs (uses central switch/hub). Mesh has highest redundancy.'
  },
  'OSI Model Layers': {
    definition: '7-Layer Open Systems Interconnection model mapping network communications.',
    example: 'Mnemonic: All People Seem To Need Data Processing\n7. Application | 6. Presentation | 5. Session | 4. Transport | 3. Network | 2. Data Link | 1. Physical',
    interview: 'Standard framework for understanding network transport layers.'
  },
  'Physical Layer': {
    definition: 'First OSI layer transmitting raw bits over physical mediums.',
    interview: 'Handles cables, pins, voltages, and signals. Device: Hubs, Repeaters.'
  },
  'Data Link Layer': {
    definition: 'Second OSI layer handling node-to-node frame delivery and MAC addressing.',
    interview: 'Performs error checking (CRC) and flow control. Device: Switches, Bridges.'
  },
  'Network Layer': {
    definition: 'Third OSI layer managing logical IP addressing and packet routing across networks.',
    interview: 'Handles routing paths determinations. Device: Routers. Protocol: IP, ICMP.'
  },
  'Transport Layer': {
    definition: 'Fourth OSI layer managing end-to-end communication, port addressing, reliability, and flow control.',
    interview: 'Handles TCP (reliable) and UDP (unreliable) connection streams.'
  },
  'Session Layer': {
    definition: 'Fifth OSI layer establishing, maintaining, and terminating connection sessions between applications.',
    interview: 'Coordinates authorization, connection checkpoints, and session recoveries.'
  },
  'Presentation Layer': {
    definition: 'Sixth OSI layer formatting, encrypting, and compressing data for applications.',
    interview: 'Translates data formats (e.g. EBCDIC to ASCII), handles encryption/decryption (SSL/TLS).'
  },
  'Application Layer': {
    definition: 'Seventh OSI layer providing user application network protocol interfaces.',
    interview: 'User-facing protocols: HTTP, HTTPS, FTP, SMTP, DNS, DHCP.'
  },
  'TCP/IP Model': {
    definition: '4-Layer network architecture model: Application, Transport, Internet, Network Access.',
    example: 'Application (OSI 5,6,7) → Transport (OSI 4) → Internet (OSI 3) → Network Access (OSI 1,2)',
    interview: 'TCP/IP Model is the actual implementation of network layers on the Internet.'
  },
  'HTTP': {
    definition: 'HyperText Transfer Protocol web client-server communications.',
    code: `GET /index.html HTTP/1.1\nHost: example.com`,
    interview: 'Stateless protocol. Port: 80. Used for request-response cycle on the web.'
  },
  'HTTPS': {
    definition: 'HyperText Transfer Protocol Secure utilizing SSL/TLS encryption.',
    interview: 'HTTP over TLS/SSL. Port: 443. Protects data from interception and validates server identity.'
  },
  'FTP': {
    definition: 'File Transfer Protocol managing file uploads/downloads.',
    interview: 'Uses two connections: Port 21 (Control) and Port 20 (Data).'
  },
  'SMTP': {
    definition: 'Simple Mail Transfer Protocol sending mail server transmissions.',
    interview: 'Used for sending emails between mail servers. Port: 25.'
  },
  'DNS': {
    definition: 'Domain Name System resolving human readable domain names to IP addresses.',
    example: 'google.com → DNS → 142.250.190.46',
    interview: 'Phonebook of the internet. Resolves host names. Port: 53 (UDP).'
  },
  'DHCP': {
    definition: 'Dynamic Host Configuration Protocol dynamically assigning network configurations.',
    interview: 'Automatically assigns IP, Subnet mask, Gateway, DNS server. Port: 67/68.'
  },
  'TCP': {
    definition: 'Transmission Control Protocol reliable connection-oriented transport protocol.',
    interview: 'Connection-oriented. Uses 3-way handshake. Guarantees delivery and ordering. Flow control.'
  },
  'UDP': {
    definition: 'User Datagram Protocol connectionless low-overhead transport protocol.',
    interview: 'Connectionless. Faster but unreliable. No ordering or delivery guarantees. Used in gaming, streaming.'
  },
  'TCP vs UDP': {
    definition: 'TCP reliable connection-oriented stream vs UDP fast connectionless datagram stream.',
    interview: 'TCP (Reliable, Ordered, Heavyweight, Port: 80/443/25) vs UDP (Fast, Unreliable, Lightweight, Port: 53/67/68).'
  },
  'IPv4': {
    definition: 'Internet Protocol version 4 using 32-bit addresses.',
    example: '192.168.1.1',
    interview: '32-bit decimal addresses. Offers ~4.3 billion unique IP addresses.'
  },
  'IPv6': {
    definition: 'Internet Protocol version 6 using 128-bit addresses.',
    example: '2001:db8::1',
    interview: '128-bit hexadecimal addresses. Solves IPv4 address depletion.'
  },
  'Subnetting': {
    definition: 'Dividing a network address space into smaller logical subnetworks.',
    example: '192.168.1.0/24 subnetted into smaller /26 ranges.',
    interview: 'Improves routing control and network security. Prefix length (e.g. /24) defines network bits.'
  },
  'MAC Address': {
    definition: 'Media Access Control 48-bit unique physical address burned into NIC.',
    example: '00:1A:2B:3C:4D:5E',
    interview: 'Physical address. Unique worldwide. Used for local frame delivery on Data Link layer.'
  },
  'ARP': {
    definition: 'Address Resolution Protocol mapping dynamic IP addresses to physical MAC addresses.',
    interview: 'Broadcasts IP request to local network to fetch matching MAC address. Operates on Data Link layer.'
  },
  'Routing': {
    definition: 'Path selection algorithms directing packets from source to destination networks.',
    interview: 'Uses routing tables. Routers forward packets based on destination IP address.'
  },
  'HTTP Request-Response Cycle': {
    definition: 'Client HTTP request followed by server HTTP response cycle.',
    example: 'GET request fetches index.html → Server responds with 200 OK HTML.',
    interview: 'Status Codes: 200 (OK), 201 (Created), 400 (Bad), 401 (Auth), 403 (Forbidden), 404 (Not Found), 500 (Server Error).'
  },

  // ==========================================
  // ================= PART 5 — Software Engineering ============
  // ==========================================
  'Waterfall Model': {
    definition: 'Waterfall Model ek sequential development model hai jisme requirements gathering, design, implementation, testing, deployment, aur maintenance phases step-by-step complete hote hain.',
    interview: 'Iska main drawback hai rigidity—once a phase is complete, going back to make changes is extremely difficult and costly.'
  },
  'Agile Methodology': {
    definition: 'Agile ek iterative software development framework hai jo continuous collaboration, adaptability, customer feedback, and incremental delivery par focus karta hai.',
    interview: 'Enables quick adaptation to changing requirements and delivers functional software in short cycles (sprints).'
  },
  'Scrum Framework': {
    definition: 'Scrum ek agile software engineering process framework hai jisme teams sprints (usually 2-4 weeks) ke cycles me deliverables target karti hain.',
    interview: 'Roles: Product Owner, Scrum Master, Developers. Ceremonies: Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective.'
  },
  'SDLC Phases': {
    definition: 'SDLC (Software Development Life Cycle) standard phases: Requirements, Design, Implementation (Coding), Testing, Deployment, and Maintenance.',
    interview: 'Ensure each phase completes its Entry/Exit criteria for strong code quality.'
  },
  'SOLID Principles': {
    definition: 'SOLID are five object-oriented design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.',
    interview: 'S: One class has one reason to change. O: Open for extension, closed for modification. L: Subtypes must be substitutable for base types. I: Many client-specific interfaces are better than one general interface. D: Depend on abstractions, not concretions.'
  },
  'DRY & KISS': {
    definition: 'DRY: Don\'t Repeat Yourself (reduces code redundancy). KISS: Keep It Simple, Stupid (encourages simple and readable design).',
    interview: 'DRY prevents copy-paste maintenance issues, KISS avoids over-engineering systems.'
  },
  'MVC Architecture': {
    definition: 'Model-View-Controller design pattern separating application logic (Model), UI presentation (View), and user input handlers (Controller).',
    interview: 'Improves scalability and decoupling. E.g., Backend routes act as Controllers, DB schemas as Models, React pages as Views.'
  },
  'Monolithic vs Microservices': {
    definition: 'Monolithic binds all backend features in a single server process, whereas Microservices breaks them into independent, decoupled service APIs.',
    interview: 'Monolith is easier to develop/deploy initially; Microservices offers independent scaling, fault isolation, and technology stack flexibility.'
  },
  'Unit Testing': {
    definition: 'Testing individual software units or functions in isolation (e.g. using Jest, Mocha, or JUnit).',
    interview: 'Uses Mock objects to bypass database/network dependencies. Ensures individual logic behaves correctly.'
  },
  'Integration Testing': {
    definition: 'Testing combined software modules together to verify their interactions and data flows.',
    interview: 'Validates API endpoints interacting with database adapters or external third-party services.'
  },
  'System Testing': {
    definition: 'Testing the complete, integrated application system as a whole to ensure it meets specifications.',
    interview: 'Black-box testing covering security, performance, stress limits, and end-to-end user flows.'
  },
  'CI/CD Pipelines': {
    definition: 'Continuous Integration & Continuous Deployment pipelines automate building, testing, and deploying codebase updates to production.',
    interview: 'Triggers automatically on git push (e.g. GitHub Actions). Reduces manual deployment errors and catches bugs early.'
  },

  // ==========================================
  // ================= PART 6 — Computer Architecture ============
  // ==========================================
  'CPU Structure': {
    definition: 'CPU core subunits: ALU (Arithmetic Logic Unit), CU (Control Unit), and Registers (high-speed internal CPU storage).',
    interview: 'ALU performs calculations, CU decodes instructions and directs data paths, registers hold active instruction data.'
  },
  'Von Neumann Architecture': {
    definition: 'Computer architecture design incorporating a shared memory bus for both instructions and data.',
    interview: 'Von Neumann Bottleneck occurs because CPU throughput is limited by the shared bus bottleneck speed.'
  },
  'Instruction Cycle': {
    definition: 'The fetch, decode, execute, and store sequence executed continuously by the CPU for every instruction.',
    interview: 'Program Counter (PC) stores next instruction address, Instruction Register (IR) holds current decoded instruction.'
  },
  'ALU & Control Unit': {
    definition: 'ALU executes arithmetic/logical operations; Control Unit generates timing signals to sync processor operations.',
    interview: 'CU acts as the brain\'s traffic cop, translating binary instructions into hardware control signals.'
  },
  'Pipelining': {
    definition: 'Instruction execution optimization technique that overlaps multiple instruction stages simultaneously.',
    interview: 'Speeds up instruction throughput. Performance can be degraded by hazards: Structural, Data, and Control (branches).'
  },
  'Superscalar Architecture': {
    definition: 'Processor architecture executing multiple instructions per clock cycle utilizing multiple execution pipelines.',
    interview: 'Requires redundant ALU units and hazard prediction logic to execute independent instructions in parallel.'
  },
  'Hazards': {
    definition: 'Pipelining issues preventing next instruction execution: Structural (resource clash), Data (dependency), Control (branch/jump).',
    interview: 'Mitigated by pipeline stalling (bubbles), data forwarding, or branch predictors.'
  },
  'Cache Coherence': {
    definition: 'Ensuring that shared memory updates are consistently propagated across all local CPU cores caches.',
    interview: 'Protocols like MESI (Modified, Exclusive, Shared, Invalid) keep cache records synchronized across multi-core systems.'
  },
  'DMA (Direct Memory Access)': {
    definition: 'Hardware system allowing I/O devices to transfer data directly to/from main memory without constant CPU intervention.',
    interview: 'Releases CPU from handling byte transfer interrupts, significantly improving high-speed I/O device throughput.'
  },
  'I/O Interrupts': {
    definition: 'Hardware/software signals notifying the CPU that an I/O event requires immediate attention.',
    interview: 'Saves CPU cycles compared to Polling. CPU executes Interrupt Service Routine (ISR) when triggered.'
  },
  'Register Transfer': {
    definition: 'Micro-operations transferring binary data details between registers inside the CPU core.',
    interview: 'Baseline timing actions specifying register load, store, shift, or arithmetic steps.'
  },

  // ==========================================
  // ================= PART 7 — Cyber Security ============
  // ==========================================
  'CIA Triad': {
    definition: 'Core security model parameters: Confidentiality (encryption), Integrity (hashing), Availability (uptime/redundancy).',
    interview: 'C protects privacy, I prevents unauthorized tampering, A ensures authorized resource access.'
  },
  'Symmetric Encryption': {
    definition: 'Encryption method using a single shared key for both encrypting and decrypting data (e.g. AES, DES).',
    interview: 'Fast and lightweight. Main challenge: Securely sharing the key between sender and receiver.'
  },
  'Asymmetric Encryption': {
    definition: 'Encryption method utilizing key pairs: Public Key (anyone can encrypt) and Private Key (only owner decrypts) (e.g. RSA, ECC).',
    interview: 'Solves key distribution issues, but is computationally slower. Used in SSL/TLS handshakes.'
  },
  'Digital Signatures': {
    definition: 'Cryptographic mechanism verifying message authenticity and non-repudiation using key pairs.',
    interview: 'Sender encrypts hash using Private Key. Receiver decrypts hash using Public Key and verifies matches.'
  },
  'Hashing Algorithms': {
    definition: 'One-way mathematical functions converting data inputs to fixed-size unique hash values (e.g. SHA-256, MD5, bcrypt).',
    interview: 'One-way only (cannot reverse decrypt). Used to store user passwords securely and verify data integrity.'
  },
  'Phishing & Social Engineering': {
    definition: 'Tricking users into revealing sensitive credentials or data using fraudulent communications (emails, fake pages).',
    interview: 'Human-layer threat. Mitigated by Multi-Factor Authentication (MFA) and user security training.'
  },
  'SQL Injection': {
    definition: 'Vulnerability where malicious SQL queries are input into text fields to manipulate backend databases directly.',
    interview: 'Mitigated by Parametrized Queries (Prepared Statements) or using modern ORMs (like Mongoose or Sequelize).'
  },
  'XSS (Cross-Site Scripting)': {
    definition: 'Vulnerability allowing attackers to inject malicious scripts into trusted websites visited by other users.',
    interview: 'Mitigated by Sanitizing input strings and utilizing Content Security Policies (CSP) to restrict script sources.'
  },
  'DDoS Attacks': {
    definition: 'Distributed Denial of Service floods web servers with high volumes of traffic to crash system availability.',
    interview: 'Mitigated by rate limiting, Cloudflare filtering, and globally distributed CDNs.'
  },
  'Malware & Ransomware': {
    definition: 'Malicious software designed to compromise systems (Malware) or encrypt files demanding financial payment (Ransomware).',
    interview: 'Prevented by operating system patches, strict execution policies, and automated snapshot backups.'
  },
  'Firewalls': {
    definition: 'Network security system monitoring and controlling incoming/outgoing traffic based on security policies.',
    interview: 'Can be stateless (filters packets) or stateful (inspects active connection streams).'
  },
  'VPN (Virtual Private Network)': {
    definition: 'Encrypted tunnel routing local network connections securely through a remote server.',
    interview: 'Masks client IP address and encrypts network traffic to prevent local Wi-Fi eavesdropping.'
  },
  'IDS / IPS': {
    definition: 'Intrusion Detection System (alerts on threats) and Intrusion Prevention System (actively blocks threats).',
    interview: 'Analyzes packet payloads against signature patterns or anomaly detection profiles.'
  },
  'Zero Trust Security': {
    definition: 'Security paradigm based on the principle of "Never Trust, Always Verify" for all network connections.',
    interview: 'Requires continuous authentication, micro-segmentation, and minimal privilege rights checks.'
  },

  // ==========================================
  // ================= PART 8 — Cloud Computing ============
  // ==========================================
  'IaaS': {
    definition: 'Infrastructure as a Service providing virtualized raw compute, storage, and networking resources over the internet (e.g., AWS EC2).',
    interview: 'Client manages operating systems, runtimes, database applications, and configurations.'
  },
  'PaaS': {
    definition: 'Platform as a Service providing pre-configured application runtimes and databases (e.g., Heroku, AWS Elastic Beanstalk).',
    interview: 'Client just deploys application code. Cloud provider manages OS patching and scaling.'
  },
  'SaaS': {
    definition: 'Software as a Service providing complete, user-facing software applications over the web (e.g., Gmail, Office 365).',
    interview: 'Zero code management needed. The application is completely hosted and updated by the provider.'
  },
  'Serverless Computing': {
    definition: 'Cloud execution model executing short-lived code tasks on demand without provisioning standing servers (e.g. AWS Lambda).',
    interview: 'Highly scalable, "pay-per-execution" billing. Avoids cold start latency overheads by keeping functions warm.'
  },
  'Public Cloud': {
    definition: 'Cloud infrastructure shared across multiple corporate tenants and hosted by third-party hyperscalers (AWS, Azure, GCP).',
    interview: 'Highly cost-effective with zero capital expenditure; resources are shared securely on public channels.'
  },
  'Private Cloud': {
    definition: 'Cloud infrastructure dedicated entirely to a single enterprise tenant on secure internal networks.',
    interview: 'Offers maximum security, custom configurations, and compliance controls at higher hardware costs.'
  },
  'Hybrid Cloud': {
    definition: 'Combining Public Cloud services with Private Cloud/On-Premise servers to share data resources.',
    interview: 'Enables "cloud bursting"—moving data workloads to the public cloud when local on-premise compute capacity spikes.'
  },
  'Multi-Cloud': {
    definition: 'Utilizing cloud compute services from multiple distinct public providers (e.g., AWS + Azure) to prevent vendor lock-in.',
    interview: 'Reduces downtime risks and optimizes cloud costs, but increases multi-platform administration overhead.'
  },
  'Virtualization': {
    definition: 'Technology using a Hypervisor software layer to split physical server resources into multiple virtual machines (VMs).',
    interview: 'Allows running different operating systems on the same physical processor hardware.'
  },
  'Containers & Docker': {
    definition: 'Bundling application code, packages, and dependencies in isolated container files sharing the host OS kernel (via Docker).',
    interview: 'Much lighter than virtual machines since they do not bundle separate guest operating systems.'
  },
  'Kubernetes Orchestration': {
    definition: 'Open-source platform automating deployment, scaling, and management of containerized application clusters.',
    interview: 'Provides self-healing (replaces dead containers), load balancing, and rolling software updates.'
  },
  'Load Balancing & Auto-scaling': {
    definition: 'Distributing traffic to multiple servers (Load Balancing) and adding/removing servers dynamically based on CPU usage (Auto-scaling).',
    interview: 'Prevents single-node server crashes and minimizes cloud costs during quiet business hours.'
  },

  // ==========================================
  // ================= PART 9 — AI & ML ============
  // ==========================================
  'Artificial Intelligence': {
    definition: 'Creating systems and computers capable of executing cognitive tasks requiring human intelligence.',
    interview: 'Encompasses machine learning, expert planning systems, robotics, and natural language processing.'
  },
  'Turing Test': {
    definition: 'A test of a machine\'s ability to exhibit intelligent behavior indistinguishable from that of a human.',
    interview: 'Evaluates if a human evaluator conversing blindly cannot distinguish machine outputs from a human.'
  },
  'Expert Systems': {
    definition: 'Traditional AI system using a knowledge base and IF-THEN rules engine to solve complex logical problems.',
    interview: 'Rule-based. Excellent for structured diagnostics, but lacks dynamic learning capabilities.'
  },
  'Supervised Learning': {
    definition: 'Machine learning algorithms trained on labeled datasets containing inputs and matching correct target outputs.',
    interview: 'Algorithms: Linear Regression, Logistic Regression, Decision Trees, Support Vector Machines (SVM).'
  },
  'Unsupervised Learning': {
    definition: 'Machine learning algorithms trained on unlabeled datasets to discover underlying clusters and structures.',
    interview: 'Algorithms: K-Means Clustering, Hierarchical Clustering, Principal Component Analysis (PCA).'
  },
  'Reinforcement Learning': {
    definition: 'ML paradigm where software agents learn optimal actions in an environment to maximize cumulative reward parameters.',
    interview: 'Uses feedback loops (Action, State, Reward). Popular in robotics, self-driving cars, and game play.'
  },
  'Overfitting & Underfitting': {
    definition: 'Overfitting: Model memorizes training noise and fails on test data. Underfitting: Model is too simple to learn the dataset trend.',
    interview: 'Overfitting is resolved by regularization, more training data, or dropout. Underfitting requires increasing model parameters.'
  },
  'Neural Networks': {
    definition: 'Computational models inspired by biological brain neurons composed of input, hidden, and output layers.',
    interview: 'Nodes compute weighted inputs, add biases, and pass results through activation functions to make predictions.'
  },
  'Activation Functions': {
    definition: 'Mathematical functions introducing non-linearity to neural network outputs (e.g. ReLU, Sigmoid, Tanh).',
    interview: 'ReLU is most popular in hidden layers to mitigate vanishing gradient problems; Sigmoid is used for binary classifications.'
  },
  'NLP (Natural Language Processing)': {
    definition: 'Enabling computers to read, translate, parse, and generate human languages (e.g. tokenization, sentiment analysis, Transformers).',
    interview: 'Modern NLP relies heavily on Large Language Models (LLMs) utilizing self-attention networks.'
  },
  'Computer Vision': {
    definition: 'AI applications training computers to recognize and interpret physical world images and video streams.',
    interview: 'Commonly utilizes Convolutional Neural Networks (CNNs) to detect visual edges and object layers.'
  },

  // ==========================================
  // ================= PART 10 — Theory of Computation ============
  // ==========================================
  'DFA (Deterministic Finite Automata)': {
    definition: 'Finite state machine where for each state there is exactly one transition arrow for each input symbol.',
    interview: 'Simplest computational model. Recognizes Regular Languages. No internal memory store.'
  },
  'NFA (Non-Deterministic Automata)': {
    definition: 'Finite state machine where a state can have multiple transitions (or epsilon jumps) for a single input symbol.',
    interview: 'Both DFA and NFA recognize the exact same class of languages (Regular Languages); NFAs are easier to design.'
  },
  'Regular Expressions': {
    definition: 'Algebraic notations describing the set of strings forming a regular language.',
    interview: 'Can be converted directly to NFAs using Thompson\'s Construction, then converted to DFAs.'
  },
  'Context Free Grammar (CFG)': {
    definition: 'Grammar containing production rules rewriting a single non-terminal to strings of terminals/non-terminals.',
    interview: 'Recognized by Pushdown Automata (PDA). Used to define programming languages syntax structures.'
  },
  'Pushdown Automata (PDA)': {
    definition: 'Finite state machine equipped with an auxiliary LIFO Stack memory storage system.',
    interview: 'Recognizes Context-Free Languages. Stack allows tracking nested syntax structures (like matching parentheses).'
  },
  'Chomsky Hierarchy': {
    definition: 'Classification of grammars: Type 3 (Regular) ⊂ Type 2 (Context-Free) ⊂ Type 1 (Context-Sensitive) ⊂ Type 0 (Unrestricted).',
    interview: 'Type 3 recognized by DFA, Type 2 by PDA, Type 1 by Linear Bounded Automata, Type 0 by Turing Machines.'
  },
  'Turing Machine': {
    definition: 'Mathematical model of computation consisting of an infinitely long memory tape and a read/write head.',
    interview: 'Ultimate computational model. Represents what can be mathematically computed (Church-Turing Thesis).'
  },
  'Decidability': {
    definition: 'A problem is decidable if there exists a Turing Machine that halts in a finite number of steps with an answer for all inputs.',
    interview: 'Decidable (Turing-decidable) vs Undecidable (problems that cannot be solved by any computer program).'
  },
  'Halting Problem': {
    definition: 'Famous undecidable problem proving that no program can exist that determines if an arbitrary code halts or loops forever.',
    interview: 'Proven undecidable by Alan Turing using a proof by contradiction (diagonalization).'
  },

  // ==========================================
  // ================= PART 11 — Compiler Design ============
  // ==========================================
  'Lexical Analysis': {
    definition: 'First phase of a compiler converting raw input character streams into logical tokens (keywords, identifiers).',
    interview: 'Uses Regular Expressions to define token rules, implemented using DFAs. Emits errors for invalid characters.'
  },
  'Syntax Analysis (Parsing)': {
    definition: 'Second compiler phase parsing tokens stream into a hierarchical Abstract Syntax Tree (AST) matching CFG grammar rules.',
    interview: 'Algorithms: Top-down (LL parsers) vs Bottom-up (LR, LALR parsers). Detects bracket mismatch and structural errors.'
  },
  'Semantic Analysis': {
    definition: 'Third compiler phase checking abstract syntax tree against language semantic rules (type checking, variable declarations).',
    interview: 'Ensures that expressions are logically sound (e.g. preventing adding an integer to a string variable).'
  },
  'Intermediate Code Generation': {
    definition: 'Generating a machine-independent lower-level code representation (e.g. Three-Address Code, AST) from the parsed tree.',
    interview: 'Allows decoupling compiler front-end (source syntax parser) from back-end (machine target generators).'
  },
  'Code Optimization': {
    definition: 'Analyzing and modifying intermediate code to improve speed and minimize target storage footprint.',
    interview: 'Techniques: Constant folding, loop unrolling, dead-code elimination, strength reduction.'
  },
  'Target Code Generation': {
    definition: 'Translating optimized intermediate code into target machine assembler or raw binary code instructions.',
    interview: 'Handles register allocations, instruction selections, and memory location binding steps.'
  },
  'Symbol Table': {
    definition: 'Compiler internal hash table tracking identifiers variables types, scope offsets, and memory allocations.',
    interview: 'Used across all phases of compilation to verify and resolve variable scope bindings.'
  },
  'Error Handling Systems': {
    definition: 'Compiler subsystem detecting, reporting, and recovering from syntactic or semantic errors during compilation.',
    interview: 'Helps programmers locate syntax bugs. Good compilers recover gracefully to search for subsequent errors.'
  }
};

const Skills = () => {
  const { data: skills, loading } = useFetchData('skills', portfolioData.skills);
  const { coreConcepts } = portfolioData;
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedDsaItem, setSelectedDsaItem] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <section id="skills" className="position-relative bg-dark-base">
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  const hasSkills = skills && skills.length > 0;
  const categories = hasSkills ? [...new Set(skills.map(s => s.category))] : [];

  return (
    <section id="skills" className="position-relative bg-dark-base">
      <div className="container">
        <AnimatedTitle text="Skills & Core Concepts" />
        
        {/* Technical Skills Sub-Section */}
        <h3 className="h4 text-white-50 fw-bold mb-4 border-bottom pb-2 border-white-10">Technical Skills</h3>
        
        {!hasSkills ? (
          <div className="text-center py-4 card-glass mb-5">
            <p className="text-muted mb-0">No technical skills loaded.</p>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {categories.map((category, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card-glass p-4 h-100">
                  <h4 className="h5 text-white mb-3 fw-bold">{category}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {skills
                      .filter(s => s.category === category)
                      .map((skill, sIdx) => (
                        <span className="skill-badge" key={sIdx}>
                          <i className={`bi ${skill.icon || 'bi-patch-check-fill'} text-gradient`}></i>
                          {skill.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Core CS Concepts Sub-Section */}
        <h3 className="h4 text-white-50 fw-bold mb-4 border-bottom pb-2 border-white-10">Core Computer Science Concepts</h3>
        <div className="row g-3 justify-content-center">
          {coreConcepts.map((concept, index) => {
            const hasDetails = conceptDetails[concept.name] !== undefined;
            return (
              <div className="col-6 col-sm-4 col-md-2" key={index}>
                <div 
                  className={`card-glass p-3 text-center h-100 d-flex flex-column align-items-center justify-content-center ${hasDetails ? 'cursor-pointer hover-lift' : ''}`}
                  onClick={() => {
                    if (hasDetails) {
                      setSelectedConcept(concept.name);
                      // Pre-select first item of the concept
                      const firstItem = conceptDetails[concept.name].subsections[0].items[0];
                      setSelectedDsaItem(firstItem);
                    }
                  }}
                  style={{ cursor: hasDetails ? 'pointer' : 'default' }}
                >
                  <i className={`bi ${concept.icon} fs-3 text-gradient mb-2`}></i>
                  <span className="small text-white fw-semibold">{concept.name}</span>
                  {hasDetails && (
                    <span className="badge bg-info-subtle text-info small mt-2" style={{ fontSize: '0.65rem' }}>
                      Click to Learn
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main CS Concepts Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <div className="custom-modal-backdrop" onClick={() => {
            setSelectedConcept(null);
            setSelectedDsaItem(null);
          }}>
            <motion.div 
              className="custom-modal-content card-glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: selectedDsaItem ? '900px' : '600px' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 border-white-10">
                <h3 className="h4 text-white fw-bold m-0 text-gradient">
                  {conceptDetails[selectedConcept].title}
                </h3>
                <button 
                  className="btn btn-sm btn-outline-light rounded-circle"
                  onClick={() => {
                    setSelectedConcept(null);
                    setSelectedDsaItem(null);
                  }}
                  style={{ width: '30px', height: '30px', padding: 0 }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>

              {/* Layout for dynamically showing split menus for ALL concepts */}
              <div className="dsa-layout-grid flex-grow-1 overflow-hidden d-flex">
                
                {/* Left Column: Subtopic Sidebar */}
                <div className="dsa-sidebar-menu overflow-y-auto" style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: '15px' }}>
                  {conceptDetails[selectedConcept].subsections.map((sub, idx) => (
                    <div key={idx} className="mb-3">
                      <span className="small text-info fw-bold d-block mb-2 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{sub.title}</span>
                      <div className="d-flex flex-column gap-1">
                        {sub.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            className={`btn btn-sm text-start py-2 px-2 border-0 rounded ${selectedDsaItem === item ? 'btn-primary-gradient text-white' : 'text-white-50 hover-bg-white-5'}`}
                            onClick={() => setSelectedDsaItem(item)}
                            style={{ fontSize: '0.78rem', background: selectedDsaItem === item ? '' : 'transparent' }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Detailed Study Guide */}
                <div className="dsa-study-area overflow-y-auto flex-grow-1 ps-4 text-start">
                  {selectedDsaItem ? (
                    <div>
                      {dsaDetails[selectedDsaItem] ? (
                        <motion.div
                          key={selectedDsaItem}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <h4 className="h5 text-white fw-bold mb-3 border-bottom pb-2 border-white-10">{selectedDsaItem}</h4>
                          
                          {/* Definition */}
                          <div className="mb-4">
                            <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Definition</span>
                            <p className="text-white-50 small m-0 leading-relaxed">{dsaDetails[selectedDsaItem].definition}</p>
                          </div>

                          {/* Real-life example / Visualization */}
                          {dsaDetails[selectedDsaItem].example && (
                            <div className="mb-4">
                              <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Example / Representation</span>
                              <pre className="bg-dark-code p-3 rounded text-white-50 small font-monospace m-0">{dsaDetails[selectedDsaItem].example}</pre>
                            </div>
                          )}

                          {/* Code Implementation */}
                          {dsaDetails[selectedDsaItem].code && (
                            <div className="mb-4">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="text-info small fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Implementation Example</span>
                                <button 
                                  className="btn btn-xs btn-outline-info py-0 px-2" 
                                  onClick={() => copyToClipboard(dsaDetails[selectedDsaItem].code)}
                                  style={{ fontSize: '0.7rem' }}
                                >
                                  {copied ? <><i className="bi bi-check2"></i> Copied</> : <><i className="bi bi-clipboard"></i> Copy</>}
                                </button>
                              </div>
                              <pre className="bg-dark-code p-3 rounded text-white-50 small font-monospace m-0 overflow-x-auto" style={{ maxHeight: '250px' }}>
                                <code>{dsaDetails[selectedDsaItem].code}</code>
                              </pre>
                            </div>
                          )}

                          {/* Complexity */}
                          {dsaDetails[selectedDsaItem].complexity && (
                            <div className="mb-4">
                              <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Complexity / Parameters</span>
                              <p className="text-white-50 small m-0 font-monospace">{dsaDetails[selectedDsaItem].complexity}</p>
                            </div>
                          )}

                          {/* Interview Point */}
                          {dsaDetails[selectedDsaItem].interview && (
                            <div className="p-3 rounded mb-2" style={{ background: 'rgba(0, 168, 204, 0.08)', border: '1px solid rgba(0, 168, 204, 0.15)', borderLeft: '4px solid #00a8cc' }}>
                              <span className="small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem', color: '#00a8cc' }}>Interview Highlight</span>
                              <p className="small m-0 leading-relaxed text-white" style={{ fontSize: '0.82rem' }}><i className="bi bi-lightbulb-fill text-warning me-1"></i> {dsaDetails[selectedDsaItem].interview}</p>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-center py-5 text-white-50">Detailed content coming soon.</div>
                      )}
                    </div>
                  ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center py-5 text-white-50">
                      <i className="bi bi-book fs-2 text-gradient mb-3"></i>
                      <h4 className="h5 text-white mb-2">CS Concepts Interactive Syllabus</h4>
                      <p className="small text-white-50" style={{ maxWidth: '300px' }}>Select any topic from the left sidebar to view its details, C++/SQL code, and key interview points!</p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 20px;
        }
        .custom-modal-content {
          width: 100%;
          max-height: 85vh;
          background: rgba(18, 18, 22, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
          display: flex;
          flex-direction: column;
        }
        .modal-scroll-area {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 5px;
        }
        .modal-scroll-area::-webkit-scrollbar,
        .dsa-sidebar-menu::-webkit-scrollbar,
        .dsa-study-area::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb,
        .dsa-sidebar-menu::-webkit-scrollbar-thumb,
        .dsa-study-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 10px;
        }
        .bg-dark-code {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 168, 204, 0.2) !important;
        }
        .hover-bg-white-5:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .leading-relaxed {
          line-height: 1.6;
        }
        .btn-xs {
          padding: 2px 8px;
          font-size: 0.75rem;
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .dsa-layout-grid {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .dsa-sidebar-menu {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            padding-right: 0 !important;
            padding-bottom: 15px !important;
            max-height: 180px;
            margin-bottom: 15px;
          }
          .dsa-study-area {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
