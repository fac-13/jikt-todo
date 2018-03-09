// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');
    var formText = document.querySelector(".input-form__text");
    var sortDescend = document.getElementById('button-descend');
    var sortAZ = document.getElementById('button-az');
    var sortDone = document.getElementById('button-done');

    var state = JSON.parse(localStorage.getItem('state'))
    ||
    [
      { id: -3, description: 'WATER PLANTS', done: false },
      { id: -2, description: 'BUY CATFOOD', done: false },
      { id: -1, description: 'DO JOB', done: false },
    ];

    if(state.length > 0){
      var localState = todoFunctions.cloneArrayOfObjects(state);
      var sortedState = todoFunctions.sortTodos(localState, todoFunctions.sortAscending);
      var lastToDoItem = sortedState[sortedState.length-1];
      highestId = lastToDoItem.id;
    }
    else{
      highestId = 0;
    }

    var timePressed = false;
    sortDescend.addEventListener("click", function(e){
      if(!timePressed){var newState = todoFunctions.sortTodos(state, todoFunctions.sortDescending);};
      if(timePressed){var newState = todoFunctions.sortTodos(state, todoFunctions.sortAscending);};
      timePressed = !timePressed;
        update(newState);
    });

    var AZpressed = false;
    sortAZ.addEventListener("click", function(e){
      if(!AZpressed){var newState = todoFunctions.sortTodos(state, todoFunctions.sortZA);};
      if (AZpressed) {var newState = todoFunctions.sortTodos(state, todoFunctions.sortAZ);}
      AZpressed = !AZpressed;
        update(newState);
    });

    sortDone.addEventListener("click", function(e){
      var newState = todoFunctions.sortTodos(state, todoFunctions.sortDone);
      update(newState);
    });


    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      var todoNode = document.createElement('li');
      // you will need to use addEventListener
      todoNode.addEventListener('click', function(event) {
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      });
      //making wrapping div inside li


      // add span holding description
      var liContent = document.createElement('div');
      var para = document.createElement('p');
      para.addEventListener("click", function(){
        event.stopPropagation();
      })


      var text = document.createTextNode(todo.description);
      var x = document.createTextNode('X')
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
        update(newState);
      });
      deleteButtonNode.appendChild(x)
      buttonsContainer.appendChild(deleteButtonNode);


      // add markTodo button
      var markButtonNode = document.createElement('button');
      markButtonNode.addEventListener('click', function(event) {

      });
      buttonsContainer.appendChild(markButtonNode);

      // add classes for css
      todoNode.setAttribute("class", "todo-item")
      liContent.setAttribute("class", "todo-item__content")
      para.setAttribute("class", "content__p")
      para.setAttribute("contenteditable", "true")
      deleteButtonNode.setAttribute("class", "button__delete")
      // markButtonNode.setAttribute("class","")
      markButtonNode.setAttribute("class", "button__mark")


      if(todo.done===true){
        para.classList.add('done');
        markButtonNode.classList.add("button_done")
      }

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
          //ensuring new node has highestId+1 as its id key value
          highestId++;
          // hint: todoFunctions.addTodo
          var newState = todoFunctions.addTodo(state, itemToAdd, highestId); // ?? change this!
          update(newState);
          formText.value="";
        }
      });
    }

    // you should not need to change this function
    var update = function(newState) {
      state = newState;
      localStorage.setItem('state', JSON.stringify(state));
      localStorage.setItem('highestId', JSON.stringify(highestId));
      myState = localStorage.getItem('state');
      renderState(state);
    };

    // you do not need to change this function
    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
      todoListNode.setAttribute("class", "todos-list")
      state.forEach(function(todo) {
        todoListNode.insertBefore(createTodoNode(todo), todoListNode.childNodes[0]);
      });

      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };

    if (container) renderState(state);

    var styleInvalid = function(){
    document.querySelector("#input-form__text").style.property = "background-color: red;"
}

  })();
