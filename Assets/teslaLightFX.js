#pragma strict

var myLight : Light;

var intensity : float = 1;

var target : GameObject; //a LightningTarget to point at

function Awake () {
	myLight.enabled = false;
}

function Update () {
	if(target.activeSelf) {
 		myLight.enabled = true;
		gameObject.transform.LookAt(target.transform);
		myLight.intensity = Random.value * intensity;
 	}
 	else
 		myLight.enabled = false;
}