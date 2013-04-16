#pragma strict

//simulates cast shadow below projectile

function LateUpdate () //Late update so it does not clash with any projectile rotation
{
	var rotation = Quaternion.LookRotation(Vector3(0,-1,0) , Vector3.forward); //force projector to point down
	transform.rotation = rotation;
}