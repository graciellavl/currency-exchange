# Currency Converter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

- `yarn install`
- `docker-compose up`

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Brief Code Explanation

This is a one page app to convert foreign currency using `https://exchangeratesapi.io/.` with USD as the base currency.

This app created using basic Create React App and docker containerization. 

Through this app, you can:
- Add new currency type
- Remove currency from list
- Change the value to convert

To build this app, I use a component called CurrencyCard for each currency in list.

Due to the limitation access from the API, I can't change the base currency. So, I change use the formula `(currency.value / base.value) * value`. This formula is used to change the EUR -> USD -> Desired Currency.

I also changed the structure of the data from `"currencyCode": value` and `"currencyCode": "currencyCountry"` to `[{"name": "currencyCode", "value": value, "fullName": "currencyCountry" }]` 

**Why?** To ease in accessing and looping through the item and passing props from parent to children

## Deployment

Feel free to access it through [http://graciellavl-currency-exchange.herokuapp.com/](http://graciellavl-currency-exchange.herokuapp.com/)