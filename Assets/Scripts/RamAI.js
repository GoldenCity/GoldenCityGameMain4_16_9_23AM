#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(objColl : Collider) {
	
	if(objColl.gameObject.tag == "MovingWall") {		
		GetComponent(PathFinder).speed = GetComponent(scriptActorEnemy).speed * 10;		
	}
	
}