#pragma strict
var startTrans : Transform;
var deathSound		: AudioClip;
var attackSound		: AudioClip;


function Start () 
{
	startTrans = gameObject.transform;

	
	yield WaitForSeconds(Random.value); //so their animations aren't all in sync
	animation.Play("Fly");
}

private var alive = true;
function Update () 
{
	if(gameObject.GetComponent(scriptActorEnemy).alive == false && alive == true) {
		alive = false;
		gameObject.audio.clip = deathSound;
		gameObject.audio.Play();
		
		globalFog.fogFarTarget -= 5;
	}

}

function OnTriggerEnter (t : Collider)
{
	if(t.gameObject.tag == "AirWall")
	{
		animation.CrossFade("Death", 0.2);
		gameObject.GetComponent(FlyingPathFinder).enabled = false;
		gameObject.rigidbody.useGravity = true;
		gameObject.audio.clip = attackSound;
		gameObject.audio.Play();
		
		globalFog.fogNearTarget -= 5;
		
		yield WaitForSeconds(5.0);
	}	
}