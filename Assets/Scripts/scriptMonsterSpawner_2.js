#pragma strict
//Monster Spawner script

//Inspector variables
var waitTime	: float = 3.0; 	//time between enemy spawn events
var lineSize	: int 	= 3;	//number of enemies spawned in a line
var fileSize	: int 	= 1; 	//number of enemies spawned in a single file line
var enemySpacing: float	= 20;	//space between units spawned in a line
var enemy 		: Transform;	//Transform for enemies to spawn
var spawnPoint 	: Transform;	//Point where enemy tranfsorm starts from
//var gameTime 	: int = Mathf.RoundToInt(Time.time);
var enemyList = new Transform[6]; 

//
function Start () 
{
	
	//InvokeRepeating("SpawnEnemy", waitTime, waitTime);	//invoke SpawnEnemy every waitTime seconds

}

//0.37 -.5 
//0.5 -.5
function Update ()
{
	if(Input.GetKeyUp("p")) {
		//SpawnEnemy();
	} 
	
	//if(Time.time > 90) lineSize = 4;		//simply incease the number after time intervals
	//else if(Time.time > 60) lineSize = 3;
	//else if(Time.time > 30) lineSize = 2;	
}

//creates groups of enemies
function SpawnEnemy ()
{
	Instantiate(enemyList[1], spawnPoint.position, Quaternion.Euler ( 270, 180, 0 ));
	/*
	for(var i: int=0;i<lineSize;i++) //spawn a row of enemies
	{
		Instantiate(enemyList[1], spawnPoint.position+Vector3(i*enemySpacing-(lineSize/2*enemySpacing), //enemy X position
														4, 
														0), //enemy Z position
														spawnPoint.rotation);
	
		//Instantiate(enemyList[0], spawnPoint.position+Vector3(i*enemySpacing-(lineSize/2*enemySpacing), //enemy X position
		//												4, 
		//												0), //enemy Z position
		//												spawnPoint.rotation);
		
		//Instantiate(harpyMissile, spawnPoint.position+Vector3(i*enemySpacing-(lineSize/2*enemySpacing), //enemy X position
		//												2, 
		//												0), //enemy Z position
		//												spawnPoint.rotation);
														
		//Instantiate(enemy, spawnPoint.position+Vector3(i*enemySpacing-(lineSize/2*enemySpacing), //enemy X position
		//												0, 
		//												0), //enemy Z position
		//												spawnPoint.rotation);
	}
	waitTime = Random.Range(1.0,15.0); //make the wait between spawns random
	CancelInvoke();
	InvokeRepeating("SpawnEnemy", waitTime, waitTime);	//invoke SpawnEnemy every waitTime seconds
	*/
}