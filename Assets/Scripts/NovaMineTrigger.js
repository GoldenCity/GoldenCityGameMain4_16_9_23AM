#pragma strict
var NovaMineExplosion : GameObject;
var NovaLevelThree : GameObject;

var HudScript : Script_Hud;

function Start()
{
	HudScript = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
}

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
		if(HudScript.mineUpgrade == 2)
		{
			Instantiate(NovaMineExplosion, this.transform.position, Quaternion.identity);
			Destroy(gameObject);
		}
		if(HudScript.mineUpgrade == 3)
		{
			Instantiate(NovaMineExplosion, this.transform.position, Quaternion.identity);
			Destroy(gameObject);
		}
		if(HudScript.mineUpgrade == 4)
		{
			Instantiate(NovaLevelThree, this.transform.position, Quaternion.identity);
			Destroy(gameObject);
		}
	}
}