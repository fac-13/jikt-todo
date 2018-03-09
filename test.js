var test = require('tape');
var logic = require('./logic');
var todoFunctions = require('./logic.js');

var state = [
  { id: -3, description: "feed the cat", done: false },
  { id: -2, description: "allocate tasks", done: false },
  { id: -1, description: "be happy", done: false }
];

test('Testing function addTodo', function(t) {
  let expected = [{id:1, description: "Feed the cat"}];
  let actual = todoFunctions.addTodo([], {description: "Feed the cat"});
  t.deepEqual(actual, expected, 'A new object with id should be appended to empty array');
  t.end();
});

test('Testing function addTodo', function(t) {
  let expected = [{id:1, description: "Feed the cat"}, {id:2, description: "Wash dishes"}];
  let actual = todoFunctions.addTodo([{id:1, description: "Feed the cat"}], {description: "Wash dishes"});
  t.deepEqual(actual, expected, 'A new object with id 2 should be appended to one-element array');
  t.end();
});

test('Testing function deleteTodo', function(t) {
  let expected = [{id:1, description: "Feed the cat"}];
  let actual = todoFunctions.deleteTodo([{id:1, description: "Feed the cat"}, {id: 2, description: "Wash dishes"}],2);
  t.deepEqual(actual, expected, 'An object with id=idToDelete was removed from array');
  t.end();
});

test("Testing deleteTodo to check parameters are not mutated", function(t) {
  var actual = todoFunctions.deleteTodo(state, -1).length;
  var expected = state.length - 1;
  t.equals(actual, expected, "The parameter has not been mutated");
  t.end();
});

test("Testing deleteTodo to check parameters are not mutated", function(t) {
  var expected = JSON.parse(JSON.stringify(state));
  todoFunctions.deleteTodo(expected, -1);
  t.deepEqual(state, expected, "The parameter has not been mutated");
  t.end();
});

test("Testing deleteTodo to check if all items were removed after three calls", function(t) {
  var interim1 = todoFunctions.deleteTodo(state, -3);
  var interim2 = todoFunctions.deleteTodo(interim1, -2);
  var actual = todoFunctions.deleteTodo(interim2, -1);
  var expected = [];
  t.deepEqual(actual, expected, "The parameter has not been mutated");
  t.end();
});

test('Testing function markTodo false->true', function(t) {
  let actual = todoFunctions.markTodo([{id:1, description: "Feed the cat", done:false}, {id:2, description: "Wash dishes", done: false}],2);
  let expected = [{id:1, description: "Feed the cat", done:false}, {id:2, description: "Wash dishes", done: true}];
  t.deepEqual(actual, expected, 'An object with id=idToDelete was removed from array');
  t.end();
});

test('Testing function markTodo true->false', function(t) {
  let actual = todoFunctions.markTodo([{id:1, description: "Feed the cat", done:false}, {id:2, description: "Wash dishes", done: true}],2);
  let expected = [{id:1, description: "Feed the cat", done:false}, {id:2, description: "Wash dishes", done: false}];
  t.deepEqual(actual, expected, 'An object with id=idToDelete was removed from array');
  t.end();
});

test('Testing function sortTodos descending', function(t) {
  let actual = todoFunctions.sortTodos([{id:1, description: "Feed the cat", done:false}, {id:2, description: "Abide", done: false}],todoFunctions.sortDescending);
  let expected = [ {id:2, description: "Abide", done: false}, {id:1, description: "Feed the cat", done:false}];
  t.deepEqual(actual, expected, 'An object with higher id should come first');
  t.end();
});

test('Testing function sortTodosAZ', function(t) {
  let actual = todoFunctions.sortTodos([{id:1, description: "Feed the cat", done:false}, {id:2, description: "Abide", done: false}],todoFunctions.sortAZ);
  let expected = [ {id:2, description: "Abide", done: false}, {id:1, description: "Feed the cat", done:false}];
  t.deepEqual(actual, expected, 'Objects should be sorted alphabetically');
  t.end();
});

test('Testing function sortTodosZA', function(t) {
  let actual = todoFunctions.sortTodos(state, todoFunctions.sortZA);
  let expected = [
    { id: -3, description: "feed the cat", done: false },
    { id: -1, description: "be happy", done: false },
    { id: -2, description: "allocate tasks", done: false }
  ];
  t.deepEqual(actual, expected, 'Objects should be sorted in the reverse alphabetical order');
  t.end();
});

test('Testing function sortTodos descending', function(t) {
  let actual = todoFunctions.sortTodos([{id:2, description: "Abide", done: false}, {id:1, description: "Feed the cat", done:false}],todoFunctions.sortAscending);
  let expected = [{id:1, description: "Feed the cat", done:false}, {id:2, description: "Abide", done: false}];
  t.deepEqual(actual, expected, 'An object with higher id should come first');
  t.end();
});

