// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
    // todoFunctions.generateId() will give you a unique id
    // You do not need to understand the implementation of this function.
    generateId: (function() {
      var idCounter = 0;

      function incrementCounter() {
        return (idCounter += 1);
      }

      return incrementCounter;
    })(),

    //cloneArrayOfObjects will create a copy of the todos array
    //changes to the new array don't affect the original
    cloneArrayOfObjects: function(todos) {
      return todos.map(function(todo){
        return JSON.parse(JSON.stringify(todo));
      });
    },

    addTodo: function(todos, newTodo) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // returns a new array, it should contain todos with the newTodo added to the end.
      // add an id to the newTodo. You can use the generateId function to create an id.
      // hint: array.concat
      let localTodos = this.cloneArrayOfObjects(todos);
      console.log(localTodos);
      let newID = this.generateId();
      let localItemObject = JSON.parse(JSON.stringify(newTodo));
      localItemObject.id=newID;
      let result = localTodos.concat([localItemObject]);
      console.log(result, newID);
      return result;
    },
    deleteTodo: function(todos, idToDelete) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // return a new array, this should not contain any todo with an id of idToDelete
      // hint: array.filter
      let localTodos = this.cloneArrayOfObjects(todos);
      let filteredTodos = localTodos.filter(function(item){
        return item.id!==idToDelete;
      });
      return filteredTodos;
    },
    markTodo: function(todos, idToMark) {
      // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
      // in the new todo array, all elements will remain unchanged except the one with id: idToMark
      // this element will have its done value toggled
      // hint: array.map
     let localTodos = this.cloneArrayOfObjects(todos);
     let toggledArray = localTodos.map(function(item){
       if(item.id===idToMark){
         item.done=!item.done;
       }
       return item;
     })
     return toggledArray;

    },
    sortDescending: function(item1, item2){
      return item2.id-item1.id;
    },
    sortAZ: function(item1, item2){
      if(item1.description < item2.description) return -1;
      if(item1.description > item2.description) return 1;
      return 0;
    },
    
    sortTodos: function(todos, sortFunction) {
      // stretch goal! Do this last
      // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
      // sortFunction will have same signature as the sort function in array.sort
      // hint: array.slice, array.sort
      let localTodos = this.cloneArrayOfObjects(todos);
      let sortedTodos = localTodos.sort(sortFunction);
      return sortedTodos;
    },
  };



  // Why is this if statement necessary?
  // The answer has something to do with needing to run code both in the browser and in Node.js
  // See this article for more details:
  // http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
  if (typeof module !== 'undefined') {
    module.exports = todoFunctions;
  }
  
