const QuizQuestion = require("../models/QuizQuestion");
const PracticeAttempt = require("../models/PracticeAttempt");

const localQuestionBank = {
  javascript: [
    // Set 1: Easy
    { setNumber: 1, questionNumber: 1, difficulty: "easy", question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "int", "string", "float"], correctAnswer: "var", explanation: "var, let, and const are used to declare variables." },
    { setNumber: 1, questionNumber: 2, difficulty: "easy", question: "Which symbol is used for single-line comments in JavaScript?", options: ["//", "/*", "#", "--"], correctAnswer: "//", explanation: "Single-line comments use //" },
    { setNumber: 1, questionNumber: 3, difficulty: "easy", question: "Which method converts JSON string to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"], correctAnswer: "JSON.parse()", explanation: "JSON.parse() converts JSON string to JS object." },
    { setNumber: 1, questionNumber: 4, difficulty: "easy", question: "Which data type is NOT primitive in JavaScript?", options: ["Object", "String", "Number", "Boolean"], correctAnswer: "Object", explanation: "Object is non-primitive." },
    { setNumber: 1, questionNumber: 5, difficulty: "easy", question: "Which operator is used for strict equality?", options: ["===", "==", "=", "!="], correctAnswer: "===", explanation: "=== checks value and type both." },
    { setNumber: 1, questionNumber: 6, difficulty: "easy", question: "What is the result of '1' + 1 in JavaScript?", options: ["'11'", "2", "NaN", "Error"], correctAnswer: "'11'", explanation: "JavaScript performs string concatenation when one operand is a string." },
    { setNumber: 1, questionNumber: 7, difficulty: "easy", question: "Which of these is a valid way to write an array?", options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "all of these"], correctAnswer: "[1, 2, 3]", explanation: "Arrays use square brackets in JavaScript." },
    { setNumber: 1, questionNumber: 8, difficulty: "easy", question: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msg('Hello World');", "prompt('Hello World');", "console.log('Hello World');"], correctAnswer: "alert('Hello World');", explanation: "The alert() method displays an alert box." },
    { setNumber: 1, questionNumber: 9, difficulty: "easy", question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "Facebook"], correctAnswer: "Netscape", explanation: "JavaScript was created at Netscape by Brendan Eich." },
    { setNumber: 1, questionNumber: 10, difficulty: "easy", question: "How do you start a FOR loop?", options: ["for (i = 0; i <= 5; i++)", "for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)"], correctAnswer: "for (i = 0; i <= 5; i++)", explanation: "Standard for loop syntax includes initialization, condition, and increment." },
    { setNumber: 1, questionNumber: 11, difficulty: "easy", question: "Which event occurs when the user clicks on an HTML element?", options: ["onclick", "onmouseclick", "onchange", "onmouseover"], correctAnswer: "onclick", explanation: "The onclick event handler is used for click events." },
    { setNumber: 1, questionNumber: 12, difficulty: "easy", question: "Which operator is used to assign a value to a variable?", options: ["=", "*", "-", "x"], correctAnswer: "=", explanation: "The single equals sign is the assignment operator." },
    { setNumber: 1, questionNumber: 13, difficulty: "easy", question: "Which method returns the length of a string?", options: [".length", ".size()", ".count", ".index"], correctAnswer: ".length", explanation: "The .length property returns the number of characters in a string." },
    { setNumber: 1, questionNumber: 14, difficulty: "easy", question: "Is JavaScript case-sensitive?", options: ["Yes", "No", "Only for variables", "Only for functions"], correctAnswer: "Yes", explanation: "JavaScript is entirely case-sensitive." },
    { setNumber: 1, questionNumber: 15, difficulty: "easy", question: "Which of these is the correct way to call a function?", options: ["myFunction()", "call myFunction()", "call function myFunction()", "execute myFunction()"], correctAnswer: "myFunction()", explanation: "Standard function call uses the function name followed by parentheses." },

    // Set 2: Medium
    { setNumber: 2, questionNumber: 1, difficulty: "medium", question: "Which array method adds an item at the end?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()", explanation: "push() adds item at the end." },
    { setNumber: 2, questionNumber: 2, difficulty: "medium", question: "Which function runs after a delay?", options: ["setTimeout()", "setInterval()", "delay()", "wait()"], correctAnswer: "setTimeout()", explanation: "setTimeout runs once after a delay." },
    { setNumber: 2, questionNumber: 3, difficulty: "medium", question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Management", "Desktop Oriented Mode", "Document Output Method"], correctAnswer: "Document Object Model", explanation: "DOM stands for Document Object Model." },
    { setNumber: 2, questionNumber: 4, difficulty: "medium", question: "Which loop is guaranteed to run at least once?", options: ["do...while", "while", "for", "forEach"], correctAnswer: "do...while", explanation: "do...while executes first, checks later." },
    { setNumber: 2, questionNumber: 5, difficulty: "medium", question: "Which method is used to remove the last array item?", options: ["pop()", "push()", "shift()", "splice()"], correctAnswer: "pop()", explanation: "pop() removes last item." },
    { setNumber: 2, questionNumber: 6, difficulty: "medium", question: "What is the alternative to IF statements for multiple conditions?", options: ["switch", "else", "loop", "try"], correctAnswer: "switch", explanation: "Switch statements are cleaner for multiple conditional branches." },
    { setNumber: 2, questionNumber: 7, difficulty: "medium", question: "Which method removes the first element from an array?", options: ["shift()", "pop()", "slice()", "unshift()"], correctAnswer: "shift()", explanation: "shift() removes the first item from an array." },
    { setNumber: 2, questionNumber: 8, difficulty: "medium", question: "Which method adds elements to the beginning of an array?", options: ["unshift()", "shift()", "push()", "slice()"], correctAnswer: "unshift()", explanation: "unshift() adds one or more elements to the front of an array." },
    { setNumber: 2, questionNumber: 9, difficulty: "medium", question: "How do you round 7.25 to the nearest integer?", options: ["Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)", "Math.ceil(7.25)"], correctAnswer: "Math.round(7.25)", explanation: "Math.round() rounds to the nearest whole number." },
    { setNumber: 2, questionNumber: 10, difficulty: "medium", question: "Which property allows you to access the HTML content of an element?", options: ["innerHTML", "content", "textContent", "value"], correctAnswer: "innerHTML", explanation: "innerHTML gets or sets the HTML markup within an element." },
    { setNumber: 2, questionNumber: 11, difficulty: "medium", question: "What will `Math.max(1, 10, 5)` return?", options: ["10", "1", "5", "NaN"], correctAnswer: "10", explanation: "Math.max returns the largest number from the arguments." },
    { setNumber: 2, questionNumber: 12, difficulty: "medium", question: "Which of these is NOT an array method?", options: ["search()", "map()", "filter()", "every()"], correctAnswer: "search()", explanation: "search() is a String method, not an Array method." },
    { setNumber: 2, questionNumber: 13, difficulty: "medium", question: "What does `isNaN()` function do?", options: ["Checks if value is not a number", "Converts to number", "Checks if value is null", "None of these"], correctAnswer: "Checks if value is not a number", explanation: "isNaN returns true if the value is not a valid number." },
    { setNumber: 2, questionNumber: 14, difficulty: "medium", question: "How do you find which character is at index 3 in a string?", options: ["str.charAt(3)", "str.index(3)", "str.get(3)", "str[3].char"], correctAnswer: "str.charAt(3)", explanation: "charAt(index) returns the character at the specified index." },
    { setNumber: 2, questionNumber: 15, difficulty: "medium", question: "Which method converts a string to all lowercase letters?", options: ["toLowerCase()", "lower()", "changeCase('lower')", "toSmall()"], correctAnswer: "toLowerCase()", explanation: "toLowerCase() returns the string in lowercase." },

    // Set 3: Medium
    { setNumber: 3, questionNumber: 1, difficulty: "medium", question: "Which keyword declares a block-scoped variable?", options: ["let", "var", "define", "scope"], correctAnswer: "let", explanation: "let is block scoped." },
    { setNumber: 3, questionNumber: 2, difficulty: "medium", question: "Which method creates a new array from existing array items?", options: ["map()", "for()", "if()", "push()"], correctAnswer: "map()", explanation: "map() returns a transformed new array." },
    { setNumber: 3, questionNumber: 3, difficulty: "medium", question: "Which keyword is used to define a constant?", options: ["const", "let", "var", "fixed"], correctAnswer: "const", explanation: "const is used for constants." },
    { setNumber: 3, questionNumber: 4, difficulty: "medium", question: "What is the output type of typeof [] ?", options: ["object", "array", "list", "undefined"], correctAnswer: "object", explanation: "Arrays are objects in JavaScript." },
    { setNumber: 3, questionNumber: 5, difficulty: "medium", question: "Which method joins array elements into a string?", options: ["join()", "concat()", "push()", "slice()"], correctAnswer: "join()", explanation: "join() combines elements into a string." },
    { setNumber: 3, questionNumber: 6, difficulty: "medium", question: "How do you write a template literal?", options: ["`Text ${var}`", "'Text ' + var", "\"Text \" + var", "Text(var)"], correctAnswer: "`Text ${var}`", explanation: "Backticks and ${} denote template literals." },
    { setNumber: 3, questionNumber: 7, difficulty: "medium", question: "Which method returns the first element in an array that satisfies a condition?", options: ["find()", "filter()", "some()", "map()"], correctAnswer: "find()", explanation: "find() returns the first element that passes the test." },
    { setNumber: 3, questionNumber: 8, difficulty: "medium", question: "How can you check if an object has a specific property?", options: ["'prop' in obj", "obj.has('prop')", "obj.contains('prop')", "obj in 'prop'"], correctAnswer: "'prop' in obj", explanation: "The 'in' operator checks for property existence." },
    { setNumber: 3, questionNumber: 9, difficulty: "medium", question: "Which ES6 feature allow extracting values from arrays or objects conveniently?", options: ["Destructuring", "Spreading", "Resting", "Mapping"], correctAnswer: "Destructuring", explanation: "Destructuring assignment allows assigning properties/elements to variables easily." },
    { setNumber: 3, questionNumber: 10, difficulty: "medium", question: "What is the result of `Boolean(0)`?", options: ["false", "true", "0", "undefined"], correctAnswer: "false", explanation: "0 is a falsy value in JavaScript." },
    { setNumber: 3, questionNumber: 11, difficulty: "medium", question: "Which function converts a string to a floating-point number?", options: ["parseFloat()", "Number()", "toInt()", "String()"], correctAnswer: "parseFloat()", explanation: "parseFloat parses a string and returns a floating point number." },
    { setNumber: 3, questionNumber: 12, difficulty: "medium", question: "Which array method checks if all elements pass a test?", options: ["every()", "some()", "filter()", "map()"], correctAnswer: "every()", explanation: "every() returns true only if all elements satisfy the condition." },
    { setNumber: 3, questionNumber: 13, difficulty: "medium", question: "How do you create an object in JavaScript?", options: ["const obj = {};", "const obj = [];", "const obj = ();", "const obj = <>;"], correctAnswer: "const obj = {};", explanation: "Curly braces are used for object literal syntax." },
    { setNumber: 3, questionNumber: 14, difficulty: "medium", question: "Which method can be used to merge two or more arrays?", options: ["concat()", "combine()", "merge()", "join()"], correctAnswer: "concat()", explanation: "concat() is used to join two or more arrays." },
    { setNumber: 3, questionNumber: 15, difficulty: "medium", question: "What does the `break` statement do?", options: ["Terminates the loop", "Starts next iteration", "Stops the server", "Yields value"], correctAnswer: "Terminates the loop", explanation: "break immediately exits the current loop." },

    // Set 4: Hard
    { setNumber: 4, questionNumber: 1, difficulty: "hard", question: "Which concept allows a function to access outer scope variables?", options: ["Closure", "Looping", "Casting", "Parsing"], correctAnswer: "Closure", explanation: "Closures preserve lexical scope." },
    { setNumber: 4, questionNumber: 2, difficulty: "hard", question: "Which method filters elements based on condition?", options: ["filter()", "map()", "reduce()", "findIndex()"], correctAnswer: "filter()", explanation: "filter() returns matching elements." },
    { setNumber: 4, questionNumber: 3, difficulty: "hard", question: "Which keyword is used with promises for waiting result?", options: ["await", "pause", "hold", "asyncwait"], correctAnswer: "await", explanation: "await waits for promise resolution." },
    { setNumber: 4, questionNumber: 4, difficulty: "hard", question: "Which function converts object to JSON string?", options: ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.toString()"], correctAnswer: "JSON.stringify()", explanation: "JSON.stringify() converts object into JSON string." },
    { setNumber: 4, questionNumber: 5, difficulty: "hard", question: "Which array method reduces array to one value?", options: ["reduce()", "map()", "filter()", "slice()"], correctAnswer: "reduce()", explanation: "reduce() accumulates values into one." },
    { setNumber: 4, questionNumber: 6, difficulty: "hard", question: "What is the result of `[] == ![]`?", options: ["true", "false", "undefined", "NaN"], correctAnswer: "true", explanation: "Due to type coercion, both sides eventually convert to number 0." },
    { setNumber: 4, questionNumber: 7, difficulty: "hard", question: "What is the purpose of 'use strict' in JavaScript?", options: ["Enforces stricter parsing", "Speeds up code", "Adds new features", "Disables console"], correctAnswer: "Enforces stricter parsing", explanation: "'use strict' helps catch common coding bloopers and prevents unsafe actions." },
    { setNumber: 4, questionNumber: 8, difficulty: "hard", question: "Which of these is NOT a stage of a Promise?", options: ["settled", "fulfilled", "pending", "rejected"], correctAnswer: "settled", explanation: "A promise is either pending, fulfilled, or rejected. Settled is a state of being either fulfilled or rejected." },
    { setNumber: 4, questionNumber: 9, difficulty: "hard", question: "How do you handle errors in async/await functions?", options: ["try...catch", "if...else", "error.on()", "then().catch()"], correctAnswer: "try...catch", explanation: "Standard error handling for synchronous and async code uses try/catch blocks." },
    { setNumber: 4, questionNumber: 10, difficulty: "hard", question: "What is the spread operator syntax?", options: ["...", "===", "=>", "??="], correctAnswer: "...", explanation: "The spread operator (...) expands iterables into elements." },
    { setNumber: 4, questionNumber: 11, difficulty: "hard", question: "Which concept refers to moving variable declarations to the top of their scope?", options: ["Hoisting", "Clamping", "Lifting", "Bubbling"], correctAnswer: "Hoisting", explanation: "JavaScript moves declarations to the top before execution." },
    { setNumber: 4, questionNumber: 12, difficulty: "hard", question: "What does the `Reflect` API do?", options: ["Provides tools for object manipulation", "Renders UI", "Handles network", "Encrypts data"], correctAnswer: "Provides tools for object manipulation", explanation: "Reflect is a built-in object that provides methods for interceptable JavaScript operations." },
    { setNumber: 4, questionNumber: 13, difficulty: "hard", question: "What is a 'Pure Function'?", options: ["Always returns same output for same input", "A function with no name", "A function inside a class", "None of these"], correctAnswer: "Always returns same output for same input", explanation: "Pure functions have no side effects and are deterministic." },
    { setNumber: 4, questionNumber: 14, difficulty: "hard", question: "Which method creates a shallow copy of a portion of an array?", options: ["slice()", "splice()", "split()", "copy()"], correctAnswer: "slice()", explanation: "slice() returns a shallow copy of an array section." },
    { setNumber: 4, questionNumber: 15, difficulty: "hard", question: "What is 'Debouncing' in JavaScript?", options: ["Delaying execution until signal settles", "Speeding up loops", "Reducing RAM usage", "Removing bugs"], correctAnswer: "Delaying execution until signal settles", explanation: "Debouncing limits the rate at which a function is invoked." },

    // Set 5: Hard
    { setNumber: 5, questionNumber: 1, difficulty: "hard", question: "What is event bubbling?", options: ["Event propagates from child to parent", "Event stops immediately", "Event runs only once", "Event repeats forever"], correctAnswer: "Event propagates from child to parent", explanation: "In bubbling, events move upward in DOM." },
    { setNumber: 5, questionNumber: 2, difficulty: "hard", question: "Which method finds the first matching element?", options: ["find()", "filter()", "map()", "reduce()"], correctAnswer: "find()", explanation: "find() returns the first matched element." },
    { setNumber: 5, questionNumber: 3, difficulty: "hard", question: "What does NaN mean?", options: ["Not a Number", "No assigned Name", "Null and None", "Negative and Null"], correctAnswer: "Not a Number", explanation: "NaN means invalid numeric result." },
    { setNumber: 5, questionNumber: 4, difficulty: "hard", question: "Which operator spreads array/object values?", options: ["...", "===", "&&", "??"], correctAnswer: "...", explanation: "Spread operator is ..." },
    { setNumber: 5, questionNumber: 5, difficulty: "hard", question: "Which method removes whitespace from both sides of a string?", options: ["trim()", "slice()", "split()", "replaceAll()"], correctAnswer: "trim()", explanation: "trim() removes leading and trailing spaces." },
    { setNumber: 5, questionNumber: 6, difficulty: "hard", question: "Which method is used to stop event bubbling?", options: ["event.stopPropagation()", "event.preventDefault()", "event.stop()", "event.halt()"], correctAnswer: "event.stopPropagation()", explanation: "stopPropagation() prevents the event from reaching parent elements." },
    { setNumber: 5, questionNumber: 7, difficulty: "hard", question: "What is the difference between `null` and `undefined`?", options: ["null is assigned, undefined means not defined", "They are exactly the same", "null is a number, undefined is zero", "undefined is assigned, null means error"], correctAnswer: "null is assigned, undefined means not defined", explanation: "null is an intentional absence of value, undefined is a default state." },
    { setNumber: 5, questionNumber: 8, difficulty: "hard", question: "Which method is used to define a class in ES6?", options: ["class", "constructor", "prototype", "define"], correctAnswer: "class", explanation: "The 'class' keyword was introduced in ES6 for object-oriented patterns." },
    { setNumber: 5, questionNumber: 9, difficulty: "hard", question: "What is a Symbol in JavaScript?", options: ["A unique, immutable data type", "A mathematical operator", "A comment syntax", "A graphic icon"], correctAnswer: "A unique, immutable data type", explanation: "Symbols are used to create unique property keys for objects." },
    { setNumber: 5, questionNumber: 10, difficulty: "hard", question: "What does `Object.freeze()` do?", options: ["Prevents any changes to an object", "Makes object read-only for one user", "Deletes the object", "Encrypts the object"], correctAnswer: "Prevents any changes to an object", explanation: "Frozen objects cannot have new properties added or existing ones modified/removed." },
    { setNumber: 5, questionNumber: 11, difficulty: "hard", question: "Which method executes a function for each element in an array?", options: ["forEach()", "map()", "every()", "execute()"], correctAnswer: "forEach()", explanation: "forEach() iterates over array elements and executes a callback." },
    { setNumber: 5, questionNumber: 12, difficulty: "hard", question: "What is 'Currying' in JavaScript?", options: ["Breaking down function into multiple functions", "Adding spice to code", "Merging two arrays", "Handling errors"], correctAnswer: "Breaking down function into multiple functions", explanation: "Currying transforms a function with multiple arguments into a sequence of nested functions." },
    { setNumber: 5, questionNumber: 13, difficulty: "hard", question: "How can you detect if an element is hidden via CSS?", options: ["window.getComputedStyle(el).display === 'none'", "el.isHidden", "el.style.isHide", "el.hidden()"], correctAnswer: "window.getComputedStyle(el).display === 'none'", explanation: "Computed styles show the actual appearance state of an element." },
    { setNumber: 5, questionNumber: 14, difficulty: "hard", question: "What is the purpose of `localStorage`?", options: ["Storing data with no expiration", "Storing temporary session data", "Running background tasks", "Managing cookies"], correctAnswer: "Storing data with no expiration", explanation: "localStorage data persists until explicitly cleared." },
    { setNumber: 5, questionNumber: 15, difficulty: "hard", question: "Which API is used to make HTTP requests?", options: ["Fetch API", "DOM API", "Canvas API", "Web Audio API"], correctAnswer: "Fetch API", explanation: "The Fetch API provides a modern interface for network requests." }
  ],

  python: [
    // Set 1: Easy
    { setNumber: 1, questionNumber: 1, difficulty: "easy", question: "Which keyword is used to define a function in Python?", options: ["def", "function", "fun", "define"], correctAnswer: "def", explanation: "def is used to define functions." },
    { setNumber: 1, questionNumber: 2, difficulty: "easy", question: "Which data type stores True/False values?", options: ["bool", "int", "str", "list"], correctAnswer: "bool", explanation: "Boolean type stores True/False." },
    { setNumber: 1, questionNumber: 3, difficulty: "easy", question: "Which symbol starts a comment in Python?", options: ["#", "//", "/*", "--"], correctAnswer: "#", explanation: "# is used for comments." },
    { setNumber: 1, questionNumber: 4, difficulty: "easy", question: "Which function prints output?", options: ["print()", "echo()", "show()", "display()"], correctAnswer: "print()", explanation: "print() shows output." },
    { setNumber: 1, questionNumber: 5, difficulty: "easy", question: "Which type is mutable?", options: ["list", "tuple", "str", "int"], correctAnswer: "list", explanation: "Lists are mutable." },
    { setNumber: 1, questionNumber: 6, difficulty: "easy", question: "Which operator is used for addition?", options: ["+", "-", "*", "/"], correctAnswer: "+", explanation: "The plus sign is used to add numbers." },
    { setNumber: 1, questionNumber: 7, difficulty: "easy", question: "What is the correct extension of Python files?", options: [".py", ".pyt", ".python", ".sh"], correctAnswer: ".py", explanation: "Python source files use the .py extension." },
    { setNumber: 1, questionNumber: 8, difficulty: "easy", question: "Which of these is used for multi-line comments?", options: ["Triple quotes (''' or \"\"\")", "#", "//", "--"], correctAnswer: "Triple quotes (''' or \"\"\")", explanation: "Strings enclosed in triple quotes can span multiple lines and serve as comments." },
    { setNumber: 1, questionNumber: 9, difficulty: "easy", question: "How do you start an IF statement in Python?", options: ["if x > 5:", "if (x > 5)", "if x > 5 then:", "if x > 5;"], correctAnswer: "if x > 5:", explanation: "Python IF statements use a colon and indentation." },
    { setNumber: 1, questionNumber: 10, difficulty: "easy", question: "Which function is used to get user input?", options: ["input()", "get()", "scan()", "write()"], correctAnswer: "input()", explanation: "The input() function reads a line from input." },
    { setNumber: 1, questionNumber: 11, difficulty: "easy", question: "What is the result of 10 / 2 in Python 3?", options: ["5.0", "5", "2", "NaN"], correctAnswer: "5.0", explanation: "Division always returns a float in Python 3." },
    { setNumber: 1, questionNumber: 12, difficulty: "easy", question: "Which operator is used for multiplication?", options: ["*", "+", "x", "^"], correctAnswer: "*", explanation: "Asterisk is the multiplication operator." },
    { setNumber: 1, questionNumber: 13, difficulty: "easy", question: "How do you declare a list?", options: ["x = [1, 2, 3]", "x = (1, 2, 3)", "x = {1, 2, 3}", "x = <1, 2, 3>"], correctAnswer: "x = [1, 2, 3]", explanation: "Lists are declared using square brackets." },
    { setNumber: 1, questionNumber: 14, difficulty: "easy", question: "What does 'len()' do?", options: ["Returns the number of items", "Returns the type", "Returns the sum", "Clears the list"], correctAnswer: "Returns the number of items", explanation: "len() returns the length of a sequence or collection." },
    { setNumber: 1, questionNumber: 15, difficulty: "easy", question: "Which of these is NOT a valid variable name?", options: ["2var", "my_var", "_var", "var2"], correctAnswer: "2var", explanation: "Variable names cannot start with a digit." },

    // Set 2: Medium
    { setNumber: 2, questionNumber: 1, difficulty: "medium", question: "Which keyword is used for a loop over sequence?", options: ["for", "loop", "iterate", "foreach"], correctAnswer: "for", explanation: "for is used for iteration." },
    { setNumber: 2, questionNumber: 2, difficulty: "medium", question: "Which function gives length of list/string?", options: ["len()", "length()", "size()", "count()"], correctAnswer: "len()", explanation: "len() returns length." },
    { setNumber: 2, questionNumber: 3, difficulty: "medium", question: "Which keyword handles exceptions?", options: ["try", "catch", "throws", "error"], correctAnswer: "try", explanation: "try/except handles exceptions." },
    { setNumber: 2, questionNumber: 4, difficulty: "medium", question: "Which data type stores key-value pairs?", options: ["dict", "list", "tuple", "set"], correctAnswer: "dict", explanation: "dict stores key-value pairs." },
    { setNumber: 2, questionNumber: 5, difficulty: "medium", question: "Which operator is used for exponent?", options: ["**", "*", "//", "%"], correctAnswer: "**", explanation: "** means power." },
    { setNumber: 2, questionNumber: 6, difficulty: "medium", question: "Which method adds an element to the end of a list?", options: ["append()", "extend()", "insert()", "add()"], correctAnswer: "append()", explanation: "append() adds one item to the list end." },
    { setNumber: 2, questionNumber: 7, difficulty: "medium", question: "How do you start a WHILE loop?", options: ["while x < 5:", "while (x < 5)", "while x < 5 then:", "while x < 5;"], correctAnswer: "while x < 5:", explanation: "WHILE loops use a condition followed by a colon." },
    { setNumber: 2, questionNumber: 8, difficulty: "medium", question: "Which operator is used for floor division?", options: ["//", "/", "%", "**"], correctAnswer: "//", explanation: "// divides and rounds down to nearest integer." },
    { setNumber: 2, questionNumber: 9, difficulty: "medium", question: "How can you check if an item exists in a list?", options: ["'item' in my_list", "my_list.has('item')", "my_list.contains('item')", "find('item', my_list)"], correctAnswer: "'item' in my_list", explanation: "The 'in' operator checks for membership." },
    { setNumber: 2, questionNumber: 10, difficulty: "medium", question: "Which method removes all items from a list?", options: ["clear()", "remove()", "delete()", "pop()"], correctAnswer: "clear()", explanation: "clear() empties the entire list." },
    { setNumber: 2, questionNumber: 11, difficulty: "medium", question: "What will `range(5)` generate?", options: ["0 to 4", "0 to 5", "1 to 5", "1 to 4"], correctAnswer: "0 to 4", explanation: "range(n) generates numbers from 0 up to, but not including, n." },
    { setNumber: 2, questionNumber: 12, difficulty: "medium", question: "How do you create a tuple?", options: ["x = (1, 2, 3)", "x = [1, 2, 3]", "x = {1, 2, 3}", "x = <1, 2, 3>"], correctAnswer: "x = (1, 2, 3)", explanation: "Tuples use parentheses syntax." },
    { setNumber: 2, questionNumber: 13, difficulty: "medium", question: "Which of these is a valid set declaration?", options: ["x = {1, 2, 3}", "x = [1, 2, 3]", "x = (1, 2, 3)", "x = <1, 2, 3>"], correctAnswer: "x = {1, 2, 3}", explanation: "Sets use curly braces with comma-separated non-key-value elements." },
    { setNumber: 2, questionNumber: 14, difficulty: "medium", question: "How do you convert a string to uppercase?", options: ["str.upper()", "upper(str)", "str.toUpper()", "str.uppercase()"], correctAnswer: "str.upper()", explanation: "upper() is a string method that returns uppercase version." },
    { setNumber: 2, questionNumber: 15, difficulty: "medium", question: "What is the result of 10 % 3?", options: ["1", "3", "3.33", "0"], correctAnswer: "1", explanation: "% is the modulo operator, returning the remainder." },

    // Set 3: Medium
    { setNumber: 3, questionNumber: 1, difficulty: "medium", question: "Which function converts string to integer?", options: ["int()", "str()", "float()", "input()"], correctAnswer: "int()", explanation: "int() converts to integer." },
    { setNumber: 3, questionNumber: 2, difficulty: "medium", question: "Which collection stores unique values?", options: ["set", "list", "tuple", "dict"], correctAnswer: "set", explanation: "set stores unique elements." },
    { setNumber: 3, questionNumber: 3, difficulty: "medium", question: "What is the result type of input()?", options: ["str", "int", "bool", "float"], correctAnswer: "str", explanation: "input() returns string." },
    { setNumber: 3, questionNumber: 4, difficulty: "medium", question: "Which keyword is used to create a class?", options: ["class", "struct", "object", "def"], correctAnswer: "class", explanation: "class defines a class." },
    { setNumber: 3, questionNumber: 5, difficulty: "medium", question: "Which keyword stops a loop?", options: ["break", "stop", "exit", "end"], correctAnswer: "break", explanation: "break terminates loop." },
    { setNumber: 3, questionNumber: 6, difficulty: "medium", question: "How do you access the value of a dictionary key 'name'?", options: ["my_dict['name']", "my_dict('name')", "my_dict.get_name()", "my_dict.name"], correctAnswer: "my_dict['name']", explanation: "Bracket notation is standard for dictionary access." },
    { setNumber: 3, questionNumber: 7, difficulty: "medium", question: "Which keyword is used to skip the rest of the loop block and start next iteration?", options: ["continue", "pass", "skip", "next"], correctAnswer: "continue", explanation: "continue skips to the next loop iteration." },
    { setNumber: 3, questionNumber: 8, difficulty: "medium", question: "How do you import a module named 'math'?", options: ["import math", "using math", "include math", "require math"], correctAnswer: "import math", explanation: "The import keyword loads modules." },
    { setNumber: 3, questionNumber: 9, difficulty: "medium", question: "Which method is used to remove an item by its value from a list?", options: ["remove()", "pop()", "del", "clear()"], correctAnswer: "remove()", explanation: "remove(val) deletes the first occurrence of val." },
    { setNumber: 3, questionNumber: 10, difficulty: "medium", question: "What is the output of `bool('')`?", options: ["False", "True", "None", "Error"], correctAnswer: "False", explanation: "Empty strings are falsy in Python." },
    { setNumber: 3, questionNumber: 11, difficulty: "medium", question: "Which function returns a list of sorted items?", options: ["sorted()", "sort()", "arrange()", "order()"], correctAnswer: "sorted()", explanation: "sorted() returns a new sorted list from an iterable." },
    { setNumber: 3, questionNumber: 12, difficulty: "medium", question: "How do you define multiple arguments in a function?", options: ["def f(a, b):", "def f(a & b):", "def f(a; b):", "def f(a + b):"], correctAnswer: "def f(a, b):", explanation: "Arguments are comma-separated." },
    { setNumber: 3, questionNumber: 13, difficulty: "medium", question: "Which method is used to split a string into a list?", options: ["split()", "divide()", "break()", "slice()"], correctAnswer: "split()", explanation: "split() breaks a string based on a delimiter (default whitespace)." },
    { setNumber: 3, questionNumber: 14, difficulty: "medium", question: "What happens if you try to change a tuple item?", options: ["Error occurs", "Value changes", "Tuple becomes list", "Nothing happens"], correctAnswer: "Error occurs", explanation: "Tuples are immutable; they cannot be changed after creation." },
    { setNumber: 3, questionNumber: 15, difficulty: "medium", question: "How do you check the type of a variable?", options: ["type(x)", "typeof(x)", "checkType(x)", "x.type()"], correctAnswer: "type(x)", explanation: "type() returns the class type of the object." },

    // Set 4: Hard
    { setNumber: 4, questionNumber: 1, difficulty: "hard", question: "Which method adds an item to a list?", options: ["append()", "add()", "insertItem()", "push()"], correctAnswer: "append()", explanation: "append() adds item to list end." },
    { setNumber: 4, questionNumber: 2, difficulty: "hard", question: "Which module is commonly used for JSON?", options: ["json", "os", "sys", "math"], correctAnswer: "json", explanation: "json module handles JSON." },
    { setNumber: 4, questionNumber: 3, difficulty: "hard", question: "Which keyword is used for anonymous function?", options: ["lambda", "anon", "func", "inline"], correctAnswer: "lambda", explanation: "lambda creates anonymous functions." },
    { setNumber: 4, questionNumber: 4, difficulty: "hard", question: "Which operator checks membership?", options: ["in", "is", "==", "with"], correctAnswer: "in", explanation: "in checks membership." },
    { setNumber: 4, questionNumber: 5, difficulty: "hard", question: "Which statement does nothing?", options: ["pass", "skip", "null", "continue"], correctAnswer: "pass", explanation: "pass is null operation." },
    { setNumber: 4, questionNumber: 6, difficulty: "hard", question: "How do you create a constructor in Python?", options: ["__init__()", "__new__()", "__create__()", "constructor()"], correctAnswer: "__init__()", explanation: "__init__ is the initializer method for classes." },
    { setNumber: 4, questionNumber: 7, difficulty: "hard", question: "What is the purpose of 'self' in Python classes?", options: ["Refers to the instance of the object", "Refers to the class itself", "Refers to global scope", "Refers to parent class"], correctAnswer: "Refers to the instance of the object", explanation: "self connects the method to the specific instance's attributes." },
    { setNumber: 4, questionNumber: 8, difficulty: "hard", question: "What is 'List Comprehension'?", options: ["Concise way to create lists", "A complex way to sort", "A list inside a list", "None of these"], correctAnswer: "Concise way to create lists", explanation: "Comprehensions provide a compact syntax to generate lists." },
    { setNumber: 4, questionNumber: 9, difficulty: "hard", question: "How do you inherit from a class 'Parent'?", options: ["class Child(Parent):", "class Child < Parent:", "class Child inherits Parent:", "class Child extends Parent:"], correctAnswer: "class Child(Parent):", explanation: "Parenthesis after class name denotes inheritance in Python." },
    { setNumber: 4, questionNumber: 10, difficulty: "hard", question: "Which decorator is used to define a static method?", options: ["@staticmethod", "@static", "@classmethod", "@constant"], correctAnswer: "@staticmethod", explanation: "@staticmethod defines a method that doesn't need self or cls." },
    { setNumber: 4, questionNumber: 11, difficulty: "hard", question: "What is a 'Generator' in Python?", options: ["A function that returns an iterator", "A tool to create power", "A random number generator", "None of these"], correctAnswer: "A function that returns an iterator", explanation: "Generators yield values one by one using the yield keyword." },
    { setNumber: 4, questionNumber: 12, difficulty: "hard", question: "What does `*args` do in a function definition?", options: ["Allows variable number of pos arguments", "Allows variable number of keyword arguments", "Multiplies arguments", "Sets argument to pointer"], correctAnswer: "Allows variable number of pos arguments", explanation: "*args collects extra positional arguments into a tuple." },
    { setNumber: 4, questionNumber: 13, difficulty: "hard", question: "What does `**kwargs` do?", options: ["Allows variable number of keyword arguments", "Allows variable number of pos arguments", "Doubles the arguments", "None of these"], correctAnswer: "Allows variable number of keyword arguments", explanation: "**kwargs collects keyword arguments into a dictionary." },
    { setNumber: 4, questionNumber: 14, difficulty: "hard", question: "Which method is used to execute a shell command from Python?", options: ["os.system()", "sys.run()", "shell.execute()", "os.exec()"], correctAnswer: "os.system()", explanation: "The os module provides system() to run shell commands." },
    { setNumber: 4, questionNumber: 15, difficulty: "hard", question: "What is 'Pickling' in Python?", options: ["Serializing and deserializing objects", "Formatting strings", "Adding salt to data", "None of these"], correctAnswer: "Serializing and deserializing objects", explanation: "Pickling converts Python objects to byte streams and vice versa." },

    // Set 5: Hard
    { setNumber: 5, questionNumber: 1, difficulty: "hard", question: "Which function opens a file in Python?", options: ["open()", "read()", "file()", "load()"], correctAnswer: "open()", explanation: "open() is used for file handling." },
    { setNumber: 5, questionNumber: 2, difficulty: "hard", question: "Which method removes and returns dict item?", options: ["pop()", "remove()", "delete()", "discard()"], correctAnswer: "pop()", explanation: "pop() removes and returns item." },
    { setNumber: 5, questionNumber: 3, difficulty: "hard", question: "Which special method is constructor in Python?", options: ["__init__", "__start__", "__create__", "__main__"], correctAnswer: "__init__", explanation: "__init__ is constructor." },
    { setNumber: 5, questionNumber: 4, difficulty: "hard", question: "Which function returns range object?", options: ["range()", "list()", "loop()", "sequence()"], correctAnswer: "range()", explanation: "range() returns range object." },
    { setNumber: 5, questionNumber: 5, difficulty: "hard", question: "Which keyword continues next iteration?", options: ["continue", "skip", "next", "pass"], correctAnswer: "continue", explanation: "continue skips to next iteration." },
    { setNumber: 5, questionNumber: 6, difficulty: "hard", question: "What is a 'Decorator'?", options: ["Function that modifies another function", "A tool to design UI", "A part of class syntax", "None of these"], correctAnswer: "Function that modifies another function", explanation: "Decorators wrap functions to add functionality dynamically." },
    { setNumber: 5, questionNumber: 7, difficulty: "hard", question: "What is the result of `1 / 0` in Python?", options: ["ZeroDivisionError", "Infinity", "0", "None"], correctAnswer: "ZeroDivisionError", explanation: "Division by zero raises a specific exception in Python." },
    { setNumber: 5, questionNumber: 8, difficulty: "hard", question: "Which module is used for Regular Expressions?", options: ["re", "regex", "search", "match"], correctAnswer: "re", explanation: "The 're' module provides support for regular expressions." },
    { setNumber: 5, questionNumber: 9, difficulty: "hard", question: "How do you implement a Context Manager?", options: ["Using __enter__ and __exit__ methods", "Using try/finally only", "Using @property", "None of these"], correctAnswer: "Using __enter__ and __exit__ methods", explanation: "These methods define setup and teardown for 'with' statements." },
    { setNumber: 5, questionNumber: 10, difficulty: "hard", question: "What is 'MRO' in Python?", options: ["Method Resolution Order", "Managed Run Operation", "Memory Rescue Object", "None of these"], correctAnswer: "Method Resolution Order", explanation: "MRO determines the order in which base classes are searched for methods (important for multiple inheritance)." },
    { setNumber: 5, questionNumber: 11, difficulty: "hard", question: "Which built-in function returns a list of all attributes of an object?", options: ["dir()", "attrs()", "list()", "help()"], correctAnswer: "dir()", explanation: "dir() returns a sorted list of names in the current scope or object's attributes." },
    { setNumber: 5, questionNumber: 12, difficulty: "hard", question: "What is 'Monkey Patching' in Python?", options: ["Dynamic modification of a class or module", "Fixing bugs quickly", "Copying code from web", "None of these"], correctAnswer: "Dynamic modification of a class or module", explanation: "Monkey patching allows replacing or extending parts of a module at runtime." },
    { setNumber: 5, questionNumber: 13, difficulty: "hard", question: "How do you handle multiple exceptions in one except block?", options: ["except (Error1, Error2):", "except Error1 | Error2:", "except Error1, Error2:", "except [Error1, Error2]:"], correctAnswer: "except (Error1, Error2):", explanation: "A tuple of exceptions can be provided to catch any of them." },
    { setNumber: 5, questionNumber: 14, difficulty: "hard", question: "Which function converts a string with valid Python code into executable code?", options: ["exec()", "run()", "eval()", "python()"], correctAnswer: "exec()", explanation: "exec() dynamically executes Python code stored in strings." },
    { setNumber: 5, questionNumber: 15, difficulty: "hard", question: "What is an 'f-string'?", options: ["Formatted string literal", "Function string", "File string", "Fast string"], correctAnswer: "Formatted string literal", explanation: "f-strings (f'...') allow easy expression interpolation in strings." }
  ]
};

const normalizeSkill = (skill = "") => skill.trim().toLowerCase();

const seedSkillQuestionsIfMissing = async (skill) => {
  const normalizedSkill = normalizeSkill(skill);
  const existing = await QuizQuestion.countDocuments({ skill: normalizedSkill });

  if (existing > 0) return;

  const bank = localQuestionBank[normalizedSkill];
  if (!bank || bank.length === 0) return;

  const docs = bank.map((item) => ({
    skill: normalizedSkill,
    setNumber: item.setNumber,
    questionNumber: item.questionNumber,
    type: "mcq",
    difficulty: item.difficulty,
    question: item.question,
    options: item.options,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation || "",
    marks: 1,
  }));

  await QuizQuestion.insertMany(docs);
};

const getAvailableSkills = async (req, res) => {
  try {
    const dbSkills = await QuizQuestion.distinct("skill");
    const localSkills = Object.keys(localQuestionBank);
    const merged = [...new Set([...dbSkills, ...localSkills])];

    res.status(200).json({
      success: true,
      skills: merged.sort(),
    });
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getQuizQuestions = async (req, res) => {
  try {
    const skill = normalizeSkill(req.query.skill || "javascript");
    const setNumber = Number(req.query.set || 1);

    await seedSkillQuestionsIfMissing(skill);

    const questions = await QuizQuestion.find({
      skill,
      setNumber,
    })
      .sort({ questionNumber: 1 })
      .select("-correctAnswer");

    res.status(200).json({
      success: true,
      skill,
      setNumber,
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get quiz questions error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const checkAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || !selectedAnswer) {
      return res.status(400).json({
        success: false,
        message: "questionId and selectedAnswer are required",
      });
    }

    const question = await QuizQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const isCorrect =
      question.correctAnswer.trim().toLowerCase() ===
      String(selectedAnswer).trim().toLowerCase();

    res.status(200).json({
      success: true,
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || "",
      marksAwarded: isCorrect ? question.marks || 1 : 0,
    });
  } catch (error) {
    console.error("Check answer error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getQuizProgress = async (req, res) => {
  try {
    const skill = normalizeSkill(req.query.skill || "javascript");

    const counts = await QuizQuestion.aggregate([
      { $match: { skill } },
      {
        $group: {
          _id: "$setNumber",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      skill,
      sets: counts,
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const saveAttempt = async (req, res) => {
  try {
    const { skill, setNumber, score, totalQuestions, percentage, passed } = req.body;

    if (!skill || !setNumber || score === undefined || !totalQuestions) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields to save attempt",
      });
    }

    const attempt = await PracticeAttempt.create({
      user: req.user._id,
      skill,
      setNumber,
      score,
      totalQuestions,
      percentage,
      passed,
    });

    res.status(201).json({
      success: true,
      message: "Attempt saved successfully",
      attempt,
    });
  } catch (error) {
    console.error("Save attempt error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  localQuestionBank,
  getAvailableSkills,
  getQuizQuestions,
  checkAnswer,
  getQuizProgress,
  saveAttempt,
};