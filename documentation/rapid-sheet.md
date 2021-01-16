### Problems with traditionals/legacy spring
* We use different modules from spring such as core module, to do dependency injection.The MVC module to develop the web layer for our application or even the restful web services layer.And then the DAO layer where we use the spring JDBC/ORM which makes our life easy to develop a data access layer for our application.
*  When we are using ORM tools like Hibernate, we can use spring data JPA and we use these modules and more that are valuable from Spring.
* Initially we used XML based configuration or annotations based configuration,This configuration can get difficult and hard to maintain over time.And also we need to make sure that each of these modules is available for our application by defining all the dependencies in the Maven pom xml.And at runtime we have to be sure that these versions of various Modules that we use are compatible with each other.
* But it's our responsibility to do all that, and once we have all that in place we will build our application and will have to deploy to an external web container to test it .
+ Spring boot will automate all this for us.

## 1.  What are Spring Boot Features ?

1. The first of those super cool features is auto configuration - Spring Boot automatically configures everything that is required for our application. We don't have to use XML or annotation based or Java configuration anymore.

For example if you are using Spring MVC or the web to develop a web application or a restful web service application spring boot will automatically configure the dispatcher servlet and does all the request mapping for us. We don't have to use any xml or annotation based configuration to configure this servlet.

Similarly if you are using spring data or object relational mapping while working with tools like Hibernate to perform database crud we no longer have to configure the data source or even the transaction manager. Spring boot will automatically configure these for our application.

2. The next super cool feature is spring boot starters .With the spring boot starters spring boot takes the problem off module availability we need. Before Spring Boot we had to make sure that a particular library required for our project is available and also the versions of different libraries are compatible.But we don't have to do that anymore thanks to spring boot starters every spring boot project will have a parent project.This project has all the version information of various libraries that we will be using in our project so we need not worry about version compatibility. The spring developers have already done it for us and put all that information into this spring boot starter parent .

Secondly we have starters for different types of projects if we are developing a web project then we simply need to include the starter web . We don't have to include any other libraries or dependencies. Spring boot will automatically pull all the other libraries that are required because this project here or this or dependency transitively depends on other libraries that are required. Maven will automatically pull those libraries. The spring boot developers have given us starter dependencies which when we use in our projects will not have the Modular availability problem and the version compatibility problem.



Another example is the spring boot starter data jpa .When you want to work with Hibernate you simply include the single dependency in your maven pom xml and all the other libraries will be pulled accordingly. And also the correct versions of those libraries will be included because all that version information is available in this spring boot starter parent which is a parent for every spring boot project.

3. The third super cool feature we don't have to worry about deploying our applications to external container spring boot comes with an embedded servlet container and these containers.

By default it is Tomcat but you can also use Jetty and undertow or any other external server. So no longer external deployment you can simply right click on your project and run it and your application will be launched on its embedded Tomcat server by default.



4. Last and very important spring boot gives us a lot of health checks of our application for free through the spring boot actuators.We can use different types of health checks that come for free and we can use these even on production when our application is running. These can be activated easily and will display all the auto configuration reports and everything that is automatically configured for our application.

What is Spring Boot 
=Spring Framework + Embedded web server (Tomcat) -complex config setting



Important components of a Spring Boot Application

Below is the starting point of a Spring Boot Application

@SpringBootApplication

public class HellospringbootApplication { p.s.v.m(...) {...}}

@SpringBootApplication - This is where all the spring boot magic happens.

The SpringBootApplication is a key annotation which is a top level annotation which contains several other annotations on it.

@SpringBootConfiguration

@EnableAutoConfiguration

@ComponentScan


The first one @SpringBootConfiguration tells spring boot or the container that this class here can have several bean definitions. We can define various spring beans here and those beans will be available at run time so you define a method here .

The second annotation @EnableAutoConfiguration is a very important annotation at enable Auto configuration.This annotation tells spring boot to automatically configure the spring application based on the dependencies that it sees on the classpath.

eg:
If we have a MySql dependency in our pom.xml as automatically Spring Boot will create a data source. We will also provide other information like username password etc. but spring boot will scan through all these dependencies and it will automatically configure the data source required for us.

Another example is spring web, If we have spring web in your dependencies.

Then spring boot will automatically create the dispatcher servlet on all that configuration file you for free.

All the xml, all the java based configuration is now gone. We as developers need not do all that configuration it all comes for free thanks to spring boots to enable auto configuration annotation. 

@ComponentScan
So this  tells us that spring boot or spring should scan through the classes and see which all classes are marked with the stereotype annotations like @Component Or @Service @Repository and manage  these spring beans . Default base-pkg is the pkg in which main class is defined.
Can be overridden by
eg : 
@ComponentScan(basePackages = "com")
For scanning entities : 
@EntityScan(basePackages = "com.app.pojos")



## 2. What is new in your Project? 
* JPA 
+ it provides ORM 
1. we have used JPA , using JpaRepository Interface ,which helps us reduce code length, 
2. it reduces boiler plate code, as we use built in and derived functions 
3. it simplifies the process of creation of queries in spring boot 
*  SPA
+   Advantages of Single-Page Applications
1. Fast and responsive
+ SPA is fast, as most resources (HTML+CSS+Scripts) are only loaded once throughout the lifespan of application 
+ Only data is transmitted back and forth. 
+ The development is simplified and streamlined. 
+ There is no need to write code to render pages on the server. 
2. Caching capabilities
3. Debugging with Chrome
* MVC 


## 3. Explain why did you select this technology and framework for this project? 
* for backend Spring boot

1. It reduces lots of development time and increases productivity.
2. It avoids writing lots of boilerplate Code, Annotations and XML Configuration.
3. It is very easy to integrate Spring Boot Application with its Spring Ecosystem like Spring JDBC, Spring ORM
4. It follows “Opinionated Defaults Configuration” Approach to reduce Developer effort
5. It provides Embedded HTTP servers like Tomcat, Jetty etc. to develop and test our web applications very easily.
6. It provides CLI (Command Line Interface) tool to develop and test Spring Boot(Java or Groovy) Applications from command prompt very easily and quickly.
7. It provides lots of plugins to develop and test Spring Boot Applications very easily using Build Tools like Maven and Gradle
8. It provides lots of plugins to work with embedded and in-memory Databases very easily.
9.  database independent and platfoorm
10. Spring Boot automatically configures everything that is required for our application. We don't have to use XML or annotation based or Java configuration anymore.
11. spring boot gives us a lot of health checks of our application for free through the spring boot actuators

### *why  Angular
* The core features of AngularJS are as follows −
1. Data-binding − It is the automatic synchronization of data between model and view components.

2. Scope − These are objects that refer to the model. They act as a glue between controller and view.

3. Controller − These are JavaScript functions bound to a particular scope.

4. Services − AngularJS comes with several built-in services such as $http to make a XMLHttpRequests. These are singleton objects which are instantiated only once in app.

5. Filters − These select a subset of items from an array and returns a new array.

6. Directives − Directives are markers on DOM elements such as elements, attributes, css, and more. These can be used to create custom HTML tags that serve as new, custom widgets. AngularJS has built-in directives such as ngBind, ngModel, etc.

7. Templates − These are the rendered view with information from the controller and model. These can be a single file (such as index.html) or multiple views in one page using partials.

8. Routing − It is concept of switching views.

9. Model View Whatever − MVW is a design pattern for dividing an application into different parts called Model, View, and Controller, each with distinct responsibilities. AngularJS does not implement MVC in the traditional sense, but rather something closer to MVVM (Model-View-ViewModel). The Angular JS team refers it humorously as Model View Whatever.

10. Deep Linking − Deep linking allows to encode the state of application in the URL so that it can be bookmarked. The application can then be restored from the URL to the same state.

11. Dependency Injection − AngularJS has a built-in dependency injection subsystem that helps the developer to create, understand, and test the applications easily. 

* The advantages of AngularJS are − 
1. It provides the capability to create Single Page Application in a very clean and maintainable way.
 2. It provides data binding capability to HTML. Thus, it gives user a rich and responsive experience. 
 3. AngularJS code is unit testable. 
 4. It uses dependency injection. 
 5. It provides reusable components. 
 6. We can achieve more functionality with short code using AngularJS, .
 7. In AngularJS, views are pure html pages, and controllers written in JavaScript do the business processing.
 8.   AngularJS applications can run on all major browsers and smart phones, including Android and iOS based phones/tablets. 
 9. Responsive webpages canbe developed using this


4. Explain how OOPs concept are implemented in your project? 
1. The conceptual framework of object–oriented systems is based upon the object model. There are two categories of elements in an object-oriented system −

+ Major Elements − By major, it is meant that if a model does not have any one of these elements, it ceases to be object oriented. The four major elements are −

1. Abstraction
+ Interface


1. Encapsulation
+ packages
+ access modifiers
+ pojo class ,dao 
3. Modularity
+ different layes pojo,dao, controller
4. Hierarchy
+ Enum in pojo class, interface implementation inheritence 


+ Minor Elements − By minor, it is meant that these elements are useful, but not indispensable part of the object model. The three minor elements are −

1. Typing
+ Java Polymorphism
 Method Overriding 
 Runtime Polymorphism 

2. Concurrency
+ internally jVM 
3. Persistence
+ JPA 

## 5. Draw use-case diagram ,class diagram and ER diagram of your project? 

## 6. Explain n-tier architecture of your project? 
1. 3-Tier Architecture
By looking at the below diagram, you can easily identify that 3-tier architecture has three different layers.
+ 1. Presentation layer
+ 2. Business Logic layer
+ 3. Database layer

## 7. Which advanced features have you used in your project?
1. backend 
+ JPA
+ MAVEN  

2. Frontend
+ toastr
+ modular approach
+ 

3. AWS 

## 8. What was your role in your project and explain what you did in it? 
1. 

## 9. Which software development methodology you used in project ? Expain its process? 

1. Agile 
+ for coding used GITLAB and Eclipse 
2. BUild 
+ MAVEN 
3. continous deployemnt 
+ uisng Jenkins 
4. COntinous deployment 
+ AWS 

## 10. How will you deploy your project on web servr /client machine ? 
1.using  AWS 

## 11. Which Design pattern and using in your project? 
+ Design Patterns Used in Java Spring Framework

1. Dependency injection/ or IoC (inversion of control) 
+ Is the main principle behind loose coupling of layers.

2. . Factory : 
+  Spring uses factory pattern to create objects of beans using Application Context reference
eg : refer to eg code in spring & Java SE (ApplicationContext & its getBean method)


3. Proxy : 
+  used heavily in AOP, and remoting.
eg : @Transactional class is proxied by spring as an example of AOP proxy

4. Singleton : 
+  By default, beans defined in spring config file (xml) are only created once.
+   No matter how many calls were made using getBean() method, it will always have only one bean. This is because, by default all beans in spring are singletons.


5. Front Controller :
+  Spring provides DispatcherServlet to ensure an incoming request gets dispatched to your controllers.

6. Template method : 
 used extensively to deal with boilerplate repeated code (such as closing connections cleanly, etc..). For example JdbcTemplate, JmsTemplate,JdbcTemplate,JpaTemplate,RestTemplate

## 12. What are the limitations of your project? 

1. backend
+ 1. Spring boot may unnecessarily increase the deployment binary size with unused dependencies.

2. frontend 
+ 1. Not Secure − Being JavaScript only framework, application written in AngularJS are not safe. Server side authentication and authorization is must to keep an application secure. 
+  2. Not degradable − If the user of your application disables JavaScript, then nothing would be visible, except the basic page. 


## 13. What are the difficulties you faced during this project and how you have overcome it? 
1. due to tme constraint we streamlined our development process, 
2. debugging solved many issues 

## 14. How will you improve the performance of your project (memory related and respnonse time)? 
1.  Exception handling 

## 15. Which database is used in your project? why? explain database design 
1. You’re working with complex queries and reports. With SQL you can build one script that retrieves and presents your data.
2. You have a high transaction application. SQL databases are a better fit for heavy duty or complex transactions because it’s more stable and ensure data integrity.
3. You need to ensure ACID compliance (Atomicity, Consistency, Isolation, Durability) or defining exactly how transactions interact with a database. 
4. You don’t anticipate a lot of changes or growth. If you’re not working with a large volume of data or many data types

## 16. Explain data flow diagrams? 
1. request from front end
2. request handled by rest controller
3. data send to dao layer
4. connected to database 
5. back to dao --> controller --> front 

## 17. Expalin data access layer of your database? 
1. used JPA repository

## 18. How to write stored procedure in your database? How to call from your data access layer? 


## 19. How many web pages are present in your project? and in each module of your project? 


## 20. How did you implement look and feel of your web pages? have you used any framework and why? 
+ bootstrap , easy to use ,implementation based on classes.



## 21. have you used AJAX in your project? How ? 
+ Angular uses AJAX technology to build single-page applications. Angular offers much more functionality than AJAX, and AJAX vs Angular is an important part of this functionality. 
+ in backend used front controller to  communicate between pages, 
## 22. Expalin configuration files used in your project ?
1. POM.xml  file
+ dependency configuration
+ metadata of project
+ MAVEN/build configuration

2. project.properties
+ database configuration
+ context path 
+ port no (Server)
+ show queries


## Expalin security of your project? 
1. Authenticate interface ,service login page, 
   
