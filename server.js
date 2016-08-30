// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 7, task: 'Laundry', description: 'Wash clothes' },
   { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  var query = req.query.q;
  console.log(query);
  var searchData = []
  for(var i = 0; i < todos.length; i++){
    if(todos[i].task === query){
      searchData.push(todos[i]);
    }
  }
  res.json({todos: searchData});
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var id = todos[todos.length-1]._id + 1;
  var newTask = {_id: id, task: req.body.task, description: req.body.description};
  todos.push(newTask);
   res.json(newTask);
});

app.get('/api/todos/:id', function show(req, res) {
  var id = parseInt(req.params.id);
  var output = todos.find(function(item){
    return item._id === id;
  });
  res.json(output);
});


app.put('/api/todos/:id', function update(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex(function(item){
    return item._id === id;
  });
  var item = todos[index];
  item.task = req.body.task;
  item.description = req.body.description;
  res.json(item);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex(function(item){
    return item._id === id;
  });
  todos.splice(index, 1);
   res.json({});
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
