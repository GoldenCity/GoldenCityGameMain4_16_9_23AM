#pragma strict
var spawnSolarbeamScript : spawnSolarbeam;

function Start()
{
	spawnSolarbeamScript = GameObject.Find("Globals").GetComponent(spawnSolarbeam);
	Destroy(gameObject, 10);
}

function Update () 
{
	
}