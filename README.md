## 🚧 Currently under development 🚧

# Learn From Your Mistakes 2.0 - Lichess Improvement 

**Learn From Your Mistakes 2.0**, an enhancement to the popular "Learn From Your Mistakes" feature on Lichess. This repository provides a more engaging and efficient way to review and learn from your chess games by serving mistake puzzles in bulks


## Preview

<div style="display: flex; justify-content: center; align-items: center;">
 
  ![image](https://github.com/user-attachments/assets/5cf0a5fe-1013-4d68-9334-b79ba535dcc4)

</div>





## Features

- **Puzzle Format Games**: Play games in a puzzle format in bulk, allowing you to practice and learn from multiple mistakes efficiently.
- **Time Period Specification**: Specify a time period to filter games so that you can focus on recent games or any other time frame.

## How It Works

1. Gathers data from game in the specified time period for the specified user
2. Collects FENs of positions where the errors (inaccuracies, blunders and mistakes) occurred
3. Serves all of the puzzles in 1 large collection
   
#### NOTE : Only games that you have analyzed will be included. After playing, simply click the button displayed below:

![image](https://github.com/user-attachments/assets/28e50257-8364-4f6d-b1fb-be08e9e10ec0)



## Installation

1. Install the dependencies:
   ```bash
   npm install
2. Start the application
    ```bash
    npm run dev
