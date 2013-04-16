#pragma strict

//Projectile Script

//Inspector variables
var impulse			: float = 50; 	//amount of force applied at spawn
var despawnTime		: float = 10.0; //maximum lifetime of projectile in seconds
//var cannonScript	: scriptTrackMouseToGround; //to pull the lauchVelocuty var from cannon script
// splosion 		: Transform;	//object that does explode effect and does area damage
var blowUp 			: boolean = false; //should I be blowing up?
//var mount : Transform;

var particle : Transform;

//
function Start ()
{
//	impulse = cannonScript.launchVelocity; //grab the launch velocity var from the cannon script	
	rigidbody.AddForce(-transform.right *impulse, ForceMode.VelocityChange); //on creation, set velocity on local Y
	
	//transform.localRotation = Quaternion.Euler(mount.rotation.x,mount.rotation.y,90);
	
	Despawn(despawnTime); //destroy if no other events destroy it first
}

function Update ()
{
	//print(rigidbody.velocity);
	
	if (blowUp)
	{
		rigidbody.velocity=Vector3.zero; //stop rigidbody movement
	//	splosion.transform.localScale += Vector3(10,10,10); //explosion effect
		Despawn(0.1);
	}
}

function OnCollisionEnter (other : Collision)
{
	//Instantiate(particle, transform.position, transform.rotation);
	
	
	//check for enemy collision
	if(other.gameObject.tag == "Enemy")		
		{
		Instantiate(particle, transform.position, transform.rotation);
		blowUp=true; //invoke blowUp on enemy collision
		}
	//check for ground collision
 	if(other.gameObject.tag == "Ground")	
	 	{
		Instantiate(particle, transform.position, transform.rotation);
	 	blowUp=true; //invoke blowUp on ground collision	
	// 	Instantiate(TankBulletBoom, transform.position, transform.rotation);

	 	}
}

function Despawn (waitFor:float)
{
	Destroy(gameObject, waitFor);//just so it doesn't dissapear immediatly on impact
}