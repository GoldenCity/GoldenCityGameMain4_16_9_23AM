var _speed : int = 1;
var _lifeSpan : int = 3;

var _soulFocus : GameObject;
var _soulExplosion : GameObject;

function Start()
{
	_soulFocus = GameObject.FindGameObjectWithTag("SoulFocus");
}

function Update () 
{
	var speed = _speed * Time.deltaTime;
	transform.position = Vector3.MoveTowards(transform.position, _soulFocus.transform.position, speed);
}

function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "SoulFocus")
	{
		Instantiate(_soulExplosion, this.transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}