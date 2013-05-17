#pragma strict
var camera_GameMenu : Camera;
var camera_Main : Camera;

var screenWidth : int = Screen.width;
var screenHeight : int = Screen.height;

var isPaused = false;

var logo : Texture;
var resume : Texture;
var quit : Texture;

var timerPause;

function Start() {
	timerPause = GameObject.Find("GameTimer").GetComponent(GameTimer).gamePaused;
}

function OnGUI() 
{
	if (camera_GameMenu.enabled == true)
	{
	
		//GUI.DrawTexture(Rect((Screen.width/8)*3,(Screen.height/6)*3,Screen.width/4,Screen.height/3), logo);

		if (GUI.Button(Rect(Screen.width/8,Screen.height/6,Screen.width/4,Screen.height/3), resume))
		{
			camera_GameMenu.enabled = false;
			Time.timeScale = 1;
			isPaused = false;
			timerPause = false;
			camera_Main.enabled = true;
		}
		if (GUI.Button(Rect((Screen.width/8)*5,Screen.height/6,Screen.width/4,Screen.height/3), quit))
		{
			Screen_GCLoad.destination = "MainMenu";
			Destroy(GameObject.Find("GameTimer") );			
			Application.LoadLevel("Screen_GoldenCityLoad");
		}
		
	}
}