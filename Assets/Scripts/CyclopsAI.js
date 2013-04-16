#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(objColl : Collider) {
	
	if(objColl.gameObject.tag == "MovingWall") {			
		Physics.IgnoreCollision(objColl.collider, collider);
	}
	
}