
# Angular Roster 

Note: Created with the Google's Tour of Heroes Tutorial 


## 0. The Application Shell 

ng new angular-roster

-----------

You created the initial application structure using the Angular CLI.
You learned that Angular components display data.
You used the double curly braces of interpolation to display the app title.

src/app/app.component.ts
src/app/app.component.html
src/style.css

------------

## 1. The Hero Editor 

The application now has a basic title. Next you will create a new component to display hero information and place that component in the application shell.

ng generate component heroes

-------------

Summary

You used the CLI to create a second HeroesComponent.    
You displayed the HeroesComponent by adding it to the AppComponent shell.
You applied the UppercasePipe to format the name.
You used two-way data binding with the ngModel directive.
You learned about the AppModule.
You imported the FormsModule in the AppModule so that Angular would recognize and apply the ngModel directive.
You learned the importance of declaring components in the AppModule and appreciated that the CLI declared it for you.


--------------

## 2. Displaying a List 

Add a click event binding

The Angular class binding makes it easy to add and remove a CSS class conditionally.
[class.selected]="hero === selectedHero"

Create mock heroes
Displaying heroes
List heroes with *ngFor
The *ngFor is Angular's repeater directive. It repeats the host element for each element in a list.

Master/Detail
Add a click event binding
Add a click event binding to the <li> like this:
Add the click event handler
Update the details template

The fix - hide empty details with *ngIf
Style the selected hero


---------------

Summary

The Tour of Heroes app displays a list of heroes in a Master/Detail view.
The user can select a hero and see that hero's details.
You used *ngFor (repeater directive) to display a list.
You used *ngIf to conditionally include or exclude a block of HTML.
You can toggle a CSS style class with a class binding.

----------------

## 3. Master/Detail Components 

In this page, you'll take the first step in that direction by moving the hero details into a separate, reusable HeroDetailComponent.

ng generate component hero-detail

Write the template

Add the @Input() hero property
The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it like this.

Show the HeroDetailComponent

Update the HeroesComponent template

[hero]="selectedHero" is an Angular property binding.
It's a one way data binding from the selectedHero property of the HeroesComponent to the hero property of the target element, which maps to the hero property of the HeroDetailComponent.

Refactoring the original HeroesComponent into two components yields benefits, both now and in the future:
You simplified the HeroesComponent by reducing its responsibilities.
You can evolve the HeroDetailComponent into a rich hero editor without touching the parent HeroesComponent.
You can evolve the HeroesComponent without touching the hero detail view.
You can re-use the HeroDetailComponent in the template of some future component.

----------------

Summary

You created a separate, reusable HeroDetailComponent.
You used a property binding to give the parent HeroesComponent control over the child HeroDetailComponent.
You used the @Input decorator to make the hero property available for binding by the external HeroesComponent.

----------------

## 4. Services

dependency injection system

the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService. 

HeroService.getHeroes() must have an asynchronous signature of some kind.
Observable is one of the key classes in the RxJS library.

The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now. Then subscribe passes the emitted array to the callback, which sets the component's heroes property.

add a MessagesComponent that displays app messages at the bottom of the screen.
create an injectable, app-wide MessageService for sending messages to be displayed
inject MessageService into the HeroService
display a message when HeroService fetches heroes successfully.

ng generate component messages

ng generate service message

This is a typical "service-in-service" scenario:

This template binds directly to the component's messageService.

The *ngIf only displays the messages area if there are messages to show.

An *ngFor presents the list of messages in repeated <div> elements.

An Angular event binding binds the button's click event to MessageService.clear().

------------------------------

Summary

You refactored data access to the HeroService class.
You registered the HeroService as the provider of its service at the root level so that it can be injected anywhere in the app.
You used Angular Dependency Injection to inject it into a component.
You gave the HeroService get data method an asynchronous signature.
You discovered Observable and the RxJS Observable library.
You used RxJS of() to return an observable of mock heroes (Observable<Hero[]>).
The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor.
You created a MessageService for loosely-coupled communication between classes.
The HeroService injected into a component is created with another injected service, MessageService.

-------------------------------

## 5. Routing 

There are new requirements for the Tour of Heroes app:

Add a Dashboard view.
Add the ability to navigate between the Heroes and Dashboard views.
When users click a hero name in either view, navigate to a detail view of the selected hero.
When users click a deep link in an email, open the detail view for a particular hero.

ng generate module app-routing --flat --module=app

Add the AppRoutingModule
Add routes
RouterModule.forRoot()
Add RouterOutlet
The <router-outlet> tells the router where to display routed views.
Add a navigation link (routerLink)
Add a dashboard view
ng generate component dashboard
Add the dashboard route
Add a default route
Add dashboard link to the shell
Navigating to hero details
Delete hero details from HeroesComponent
Add a hero detail route
DashboardComponent hero links
HeroesComponent hero links
Remove dead code (optional)
Routable HeroDetailComponent
URL such as ~/detail/11
Extract the id route parameter
Add HeroService.getHero()
Find the way back

The routerLink is the selector for the RouterLink directive that turns user clicks into router navigations. It's another of the public directives in the RouterModule.

---------------------------------

You added the Angular router to navigate among different components.
You turned the AppComponent into a navigation shell with <a> links and a <router-outlet>.
You configured the router in an AppRoutingModule
You defined simple routes, a redirect route, and a parameterized route.
You used the routerLink directive in anchor elements.
You refactored a tightly-coupled master/detail view into a routed detail view.
You used router link parameters to navigate to the detail view of a user-selected hero.
You shared the HeroService among multiple components.

-------------------------------

## 6. HTTP


HttpClient is Angular's mechanism for communicating with a remote server over HTTP. 

Simulate a data server

This tutorial sample mimics communication with a remote data server by using the In-memory Web API module.

npm install angular-in-memory-web-api --save

ng generate service InMemoryData

'api/heroes';  // URL to web api
 
 http.get returns Observable<Hero[]>


HttpClient.get returns response data

To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.

handleError

Tap into the Observable

RxJS tap operator, which looks at the observable values, does something with those values, and passes them along

Get hero by id

Update heroes

Add HeroService.updateHero()

http.put() to persist the changed hero on the server.

Add a new hero

Add HeroService.addHero()
it calls HttpClient.post() instead of put().

Delete a hero
Add HeroService.deleteHero()
it calls HttpClient.delete


Search by name
${this.heroesUrl}/?name=${term}
The only significant difference is the URL, which includes a query string with the search term.

Add search to the Dashboard

ng generate component hero-search

As the user types in the search box, an input event binding calls the component's search() method with the new search box value.

AsyncPipe

heroes$ is an Observable, not an array.

Fix the HeroSearchComponent class
A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject

Chaining RxJS operators
switchMap() calls the search service
 returns only the latest search service observable.

----------------------


You added the necessary dependencies to use HTTP in the app.
You refactored HeroService to load heroes from a web API.
You extended HeroService to support post(), put(), and delete() methods.
You updated the components to allow adding, editing, and deleting of heroes.
You configured an in-memory web API.
You learned how to use observables.





























# AngularRoster

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
