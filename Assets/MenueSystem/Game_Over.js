var gameOverLogo : Texture;
var startGame : Texture;
var quit : Texture;

static var destination : String = "abc";

function OnGUI() 
{
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), gameOverLogo);

		if (GUI.Button(Rect(Screen.width/8,Screen.height/6,Screen.width/4,Screen.height/3), startGame))
		{
			destination = "Campaign";
			Application.LoadLevel("Screen_GoldenCityLoad");
		}
		if (GUI.Button(Rect((Screen.width/8)*5,Screen.height/6,Screen.width/4,Screen.height/3), quit))
		{
			destination = "MainMenu";
			Application.LoadLevel("Scene_MainMenu");
		}
}