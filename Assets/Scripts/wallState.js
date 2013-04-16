#pragma strict

var levelOfWall : int = 1;

var wallHealth : int = 1000;

private var instanceScript_Hud : Script_Hud;

var uh : healthTest;
	

function Start () 
{
	uh = GameObject.Find("Camera_Main").GetComponent(healthTest);
	
	instanceScript_Hud = GameObject.Find("Globals").GetComponent(Script_Hud);
}

function Update () {

}

function UpgradeWall()
{
	levelOfWall++;
	
	if (levelOfWall == 2)
	{
		wallHealth = wallHealth + 200;
	}
	if (levelOfWall == 3)
	{
		wallHealth = wallHealth + 300;
	}
	if (levelOfWall == 4)
	{
		wallHealth = wallHealth + 500;
	}

	//uh.UpgradeHealth();
}