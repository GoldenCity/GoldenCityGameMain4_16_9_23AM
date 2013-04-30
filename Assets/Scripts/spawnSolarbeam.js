#pragma strict
var solarBeamTop : GameObject;
var solarBeamBottom : GameObject;
var target : Transform;
var spawned : boolean = false;

var solarCooldownTimer : int = 60;
var solarCooldown : int = 60;

var c : Script_Hud;

function Start()
{
	c = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
}
function Update()
{
	//solarCooldownTimer -= Time.deltaTime;
}

function SpawnSolarbeam()
{
	if (spawned == false)
	{
		Instantiate(solarBeamTop, Vector3(target.position.x, target.position.y + 90, target.position.z), Quaternion.identity);
		Instantiate(solarBeamBottom, target.position, Quaternion.identity);
	}
	c.normalCannonOn = true;
	c.scorcherFireOn = false;
	spawned = true;
	solarCooldownTimer = solarCooldown;
	solarCooldownCount();
	yield WaitForSeconds(solarCooldown);
	spawned = false;
}

function solarCooldownCount()
{
	solarCooldownTimer = solarCooldown;
	for(var i=solarCooldown; i>0; i--)
	{
		yield WaitForSeconds(1);
		solarCooldownTimer--;
	}
	solarCooldownTimer = solarCooldown;
}