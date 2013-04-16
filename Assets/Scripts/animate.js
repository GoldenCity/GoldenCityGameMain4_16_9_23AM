#pragma strict
var startTrans : Transform;
function Start () {
	startTrans = gameObject.transform;

	animation.Play("Fly");
}

function Update () {
	if(Input.GetKeyDown("1") ) {
		print("Idle");
		animation.CrossFade("Idle", 1);
	}
	if(Input.GetKeyDown("2") ) {
		print("Fly");
		animation.CrossFade("Fly", 1);
	}
	if(Input.GetKeyDown("3") ) {
		print("Death");
		animation.CrossFade("Death", 0.2);
	}	
	if(Input.GetKeyDown("4") ) {
		print("Idle/Fly blend");
		animation.Blend("Idle", 0.0, .3);
		animation.Blend("Fly", 0.0, .3);
	}
	if(Input.GetKeyDown("5") ) {
		print("Death/Fly blend");
		animation.Blend("Death", 0.0, .3);
		animation.Blend("Fly", 0.0, .3);
	}
	if(Input.GetKeyDown("0") ) {
		print("Stop");
		animation.Stop();
	}
	
}