pragma solidity >=0.5.0;
contract FileSystem {
    string[] paths;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Added(address indexed _from, string _value);

    constructor() public {
        paths.push("QmajBUaaohrhVBiTrGD6KCWsZmRbZvR4Xi1QQyQDMVxQdb");
        paths.push("QmdjPE43GUfhTSMdg5xFJAEoTuBdyZ7KBStxpYXncUTRcU");
        paths.push("Qmf9kaQWps8MJ6ja2KYuzxDWkMkvNuYg8JBnLBKGdwvcZG");
        paths.push("QmUsWujkwvyu6WBHCuuMsvFrxoYhjYFtX7dos3646fUKQp");
        paths.push("QmZM8ZG9z34oDcFNf9arcPLH7Lsx8iysX2RHdworxkTBfV");
        paths.push("Qmc7pcbJAWTe3hYrNdK6aqqZUvLnGcRebgKkTrZWtPugCt");
    }

	function addPath(string memory path) public returns(bool sufficient) {
		paths.push(path);
		emit Added(msg.sender, path);
		return true;
	}



	function getPath(uint index) public view returns(string memory) {
		return paths[index];
	}

	function getLength() public view returns(uint) {
	    return paths.length;
	}
}
