#pragma strict
var damage : float = 1;

function OnTriggerStay(other : Collider)
{
	if(other.tag == "Enemy")
	{
		other.GetComponent(scriptActorEnemy).healthPoints--;
	}	
}