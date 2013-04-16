#pragma strict

//Inspector Variables
var waitTime :   float = 3.0;

function Start() 
{
	WaitTime();
}

function Update () 
{
	//Option for player to skip info screen
	if(Input.GetKeyDown("space"))
	{
		if(Screen_GCMainMenu.destination == "MainMenu"){Application.LoadLevel("Scene_MainMenu");}
		if(Screen_GCMainMenu.destination == "Campaign"){Application.LoadLevel("Scene_Campaign");}
	}
}

function OnGUI() 
{
	//Make Group
	GUI.BeginGroup(Rect(Screen.width/2-100,Screen.height/2-100,200,200));
	
	//MakeBox to see group
	GUI.Box(Rect(0,0,200,200),"Instructions");
	
	//Player info goes here
	GUI.Label(Rect(10,30,140,50),"You control a cannon that is the last defense of the city");
	GUI.Label(Rect(10,80,160,70),"Aim with the mouse and left-click to fire the cannon");
	GUI.Label(Rect(10,120,180,100),"Esc to quit");
	
	//End the goup started above
	GUI.EndGroup();
	
}

function WaitTime()
{
	yield WaitForSeconds(waitTime);
	if(Screen_GCMainMenu.destination == "MainMenu"){Application.LoadLevel("Scene_MainMenu");}
	if(Screen_GCMainMenu.destination == "Campaign"){Application.LoadLevel("Scene_Campaign");}
}
