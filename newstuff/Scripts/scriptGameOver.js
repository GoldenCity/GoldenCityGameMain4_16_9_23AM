#pragma strict
private var t: float;

function Start () 
{
t = Time.time - 5.0;
}

function Update () {

}

function OnGUI () //show some on screen info
{
	GUI.Label(Rect(Screen.width/2,Screen.height/2,300,20), "You survived " + t +  " seconds");

	if (GUI.Button(Rect(10,	10,	100,	50), "Restart"))
	{
		Application.LoadLevel ("sceneLevel1");
	}
}
