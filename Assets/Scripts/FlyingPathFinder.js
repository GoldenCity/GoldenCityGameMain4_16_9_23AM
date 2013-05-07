#pragma strict

var speed : float = 5;
var firstTargetList = new Transform[5];
var finalTargetList = new Transform[5];

var hit : RaycastHit;
var delayTime = 1.0;

//private var finalTarget 	: Transform;
private var currentTarget   : Transform;
private var vectorToPoint 	: Vector3 = Vector3.forward;
private var countTimer = 4.1;

function Start () {
	firstTargetList[0] = GameObject.Find("WallAirTargetPoint1A").transform;
	firstTargetList[1] = GameObject.Find("WallAirTargetPoint1B").transform;
	firstTargetList[2] = GameObject.Find("WallAirTargetPoint1C").transform;
	firstTargetList[3] = GameObject.Find("WallAirTargetPoint1D").transform;
	firstTargetList[4] = GameObject.Find("WallAirTargetPoint1E").transform;
	
	finalTargetList[0] = GameObject.Find("WallAirTargetPoint2A").transform;
	finalTargetList[1] = GameObject.Find("WallAirTargetPoint2B").transform;
	finalTargetList[2] = GameObject.Find("WallAirTargetPoint2C").transform;
	finalTargetList[3] = GameObject.Find("WallAirTargetPoint2D").transform;
	finalTargetList[4] = GameObject.Find("WallAirTargetPoint2E").transform;
	
	
	currentTarget = GetFirstTarget();
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

private var stayOnTarget = false; //After final target is aquired do not change course
function OnTriggerEnter(objColl : Collider) {	
	if(objColl.gameObject.tag == "MovingWall" && !stayOnTarget) { 		
			currentTarget = GetFirstTarget();
			vectorToPoint = currentTarget.position - transform.position;
			vectorToPoint.Normalize();					
	}
	
	if(objColl.gameObject.tag == "AirTarget") {	
		stayOnTarget = true;
		currentTarget = GetFinalTarget();
		//speed = speed *3;
	}	
}

function GetFirstTarget() : Transform {
	return firstTargetList[Random.Range(0.0, 4.0)]; 
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