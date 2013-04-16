#pragma strict
var verticalChange : int = 6;
var horizontalChange : int = 10;
var rotationChange : int = 1;
var forwardLimit: int = -8;
var backwardLimit: int = -30;

function Start () {

}

function Update () {

}

function FixedUpdate() {
	
	if ( transform.position.z < forwardLimit) {
		if(Input.GetKey("up") || (Input.GetAxis("Mouse ScrollWheel") > 0)) {
			transform.position.z += Time.deltaTime * horizontalChange;
			transform.position.y += -Time.deltaTime * verticalChange;
			transform.Rotate(Vector3.left * rotationChange * Time.deltaTime);
		}
	}
		
	if ( transform.position.z > backwardLimit) {	
		if(Input.GetKey("down") || (Input.GetAxis("Mouse ScrollWheel") < 0)) {
			transform.position.z += -Time.deltaTime * horizontalChange;
			transform.position.y += Time.deltaTime * verticalChange;
			transform.Rotate(Vector3.right * rotationChange * Time.deltaTime);	
		}
	}
	
}