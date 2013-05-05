#pragma strict

var valid : boolean;
var timeOff : float = 0;

function Start () {
	valid = true;
}

function Update() {
	if (valid == false) {
		timeOff += Time.deltaTime;
	}
	if (timeOff > 4) {
		valid = true;
	}
}