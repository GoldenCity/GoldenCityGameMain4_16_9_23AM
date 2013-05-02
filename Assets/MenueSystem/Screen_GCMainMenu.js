#pragma strict


//static var destination : String = "";

static var destination : String = "abc";
//Main Menu

var quit : Texture;
var credits : Texture;
var startGame : Texture;
var background : Texture;

var menuSkin : GUISkin;

var soundTrack : SoundtrackMainMenu;

function Start()
{
	soundTrack = GameObject.Find("MusicBox").GetComponent(SoundtrackMainMenu);
}

function OnGUI() 
{
	GUI.skin = menuSkin;
	
	//Make Group
	//GUI.BeginGroup(Rect((Screen.width/2)-200, (Screen.height/4)-100,400,400));
	
	//MakeBox to see group
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), background);
	
	//GUI.Box(Rect(0,0,400,400),"GOLDEN CITY");
	
	//Make Start Game Button
	if (GUI.Button(Rect((Screen.width/2)-(Screen.width/8),(Screen.height/2)+(Screen.height/8),Screen.width/4,Screen.height/3),startGame))
	{
		destination = "Campaign";
		soundTrack.fadeOutReady = true;
		Application.LoadLevel("Screen_GoldenCityLoad");
	}
	
	if (GUI.Button(Rect((Screen.width)-(Screen.width/8),(Screen.height)-(Screen.height/6),Screen.width/8,Screen.height/6),credits))
	{
		//add credits here
	}
	
	if (GUI.Button(Rect(0,(Screen.height)-(Screen.height/6),Screen.width/8,Screen.height/6),quit))
	{
		 //Application.Quit();
	}

	

	
	
	/*
	//Make Credits Button
	if (GUI.Button(Rect(10,65,80,30),"Credits"))
	{
		Application.LoadLevel("ScreenCredits");
	{

	//Make Quit Button
	if (GUI.Button(Rect(10,90,80,30),"Quit"))
	{
		Application.Quit();
	}
	
	//Make Open Web Browser Button
	if (GUI.Button(Rect(10,120,80,30),"Quit"))
	{
		Application.OpenURL("http://www.Unity.com");
	}
	*/

	//GUI.EndGroup();
	
}