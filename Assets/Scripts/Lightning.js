    var target : GameObject;
    var LR : LineRenderer;
    var materialList : Material[];
    var arcLength = 2.0;
    var arcVariation = 2.0;
    var inaccuracy = 1.0;
    var level : int = 1;
    private var lastLevel : int;
    
    function Awake () {
    	lastLevel = level;
    }
    
    function Update() {
        var lastPoint = transform.position;
        var i = 1;
        LR.SetPosition(0, transform.position);//make the origin of the LR the same as the transform
        while (Vector3.Distance(target.transform.position, lastPoint) >5 && i < 100) {//was the last arc not touching the target?
                LR.SetVertexCount(i + 1);//then we need a new vertex in our line renderer
                var fwd = target.transform.position - lastPoint;//gives the direction to our target from the end of the last arc
                fwd.Normalize();//makes the direction to scale
                fwd = Randomize(fwd, inaccuracy);//we don't want a straight line to the target though
                fwd *= Random.Range(arcLength * arcVariation, arcLength);//nature is never too uniform
                fwd += lastPoint;//point + distance * direction = new point. this is where our new arc ends
                LR.SetPosition(i, fwd);//this tells the line renderer where to draw to
                i++;
                lastPoint = fwd;//so we know where we are starting from for the next arc
             }
             
        if ( level != lastLevel){ //set line renerer material with level
        	if (level < 1 || level > materialList.length) { //Keep lightning "power level" from being set out of bounds
        		level = lastLevel;
        	}
        	else {
        		this.LR.material = materialList[level-1]; //set line renderer material
        		lastLevel = level;
        	}
        }
            
        this.LR.material.mainTextureScale = Vector2(i/5, 1); //adjust the texture scale in proportion to line length    
        
    }
     
    function Randomize (v3 : Vector3, inaccuracy2 : float) {
       v3 += Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0)) * inaccuracy2;
       v3.Normalize();
       return v3;
    }