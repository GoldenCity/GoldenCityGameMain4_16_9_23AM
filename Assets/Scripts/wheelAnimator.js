#pragma strict

var d : float; //wheel diameter
var c : float; //circumference
var side : int;
function Start () {
	GetDia();
	GetCirc();
	GetSide();
}

function Update () {
	var rot = gameObject.transform.position.z % 360;
gameObject.transform.Rotate(side * rot, 0, 0);	

}

function GetDia () {
	yield;	//wait because they may be scaled when first created
	d = renderer.bounds.size.z;
}

function GetCirc () {
	yield;
	c = Mathf.PI*d;
}

function GetSide() {
//	print(gameObject.transform.localRotation.eulerAngles.y +"--"+ gameObject.transform.parent.rotation.eulerAngles.y);
	if(gameObject.transform.localPosition.x > .1)
		side = 1;
	else
		side = -1;
}