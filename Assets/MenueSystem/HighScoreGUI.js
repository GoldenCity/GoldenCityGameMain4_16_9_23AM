#pragma strict

var gamePaused : boolean;
var gameEnded : boolean;
var calledGameOver : boolean = false;
var clearHighScores : boolean = false;

var replacing : boolean = false;
var indexReplaced : int = -1;

var playerInitials : String;

//var startTime : float;
var hours: int = 0;
var minutes: int = 0;
var seconds: int = 0;
var fraction: int = 0;
var time : float = 0;

private var storedScores : String;
private var yourScore: String = "Your Score: ";
private var title : String = "HIGH SCORES";

var heading : String = "Intitials:          Score in Time:";

var highScoresNames : String[];
var highScoresValues: float[];

function Awake() {
	//startTime = Time.time;	
}

function Start() {
	gamePaused = false;
	gameEnded = false;
	
	time = GameObject.Find("GameTimer").GetComponent(GameTimer).time;
	if (time == null) time = 0.0;
	
	Destroy(GameObject.Find("GameTimer") );
	
	playerInitials = "AAA";
	
	highScoresNames = new String[5];
	highScoresValues = new float[5];
	
	if ( PlayerPrefs.GetString("storedScores") != null || PlayerPrefs.GetString("storedScores") == "" ) {
		storedScores = PlayerPrefs.GetString("storedScores");
	}else storedScores = "---,000000.00|---,000000.00|---,000000.00|---,000000.00|---,000000.00";
	
	var scoreCache = new String[5];
	scoreCache = storedScores.Split("|"[0]);
	for(var i : int = 0; i < scoreCache.Length; i++){	
		var tempCache = new String[2];
		tempCache = scoreCache[i].Split(","[0]);
		highScoresNames[i] = tempCache[0];
		highScoresValues[i] = float.Parse(tempCache[1]);
	}
	
	checkScore();    	
}

/*
function FixedUpdate() {
	if ( gameEnded == false ) {
		if ( gamePaused == false ) {
			time += Time.deltaTime;
		}		
	}else {
		if ( calledGameOver == false ) {
			checkScore();
			saveScores();
			calledGameOver = true;
		}
	}
}
*/

function Update () {	
	if ( clearHighScores == true ) {
		storedScores = "---,000000.00|---,000000.00|---,000000.00|---,000000.00|---,000000.00";
	}
	if ( Input.GetKeyDown("return") ) {
		saveScores();
	} 		
}

function OnGUI(){	
	var timeString : String = timeToString(time);
	
	GUI.Label(Rect((Screen.width /2) - (198 /2), 20, 198, 198),  yourScore + timeString);
	GUI.Label(Rect((Screen.width /2) - (198 /2), 40, 198, 198),  title);
    GUI.Label(Rect((Screen.width /2) - (198 /2), 60, 198, 198),  heading);
    GUI.Label(Rect((Screen.width /2) - (198 /2), 80, 198, 198),  highScoresNames[0] + "                 " + timeToString(highScoresValues[0]) );
    GUI.Label(Rect((Screen.width /2) - (198 /2), 100, 198, 198), highScoresNames[1] + "                 " + timeToString(highScoresValues[1]) );
	GUI.Label(Rect((Screen.width /2) - (198 /2), 120, 198, 198), highScoresNames[2] + "                 " + timeToString(highScoresValues[2]) );
	GUI.Label(Rect((Screen.width /2) - (198 /2), 140, 198, 198), highScoresNames[3] + "                 " + timeToString(highScoresValues[3]) );
	GUI.Label(Rect((Screen.width /2) - (198 /2), 160, 198, 198), highScoresNames[4] + "                 " + timeToString(highScoresValues[4]) );
	
	GUI.Label(Rect((Screen.width /2) - (198 /2), 180, 198, 198), "Enter Name Below:");
	playerInitials = GUI.TextField(Rect((Screen.width /2) - (198 /2), 200, 40, 20), playerInitials, 3 );
	
	if ( replacing == true ) {
		highScoresNames[indexReplaced] = playerInitials;
	}
}

function timeToString(time : float) : String {
	var hour = time / 3600;	
    var min = time / 60;
    var sec = time % 60;
    var frac = (time * 10) % 10;

	return String.Format ("{0:00}:{1:00}:{2:00}.{3:00}", hour, min, sec, frac);
}

function checkScore() {
	var name : String = "";
	var score : float = 0.0;
	replacing = false;
	indexReplaced = -1;
	
	for(var i : int = 0; i < highScoresValues.Length; i++){		
		if ( replacing == false ) {
			if ( time >= highScoresValues[i] ) {
				indexReplaced = i;
				replacing = true;
				name = "AAA";
				score = time;
			}	
		}
		if ( replacing == true ) {
			var tempName : String = highScoresNames[i];	
			highScoresNames[i] = name;
			name = tempName;
			
			var tempScore : float = highScoresValues[i];
			highScoresValues[i] = score;
			score = tempScore;			
		}				
	}
	
	//if replacing = true promt user to change initials	
	//SIMION THIS IS WHAT I NEED YOU TO FIX FOR ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

function saveScores() {	
	storedScores = "";	
	for(var i : int = 0; i < highScoresNames.Length; i++){
		if ( i == highScoresNames.Length - 1 ) {
			storedScores += String.Format ("{0},{1}", highScoresNames[i], highScoresValues[i]);
		}else storedScores += String.Format ("{0},{1}|", highScoresNames[i], highScoresValues[i]);			    	    	    	
    }	
	PlayerPrefs.SetString("storedScores", storedScores);	
}