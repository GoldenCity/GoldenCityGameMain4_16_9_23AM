#pragma strict

var d : float; //wheel diameter
var c : float; //circumference

function Start () {
	GetDia();
	GetCirc();
}

function Update () {
	

}

function GetDia () {
	yield;	//wait because they may be scaled when first created
	d = renderer.bounds.size.z;
}

function GetCirc () {
	c = Mathf.PI*d;
}