# Galaxy War

Game Link: https://rola1993.github.io/GalaxyWar/

![play](https://github.com/Rola1993/GalaxyWar/blob/master/img/play.gif)

## Background and Overview

Galaxy War is a spacecraft shooting game.

Users control a spaceship to move around and shoot enemy spaceships. There are many types of enemies differentiated by their looks, health points, speeds, bullet power and moving patterns. After destroying certain types of spacecrafts, there are drops showing up and if the user's spaceship takes it, it can increase its health points or bullet power.
Additionally, users can choose the difficulty level to play the game. There is scoreboard displaying the best record as well. 

## Functionality & MVP

In Galaxy War, users will be able to:

- [ ] Control a spaceship to move up, down, left, right
- [ ] Keep the spaceship shooting enemies 
- [ ] Start, pause, restart, and reset the game
- [ ] Select game difficulty level and save scores

## Wireframes

This app will consist of a single screen with the game board, playback controls, main menu and links to the Github, my LinkedIn.  

The game board is a rectangle with longer height at the center. It has a galaxy backgound rolling when the spaceship moving forward.

Playback controls at the right bottom will include Start, Pause, Restart and Reset buttons

Main menu at the left bottom will allow users to select difficulty level or check the scoreboard

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: 
- [x] Set up game backound and graph of user's and enemies' spaceships
- [x] User can control the spaceship to move up, down, left and right
- [x] Enemy spaceships move from top to bottom

**Day 2**: 

- [x] User can control the spaceship to shoot enemies
- [x] Enemies would be destroyed when its health point reach zero

**Day 3**: 

- [x] Design new enemies with different moving and shooting pattern
- [x] Certain emeny spaceship would offer drops after being destroyed

**Day 4**: 

- [x] User's spaceship can take the drops and gain power
- [x] Set different numbers of enemy spaceships for different level
- [x] Build controls for game speed, stop, start, restart, reset

**Day 5**: 

- [x] Create main menu, one option for selecting difficulty and one for checking scoreboard
- [x] Add styling for bullets, spaceships and buttons

**Over the weekend**:

- [x] Test the project for bugs
- [x] Deploy the project on GitHub Pages

### Bonus features

- [ ] Create boss enemy with most complex shooting pattern and most health points
- [ ] User's spaceship have three bombs which can destroy all enemies on gameboard


