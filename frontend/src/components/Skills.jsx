import React, { useState } from 'react';
import { portfolioData } from '../utils/portfolioData';
import { useFetchData } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: 'Object-Oriented Programming',
    subsections: [
      {
        title: '4 Pillars of OOP',
        items: [
          'Encapsulation (Data + methods in class; Access modifiers: public, private, protected)',
          'Abstraction (Hiding implementation details using Abstract Classes & Interfaces)',
          'Inheritance (Single, Multilevel, Hierarchical, Multiple)',
          'Polymorphism (Compile-time: Overloading; Runtime: Overriding)'
        ]
      },
      {
        title: 'Important Concepts',
        items: ['Classes & Objects', 'Constructors & Destructors', 'this pointer/reference', 'static keyword', 'Access modifiers', 'Association, Aggregation & Composition', 'Virtual Functions', 'Exception Handling']
      }
    ]
  },
  'DBMS': {
    title: 'Database Management System',
    subsections: [
      {
        title: 'Core Fundamentals',
        items: ['DBMS vs File System', 'Database Architecture & Abstraction', 'Data Independence', 'ER Modeling (Entities, Attributes, Relationships, Keys)', 'Relational Model']
      },
      {
        title: 'SQL Commands & Concepts',
        items: [
          'DDL / DML / DCL (SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP)',
          'Filtering & Grouping (WHERE, ORDER BY, GROUP BY, HAVING, DISTINCT)',
          'Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
          'Joins (INNER, LEFT, RIGHT, FULL OUTER)'
        ]
      },
      {
        title: 'Advanced Database Topics',
        items: ['Normalization (1NF, 2NF, 3NF, BCNF)', 'Transactions & ACID Properties', 'Concurrency Control', 'Indexing, Views, Stored Procedures & Triggers', 'SQL vs NoSQL (MongoDB/Firebase)']
      }
    ]
  },
  'Operating Systems': {
    title: 'Operating Systems',
    subsections: [
      {
        title: 'OS Fundamentals & Scheduling',
        items: ['Kernel, System Calls & Modes (User vs Kernel)', 'Process Management (Process States, PCB, Context Switching)', 'CPU Scheduling (FCFS, SJF, SRTF, Priority, Round Robin)']
      },
      {
        title: 'Threads & Synchronization',
        items: ['Process vs Thread, Multithreading', 'Critical Section, Race Condition', 'Mutex & Semaphores, Monitors', 'Deadlock (Conditions, Prevention, Avoidance, Banker\'s Algorithm, Detection & Recovery)']
      },
      {
        title: 'Memory & File Systems',
        items: ['RAM, Virtual Memory, Paging, Segmentation', 'Page Faults & Page Replacement Algorithms (FIFO, LRU, Optimal)', 'File Allocation & Disk Scheduling']
      }
    ]
  },
  'Computer Networks': {
    title: 'Computer Networks',
    subsections: [
      {
        title: 'Networking Basics',
        items: ['Types (LAN, MAN, WAN, PAN)', 'Topologies (Bus, Star, Ring, Mesh, Hybrid)', 'OSI Model (7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application)']
      },
      {
        title: 'Protocols & Addressing',
        items: ['TCP/IP Model (4 Layers)', 'Application Layer: HTTP, HTTPS, FTP, SMTP, DNS, DHCP', 'Transport Layer: TCP vs UDP (Reliable vs Connectionless)', 'Network Layer: IPv4, IPv6, Subnetting, MAC address, ARP, Routing']
      }
    ]
  }
};

const dsaDetails = {
  // Data Structures
  'Array': {
    definition: 'Array ek linear data structure hai jisme same data type ke elements contiguous memory locations par store hote hain.',
    example: 'Index:   0   1   2   3   4\nArray:  10  20  30  40  50',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    cout << arr[2] << endl;  // Outputs: 30\n    return 0;\n}`,
    complexity: 'Access: O(1) | Search: O(n) | Insert: O(n) | Delete: O(n)',
    interview: 'Array ka biggest advantage hai fast random access O(1) because memory locations contiguous hoti hain.'
  },
  'Linked List': {
    definition: 'Linked List ek linear data structure hai jisme elements nodes ke form me hote hain. Har node me Data aur Next node ka memory address hota hai.',
    example: '10 → 20 → 30 → NULL',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int value) {\n        data = value;\n        next = NULL;\n    }\n};\n\nint main() {\n    Node* first = new Node(10);\n    Node* second = new Node(20);\n    first->next = second;\n    Node* temp = first;\n    while (temp != NULL) {\n        cout << temp->data << " ";\n        temp = temp->next;\n    }\n    return 0;\n}`,
    complexity: 'Access: O(n) | Search: O(n) | Insert at start: O(1) | Delete at start: O(1)',
    interview: 'Array static size ka hota hai jabki Linked List dynamic size ki hoti hai. List me insertions/deletions fast hote hain.'
  },
  'Stack': {
    definition: 'Stack ek LIFO (Last In First Out) data structure hai. Jo element last me insert hota hai, wahi pehle remove hota hai.',
    example: '   30  ← Top (Last In, First Out)\n   20\n   10',
    code: `#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    stack<int> s;\n    s.push(10);\n    s.push(20);\n    s.push(30);\n    cout << s.top() << endl; // 30\n    s.pop();\n    cout << s.top() << endl; // 20\n    return 0;\n}`,
    complexity: 'Push: O(1) | Pop: O(1) | Top: O(1) | Size: O(1)',
    interview: 'Stack ke standard usage: Function recursion call management, undo/redo operations, browser history backtracking, balanced parentheses checks.'
  },
  'Queue': {
    definition: 'Queue ek FIFO (First In First Out) data structure hai. Jo element pehle insert hota hai, wahi sabse pehle remove hota hai.',
    example: 'Front (Dequeue) 10 → 20 → 30 → 40 Rear (Enqueue)',
    code: `#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    queue<int> q;\n    q.push(10);\n    q.push(20);\n    cout << q.front() << endl; // 10\n    q.pop();\n    cout << q.front() << endl; // 20\n    return 0;\n}`,
    complexity: 'Enqueue: O(1) | Dequeue: O(1) | Front: O(1)',
    interview: 'Queue scheduling systems me CPU process allocation (FIFO scheduling), buffer memory management, aur graph algorithms jaise BFS me work aati hai.'
  },
  'Circular Queue': {
    definition: 'Circular Queue normal queue ki modification hai jisme last memory slot ke baad head circularly front slot se reconnect ho jata hai, jisse memory wastage nahi hoti.',
    example: '0 → 1 → 2 → 3 → 4\n↑                 ↓\n└─────────────────┘',
    code: `#include <iostream>\nusing namespace std;\n\nclass CircularQueue {\n    int arr[5];\n    int front, rear, size;\npublic:\n    CircularQueue() { front = rear = -1; size = 5; }\n    void enqueue(int val) {\n        if ((rear + 1) % size == front) { cout << "Queue Full\\n"; return; }\n        if (front == -1) front = 0;\n        rear = (rear + 1) % size;\n        arr[rear] = val;\n    }\n    void dequeue() {\n        if (front == -1) { cout << "Queue Empty\\n"; return; }\n        if (front == rear) front = rear = -1;\n        else front = (front + 1) % size;\n    }\n};`,
    complexity: 'Enqueue: O(1) | Dequeue: O(1)',
    interview: 'Circular queue memory space utilization me best hoti hai compared to normal linear array queue implementation.'
  },
  'Tree': {
    definition: 'Tree ek non-linear, hierarchical data structure hai jo node elements ko hierarchy collections me organize karti hai.',
    example: '        10 (Root)\n       /  \\\n      20   30 (Children)\n     / \\\n    40  50 (Leaf Nodes)',
    code: '// Tree term defines nodes with parent-child relationships.\n// Root: Topmost node.\n// Leaf: Node with no children.',
    complexity: 'Height: Longest path from root to leaf node.',
    interview: 'Non-linear elements representation, file system directory structures, XML/JSON parsing DOM trees me systems level utility hoti hai.'
  },
  'Binary Tree': {
    definition: 'Binary Tree ek special tree data structure hai jisme har parent node ke maximum do children ho sakte hain: Left Child aur Right Child.',
    example: '        10\n       /  \\\n      20   30',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int val) {\n        data = val;\n        left = right = NULL;\n    }\n};\n\nint main() {\n    Node* root = new Node(10);\n    root->left = new Node(20);\n    root->right = new Node(30);\n    cout << "Root: " << root->data << endl;\n    return 0;\n}`,
    complexity: 'Traversals: O(n) space/time.',
    interview: 'Binary trees full, complete, perfect configurations me divide ho sakte hain. Har structure ki constraints binary heaps me useful hoti hain.'
  },
  'Binary Search Tree': {
    definition: 'Binary Search Tree (BST) ek ordered binary tree hai jisme left subtree ke saare element node se chhote hote hain aur right subtree ke saare element node se bade hote hain.',
    example: '        50\n       /  \\\n      30   70\n     / \\   / \\\n    20 40 60 80',
    code: `Node* insert(Node* root, int val) {\n    if (root == NULL) return new Node(val);\n    if (val < root->data)\n        root->left = insert(root->left, val);\n    else\n        root->right = insert(root->right, val);\n    return root;\n}\n\nbool search(Node* root, int val) {\n    if (root == NULL) return false;\n    if (root->data == val) return true;\n    if (val < root->data) return search(root->left, val);\n    return search(root->right, val);\n}`,
    complexity: 'Average Search: O(log n) | Worst Case Search: O(n) (Skewed Tree)',
    interview: 'BST binary search logic tree mapping implement karta hai. Dynamic set searching aur sorted in-order traversals data retrieval dynamic indexes me use hote hain.'
  },
  'Heap': {
    definition: 'Heap ek complete binary tree hai jo Heap property maintain karta hai. Max Heap me parent node hamesha children se bada ya barabar hota hai. Min Heap me parent node sabse chhota hota hai.',
    example: 'Max Heap:\n        50\n       /  \\\n      30   40\n     / \\\n    10 20',
    code: `#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n    priority_queue<int> maxHeap; // Max Heap by default\n    maxHeap.push(10);\n    maxHeap.push(50);\n    maxHeap.push(20);\n    cout << maxHeap.top(); // Outputs: 50\n    return 0;\n}`,
    complexity: 'Insert: O(log n) | Delete: O(log n) | Get Max/Min: O(1)',
    interview: 'Heap structures priority queue mapping, shortest path algorithms (Dijkstra), aur Heap Sort algorithm me dynamic dynamic allocations coordinate karte hain.'
  },
  'Hashing': {
    definition: 'Hashing ek dynamic data index conversion scheme hai jisme key values hash function ke throughput relative storage index coordinates maps me output hote hain.',
    example: 'Key (25) → Hash Function [h(x) = x % 10] → Hash Code Index (5)',
    code: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    unordered_map<string, int> age;\n    age["Ramnevas"] = 22;\n    age["Amit"] = 25;\n    cout << "Age of Ramnevas: " << age["Ramnevas"] << endl;\n    return 0;\n}`,
    complexity: 'Average Search: O(1) | Worst Case: O(n) (Collision limits)',
    interview: 'Instant search structures, database lookup cache collections, authentication encryption mappings, aur dynamic duplicates checks me direct hash logic useful hai.'
  },
  'Graph': {
    definition: 'Graph non-linear nodes (vertices) aur lines (edges) ka group collection mapping coordinates hota hai.',
    example: 'A ---- B\n|      |\nC ---- D',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> adjList[5]; // Adjacency list representation\n    adjList[0].push_back(1); // Edge from node 0 to 1\n    adjList[1].push_back(0); \n    cout << "Graph Edges added." << endl;\n    return 0;\n}`,
    complexity: 'Representation: O(V + E) Space using Adjacency List.',
    interview: 'Graphs real world route systems, social network links, dependency graphs, path determination systems, network systems routing me backbone structure hai.'
  },

  // Algorithms
  'Linear Search': {
    definition: 'Linear Search me values list collections targets ko check array me sequentially base check elements mapping matching coordinates logic me search karta hai.',
    example: 'Array: [10, 20, 30, 40, 50] | Target: 40 | Check sequentially index 0 → 1 → 2 → 3 (Found)',
    code: `int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
    complexity: 'Best Case: O(1) | Worst Case: O(n)',
    interview: 'Small unsorted datasets configurations check lookup me direct default method optimization binary check overhead bypass karta hai.'
  },
  'Binary Search': {
    definition: 'Binary Search Sorted array list me range division check target space configurations lookup coordinates checks half scale index values targets search logic use karta hai.',
    example: 'Sorted Array: [10, 20, 30, 40, 50, 60] | Target: 50 | Mid is 30 (Lower), cut left, focus right [40, 50, 60]',
    code: `int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    complexity: 'Time Complexity: O(log n) | Space: O(1)',
    interview: 'Binary search key validation require array to be sorted. Scaled lookups dynamic database trees, binary files database records, index checks optimization me highly utilized hai.'
  },
  'Bubble Sort': {
    definition: 'Bubble Sort simple comparison sort scheme hai jo elements checking index items swap arrays optimization targets sequential loop passes me sorting compile karta hai.',
    example: 'Unsorted: [5, 3, 2, 4] → [3, 5, 2, 4] → [3, 2, 5, 4] → [3, 2, 4, 5]',
    code: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}`,
    complexity: 'Average/Worst Case: O(n²) | Best Case (Optimized): O(n)',
    interview: 'Very simple to write. Non-efficient on large lists. Serves strictly educational sorting introduction.'
  },
  'Selection Sort': {
    definition: 'Selection Sort sorting scheme hai jo array check minimal targets index elements find karke select loop iterations updates index items list swaps sorting logic implement karta hai.',
    example: 'Find minimum in [5, 3, 8, 2], minimum is 2. Swap with first: [2, 3, 8, 5]',
    code: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[i], arr[minIdx]);\n    }\n}`,
    complexity: 'Time Complexity: O(n²) all cases.',
    interview: 'Minimum swaps require sorting. Selection sort dynamic writes memory optimizations me target variables minimize swap requirements me optimal value standard set karta hai.'
  },
  'Insertion Sort': {
    definition: 'Insertion Sort sorting logic hai jisme element items dynamically sorted scale slots comparisons index shift mappings positions insertions cards insertion process format me sorted segment update karta hai.',
    example: '5 | 3 2 4 → Key is 3 (inserts before 5) → 3 5 | 2 4',
    code: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
    complexity: 'Best Case: O(n) | Worst/Average: O(n²)',
    interview: 'Adaptive sorting parameters check logic. Small data lists or nearly sorted data items validations me highly efficient, overhead recursive sorting methods bypass checks sets.'
  },
  'Merge Sort': {
    definition: 'Merge Sort recursive Divide and Conquer sorting strategy data separation merges updates elements binary splits logic recursively sorting array checks use karta hai.',
    example: '[5, 3, 8, 2] → Split: [5, 3] and [8, 2] → Sort: [3, 5] and [2, 8] → Merge: [2, 3, 5, 8]',
    code: `void merge(int arr[], int l, int m, int r) {\n    vector<int> temp;\n    int i = l, j = m + 1;\n    while (i <= m && j <= r) {\n        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);\n        else temp.push_back(arr[j++]);\n    }\n    while (i <= m) temp.push_back(arr[i++]);\n    while (j <= r) temp.push_back(arr[j++]);\n    for (int k = 0; k < temp.size(); k++) arr[l + k] = temp[k];\n}\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
    complexity: 'Time Complexity: O(n log n) all cases | Space: O(n) auxiliary.',
    interview: 'Stable sorting logic. Linked lists sorting, external sorting database updates, consistency arrays order items elements comparisons checks validations standard configurations uses.'
  },
  'Quick Sort': {
    definition: 'Quick Sort pivot selections partitions algorithms comparisons divisions data sorting logical split parameters index values checks divide-and-conquer strategy implement karta hai.',
    example: 'Pivot select (say, last element) → partition elements smaller to left, larger to right → recursively sort partitions.',
    code: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++; swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    complexity: 'Average Case: O(n log n) | Worst Case: O(n²) (Bad pivot selection)',
    interview: 'In-place sorting implementation. Real world sorting libraries general array sorting operations me quick sort cache efficiency optimization level specifications uses.'
  },
  'Heap Sort': {
    definition: 'Heap Sort Max Heap ya Min Heap parameters updates index values sorting logic selection heap elements sort coordinate properties follow karta hai.',
    example: 'Build Max Heap from array → swap root (max) with last element → reduce heap size → heapify root → repeat.',
    code: `// Building heap structure using recursive heapify indices checks.\n// Extract element values dynamically sorted index arrays updates.\n// Total Time Complexity: O(n log n) all cases. Space Complexity: O(1).`,
    complexity: 'Time Complexity: O(n log n) all cases | Space: O(1) auxiliary.',
    interview: 'Strict worst case guarantees sorting logic. Safe systems critical real time operations checks me direct heap sort constraints uses.'
  },
  'Recursion': {
    definition: 'Jab ek function call validation properties check implementations loop conditions variables updates check logic loops targets bypass direct self execution calls function logic run karta hai.',
    example: 'Factorial: 5! = 5 * 4! → 4! = 4 * 3! → ... Base case: 0! = 1',
    code: `int factorial(int n) {\n    if (n == 0) return 1; // Base case\n    return n * factorial(n - 1); // Recursive call\n}`,
    complexity: 'Factorial Time: O(n) | Call Stack Space: O(n)',
    interview: 'Recursive algorithms base cases checks exit limits. Recursion call heap allocations stacks management backtracking tree configurations traversals logic structures.'
  },
  'Divide & Conquer': {
    definition: 'Divide and conquer strategy complex problems coordinates divisions recursively divide solve combine check scale algorithms processes uses.',
    example: 'Divide: Binary searches cuts array. Merge sort divides array elements. Quick sort pivots elements.',
    code: '// 1. Divide: Break big problem into smaller sub-problems.\n// 2. Solve: Resolve sub-problems recursively.\n// 3. Combine: Merge sub-problem answers to form final solution.',
    complexity: 'Binary splits logic standard log-n time scales parameters indexes.',
    interview: 'Complexity reduction paradigms. Recursive splits sorting search spaces algorithms validations me direct design approach.'
  },
  'Greedy Algorithms': {
    definition: 'Greedy algorithm har local iteration step state updates parameter comparisons values choice select selections elements optimal coordinates checks validation set maps compile karta hai.',
    example: 'Select minimum change coins: To get 70 from [50, 20, 10, 5], pick 50, then pick 20 (Local optimal gives global optimal).',
    code: '// Example: Activity Selection, Fractional Knapsack, Huffman Coding, Dijkstra, Kruskal, Prim.\n// Always makes local optimal choice hoping to reach global optimal.',
    complexity: 'Optimizations calculations checking sort items elements scales O(n log n) sorting.',
    interview: 'Greedy properties check. Locally optimal choices coordinates maps. Optimal substructure checking constraints models.'
  },
  'Dynamic Programming': {
    definition: 'Dynamic Programming subproblem duplicate recalculations index check values mapping array memoization tables variables checks optimization speedups operations storage arrays reuse structure coordinate logic setup.',
    example: 'Fibonacci: Instead of recalculating fib(3) multiple times, compute once and save to dynamic array map.',
    code: `int dp[100]; // initialized to -1\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    if (dp[n] != -1) return dp[n]; // memoized check\n    return dp[n] = fibonacci(n - 1) + fibonacci(n - 2);\n}`,
    complexity: 'Fibonacci DP: O(n) Time | O(n) Space (compared to O(2^n) normal recursion).',
    interview: 'Overlapping subproblems checks. Tabulation Bottom Up vs Memoization Top Down. Matrix Chain, Knapsack, Coin Change, LCS/LIS questions fresher developer interviews standard benchmarks.'
  },
  'BFS (Breadth First Search)': {
    definition: 'BFS graph traversal method elements level coordinates check mapping queue variables index nodes validations layers checks structural logic coordinate check traversal map structure.',
    example: 'Level order search starting root → child nodes level 1 → child nodes level 2. Uses Queue.',
    code: `void BFS(int start, vector<int> graph[], int n) {\n    vector<bool> visited(n, false);\n    queue<int> q;\n    q.push(start); visited[start] = true;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        cout << node << " ";\n        for (int adj : graph[node]) {\n            if (!visited[adj]) {\n                visited[adj] = true; q.push(adj);\n            }\n        }\n    }\n}`,
    complexity: 'Time Complexity: O(V + E) | Space: O(V)',
    interview: 'Shortest path determination unweighted graph layouts, web crawlers navigation, peer-to-peer networks routers configurations nodes search systems.'
  },
  'DFS (Depth First Search)': {
    definition: 'DFS graph traversal method elements deep routes check recursively branch end verification checks backtracking traversal coordinates stack structural logic map.',
    example: 'Deep traverse starting root → node leaf end → backtrack parent → traverse other deep path branch. Uses Stack.',
    code: `void DFS(int node, vector<int> graph[], vector<bool>& visited) {\n    visited[node] = true;\n    cout << node << " ";\n    for (int adj : graph[node]) {\n        if (!visited[adj]) {\n            DFS(adj, graph, visited);\n        }\n    }\n}`,
    complexity: 'Time Complexity: O(V + E) | Space: O(V) stack frame.',
    interview: 'Cycles detection graph systems, topological sorting check, maze solving logic, connected components determination.'
  },
  'Shortest Path': {
    definition: 'Shortest path algorithms weighted/unweighted node distances minimum costs routes check graph structures checks coordinate calculations path determination algorithms.',
    example: 'Dijkstra find minimum route from source node A to all other nodes using priority queue weight increments.',
    code: '// Dijkstra Algorithm for positive weights graph systems.\n// BFS for unweighted shortest path systems.\n// Bellman-Ford for negative weight cycles checks. Floyd-Warshall for all-pair checks.',
    complexity: 'Dijkstra: O((V + E) log V) using Min-Heap priority queue.',
    interview: 'GPS mapping routing coordinates validation checks, routers packet paths selection, distance minimization parameters.'
  },
  'Minimum Spanning Tree': {
    definition: 'Minimum Spanning Tree weighted graphs spanning elements total weights minimization edges cycles checks trees configurations standard routing.',
    example: 'Kruskal select edges sorted minimum cost checks without cycle loops. Prim increments tree borders.',
    code: '// MST contains V vertices, V-1 edges without loops.\n// Prim\'s: Start node, add adjacent minimum edge, heap check. O(E log V).\n// Kruskal\'s: Sort edges, disjoint set check, insert nodes. O(E log E).',
    complexity: 'Kruskal/Prim: O(E log V) or O(E log E).',
    interview: 'Cable connections optimizations, routing lines, electricity grid layout designs, pipelines network setups.'
  },

  // Complexity
  'Time Complexity': {
    definition: 'Time complexity input data collections scale size growth rates variables calculations checks loop counts operations compile time execution logic scales check.',
    example: 'Simple loop running N times has linear time complexity O(N). Nested loop has quadratic complexity O(N^2).',
    code: `for (int i = 0; i < n; i++) {\n    // O(n) Time execution loop\n}`,
    complexity: 'Scales O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2^n)',
    interview: 'Interviewers hamesha alternative code updates optimization paths comparisons benchmarks checking time complexity minimize require metrics validation checks code performance target validation.'
  },
  'Space Complexity': {
    definition: 'Space complexity checks memory requirements runtime extra buffers maps variables temporary allocations check scales configurations arrays sizes growth coordinates.',
    example: 'Creating dynamic array check values temporary memory storage scale sizes size N has O(N) auxiliary space.',
    code: `int arr[n]; // allocates O(n) extra space`,
    complexity: 'O(1) Auxiliary Space means algorithm uses constant memory space regardless of inputs scale size.',
    interview: 'Space vs Time tradeoffs. In-place algorithms space limits checks constraints optimizations memory devices systems level code limits.'
  },
  'Big-O Notation': {
    definition: 'Big-O notation algorithm upper bound growth behavior worst case complexity limit representation scale notation system functions.',
    example: 'If algorithm runtime grows worst case scale N, it is represented under Big-O limit as O(N).',
    code: '// Worst-case upper bound runtime growth representation notation.',
    complexity: 'Indicates worst possible execution time growth.',
    interview: 'Big-O checks worst possible code runtime growth bounds safety checks software execution maximum timeouts validations.'
  },
  'Big-Omega Notation': {
    definition: 'Big-Omega notation lower bound growth behavior best case runtime optimization minimum iterations limits representation notation.',
    example: 'Linear search targets first index. Best case complexity minimum lower bound is Omega(1).',
    code: '// Best-case lower bound runtime growth representation notation.',
    complexity: 'Indicates best possible execution time growth.',
    interview: 'Algorithm best case checks baseline operations execution checks loops bypass evaluations.'
  },
  'Big-Theta Notation': {
    definition: 'Big-Theta notation exact tight bound growth behavior represents exact average time scaling behavior checks functions boundaries.',
    example: 'Simple loop always runs exactly N times. Tight bound time scale is Theta(N).',
    code: '// Tight bound exact runtime growth boundaries representation.',
    complexity: 'Represents exact average/tight asymptotic runtime scaling behavior.',
    interview: 'Tight bounds checking validations software execution exact profiling estimations benchmarks.'
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
        <h2 className="section-title text-white">Skills & Core Concepts</h2>
        
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
                  onClick={() => hasDetails && setSelectedConcept(concept.name)}
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
              style={{ maxWidth: selectedConcept === 'DSA' && selectedDsaItem ? '900px' : '600px' }}
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

              {/* Layout for DSA splits vs standard single column list */}
              {selectedConcept === 'DSA' ? (
                <div className="dsa-layout-grid flex-grow-1 overflow-hidden d-flex">
                  
                  {/* Left Column: Subtopic List */}
                  <div className="dsa-sidebar-menu overflow-y-auto" style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: '15px' }}>
                    {conceptDetails['DSA'].subsections.map((sub, idx) => (
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

                  {/* Right Column: Detailed Topic Study Guide */}
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

                            {/* Real-life example */}
                            {dsaDetails[selectedDsaItem].example && (
                              <div className="mb-4">
                                <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Example / Visualization</span>
                                <pre className="bg-dark-code p-3 rounded text-white-50 small font-monospace m-0">{dsaDetails[selectedDsaItem].example}</pre>
                              </div>
                            )}

                            {/* C++ Code Block */}
                            {dsaDetails[selectedDsaItem].code && (
                              <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <span className="text-info small fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>C++ Code Implementation</span>
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
                                <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Complexity</span>
                                <p className="text-white-50 small m-0 font-monospace">{dsaDetails[selectedDsaItem].complexity}</p>
                              </div>
                            )}

                            {/* Interview Point */}
                            {dsaDetails[selectedDsaItem].interview && (
                              <div className="p-3 bg-info-subtle border-start border-info-3 border-3 rounded">
                                <span className="text-info small fw-bold d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Interview Highlight</span>
                                <p className="text-white-50 small m-0 leading-relaxed"><i className="bi bi-lightbulb-fill text-warning me-1"></i> {dsaDetails[selectedDsaItem].interview}</p>
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
                        <h4 className="h5 text-white mb-2">DSA Interactive Syllabus</h4>
                        <p className="small text-white-50" style={{ maxWidth: '300px' }}>Select any Data Structure, Algorithm, or Complexity topic from the left sidebar to view its details and C++ implementation!</p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* Standard modal format for other CS Concepts */
                <div className="modal-scroll-area text-start">
                  {conceptDetails[selectedConcept].subsections.map((sub, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="h6 text-info fw-bold mb-3 border-bottom pb-1 border-white-10">
                        {sub.title}
                      </h4>
                      <ul className="list-unstyled">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-white-50 small mb-2 d-flex align-items-start">
                            <i className="bi bi-check2-circle text-gradient me-2 mt-1 flex-shrink-0"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
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
