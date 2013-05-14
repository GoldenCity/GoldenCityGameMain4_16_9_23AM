var gameOverLogo : Texture;
var startGame : Texture;
var quit : Texture;

function OnGUI() 
{
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), gameOverLogo);

		if (GUI.Button(Rect(Screen.width/8,Screen.height/6,Screen.width/4,Screen.height/3), startGame))
		{
			Screen_GCLoad.destination = "Campaign";
			Application.LoadLevel("Screen_GoldenCityLoad");
		}
		if (GUI.Button(Rect((Screen.width/8)*5,Screen.height/6,Screen.width/4,Screen.height/3), quit))
		{
			Screen_GCLoad.destination = "MainMenu";
			Application.LoadLevel("Screen_GoldenCityLoad");
		}
}