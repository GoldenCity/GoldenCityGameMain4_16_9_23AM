#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerStay (o : Collider) {
	print(o.gameObject.transform.parent.gameObject.name+ "{}{}"+o.gameObject.transform.parent.gameObject.GetInstanceID());
}