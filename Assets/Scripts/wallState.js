#pragma strict

var levelOfWall : int = 1;
var wallHealth : int = 1000;
var maxWallHealth : int = 1000;

static var dead : boolean = false;

private var instanceScript_Hud : Script_Hud;
var uh : healthTest;
var theHud : Script_Hud;

//regenerative nanites
var regenLevel = 0;
var regenSpeed = 30.0; //initial cooldown of regen abiltity
var regenTimer : float; //countdown till ability use
var nanite : GameObject;
var naniteSpawns : GameObject[];
//--------------------


//--------------------

var gameEnded;
function Start () 
{
	uh = GameObject.Find("Camera_Main").GetComponent(healthTest);
	wallHealth = 1000;
	dead = false;
	theHud = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
	
	instanceScript_Hud = GameObject.Find("Globals").GetComponent(Script_Hud);
	
	gameEnded = GameObject.Find("GameTimer").GetComponent(GameTimer).gameEnded;
}

function Update ()
{
	regenLevel = theHud.regenUpgrade;
	if (theHud.regenUpgrade > 0)
	{ 
		regenSpeed = (40 - (theHud.regenUpgrade * 10)); 
		//regenSpeed = 3.0/theHud.regenUpgrade; 
	}
	
	regenTimer -= Time.deltaTime;
	
	if (regenTimer <= 0) { PeriodicRegeneration(); }
	
	if (wallHealth > maxWallHealth)
	{
		wallHealth = maxWallHealth;
	}
	
	if (wallHealth <= 0 || dead)
  	{
  		wallHealth = 0;
  		dead = true;
  		gameEnded = true;
  		Application.LoadLevel("Scene_gameOver");
  	}
}

function UpgradeWall()
{
	levelOfWall++;
	
	if (levelOfWall == 2)
	{
		wallHealth = wallHealth + 200;
		maxWallHealth +=200;
	}
	if (levelOfWall == 3)
	{
		wallHealth = wallHealth + 300;
		maxWallHealth +=300;
	}
	if (levelOfWall == 4)
	{
		wallHealth = wallHealth + 500;
		maxWallHealth +=500;
	}

	//uh.UpgradeHealth();
}

function PeriodicRegeneration()
{
	regenTimer = regenSpeed;
	if (regenLevel !=0 && wallHealth < maxWallHealth)
	{

		//wallHealth += 50;
		print("regen");
		for (var i = 0; i<16; i++)
			{print("regen2");
			
			//Instantiate(nanite,naniteSpawns[i].transform.position, Quaternion.Euler(-90,0,0)); disabled till something better
			}
	
		wallHealth += 8*(theHud.regenUpgrade+1);

	}
}