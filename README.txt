This is a tutorial for how to set up a simple application in the mern stack

## Prerequisites: ##

# Node.js and NPM #
You can find Node here: https://nodejs.org/en
You can find details about NPM here: https://www.geeksforgeeks.org/node-js-npm-node-package-manager/

#PASSWORD: YdNpRd7F4VZVLZ2a


# MondoDB Atlas Account #
You can find MongoDB here: https://www.mongodb.com/
Create a free account, When it asks you to Deploy your database, select the free option (M0) and stick with aws
Name your cluster something descriptive, it cannot be changed later
This will bring you to the dashboard

In the security section you can create users who can access the collection, and add valid IPs
Once you have added a user, go to the database tab and click connect, then drivers
From this page, copy the connection string. This will be important later
Here is mine for reference: mongodb+srv://guy:<password>@mern-tutorial.wqsyvll.mongodb.net/?retryWrites=true&w=majority


# Creating your application #
I used information from these two pages to build this tutorial, referencing might help if you run into problems:
https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
https://www.mongodb.com/languages/mern-stack-tutorial

Create a new folder for your application. I will be calling mine mern-stack-tutorial.
Within this folder, open your terminal, I am using the Git bash terminal for this. 

Make sure you have Node.js and NPM installed, you can check this by running node -v and npm -v. 
If a version number is displayed, you have correctly installed them, I have node v20.9.0 and npm 10.1.0

Next, run npm install create-react-app
then run npx create-react-app react-website

This will create a starter website which will function as our front end. I renamed this new react-website folder "client"
If you navigate your terminal to the client directory, you may launch your application by running npm start
This should launch a webpage in your browser with a spinning react icon and the words "Edit src/App.js and save to reload."

The world is now your oyster, but I will tell you what I did to get my sample project to the state that it is in.
I first deleted reportWebVitals.js and its respective call in index.js. These files are located in client/src
I also deleted setupTests.js, and App.test.js. You may want these if you plan to implement tests.

I created three folders, styles, pages, and components, and moved the two .css files into the styles folder
I also had to update the dependences of these .css files in index.js and App.js

The files I made in the components and pages folders came from the geeksforgeeks tutorial

I then updated App.js to its current state in able to be able to use these new components. Note I also had to run these commands to install things
npm install react-router-dom
npm install styled-components
npm install react-icons

The code I have included creates a simple multipage frontend

# Backend #
Now to link the code to the database
Back in the original folder, make a new dir called server
within this new folder run npm -init -y and npm install mongodb express cors dotenv to install dependencies

Next I created server.js, you can find the code for this in the mongodb tutorial page but removing the required route
Also create a new file called config.env with this line: ATLAS_URI=<your connection string from earlier>
You will also need one last file. Create a new dir called db and create conn.js, also mirroring the mongodb tutorial page

At this point, running npm start in the server folder will connect you to your collection, althought at this point it wont do much
For a complete backend implementation, you can refer to mern-stack-example-main which implements an employee list
