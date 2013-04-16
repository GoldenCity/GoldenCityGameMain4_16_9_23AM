#pragma strict

//Projectile Script 2

//Inspector variables
var impulse			: float = 1500; //amount of force applied at spawn
var despawnTime		: float = 10.0; //maximum lifetime of projectile in seconds
private var getImpulse		: scriptActorCannon_2;
var blowUp 			: boolean = false;
var splosion 		: Transform;

//
function Start ()
{
	impulse = getImpulse.powerAt;
	rigidbody.AddForce(transform.up*impulse, ForceMode.Impulse); //on creation, apply an impulse force on local Y
	getImpulse.powerAt = 0;
	Despawn(despawnTime); //destroy if no other events destroy it first
}

function Update ()
{
	if (blowUp)
	{
		splosion.transform.localScale += Vector3(1,1,1);
		Despawn(0.1);
	}
	
		if(Input.GetMouseButton(1))
	{
		blowUp = true;
	}
}
function OnCollisionEnter (other : Collision)
{
	//check for enemy collision
	if(other.gameObject.tag == "Enemy")		blowUp = true; //explosion on enemy collision
	//check for ground collision
 	if(other.gameObject.tag == "Ground") 	blowUp = true; //explosion depsawn on ground collision
}

function Despawn (waitFor:float)
{
	Destroy(gameObject, waitFor);//just so it doesn't dissapear immediatly on impact
}