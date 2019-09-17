# AngularIPFS
Requirements:

Linux. We are using Ubuntu 18.04.3 LTS (Bionic Beaver).

npm: Run "npm install" to populate the node_modules folder.

Truffle: npm install -g truffle

Angular CLI: npm install -g @angular/cli


Ganache: https://www.trufflesuite.com/ganache
Download the AppImage file, set "Allow execute as program" in the properties.

ipfs:  https://docs.ipfs.io/guides/guides/install/
ipfs init


Instructions:
Open Ganache and open a workspace. If it asks for a file try using truffle.js.

truffle migrate

If changes are made to the contracts run: "truffle compile" and migrate again.

Run ipfs: ipfs daemon

Run the app using Angular CLI: npm start

The app is now served on localhost:4200

Problems:
Currently the ipfs doesn't successfully connect to the files I'm hosting.
Grab an address from the blockchain
