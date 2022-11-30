# Assignment React Website Application

## Project Description

This project is an assignment for Digitalent Batch 03 in learning React. The details of the project can be read in the specification provided by the trainers.

## How to Run

1. Edit `backend/.env` with your local database configuration. Below are the variables available in the `.env`

```
HOST=
PORT=
DB_USER=
DB_PASS=
DB_NAME=

ISSUER=
EXP_MIN=
SECRET_KEY=

```

2. Run the provided backend server with the following commands.

```
cd backend
./linux-server
```

3. Edit `.env` with the default user (because the specifications specify a hard-coded login) and server URL. Below are the variables available in the `.env`

```
REACT_APP_API_URL=
REACT_APP_DEFAULT_EMAIL=
REACT_APP_DEFAULT_PASSWORD=
```

4. Run the frontend app. Make sure you are in the root folder to run the following command.

```
npm run start
```

## App Screenshots

|        Description        |                      Screenshots                       |
| :-----------------------: | :----------------------------------------------------: |
|      Failed to Login      |      <img src="img/failed_login.png" width="600">      |
|      Initial Loading      |    <img src="img/initial_loading.png" width="600">     |
| Default Transactions Page |  <img src="img/default_transactions.png" width="600">  |
|   Searched Transactions   | <img src="img/searched_transactions.png" width="600">  |
|     Last Year Filter      | <img src="img/lastyear_transactions.png" width="600">  |
|     This Year Filter      | <img src="img/thisyear_transactions.png" width="600">  |
|     Last Month Filter     | <img src="img/lastmonth_transactions.png" width="600"> |
|     This Month Filter     | <img src="img/thismonth_transactions.png" width="600"> |
|   Default Transfer Page   |    <img src="img/default_transfer.png" width="600">    |
|     Invalid Transfer      |    <img src="img/invalid_transfer.png" width="600">    |
|      Failed Transfer      |    <img src="img/failed_transfer.png" width="600">     |
|    Successful Transfer    |   <img src="img/succesful_transfer.png" width="600">   |
|    Default Top Up Page    |     <img src="img/default_topup.png" width="600">      |
|      Invalid Top Up       |     <img src="img/invalid_topup.png" width="600">      |
|     Successful Top Up     |    <img src="img/successful_topup.png" width="600">    |
|     Default Game Page     |      <img src="img/default_game.png" width="600">      |
|  Chance 2 Left Game Page  |      <img src="img/chance2_game.png" width="600">      |
|  Chance 1 Left Game Page  |      <img src="img/chance1_game.png" width="600">      |
|       Finished Game       |     <img src="img/finished_game.png" width="600">      |
|     Top Up from Game      |       <img src="img/topup_game.png" width="600">       |
|       Test Coverage       |        <img src="img/coverage.png" width="600">        |

## Contributors

Frontend Developer:

- Tafia Alifianty Dinita Putri

Trainers:

- Jonathan Hendry Gunawan
- Thoriq Nur Faizal
- Andri Winata