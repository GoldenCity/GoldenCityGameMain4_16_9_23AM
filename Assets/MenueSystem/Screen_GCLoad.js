#pragma strict

//Inspector Variables
var waitTime :   float = 3.0;

var background : Texture;

var menuSkin : GUISkin;

static var destination : String = " ";

function Start() 
{
	//yield StartCoroutine(WaitTime());
	WaitTime();
}

function Update () 
{
//	print(Screen_GCLoad.destination);
	//Option for player to skip info screen
	if(Input.GetKeyDown("space"))
	{
		if(destination == "MainMenu")
		{
			Application.LoadLevel("Scene_MainMenu");
		}
		if(destination == "Campaign")
		{
			Application.LoadLevel("Scene_Campaign");
		}
		destination = " ";
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
	if(destination == "MainMenu")
	{
		Destroy(GameObject.Find("musicBox(Clone)"));
		//yield WaitForSeconds(3); Source of the problem
		Application.LoadLevel("Scene_MainMenu");
	}
	if(destination == "Campaign")
	{
		//yield WaitForSeconds(3); Source of the problem
		Application.LoadLevel("Scene_Campaign");
	}
	destination = " ";
}
