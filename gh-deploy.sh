#!/bin/bash

echo "------------------Installing npm packages------------------"
npm install

# Install the 'angular-cli-ghpages' globally
echo "------------------Installing 'angular-cli-ghpages' globally------------------"
npm install -g angular-cli-ghpages

echo "------------------Building the project------------------"
ng build

# Build the Angular app for production with the appropriate base-href
echo "------------------Building the Angular app for production------------------"
ng build --configuration=production --base-href "https://denisshtupa.github.io/shopping-cart-app/"

# Deploy the built app to GitHub Pages
echo "------------------Deploying the app to GitHub Pages------------------"
ngh --dir=dist/shopping-cart-app

echo "------------------Finalizing build------------------"
ng build --configuration=production
