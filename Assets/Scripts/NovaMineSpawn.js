var novaMine : GameObject;
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

function SpawnNovaMine()
{
	if (spawned == false)
	{
		Instantiate(novaMine, target.position, Quaternion.identity);
	}
	c.normalCannonOn = true;
	spawned = true;
	yield WaitForSeconds(60);
	spawned = false;
}