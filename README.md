# AngularIPFS
Requirements:
Linux. We are using Ubuntu 18.04.3 LTS (Bionic Beaver).
npm.
Truffle: npm install -g truffle
Angular CLI: npm install -g @angular/cli
Ganache.
ipfs.

Instructions:
Open Ganache and open a workspace.
Compile the contracts and migrate them to the private ganache blockchain.

truffle compile && truffle migrate

Run ipfs:
ipfs daemon

Run the app using Angular CLI:
npm start

The app is now served on localhost:4200
