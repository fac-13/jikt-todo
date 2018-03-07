var test = require('tape');
var logic = require('./logic');
var todoFunctions = require('./logic.js');

test('Testing function addTodo', function(t) {
  let expected = [{id:1, item: "Feed the cat"}];
  let actual = todoFunctions.addTodo([], {item: "Feed the cat"});
  t.deepEqual(actual, expected, 'A new object with id should be appended to empty array');
  t.end();
});

test('Testing function addTodo', function(t) {
  let expected = [{id:1, item: "Feed the cat"}, {id:2, item: "Wash dishes"}];
  let actual = todoFunctions.addTodo([{id:1, item: "Feed the cat"}], {item: "Wash dishes"});
  t.deepEqual(actual, expected, 'A new object with id 2 should be appended to one-element array');
  t.end();
});

test('Testing function deleteTodo', function(t) {
  let expected = [{id:1, item: "Feed the cat"}];
  let actual = todoFunctions.deleteTodo([{id:1, item: "Feed the cat"}, {id: 2, item: "Wash dishes"}],2);
  t.deepEqual(actual, expected, 'An object with id=idToDelete was removed from array');
  t.end();
});