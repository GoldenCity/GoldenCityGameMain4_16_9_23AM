#pragma strict

var balls : GameObject[];


var cannonScript : scriptTrackMouseToGround;

function Start () {

}

function Update () {
	var shotsMax = cannonScript.shotsMax;
	var shotsLeft = cannonScript.shotsLeft;
	
	var i = balls.Length;
	while(i > shotsMax){ //HIDE UNAVAILABLE BALLS
		balls[i-1].SetActive(false);
		i--;
	}
	while(i > 0){ //HIDE UNAVAILABLE BALLS
		if(i > shotsLeft) {
			balls[i-1].SetActive(false);
		}
		else
			balls[i-1].SetActive(true);
		i--;
	}

}