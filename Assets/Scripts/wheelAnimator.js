#pragma strict

var d : float; //wheel diameter
var c : float; //circumference
var side : int;

var manticore : boolean = false;
function Start () {
	GetDia();
	
	GetSide();
}

function Update () {
	if(c != 0 && c != null) {
		var rot = gameObject.transform.position.z % c;
		rot = (rot/c)*360;
		if(!manticore)
			gameObject.transform.Rotate(side * rot, 0, 0);	
		else
			gameObject.transform.Rotate(0, -side * rot, 0);	
	}

}

function GetDia () {
	yield;	//wait because they may be scaled when first created

		d = renderer.bounds.size.z;
	
	GetCirc();

}

function GetCirc () {
	c = Mathf.PI*d;
}

function GetSide() {
//	print(gameObject.transform.localRotation.eulerAngles.y +"--"+ gameObject.transform.parent.rotation.eulerAngles.y);
	if(gameObject.transform.localPosition.x > -.1)
		side = 1;
	else
		side = -1;
}