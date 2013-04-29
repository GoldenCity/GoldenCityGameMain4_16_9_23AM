#pragma strict

var enemyList = new Transform[6];
var pathList = new Transform[4];
var harpySpawnList = new Transform[4];

private var enemyNum : int = 1;
private var num = 0;

var harpyTime = 3;
private var harpyTimer = 4.1;

var ramTime = 20;
private var ramTimer = 4.1;

var cyclopsTime = 25;
private var cyclopsTimer = 4.1;


function Start () {
	
}

function Update () {
	if(Input.GetKeyUp("p")) {
		SpawnEnemy();
	}
	if(Input.GetKey("0") || Input.GetKey("[0]")) {
		enemyNum = 0;
	}
	if(Input.GetKey("1") || Input.GetKey("[1]")) {
		enemyNum = 1;
	}
	if(Input.GetKey("2") || Input.GetKey("[2]")) {
		enemyNum = 2;
	}
	if(Input.GetKey("3") || Input.GetKey("[3]")) {
		enemyNum = 3;
	}
			
	
}

function FixedUpdate() {
	SpawnEnemy();
}

function SpawnEnemy ()
{
	harpyTimer += Time.deltaTime;
	ramTimer += Time.deltaTime;
	cyclopsTimer += Time.deltaTime;
	
	if (harpyTimer >= harpyTime) {
		Instantiate(enemyList[1], harpySpawnList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		harpyTimer = 0.0;
	}
	if (ramTimer >= ramTime) {
		Spawn(0);
	
		//Instantiate(enemyList[0], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		ramTimer = 0.0;
	}
	
	//if (cyclopsTimer >= ramTime) {	
	//	Instantiate(enemyList[2], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
	//	WaitForSeconds(1);
	//	Instantiate(enemyList[2], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
	//	cyclopsTimer = 0.0;
	//}
	
	if (cyclopsTimer >= cyclopsTime) {
		Spawn(2);
	
		//Instantiate(enemyList[2], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		//WaitForSeconds(1);
		//Instantiate(enemyList[2], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		cyclopsTimer = 0.0;
	}
	
	//Instantiate(enemyList[enemyNum], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
	//num++;
	/*
	if(countTimer >= delayTime)
	{	
		//Instantiate(enemyList[enemyNum], pathList[num % pathList.Length].position, Quaternion.identity);
		Instantiate(enemyList[enemyNum], pathList[Random.Range(0.0, 4.0)].position, Quaternion.identity);
		//num++;
		countTimer = 0.0;
		//print("Spawn!");	
	}
	
	//Instantiate(enemyList[enemyNum], pathList[num % pathList.Length].position, Quaternion.identity);
	//num++;
	
	
	//pathList[Random.Range(0.0, 4.0)].position
	//Instantiate(enemyList[0], pathList[num % pathList.Length].position, Quaternion.identity);//Quaternion.Euler ( 270, 180, 0 ));	
	//Instantiate(enemyList[0], pathList[Random.Range(0.0, 4.0)].position, Quaternion.Euler ( 270, 180, 0 ));
	*/
}

function Spawn(num : int) {
	var path = pathList[Random.Range(0.0, 4.0)];
	if (path.GetComponent(SpawnPoint).valid == true) {
		Instantiate(enemyList[num], path.position, Quaternion.identity);
	}else {
	print("Respawning");
	WaitForSeconds(3);
	Instantiate(enemyList[num], path.position, Quaternion.identity);
	//Spawn(num);
	}	
}