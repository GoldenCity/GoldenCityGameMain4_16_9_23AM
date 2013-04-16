#pragma strict
var solarBeamTop : GameObject;
var solarBeamBottom : GameObject;
var target : Transform;
var spawned : boolean = false;

var c : Script_Hud;

function Start()
{
	c = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
}
function Update()
{
	
}

function SpawnSolarbeam()
{
	if (spawned == false)
	{
		Instantiate(solarBeamTop, Vector3(target.position.x, target.position.y + 90, target.position.z), Quaternion.identity);
		Instantiate(solarBeamBottom, target.position, Quaternion.identity);
	}
	c.normalCannonOn = true;
	spawned = true;
	yield WaitForSeconds(60);
	spawned = false;
}