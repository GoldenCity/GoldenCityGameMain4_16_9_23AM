#pragma strict
//Main Menu
var quit : Texture;
var creditsTex : Texture;
var startGame : Texture;
var background : Texture;

var menuSkin : GUISkin;

var soundTrack : SoundtrackMainMenu;
var credits : Credits;

var musicBox : GameObject;

function Start()
{
	Meistro();
	soundTrack = GameObject.Find("musicBox(Clone)").GetComponent(SoundtrackMainMenu);
	credits = GameObject.Find("Main Camera").GetComponent(Credits);
}

function OnGUI() 
{
	if (credits.creditsOn == false)
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
		Screen_GCLoad.destination = "Campaign";
		soundTrack.fadeOutReady = true;
		Application.LoadLevel("Screen_GoldenCityLoad");
	}
	
	if (GUI.Button(Rect((Screen.width)-(Screen.width/8),(Screen.height)-(Screen.height/6),Screen.width/8,Screen.height/6),creditsTex))
	{
		credits.creditsOn = true;
		credits.StopCredits();
	}
	
	if (GUI.Button(Rect(0,(Screen.height)-(Screen.height/6),Screen.width/8,Screen.height/6),quit))
	{
		 Application.Quit();
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
}

	function Meistro()
	{
		var find = GameObject.Find("MusicBox");
		
		if(find != null)
		{
			Destroy(find);
			Instantiate(musicBox, this.transform.position, Quaternion.identity);
		}
		else
		{
			Instantiate(musicBox, this.transform.position, Quaternion.identity);
		}
	}