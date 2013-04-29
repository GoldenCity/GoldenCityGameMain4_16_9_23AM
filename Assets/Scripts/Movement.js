var _lifeTime : float = 5;
var _speed : float = 1;

function Update () 
{
	transform.Translate(0,1*Time.deltaTime,_speed);
	Destroy(gameObject, _lifeTime);
}