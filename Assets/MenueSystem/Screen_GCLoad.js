#pragma strict

//Inspector Variables
var waitTime :   float = 3.0;

var background : Texture;

var menuSkin : GUISkin;

function Start() 
{
	WaitTime();
}

function Update () 
{
	//Option for player to skip info screen
	if(Input.GetKeyDown("space"))
	{
		if((Screen_GCMainMenu.destination == "MainMenu") || (Game_Over.destination == "MainMenu") || (Script_GameMenu.destination == "MainMenu")){Application.LoadLevel("Scene_MainMenu");}
		if((Screen_GCMainMenu.destination == "Campaign") || (Game_Over.destination == "Campaign")){Application.LoadLevel("Scene_Campaign");}
	}
}

function OnGUI() 
{

	//Make Group
	//GUI.BeginGroup(Rect(Screen.width/2-100,Screen.height/2-100,200,200));
	
	GUI.skin = menuSkin;
	
	GUI.skin.label.fontSize = ( (Screen.width * 25) / 1132 );

	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), background);
	
	GUI.Label(Rect((Screen.width/2)-(Screen.width/6),(Screen.height/8)*5.25,Screen.width/4,Screen.height/2),"Aim with the mouse and left-click to fire");

	
	//MakeBox to see group
//	GUI.Box(Rect(0,0,200,200),"Instructions");
//	
//	//Player info goes here
//	GUI.Label(Rect(10,30,140,50),"You control a cannon that is the last defense of the city");
//	GUI.Label(Rect(10,80,160,70),"Aim with the mouse and left-click to fire the cannon");
//	GUI.Label(Rect(10,120,180,100),"Esc to quit");
	
	//End the goup started above
	//GUI.EndGroup();
	
}

function WaitTime()
{
	if((Screen_GCMainMenu.destination == "MainMenu") || (Game_Over.destination == "MainMenu"))
	{
		stopMusic();
	}
	yield WaitForSeconds(waitTime);
	if((Screen_GCMainMenu.destination == "MainMenu") || (Game_Over.destination == "MainMenu")){Application.LoadLevel("Scene_MainMenu");}
	if((Screen_GCMainMenu.destination == "Campaign") || (Game_Over.destination == "Campaign")){Application.LoadLevel("Scene_Campaign");}
}


function stopMusic()
{
	yield WaitForSeconds(2);
	Destroy(GameObject.FindWithTag("AudioPlayer"));
}
