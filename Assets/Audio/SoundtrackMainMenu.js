#pragma strict

//public var songMainMenu : AudioClip;
//public var SoundSource : AudioSource;
//     
//function Awake()
//{
//	SoundSource = gameObject.AddComponent(AudioSource);
//	//SoundSource.playOnAwake = false;
//	//SoundSource.rolloffMode = AudioRolloffMode.Logarithmic;
//	//SoundSource.loop = true;
//}
//     
//function Start()
//{
//	SoundSource.clip = songMainMenu;
//	SoundSource.Play();
//}

//    var track1 : AudioClip;
//    var track2 : AudioClip;
    
    var track : AudioClip[];
    var currentTrack = 0;
     
    var audio1Volume : float = 1.0;
    var audio2Volume : float = 0.0;
    var track2Playing : boolean = false;
    var fadeOutReady = false;
    
    function Awake()
	{
		DontDestroyOnLoad(gameObject);
	}
	
	function Start()
	{
		audio.clip = track[0];
		audio.Play();
	}
	
    function Update() 
    {
    	if (fadeOutReady)
    	{
	    	fadeOut();
		}
	    if (audio1Volume <= 0.1)
	    {
	    	if(track2Playing == false)
	   		{
			    track2Playing = true;
			    audio.clip = track[1];
			    audio.Play();
			    currentTrack = 1;
			    songWait();
    		}
     
   			 fadeIn();

    	}
    }
     
//    function OnGUI()
//    {
//    GUI.Label(new Rect(10, 10, 200, 100), "Audio 1 : " + audio1Volume.ToString());
//    GUI.Label(new Rect(10, 30, 200, 100), "Audio 2 : " + audio2Volume.ToString());
//    }
     
    function fadeIn() 
    {
	    if (audio2Volume < 1.0) 
	    {
		    audio2Volume += 0.2 * Time.deltaTime;
		    audio.volume = audio2Volume;
	    }
    }
     
    function fadeOut() 
    {
    	if(audio1Volume > 0.1)
    	{
		    audio1Volume -= 0.2 * Time.deltaTime;
		    audio.volume = audio1Volume;
    	}
    }
    
    function songWait()
    {
    	if (currentTrack == 0)
    	{	//ConfinedCaos
    		yield WaitForSeconds(180);
    	}	
    	if (currentTrack == 1)
    	{	//DarknessTriumphs
    		yield WaitForSeconds(218);
    	}	
    	if (currentTrack == 2)
    	{	//MiddleGround
    		yield WaitForSeconds(105);
    	}
    	if (currentTrack == 3)
    	{	//Onward
    		yield WaitForSeconds(83);
    	}
    	autoSwitchSongs();
    }
    
    function autoSwitchSongs()
    {
    	currentTrack++;
    	if (currentTrack == 4 )
    	{
    		currentTrack = 0;
    	}
		audio.clip = track[currentTrack];
		audio.Play();
		songWait();
    }