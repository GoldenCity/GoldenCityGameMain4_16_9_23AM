#pragma strict
//place target
var target : scriptTrackMouseToGround; //grab the expected target point from this script
var here : Vector3;			
var rotation : Quaternion;	//rotation added to make projector point down

function Start () 
{
 here = target.hitPoint; //point where the parent projectile is expected to land
 rotation = Quaternion.LookRotation(Vector3(0,-1,0) , Vector3.forward); //force projector to look down
}

function LateUpdate () //Late Update so parent transformations do not conflict and cause jitteryness
{

	transform.rotation = rotation;	//set rotation to global "down"
	
	transform.position = here;	//keep the target at this global space
	transform.position.y += 10; //move projector above target scpace so it can project onto it

}