#pragma strict

    var barDisplay : float = 0;
    var pos : Vector2;
    var size : Vector2;
    var HealthEmpty : Texture2D;
    var HealthFull : Texture2D;
    
	var healthBarLength : int;
	var numberOfSouls : int;
	
	var uv : wallState;
	
	var vSliderValue : float = 0.0;
	
	var mainCamera : Transform;
	
	var cameraYPositionOriginal : float;
	var cameraZPositionOriginal : float;
	
	var cameraRotationOriginal : float;
	
	function Start()
	{
		uv = GameObject.Find("Wall").GetComponent(wallState);
		healthBarLength = uv.wallHealth/5;
		
		pos = new Vector2(Screen.width/12,0);
	   	size = new Vector2(Screen.width/20,Screen.height/20);
	   	
	   	cameraYPositionOriginal = mainCamera.position.y;
	   	
	   	cameraZPositionOriginal = mainCamera.position.z;
	   	
	   	cameraRotationOriginal = mainCamera.rotation.x;

	}
  
    function OnGUI()
    {
       	//print("Size.x: " + size.x);
		//GUI.BeginGroup (new Rect(pos.x, pos.y, size.x, size.y));
     
		//GUI.Label(new Rect (0,0, size.x, size.y),HealthFull);
		 
		GUI.DrawTexture(Rect(pos.x, pos.y, size.x, size.y), HealthFull, ScaleMode.StretchToFill, false, 0f);
		
		
		// Draws a vertical slider control that goes from  10 (top) to 0 (bottom)
		GUI.backgroundColor=Color.blue;
		
	    vSliderValue = GUI.VerticalSlider (Rect (Screen.width/50, Screen.height/10, Screen.width/20, Screen.height/3.5), vSliderValue, 25.0, 0.0);

		
		
		
		
		
		
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
    }