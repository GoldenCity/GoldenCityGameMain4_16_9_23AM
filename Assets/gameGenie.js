#pragma strict

var toggleBox = false;

var cheat_soul = false;
var cheat_death = false;
var cheat_health = false;

var healthScript : wallState;
var hudScript 	: Script_Hud;

function Start(){
	healthScript = GameObject.Find("Wall").GetComponent(wallState);
	hudScript = GameObject.Find("Camera_Main").GetComponent(Script_Hud);
}
function Update () {
	if(Input.GetKeyDown(KeyCode.BackQuote) )
		toggleBox = !toggleBox;
	
	if(cheat_soul && hudScript.totalSouls < 9001)		
		hudScript.totalSouls = 9001;		
	
	if(cheat_health && healthScript.wallHealth < healthScript.maxWallHealth)
		healthScript.wallHealth = healthScript.maxWallHealth;
		
	if(cheat_death && healthScript.wallHealth < 1)
		healthScript.wallHealth = 1;

}

function OnGUI () {
	if(toggleBox) {
		// Make a background box
		GUILayout.BeginArea(Rect (50,55,200,200));
			GUI.Box (Rect (0,0,200,200), "~CHEAT GENIE~");
			GUILayout.Space(20);
				// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
			cheat_soul = GUILayout.Toggle(cheat_soul, "James Brown");
			cheat_death = GUILayout.Toggle(cheat_death, "Rick Astely");
			cheat_health = GUILayout.Toggle(cheat_health, "MC Hammer");
		GUILayout.EndArea();
		
	}
		

}
//
//var m_Keys : String = "";
//var m_LastKeyTime : float;
//var m_Codes : Array() = new List
//function Start () {
//
//}
//
//function Update () {
//
//}
//{
//	private string m_Keys = "";
//	private float m_LastKeyTime;
//	public List <string> m_Codes = new List <string> ();
//	public float m_ClearDelay = 2.0f;
//	public GameObject m_Receiver = null;
//	 
//	void Start ()
//	{
//		m_LastKeyTime = Time.time;
//		for (int i = 0; i < m_Codes.Count; i++) {
//			m_Codes [i] = m_Codes [i].ToLower ();
//		}
//	}
//	 
//	void Update ()
//	{
//		if (Input.anyKey) {
//			m_LastKeyTime = Time.time;
//		} else if (Time.time - m_LastKeyTime > m_ClearDelay) {
//			m_Keys = "";
//		}
//		 
//		m_Keys += Input.inputString.ToLower ();
//		 
//		if (m_Codes.Contains (m_Keys)) {
//			string message = "On" + char.ToUpper (m_Keys [0]) + m_Keys.Substring (1) + "Code";
//		 
//			if (m_Receiver == null) {
//				SendMessage (message);
//			} else {
//				m_Receiver.SendMessage (message);
//			}
//			m_Keys = "";
//		}
//	}
//	 
//	void OnTestCode ()
//	// Handle codes in scripts on the target GameObject (or the current one if
//	// no target is set) by implementing functions named On{Name}Code - note
//	// that the codes are set to be all-lowercase except for the first letter.
//	{
//		Debug.Log ("We caught a code!");
//	}
//	
//	void OnSoulmanCode ()
//	// Handle codes in scripts on the target GameObject (or the current one if
//	// no target is set) by implementing functions named On{Name}Code - note
//	// that the codes are set to be all-lowercase except for the first letter.
//	{
//		Debug.Log ("We caught a code!");
//	}
//}