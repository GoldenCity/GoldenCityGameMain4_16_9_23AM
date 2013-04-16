#pragma strict


//static var destination : String = "";

static var destination : String = "abc";
//Main Menu

function OnGUI() 
{
	//Make Group
	GUI.BeginGroup(Rect((Screen.width/2)-200, (Screen.height/4)-100,400,400));
	
	//MakeBox to see group
	GUI.Box(Rect(0,0,400,400),"GOLDEN CITY");
	
	//Make Start Game Button
	if (GUI.Button(Rect(80,40,90,80),"Campaign"))
	{
		destination = "Campaign";
		Application.LoadLevel("Screen_GoldenCityLoad");
	}
	
	if (GUI.Button(Rect(240,40,90,80),"Arcade Mode"))
	{
		destination = "Arcade";
		Application.LoadLevel("Screen_GoldenCityLoad");
	}
	
	if (GUI.Button(Rect(160,140,90,80),"Game Info"))
	{
		Application.LoadLevel("Screen_GoldenCityLoad");
	}
	
	if (GUI.Button(Rect(160,240,90,80),"Credits"))
	{
		Application.LoadLevel("Screen_GoldenCityLoad");
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

	GUI.EndGroup();
	
}