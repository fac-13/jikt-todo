# JIKTDev Todo App

## WHAT
A To-do app!

## WHY

To allow the user to 
- __enter tasks__ they need to do into a web page so that I don't forget them, 
- __view the tasks__ they have added in a list so that they can plan their day and 
- __mark tasks__ as complete so that they can focus on the tasks they have left.

To __also__ allow the user to:

-   __edit their to-dos__ so that they can amend them if the task changes,
-   __click on any part of a to-do__ to mark it as complete so that it's easier for them to check to-dos off,
-   have a __visual indication__ of which to-do they're about to interact with so that it's clear what they are editing.


## HOW

### Day 1
* We discussed our priorities approaching this project, how best we should approach it, and lessons learned from our [previous project](https://github.com/fac-13/JIKTDEVS).
* Before splitting into groups, we decided to try mob programming by:
    * working through our the logic of how our page would function - ensuring we were all clear on all points
    * creating tests for all core logic functions
* 

### Day 2

* We started styling and soon encountered a big problem: after merging a major pull request, each member was seeing our page rendered differently on their own machines. After much confusion, we resolved the issue by clearing our caches.
* We split into 2 teams, one working on the form (input box), the other on styling the list of todos:
    * The form team struggled with validation, trying to re-style chrome's default 'required' validation message. Ultimately, a Javascript solution was opted for.
    * The list team struggled to overcome unresponsive styling of containers - before finally finding their problems in the clash of their `align-items: center` and a `justify-content` styling. 

### Day 3

* After some very helpful code-review from **[Team PLHH](https://github.com/fac-13/PLHH-ToDo)**, we got to work solving issues: refactoring.


### Things we did well
