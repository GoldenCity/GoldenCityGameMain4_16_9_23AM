#pragma strict
var damage : float = 1;

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Enemy")
	{
		//other.GetComponent(scriptActorEnemy).TakeDamage(damage);
		other.transform.root.GetComponent(scriptActorEnemy).TakeDamage(damage);
	}	
}