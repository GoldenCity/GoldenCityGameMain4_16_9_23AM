#pragma strict

function OnCollisionEnter (other : Collision) {		
	if(other.gameObject.tag == "Enemy") {
		 Physics.IgnoreCollision(other.collider, collider); 
	}
	if(other.gameObject.tag == "AirTarget") {	
		Physics.IgnoreCollision(other.collider, collider);	
	}	
}