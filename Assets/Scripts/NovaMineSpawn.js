var novaMine : GameObject;

var target : Transform;

var spawned : boolean = false;

var mineCooldownTimer : int = 60;
var mineCooldown : int = 60;

var c : Script_Hud;

function Start()
{
	c = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
}

function Update()
{
	
}

function SpawnNovaMine()
{
	if (spawned == false)
	{
		Instantiate(novaMine, target.position, Quaternion.identity);
	}
	c.normalCannonOn = true;
	c.mineOn = false;
	spawned = true;
	mineCooldownTimer = mineCooldown;
	mineCooldownCount();
	yield WaitForSeconds(mineCooldown);
	spawned = false;
}

function mineCooldownCount()
{
	mineCooldownTimer = mineCooldown;
	for(var i=mineCooldown; i>0; i--)
	{
		yield WaitForSeconds(1);
		mineCooldownTimer--;
	}
	mineCooldownTimer = mineCooldown;
}