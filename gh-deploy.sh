#!/bin/bash

echo "------------------Installing npm packages------------------"
npm install

echo "------------------Installing 'angular-cli-ghpages' globally------------------"
npm install -g angular-cli-ghpages

echo "------------------Building the Angular app for production------------------"
ng build --configuration=production --base-href "https://denisshtupa.github.io/ice-cream/"

echo "------------------Deploying the app to GitHub Pages------------------"
ngh --dir=dist/ice-cream
