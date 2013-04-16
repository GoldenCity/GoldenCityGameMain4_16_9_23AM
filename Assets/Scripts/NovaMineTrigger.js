#pragma strict
var NovaMineExplosion : Transform;

function Update()
{
	if(Input.GetKeyDown("q"))
	{
		Instantiate(NovaMineExplosion, this.transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Enemy")
	{
		Instantiate(NovaMineExplosion, this.transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}