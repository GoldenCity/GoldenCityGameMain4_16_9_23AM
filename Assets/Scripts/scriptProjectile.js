var impulse			: float = 50; 	//amount of force applied at spawn
var despawnTime		: float = 10.0; //maximum lifetime of projectile in seconds

var cannonScript	: scriptTrackMouseToGround; //to pull the lauchVelocuty var from cannon script

var splosion 		: GameObject;	//object that does explode effect and does area damage
var groundSplosion 	: GameObject;
var trail 			: GameObject;

var blowUp 			: boolean = false; //should I be blowing up?

var cannon 			: GameObject;

var hitMetal 	: AudioClip;
var hitFlesh 	: AudioClip;
var hitGround 	: AudioClip;

//
function Start ()
{
	//cannonScript = cannon.GetComponent(scriptTrackMouseToGround);
	impulse = cannonScript.launchVelocity; //grab the launch velocity var from the cannon script
	rigidbody.AddForce(transform.up*impulse, ForceMode.VelocityChange); //on creation, set velocity on local Y
	Despawn(despawnTime); //destroy if no other events destroy it first
	
	audio.pitch = 1 + (Random.value-.5)/5;
}

function FixedUpdate ()
{
	//print(rigidbody.velocity);
	
	if (blowUp)
	{
		rigidbody.velocity=Vector3.zero; //stop rigidbody movement
		splosion.transform.localScale += Vector3(0.9,0.9,0.9); //explosion effect
		Despawn(1);
	}
	else
		transform.Rotate(rigidbody.velocity, Space.World);
	
	//transform.LookAt(transform.position + rigidbody.velocity);
	//if the prefab is oriented vertically, it will then need to be rotated:
	//transform.Rotate(Vector3.right, 90);
}

function OnCollisionEnter (other : Collision)
{
	//check for enemy collision
	if(other.gameObject.tag == "Enemy")
	{
		//print(other.collider.name);
		if(!blowUp){
			if(other.collider.name == "Body" || other.collider.name == "HandCollider" )
				audio.PlayOneShot(hitFlesh);
			else
				audio.PlayOneShot(hitMetal);
		}
			
		blowUp=true; //invoke blowUp on enemy collision
	}		
	//check for ground collision
 	if(other.gameObject.tag == "Ground")
 	{
 		Instantiate(groundSplosion, Vector3(this.transform.position.x,this.transform.position.y,this.transform.position.z), Quaternion.identity);
 		Despawn(0.5);
 		
 		blowUp = true;
 		
 		audio.PlayOneShot(hitGround);
 	}	//blowUp=true; //invoke blowUp on ground collision	
}

function Despawn (waitFor:float)
{
	if(blowUp){
		yield WaitForSeconds(.1);
		gameObject.renderer.enabled = false;
		gameObject.collider.enabled = false;
		trail.SetActive(false);
		splosion.SetActive(false);
	}
		
	Destroy(gameObject, waitFor);//just so it doesn't dissapear immediatly on impact
}