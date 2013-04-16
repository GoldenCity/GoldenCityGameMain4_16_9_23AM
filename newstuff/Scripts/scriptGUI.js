#pragma strict
var cannonScript2 		: scriptActorCannon_2;
var cannonScript3 		: scriptActorCannon_3;
var gateScript			: scriptGate;
var enemyScript			: scriptActorEnemy;
var powerBar			: Texture;			//GUI texture display of powerAt
var	powerXpos			: float = 10;
var	powerYpos			: float = 10;
var	powerSize			: float = 20;

var coolBar				: Texture;			//GUI texture display of powerAt
var	coolXpos			: float = 10;
var	coolYpos			: float = 10;
var	coolSize			: float = 10;

var time : float;
var t: String;

function Start () 
{
	

}

function Update () {

time = Time.time;
t = time.ToString();
//print(time);

}

function OnGUI () //show some on screen info
{
//	GUI.Label(Rect(10,10,300,20), "powerAt: " + powerAt);

	//draw kill counter
 	GUI.Label(Rect(Screen.width-100,20,300,30), "Kills: " + enemyScript.killCount);
	
	//draw cannon "power meter"
    GUI.DrawTexture(Rect(powerXpos,powerYpos,cannonScript2.powerAt/10,powerSize), powerBar, ScaleMode.StretchToFill, false, 1.0);
    
    //draw cannon "cool off meter"
    coolXpos = Screen.width/2;
   	coolYpos = Screen.height*.90;
    GUI.DrawTexture(Rect(coolXpos,coolYpos,100-cannonScript3.coolOff,coolSize), coolBar, ScaleMode.StretchToFill, false, 1.0);
    
//	var time : float = Time.time;
//	var t = time.ToString;
	GUI.Label(Rect(Screen.width/2,20,300,30), t);
    


}
