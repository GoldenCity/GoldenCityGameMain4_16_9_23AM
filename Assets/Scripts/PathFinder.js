#pragma strict

var speed : float = 5;
var finalTargetList = new Transform[5];
var hit : RaycastHit;
var delayTime = 1;
var gravity : float;
var moveNum : int;
var frameCount : int = 0;

private var finalTarget 	: Transform;
private var currentTarget   : Transform;
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

function OnTriggerEnter(objColl : Collider) {
	
	if(objColl.gameObject.tag == "MovingWall") {			
	//	Physics.IgnoreCollision(objColl.collider, collider);
	}
	if(objColl.gameObject.tag == "Ground") {			
		//gravity = 0;
	}
	if(objColl.gameObject.tag == "WayPoint") {
		currentTarget = objColl.transform.Find("GameObject");
		if (currentTarget == null) {
			currentTarget = GetFinalTarget();
		}		
	}
	vectorToPoint = currentTarget.position - this.transform.position;
	vectorToPoint.Normalize();
	transform.LookAt(currentTarget);
}

function OnTriggerExit(objColl : Collider) {
	if(objColl.gameObject.tag == "Ground") {			
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