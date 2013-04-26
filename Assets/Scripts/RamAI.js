var _flameOne : ParticleEmitter;
var _flameTwo : ParticleEmitter;
var _smoke : ParticleEmitter;
private var sound  : AudioSource;
var ramAggro : AudioClip;

function Start () 
{
	animation.Play("Ram_Idle");
	
	sound = gameObject.GetComponent(AudioSource);

}

function Update () 
{

}

function OnTriggerEnter(objColl : Collider) 
{
	
	if(objColl.gameObject.tag == "MovingWall") 
	{	
		sound.clip = ramAggro;
		sound.Play();
		
		animation.CrossFade("Ram_Aggro",.3);
		_smoke.enabled = true;
		
		yield WaitForSeconds (2);
		_flameTwo.enabled = true;	
		
		yield WaitForSeconds (1);	
		_flameOne.enabled = true;
		
		GetComponent(PathFinder).speed = GetComponent(scriptActorEnemy).speed * 10;		
		
	}
	
}