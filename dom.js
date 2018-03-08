// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');

    var state = [
      { id: -3, description: 'first todo', done: false },
      { id: -2, description: 'second todo', done: false },
      { id: -1, description: 'third todo', done: false },
    ]; // this is our initial todoList

    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      var todoNode = document.createElement('li');
      // you will need to use addEventListener

      //making wrapping div inside li
      

      // add span holding description
      var liContent = document.createElement('div');
      var para = document.createElement('p');
      var text = document.createTextNode(todo.description);
      para.appendChild(text);
      liContent.appendChild(para);
      todoNode.appendChild(liContent);

      //this adds container for BUTTONS
      var buttonsContainer = document.createElement("div");
      buttonsContainer.setAttribute("class", "buttons-container");
      todoNode.appendChild(buttonsContainer);
      // this adds the delete button
      var deleteButtonNode = document.createElement('button');
      deleteButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        console.log(todo.id);
        update(newState);
        console.log(newState);
      });
      buttonsContainer.appendChild(deleteButtonNode);


      // add markTodo button
      var markButtonNode = document.createElement('button');
      markButtonNode.addEventListener('click', function(event) {
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
        console.log(newState);
      });
      buttonsContainer.appendChild(markButtonNode);

      // add classes for css
      todoNode.setAttribute("class", "item")
      liContent.setAttribute("class", "item__content")
      para.setAttribute("class", "content__p")
      deleteButtonNode.setAttribute("class", "button__delete")
      markButtonNode.setAttribute("class", "button__mark")

      return todoNode;
    };

    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        // https://developer.mozilla.org/en-US/docs/Web/Events/submit
        // what does event.preventDefault do?
        // what is inside event.target?
        event.preventDefault();
        var description = event.target.description.value; // event.target ....
        if(!description){
          document.querySelector("#validateSpan").style.visibility = "visible";
        }
        else{
          var itemToAdd={done: false};
          document.querySelector("#validateSpan").style.visibility = "hidden";
          itemToAdd.description = description;

          // hint: todoFunctions.addTodo
          var newState = todoFunctions.addTodo(state, itemToAdd); // ?? change this!
          update(newState);
        }
      });
    }

    // you should not need to change this function
    var update = function(newState) {
      state = newState;
      renderState(state);
    };

    // you do not need to change this function
    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
      todoListNode.setAttribute("class", "todos-list")
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      });

      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };

    if (container) renderState(state);

    var styleInvalid = function(){
  document.querySelector("#input-form__text").style.property = "background-color: red;"
}

  })();
