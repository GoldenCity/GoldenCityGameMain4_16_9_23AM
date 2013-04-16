#pragma strict

//inspeactor variables
var neededToBreak 	: int = 10;
var enemyScript 	: scriptActorEnemy; 
var gameOver 		: boolean = false; 	//game is over when enemies breach gate
var zapFX			: Transform; 		//clone of the electric fence paricle effect
static var zap		: boolean = false;	//signal for enemy that the gate is electrified
var zapReadyAt		: int 	= 20;		//number of kills needed to make Zap button ready
//var zapKillsToReady	: int 	= 0; 		//number of kills left to recharge the zap button
var buttonSize 		: float = 0.7;		//Zap button width
var buttonHeight	: float = 0.7;		//Zap button height
var xButtonPos 		: float = 0.8;		//Zap button X relative screen position 
var yButtonPos		: float = 9.24;		//Zap button Y relative screen position



function Start () {
	 

}

function Update () 
{
//print (atGateCount.atGateCount);
	if (enemyScript.atGateCount >= neededToBreak) Destroy(gameObject);
}

function Zap ()
{
	Instantiate(zapFX, transform.position, transform.rotation); //make particle effect
	zapReadyAt += scriptActorEnemy.killCount;	//move zap reset to zapReadyAt number of kills ahead of current killCount
	zap = true;				//signal for enemies touching gate to take damage
	yield WaitForSeconds(0.5);
	zap = false;			//turn off signal
}

function OnGUI () //show some on screen info
{
	if (scriptActorEnemy.killCount >= zapReadyAt) GUI.enabled = true; //enable the button if needed number of kills is met
	else GUI.enabled = false;
	
	if (GUI.Button(Rect(Screen.width *0.01*xButtonPos,		//button X position scaled to 100ths of screen size
						Screen.height*0.01*yButtonPos,		//button Y position scaled to 100ths ofscreen size
						Screen.width *0.01 *buttonSize,		//button width scaled to 100ths of screen size
						Screen.height*0.01 *buttonHeight),	//button width scaled to 100ths of screen size
						"ZAP!"))	//Button Lable

	{	//ZAP Button effect
		Zap();
	}
	
	GUI.enabled = true;
	GUI.Label(Rect(100,10,300,20), "atGate: " + enemyScript.atGateCount);
	
//	if(gameOver)
//	{
//		GUI.Box(Rect(300,100,600,400),"Game Over!");
//	}

}
