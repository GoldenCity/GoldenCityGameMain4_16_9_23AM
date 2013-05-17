#pragma strict

var gamePaused : boolean;
var gameEnded : boolean;
var calledGameOver : boolean;

var time : float = 0;

function Start () {
	DontDestroyOnLoad(this);
	
	gamePaused = false;
	gameEnded = false;
	calledGameOver = false;	
}

function Update () {
	
}

function FixedUpdate() {
	if ( gameEnded == false ) {
		if ( gamePaused == false ) {
			time += Time.deltaTime;
		}		
	}else {
		if ( calledGameOver == false ) {
			gameEnded = true;			
			calledGameOver = true;
		}
	}
}

function OnGUI(){	
	var timeString : String = timeToString(time);
	
	if ( calledGameOver == false ) {
		GUI.Label(Rect(150, 40, 198, 198), 	"Time: " + timeString);
	}	
}

function timeToString(time : float) : String {
	var hour = time / 3600;	
    var min = time / 60;
    var sec = time % 60;
    var frac = (time * 10) % 10;

	return String.Format ("{0:00}:{1:00}:{2:00}.{3:00}", hour, min, sec, frac);
}