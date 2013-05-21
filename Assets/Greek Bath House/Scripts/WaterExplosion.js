var _explosion : GameObject;

function Start () 
{

}

function Update () 
{

}

function OnCollisionEnter(other : Collision)
{
	print("Yeah");
	if(other.gameObject.tag == "Projectile")
	{	
		print("Hey");
		Instantiate(_explosion, this.transform.position, Quaternion.identity);
	}
}