echo "------------------Removing node-modules------------------"
rm -rf node_modules/
rm package-lock.json

echo "------------------Installing npm dependencies------------------"
npm install

echo "------------------Running application------------------"
ng serve
