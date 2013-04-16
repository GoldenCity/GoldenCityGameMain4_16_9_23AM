#pragma strict

//Main Control script
var showCursor : boolean = true;

function Start () {
Screen.showCursor = showCursor; //hide cursor in scene (i see a probelem when on screen button comes in...)
}

function Update () {

	if(Input.GetKeyDown(KeyCode.C))
	{
		showCursor = !showCursor;
		Screen.showCursor = showCursor;
		print("cursor visisbility = " + showCursor);
	}

	if(Input.GetKeyDown(KeyCode.Escape))
	{
		Application.Quit(); //quit game
	}
}