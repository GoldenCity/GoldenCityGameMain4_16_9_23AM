#pragma strict
// Enemy Actor Script
//most of this mess isnt used

// Inspector variables
static var enemyList = new Array();	//List to keep of enemies
var enemyID			: int;	//unique ID for this enemy instance
var speed 			: float = 6.0; 	//moving speed
var damageVelocity 	: float = 0.0; 	//relative velocity of collision with cannon ball to kill
var atGate			: boolean = false;	//is enemy touching gate?
var gateScript		: scriptGate;
var healthPoints	: float = 1.0;	//health of the enemy

//static variables
static var atGateCount	: int = 0;		//global count of enemies at gate
static var killCount 	: int = 0;		//global count of enemies killed


// Private variables
private var moveDirection : Vector3; //vector describing the direction of movment

function Start ()
{	
	//enemyList.Push(enemyID);
	moveDirection = transform.up; //


	if (enemyList.length > 0) 
	{	
		//var lastEnemyID : int = enemyList[enemyList.length-1];
		//enemyID = lastEnemyID+1;
		enemyID = enemyList.length;
	}
	else enemyID = 0;	
	enemyList.Push(enemyID);
}

function Update() {
	// Make a character controller
    var controller : CharacterController = GetComponent(CharacterController);
    
    // Move the controller
    controller.Move(-moveDirection * speed * Time.deltaTime);
    
    if (scriptGate.zap == true && atGate == true)
    {
    	TakeDamage(2);
    }
    
    if (scriptGate.zap == true) atGateCount = 0; //hack to reset gate count because actual number at gate is not constantly tracked
    
  //  if (transform.position.z > 1) GameOver(); //if enemies get past the gate
}


function OnCollisionEnter (other : Collision)
{
	var collidedWith : String = other.gameObject.tag;
	//print(collidedWith);
	
	if(collidedWith == "Projectile") TakeDamage(2);
}

function OnTriggerEnter (other : Collider)
{
	var triggeredWith: String = other.gameObject.tag;
	//print("Triggered with: " + triggeredWith);
 	
 	if(other.gameObject.tag == "Gate")
 	{
 		atGate = true;
 		atGateCount++;
 	}
 	
 	if(other.gameObject.tag == "Explosion")
 	{
		TakeDamage(2);	
 	}
 	
 	if(other.gameObject.CompareTag ("Enemy")) //learn about null reference exceptions and 
 	{
// 		var buddy = GetComponent.Get; 
// 		print("touching buddy");
// 		if (other.gameObject.GetInstanceID() != GetInstanceID() && other.gameObject.GetComponent(scriptActorEnemy).atGate == true)
// 		{
// 			atGate = true;
// 			atGateCount++;
// 		}
 	}

}

function TakeDamage (damage:float)
{
	healthPoints -= damage;
	if (healthPoints <= 0)	//Enemy has died
	{
		if(atGate) atGateCount--;
		Destroy(gameObject);
		enemyList[enemyID] = -1; //represent a dead enemy as -1 in list
		killCount++;
	}
}

function GameOver ()
{
	yield WaitForSeconds(5.0);
	Application.LoadLevel("sceneGameOver");
}