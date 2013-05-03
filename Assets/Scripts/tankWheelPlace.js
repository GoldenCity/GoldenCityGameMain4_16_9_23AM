#pragma strict

var wheelMount : Transform[];
var wheelModel	: Transform;

function Start () {
	for (var i=0; i<wheelMount.Length; i++){
		var w = Instantiate(wheelModel, wheelMount[i].position, wheelMount[i].rotation);
		w.transform.parent = gameObject.transform; //parent wheel to tank object
	}
	wheelModel.gameObject.renderer.enabled = false;
	this.enabled = false;
}
