//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.locals._ = _;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//+------------------------------------------------------------------+
//|  State Management                                                |
//+------------------------------------------------------------------+
let posts = [];

//+------------------------------------------------------------------+
//|  GET '/' route. (Home/Root route)                                     |
//+------------------------------------------------------------------+
app.get('/', function (req, res) {
  //Step 1: Render the home.ejs view and templating.
  res.render('home', { posts: posts });
});

//+------------------------------------------------------------------+
//|  GET '/about' route. (About route)                                     |
//+------------------------------------------------------------------+
app.get('/about', function (req, res) {
  //Step 1: Render the about.ejs view and templating.
  res.render('about', { p2: aboutContent });
});

//+------------------------------------------------------------------+
//|  GET '/contact' route. (Contact route)                                     |
//+------------------------------------------------------------------+
app.get('/contact', function (req, res) {
  //Step 1: Render the contact.ejs view and templating.
  res.render('contact', { p3: contactContent });
});

//+------------------------------------------------------------------+
//|  GET '/compose' route. (Compose route)                                     |
//+------------------------------------------------------------------+
app.get('/compose', function (req, res) {
  //Step 1: Render the compose.ejs view and templating.
  res.render('compose');
});

//+------------------------------------------------------------------+
//|  POST '/compose' route. (Post route)                                |
//+------------------------------------------------------------------+
app.post('/compose', function (req, res) {
  //Step 1: Store blog data in object.
  const blogData = { blogTitle: req.body.blogTitle, blogPost: req.body.blogPost }
  //Step 2: Update state management.
  posts.push(blogData);
  console.log(blogData.blogTitle);
  console.log(blogData.blogPost);
  //Step 3: Redirect to the root route.
  res.redirect('/');
});

//+------------------------------------------------------------------+
//|  GET '/posts/:var' route. (Posts route)                                 |
//+------------------------------------------------------------------+
app.get('/posts/:postName', function (req, res) {
  //Step 1: Print 'postName'
  console.log(`postName == ${req.params.postName}`);
  //Step 2: Find if the 'postName' exists as a value of key 'blogTitle'
  const postName = req.params.postName;
  let counter = 0;
  posts.forEach((post,index) => {
    if(_.kebabCase(post.blogTitle) === _.kebabCase(postName)){
      console.log(`Match found at post index ${index}!`);
      //Step 3: Render the 'post' page.
      res.render('post',{blogTitle: post.blogTitle, blogPost: post.blogPost});
    }else{
      counter += 1;
    }
    
    if(counter == posts.length){
      console.log('Match NOT found at any index.');
    }
  });
  
  
});

//+------------------------------------------------------------------+
//|  GET |
//+------------------------------------------------------------------+

//+------------------------------------------------------------------+
//|  |
//+------------------------------------------------------------------+
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
