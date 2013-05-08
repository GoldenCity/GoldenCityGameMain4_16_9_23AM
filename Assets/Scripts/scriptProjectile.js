var impulse			: float = 50; 	//amount of force applied at spawn
var despawnTime		: float = 10.0; //maximum lifetime of projectile in seconds

var cannonScript	: scriptTrackMouseToGround; //to pull the lauchVelocuty var from cannon script

var splosion 		: GameObject;	//object that does explode effect and does area damage
var groundSplosion 	: GameObject;

var blowUp 			: boolean = false; //should I be blowing up?

//
function Start ()
{
	impulse = cannonScript.launchVelocity; //grab the launch velocity var from the cannon script
	rigidbody.AddForce(transform.up*impulse, ForceMode.VelocityChange); //on creation, set velocity on local Y
	Despawn(despawnTime); //destroy if no other events destroy it first
}

function Update ()
{
	//print(rigidbody.velocity);
	transform.Rotate(rigidbody.velocity, Space.World);
	if (blowUp)
	{
		rigidbody.velocity=Vector3.zero; //stop rigidbody movement
		splosion.transform.localScale += Vector3(0.9,0.9,0.9); //explosion effect
		Despawn(0.1);
	}
	
	//transform.LookAt(transform.position + rigidbody.velocity);
	//if the prefab is oriented vertically, it will then need to be rotated:
	//transform.Rotate(Vector3.right, 90);
}

function OnCollisionEnter (other : Collision)
{
	//check for enemy collision
	if(other.gameObject.tag == "Enemy")
	{
		blowUp=true; //invoke blowUp on enemy collision
	}		
	//check for ground collision
 	if(other.gameObject.tag == "Ground")
 	{
 		Instantiate(groundSplosion, Vector3(this.transform.position.x,this.transform.position.y,this.transform.position.z), Quaternion.identity);
 		Despawn(0.1);
 	}	//blowUp=true; //invoke blowUp on ground collision	
}

function Despawn (waitFor:float)
{
	Destroy(gameObject, waitFor);//just so it doesn't dissapear immediatly on impact
}