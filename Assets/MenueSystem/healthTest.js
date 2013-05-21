#pragma strict

    var barDisplay : float = 0;
    var pos : Vector2;
    var size : Vector2;
    var HealthEmpty : Texture2D;
    var HealthFull : Texture2D;
    
	var healthBarLength : int;
	var numberOfSouls 	: int;
	var healthBarMax 	: int;
	
	var menuSkin : GUISkin;
	
	var uv : wallState;
	
	var vSliderValue : float = 0.0;
	
	var mainCamera : Transform;
	
	var cameraYPositionOriginal : float;
	var cameraZPositionOriginal : float;
	
	var cameraRotationOriginal : float;
	
	var gameMenu : Script_GameMenu;
	
	function Start()
	{
		uv = GameObject.Find("Wall").GetComponent(wallState);
		healthBarLength = uv.wallHealth/5;
		healthBarMax	= uv.wallHealth/5;
		
		gameMenu = GameObject.Find("Camera_GameMenu").GetComponent(Script_GameMenu);
		
		pos = new Vector2(Screen.width/12,0);
	   	size = new Vector2(Screen.width/20,Screen.height/20);
	   	
	   	cameraYPositionOriginal = mainCamera.position.y;
	   	
	   	cameraZPositionOriginal = mainCamera.position.z;
	   	
	   	cameraRotationOriginal = mainCamera.rotation.x;
	
	}
  
    function OnGUI()
    {
    	GUI.skin = menuSkin;
       	//print("Size.x: " + size.x);
		//GUI.BeginGroup (new Rect(pos.x, pos.y, size.x, size.y));
     
		//GUI.Label(new Rect (0,0, size.x, size.y),HealthFull);
		
		size.y = Screen.height*(30.0/630.0);  
		//size.x = Screen.width*(400.0/858.0); 
		
		//HEALTH BAR BACKGROUND
		GUI.DrawTexture(Rect(pos.x, pos.y, healthBarMax, size.y), HealthEmpty, ScaleMode.StretchToFill, false, 0f);		  
		
		//HEALTH BAR FOREGROUND
		GUI.DrawTexture(Rect(pos.x, pos.y, size.x, size.y), HealthFull, ScaleMode.StretchToFill, false, 0f);
		
		//HEALTH BAR FRAME
//		GUI.Box(Rect(pos.x, pos.y, healthBarMax, size.y), "");
		
		
		// Draws a vertical slider control that goes from  10 (top) to 0 (bottom)
		GUI.backgroundColor=Color.blue;
		
		if(!gameMenu.isPaused)
		{
	    	vSliderValue = GUI.VerticalSlider (Rect (Screen.width/50, Screen.height/10, Screen.width/20, Screen.height/3.5), vSliderValue, 25.0, 0.0);
		}
		else
		{
		
		}
		//GUI.Label(new Rect (Screen.width-(Screen.width/5),Screen.height/80, Screen.width/4, Screen.height/4),("Souls Collected: " + numberOfSouls));
		
		
		//GUI.EndGroup();
     
    // draw the background:
   // GUI.BeginGroup (new Rect(pos.x, pos.y, size.x, size.y));
  // GUI.Box (new Rect (0,0, size.x, size.y),HealthEmpty);
     
    // draw the filled-in part:
    //GUI.BeginGroup (new Rect(0, 0, size.x * barDisplay, size.y));
   // GUI.Box (new Rect (0,0, size.x, size.y),HealthFull);
    
    //GUI.EndGroup();
     
    //GUI.EndGroup();
     
    }
     
    function Update()
    {
    	if(!gameMenu.isPaused)
    	{
	    	if ( (Input.GetAxis("Mouse ScrollWheel") < 0) && (vSliderValue < 25) )
	    	{
	    		vSliderValue += 5;
	    	}
	    	
	    	if ( (Input.GetAxis("Mouse ScrollWheel") > 0) && (vSliderValue > 0) )
	    	{
	    		vSliderValue -= 5;
	    	}
    	}
    	
    	mainCamera.position.y = (cameraYPositionOriginal + vSliderValue);
    	mainCamera.position.z = (cameraZPositionOriginal - vSliderValue/3.2);
    	mainCamera.rotation.x = (cameraRotationOriginal + vSliderValue/800);
    	
    	healthBarLength = uv.wallHealth/5;
  		if (healthBarLength >= 0)
  		{
  		size.x = healthBarLength;
  		}
  		//HealthFull.Resize(size.x,size.y);
  		//print("Size.x: " + size.x);
  		healthBarMax = uv.maxWallHealth/5;
  		
				
    }