# Frontend Capstone Project
🔗 [project is hosted on vercel](https://flashcard-capstone.vercel.app/)
<br> 
❗**Note**: This project (as of March 21, 2022) was created to work with local servers only, so the App on Vercel wont render with new data if you try. You must follow the [installation instructions](#installation-instructions) below to see your data in action. 

## About Me:
- My name is Mad, you can think of it as "Maude" or "Mod" in your head, whichever works!
- I'm currently enrolled in Thinkful's Fullstack Software Engineering course & having a really great time learning this material. I also earned my BA in Spanish Studies & Computer Science from Texas State University in the winter of 2021, so I was fortunate to have a good foundation of programming knowledge going into this course. 
- This course is wrapping up at the beginning of May 2022 (right around the corner!) so please feel free to reach out if you've got me in mind for a junior developer role! 

My [🌲 LinkTree🌲 ](https://linktr.ee/madgodinez) has the best ways to find me online, as well as my resume. 

## About this Project: Flashcard-O-Matic
### Project Description: 
<p align="center">"A local school has decided to put together a flash card application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flash cards for the subjects that they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use."</p>

### The Data:
Below is an example of the data for a single study deck, represented by two arrays:  
```
data:   {
          "decks": [
            {
              "id": 1,
              "name": "Rendering in React",
              "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
            }
          ],
          "cards": [
            {
              "id": 1,
              "front": "Differentiate between Real DOM and Virtual DOM.",
              "back": "Virtual DOM updates are faster but do not directly update the HTML.",
              "deckId": 1
            },
            {
              "id": 2,
              "front": "How do you modify the state of a different React component?",
              "back": "Not at all! State is visible to the component only.",
              "deckId": 1
            },
            {
              "id": 3,
              "front": "How do you pass data 'down' to a React child component?",
              "back": "As properties or props. ",
              "deckId": 1
            }
          ]
        }
```

### Learning Objectives: 
This project is designed to test your ability to work with rendering and state management using React & includes the following as prerequisite skills:
- Installing packages via NPM
- Running tests from the command line
- Writing React function components
- Creating routes, including nested routes, using React Router
- Using hooks like useState(), useParams(), and useHistory()
- Debugging React code through console output, using the VS Code debugger, and Chrome DevTools

#### Languages Used:
- JavaScript, JSX
- CSS
- HTML
#### Libraries, APIs, etc. Used:
- Bootstrap
- React
- Docker

### Installation Instructions:
*Prerequisites: node v16.13.0 (npm v8.1.0)*
1. clone the project repository to your machine:
    <img width="700" height="auto" alt="Screen Shot 2022-03-21 at 10 21 24 AM" src="https://user-images.githubusercontent.com/93545744/159300878-515dde19-8f22-4521-8b7f-5ecb5eb27e47.png" align="center">
2. extract the zipped download folder to your desired location.
3. open the project directory in your machine's terminal. <br> Ex. `user@mac ~ % cd/Desktop/Flashcard-Capstone-main`
4. install the project's packages: `npm install`
5. run the project (this will open a tab in your default browser): `npm start`
6. that's it, have fun! 😁
7. once you're ready to close the application, type & enter `<CTRL + C>` in the terminal to stop the servers & disconnect.
---
## Mockup Matching!
At the start of this project, I was given some mockup UI images of what the final product *should* look like. I take great care & pride in my work to match these as closely as I can and am happy to share them with you, too. Feel free to browse the folders, here are just a couple of examples:

 <h4 align="center"> ↙️ Mockup versus My Product ↘️ </h4>

<br>
<img width="400" height="auto" src="https://github.com/mad-godinez/Flashcards-Capstone/blob/5ba2a49ef57fb8893a9e5bdc3c593aab63595c64/Mockup_Matches/given_materials/deck.png" alt="mockup deck screen" align="left">
           <img width="400" height="auto" alt="mad product deck screen" align="right" src="https://github.com/mad-godinez/Flashcards-Capstone/blob/5ba2a49ef57fb8893a9e5bdc3c593aab63595c64/Mockup_Matches/madgodinez_result/mg-deck-screen.png">

    
 <img width="400"  height="auto" src="https://github.com/mad-godinez/Flashcards-Capstone/blob/5ba2a49ef57fb8893a9e5bdc3c593aab63595c64/Mockup_Matches/given_materials/home.png" alt="mockup homepage" align="left">
            <img width="400"  height="auto" alt="mad product homepage" align="right" src="https://user-images.githubusercontent.com/93545744/159317386-efb95459-9efa-4127-8f4f-d48b437240cd.png">
