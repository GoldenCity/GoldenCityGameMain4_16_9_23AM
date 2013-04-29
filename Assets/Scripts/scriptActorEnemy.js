#pragma strict
// Enemy Actor Script
//most of this mess isnt used

// Inspector variables
static var enemyList = new Array();	//List to keep of enemies
var enemyID			: int;	//unique ID for this enemy instance
var moveNum			: int;
var speed 			: float = 6.0; 	//moving speed
var damageVelocity 	: float = 0.0; 	//relative velocity of collision with cannon ball to kill
var atGate			: boolean = false;	//is enemy touching gate?
var gateScript		: scriptGate;
var healthPoints	: float = 1.0;	//health of the enemy

var soulsWorth : int = 40;

//MasterLog
var s : Script_Hud;

//static variables
static var atGateCount	: int = 0;		//global count of enemies at gate
static var killCount 	: int = 0;		//global count of enemies killed


// Private variables
private var moveDirection : Vector3; //vector describing the direction of movment

function Start ()
{	
	s = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
	//movePoint = movePoint.GetComponentInChildren("WallTargetPointC");
	//enemyList.Push(enemyID);
	//moveDirection = GameObject.Find("WallTargetPointA").GetComponent("Transform").transform.position;//transform.up; 
	
	if (enemyList.length > 0) 
	{	
		//var lastEnemyID : int = enemyList[enemyList.length-1];
		//enemyID = lastEnemyID+1;
		enemyID = enemyList.length;		
		if (enemyID % 3 == 0) moveNum = 0;
		if (enemyID % 3 == 1) moveNum = 1;
		if (enemyID % 3 == 2) moveNum = 2;
	}
	else enemyID = 0;	
	enemyList.Push(enemyID);
}

function Update() {
	// Make a character controller
    //var controller : CharacterController = GetComponent(CharacterController);
    
    // Move the controller
    //controller.Move(-moveDirection * speed * Time.deltaTime);
    
    //transform.position.z -= Time.deltaTime * speed;      
    
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
	if(collidedWith == "MiniBullet") TakeDamage(1);
	if(collidedWith == "TankBullet") TakeDamage(5);
	if(collidedWith == "Projectile") TakeDamage(5);
	
	//if(collidedWith == "Explosion") TakeDamage(2);
	
	if(other.gameObject.tag == "Enemy") {
		 Physics.IgnoreCollision(other.collider, collider); 
	}		
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
 	
 	if(other.gameObject.tag == "Wall") {
		 Destroy(gameObject);
	}
}

function TakeDamage (damage:float)
{
	healthPoints -= damage;
	
	if (healthPoints <= 0)	//Enemy has died
	{	
		s.AddSouls(soulsWorth);
		
		if(atGate) 
			atGateCount--;
		
		
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
