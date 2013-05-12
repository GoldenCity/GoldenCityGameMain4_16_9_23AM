#pragma strict

var speed : float = 5;
var finalTargetList = new Transform[5];
var hit : RaycastHit;
var delayTime = 1;
var gravity : float;

private var finalTarget 	: Transform;
var currentTarget   : Transform;
private var vectorToPoint 	: Vector3 = Vector3.forward;
private var countTimer = 4.1;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	var pathList = [GameObject.Find("PathA").transform, GameObject.Find("PathB").transform,
		GameObject.Find("PathC").transform, GameObject.Find("PathD").transform];
		
	var closest : Transform; 
    var closestDist = Mathf.Infinity;
	for(var i = 0; i < pathList.length; i++) {
		var path = pathList[i];
        var dist = (transform.position - path.position).sqrMagnitude;
        
        if (dist < closestDist) { 
	    	closestDist = dist; 
    	   	closest = path;
    	}	
	}
	currentTarget = closest;
    currentTarget = currentTarget.Find("GameObject");
	 
	finalTargetList[0] = GameObject.Find("WallTargetPointA").transform;
	finalTargetList[1] = GameObject.Find("WallTargetPointB").transform;
	finalTargetList[2] = GameObject.Find("WallTargetPointC").transform;
	finalTargetList[3] = GameObject.Find("WallTargetPointD").transform;
	finalTargetList[4] = GameObject.Find("WallTargetPointE").transform;	
	
	vectorToPoint = currentTarget.position - this.transform.position;
	vectorToPoint.Normalize();			
}

function Update () {	
	var velocity = rigidbody.velocity;
	velocity = vectorToPoint*speed;
	rigidbody.velocity = velocity;
	
	if (Physics.Raycast (transform.localPosition, Vector3.down, hit)) { 
		//transform.up = hit.normal;			
		
		var lookAt = currentTarget.position - transform.position;
    	lookAt.y = 0;
    	var rotate = Quaternion.LookRotation(lookAt);//target.position - transform.position
    	transform.rotation = Quaternion.Slerp(transform.rotation, rotate, Time.deltaTime * speed);		
		//transform.rotation = Quaternion.Lerp (transform.rotation, hit.transform.rotation, Time.deltaTime * speed);				
    }    	
}

function FixedUpdate() {	 
	ReaquireVector();
}

function OnTriggerEnter(other : Collider) {
			
	if(other.gameObject.tag == "WayPoint") {		
		currentTarget = other.transform.Find("GameObject");		
		if (currentTarget == null) {
			currentTarget = GetFinalTarget();
		}
		vectorToPoint = currentTarget.position - this.transform.position;
		vectorToPoint.Normalize();				
	}
		
	if(other.gameObject.tag == "Respawn") {	
		other.gameObject.transform.parent.gameObject.GetComponent(SpawnPoint).valid = false;		
	}
	
	//if(other.gameObject.tag == "AirTarget") {	
	//	Physics.IgnoreCollision(other.collider, collider);	
	//}
}

function OnTriggerStay(other : Collider) {
	if(other.gameObject.tag == "WayPoint") {		
		currentTarget = other.transform.Find("GameObject");		
		if (currentTarget == null) {
			currentTarget = GetFinalTarget();
		}
		vectorToPoint = currentTarget.position - this.transform.position;
		vectorToPoint.Normalize();				
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag == "Respawn") {
		other.gameObject.transform.parent.gameObject.GetComponent(SpawnPoint).valid = false;				
	}
}

function GetFinalTarget() : Transform {
	finalTarget = finalTargetList[Random.Range(0.0, 5.0)];
	return finalTarget;
}

function ReaquireVector() {
	countTimer += Time.deltaTime;

	if(countTimer >= delayTime)	{		
		vectorToPoint = currentTarget.position - this.transform.position;		
		vectorToPoint.Normalize();
		countTimer = 0.0;		    		
	}
}

/*
var speed : float = 5;
var finalTargetList = new Transform[5];
var hit : RaycastHit;
var delayTime = 1;
var gravity : float;
var moveNum : int;
var frameCount : int = 0;

private var finalTarget 	: Transform;
var currentTarget   : Transform;
private var vectorToPoint 	: Vector3 = Vector3.forward;
private var countTimer = 4.1;

private var controller : CharacterController;
private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	finalTargetList[0] = GameObject.Find("WallTargetPointA").transform;
	finalTargetList[1] = GameObject.Find("WallTargetPointB").transform;
	finalTargetList[2] = GameObject.Find("WallTargetPointC").transform;
	finalTargetList[3] = GameObject.Find("WallTargetPointD").transform;
	finalTargetList[4] = GameObject.Find("WallTargetPointE").transform;
	
	controller = GetComponent(CharacterController);
	currentTarget = finalTargetList[2];
	vectorToPoint = currentTarget.position - this.transform.position;
	vectorToPoint.Normalize();
		
	moveNum = GetComponent(scriptActorEnemy).moveNum;			
}

function Update () {
	frameCount++;
	
	if (frameCount % 3 == moveNum) {
		controller.Move( Vector3(vectorToPoint.x, gravity, vectorToPoint.z) * (speed * Time.deltaTime) );
		//controller.SimpleMove( Vector3(vectorToPoint.x, 0, vectorToPoint.z) * speed);
	}    
	
	if (controller.isGrounded){
	 	gravity = 0;	  	
	}else {
		gravity -= 9.81 * Time.deltaTime;		
	}
	//ReaquireVector();	
}

function FixedUpdate() {	 
	ReaquireVector();
}

function OnTriggerEnter(other : Collider) {
	
	if(other.gameObject.tag == "MovingWall") {			
	//	Physics.IgnoreCollision(objColl.collider, collider);
	}
	if(other.gameObject.tag == "Ground") {			
		//gravity = 0;
	}	
	if(other.gameObject.tag == "WayPoint") {		
		currentTarget = other.transform.Find("GameObject");		
		if (currentTarget == null) {
			currentTarget = GetFinalTarget();
		}				
	}
	vectorToPoint = currentTarget.position - this.transform.position;
	vectorToPoint.Normalize();
	transform.LookAt(currentTarget);
	
	if(other.gameObject.tag == "Respawn") {	
		other.gameObject.transform.parent.gameObject.GetComponent(SpawnPoint).valid = false;		
	}
}

function OnTriggerExit(other : Collider) {
	if(other.gameObject.tag == "Respawn") {
		other.gameObject.transform.parent.gameObject.GetComponent(SpawnPoint).valid = false;
		//currentTarget.transform.parent.gameObject.GetComponent(SpawnPoint).valid = true;		
	}
	
	if(other.gameObject.tag == "Ground") {			
		//gravity = -9.8;
	}
}

function GetFinalTarget() : Transform {
	finalTarget = finalTargetList[Random.Range(0.0, 5.0)];
	return finalTarget;
}

function ReaquireVector() {
	countTimer += Time.deltaTime;

	if(countTimer >= delayTime)
	{	
		// Calculate the vector between the player and the enemy
		vectorToPoint = currentTarget.position - this.transform.position;		
		vectorToPoint.Normalize();
		countTimer = 0.0;
		if (Physics.Raycast (transform.localPosition, Vector3.down, hit)) { 
			transform.up = hit.normal;				
    	}    	
    	transform.LookAt(currentTarget);    		
	}
}

*/