#pragma strict

var speed : float = 5;
var finalTargetList = new Transform[5];
var hit : RaycastHit;
var delayTime = 1.0;

//private var finalTarget 	: Transform;
private var currentTarget   : Transform;
private var vectorToPoint 	: Vector3 = Vector3.forward;
private var countTimer = 4.1;

function Start () {
	finalTargetList[0] = GameObject.Find("WallTargetPointA").transform;
	finalTargetList[1] = GameObject.Find("WallTargetPointB").transform;
	finalTargetList[2] = GameObject.Find("WallTargetPointC").transform;
	finalTargetList[3] = GameObject.Find("WallTargetPointD").transform;
	finalTargetList[4] = GameObject.Find("WallTargetPointE").transform;
	
	
	currentTarget = GetFinalTarget();
	vectorToPoint = currentTarget.position - transform.position;
	vectorToPoint.Normalize();
}

function Update () {	
	transform.position = transform.position + (vectorToPoint * (speed * Time.deltaTime));
	if (Physics.Raycast (transform.localPosition, Vector3.down, hit)) { 			
		transform.up = hit.normal;			
    }
    transform.LookAt(currentTarget);
}

function FixedUpdate() {
	ReaquireVector();
}

function OnTriggerEnter(objColl : Collider) {	
	if(objColl.gameObject.tag == "MovingWall") { 		
			currentTarget = GetFinalTarget();
			vectorToPoint = currentTarget.position - transform.position;
			vectorToPoint.Normalize();					
	}	
}

function GetFinalTarget() : Transform {
	return finalTargetList[Random.Range(0.0, 4.0)]; 
}

function ReaquireVector() {
	countTimer += Time.deltaTime;
	if(countTimer >= delayTime)
	{	
		// Calculate the vector between the player and the enemy
		vectorToPoint = currentTarget.position - transform.position;
		vectorToPoint.Normalize();
		//transform.LookAt(currentTarget);
		this.rigidbody.velocity = Vector3.zero;
		this.rigidbody.angularVelocity = Vector3.zero;
		countTimer = 0.0;	
	}	
}