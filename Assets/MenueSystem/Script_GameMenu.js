#pragma strict


var camera_GameMenu : Camera;
var camera_Main : Camera;

var screenWidth : int = Screen.width;
var screenHeight : int = Screen.height;




function OnGUI() 
{
	if (camera_GameMenu.enabled == true)
	{
		GUI.BeginGroup(Rect((Screen.width/2)-200, (Screen.height/4)-100,400,400));
		
		GUI.Box(Rect(0,0,400,400),"GOLDEN CITY");
	
		if (GUI.Button(Rect(100,80,180,80),"Resume Game"))
		{
			camera_GameMenu.enabled = false;
			camera_Main.enabled = true;
		}
		
		if (GUI.Button(Rect(100,260,180,80),"Quit Game"))
		{
			Screen_GCMainMenu.destination = "MainMenu";
			Application.LoadLevel("Screen_GoldenCityLoad");
		}
		
		GUI.EndGroup();
	}
	
	
}