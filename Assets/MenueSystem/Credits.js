#pragma strict

var y : float = Screen.height/2;

var credits : Texture;
var black : Texture;

var creditsOn = false;

function Start ()
{

}

function Update ()
{
	y = y-1;

    if(Input.anyKey)
    {
		creditsOn = false;
		y = Screen.height/2;
    }
}

function OnGUI ()
{
	if (creditsOn)
	{
	
//GUI.skin = customSkin;
//GUI.color = Color.yellow;

GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), black);

GUI.skin.label.fontSize = ( (Screen.width * 20) / 1132 );


GUI.DrawTexture(Rect(Screen.width/4,y,Screen.width/2,Screen.height*4), credits);



//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y,200,50),"Team Memebers");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Simeon Acker");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Josiah Bahl");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Matt Gerhart");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Ryan Landis");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Jeff Smallwood");
//	GUI.Label(Rect((Screen.width/2)-(Screen.width/10),y+20,200,50),"Reade Vaisman");

	}
}

function StopCredits()
{
	yield WaitForSeconds(50);
	creditsOn = false;
}