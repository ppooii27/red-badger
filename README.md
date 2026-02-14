# Red Badger

Red Badger coding chanllenge

## Prerequisites

- Node.js >= 25.2.3

## Getting Started

Set up environment, install dependencies.

```
git clone <repo-url>
cd red-badger
nvm use
npm install
```

## Run

```
npm start
```

Example session:

```
Please input the grid size (x, y): 5 3
position & direction (e.g., 1 2 N): 1 1 E
instructions (e.g., FFRLF): RFRFRFRF
1 1 E
position & direction (e.g., 1 2 N): 3 2 N
instructions (e.g., FFRLF): FRRFLLFFRRFLL
3 3 N LOST
position & direction (e.g., 1 2 N): 0 3 W
instructions (e.g., FFRLF): LLFFFLFLFL
2 3 S
```

## Unit Tests

Run all tests:

```
npm run test
```
