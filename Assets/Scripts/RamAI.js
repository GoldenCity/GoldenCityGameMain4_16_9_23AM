var _flameOne : ParticleEmitter;
var _flameTwo : ParticleEmitter;
var _smoke : ParticleEmitter;

function Start () 
{

}

function Update () 
{

}

function OnTriggerEnter(objColl : Collider) 
{
	
	if(objColl.gameObject.tag == "MovingWall") 
	{		
		_flameOne.enabled = true;
		_flameTwo.enabled = true;
		_smoke.enabled = true;
		GetComponent(PathFinder).speed = GetComponent(scriptActorEnemy).speed * 10;		
	}
	
}