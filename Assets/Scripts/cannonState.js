#pragma strict
var levelOfCannon : int = 1;

var damage : int = 100;

var speed : int = 10;


function Start () {

}

function Update () {

}

function UpgradeCannon()
{
	levelOfCannon++;
	
	if (levelOfCannon == 2)
	{
		damage = 200;
		
		speed = 20;
	}
	if (levelOfCannon == 3)
	{
		
	}
	if (levelOfCannon == 4)
	{
		
	}
}