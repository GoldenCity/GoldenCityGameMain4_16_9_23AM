var _speed : int = 1;
var _lifeSpan : int = 3;

function Update () {
	transform.Translate(0,1*Time.deltaTime, _speed);
	Destroy(gameObject, _lifeSpan);
}