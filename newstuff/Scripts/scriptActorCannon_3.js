#pragma strict
// Cannon script 3
// This cannon fires at a fixed power and has a cooldown time

//Inspectpr variables
var arcX				: float	= 60.0; 	//cannon degrees of freedom on X axis (point up/down)
var arcY				: float	= 90.0;		//cannon degrees of freedom on Y axis (point left/right)
var arcXOffset 			: float = 90; 		//elevation of cannon when mouseY is center
var arcYOffset 			: float = 180;		//drirection of cannon when mouseX is center
var invertY				: boolean = true;	//flips verticle mouse control
var coolOffTime			: float	= 1.0;		//Seconds it takes for cannon to be ready to fire again
var canFire				: boolean = true;	//can the cannon fire?
static var coolOff		: float = 100;				//current level of cannon impulse power
var chargeTime			: float = 2.0;		//how long in seconds it powerAt goes from powerMin to powerMax
var projectile 			: Transform;		//Transforms added to projectile on its instantiation
var projectileEmitter 	: Transform;		//Transforms added to the emitter object
var nextWeapon		 	: Transform;


//Private variables
private var mouseAt 	: Vector2;	//mouse x,y position in window
private var cannonRotX  : float;	//angle of rotation on X to set cannon at
private var cannonRotY 	: float;	//angle of rotation on Y to set cannon at
private var lastFire	: float = 0.0; 	//Time of last cannon fire


//	
function Start () 
{

}

function Update () 
{
	//point cannon based on mouse screen position
	mouseAt 	= Input.mousePosition ; 					//store the mouse X,Y position on screen. (0,0 is Left,Bottom corner) 
	mouseAt.x  	= Mathf.Clamp(mouseAt.x,0,Screen.width); 	//keep mouseAt within screen dimensions if mouse leaves game screen
	mouseAt.y 	= Mathf.Clamp(mouseAt.y,0,Screen.height);
	cannonRotY 	= (arcY*(mouseAt.x/Screen.width))-(arcY/2)+arcYOffset; //when mouse is full left, rot is -.5arcY; mouse center rot is 0; mosue full right rot is +.5arcY

	if (invertY)  cannonRotX = -(arcX*(mouseAt.y/Screen.height))+(arcX/2)+arcXOffset;  		  	//similar to above but more complicated-
	else 		  cannonRotX = -(arcX*((Screen.height-mouseAt.y)/Screen.height))+(arcX/2)+arcXOffset; //because I wanted an invert Y option
    
    transform.eulerAngles = Vector3(cannonRotX, cannonRotY, 0); //rotate the cannon
	
	//fire cannon on mouse button click
	if(Input.GetMouseButtonDown(0) && canFire)
	{
		Instantiate(projectile, projectileEmitter.position, projectileEmitter.rotation); //create a projectile object at the emitter position and rotation
		canFire = false; //Cannon cannot fire
		lastFire = Time.time;
	}
	
	//
	if (!canFire) CoolOff(lastFire);
	
	if(Input.GetKeyDown(KeyCode.Z))
	{
		Instantiate(nextWeapon, transform.position, transform.rotation);
		Destroy(gameObject);
	}
}

function CoolOff(t : float)
{
	var coolOffState = (Time.time-t)/coolOffTime; //scale to between 0 and 1
	coolOff = Mathf.Lerp(0, 100, coolOffState);   //interpolate between 0 and 100 for the GUI cool off meter
	if (coolOff == 100) canFire = true;	
}


