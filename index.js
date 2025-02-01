/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// Import the JSON data about the crowdfunded games from the games.js file
import GAMES_DATA from './games.js';

// Create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game => {

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img"/>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: ${game.goal.toLocaleString()}</p>
            <p>Pledged: ${game.pledged.toLocaleString()}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) =>  sum + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString(); // So I guess earlier we stored, and now we actually create the HTML element I think.

// grab the amount raised card, then use reduce() to find the total amount raised
// set the inner HTML using a template literal and toLocaleString to get a number with commas
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
const gamesCard = document.getElementById("num-games");

// set inner HTML using template literal
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
 */


// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded. 
We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
        return item2.pledged - item1.pledged
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;

// create a new element for the top game and append it
const topGameElement = document.createElement("p");
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

// create a new element for the second game and append it
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
