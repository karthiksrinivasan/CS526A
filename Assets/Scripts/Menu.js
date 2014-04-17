#pragma strict
var image:Texture;
var guiskin:GUISkin;
function Start () {

}

function Update () {
	if(Input.GetKey(KeyCode.Escape))
		Application.Quit();
}

function OnGUI(){
	GUI.skin=guiskin;
	GUI.Box(new Rect(0,0,Screen.width,Screen.height),"");
	GUI.DrawTexture(Rect(Screen.width*.2,Screen.height*.15,Screen.width*.6,Screen.height*.2), image, ScaleMode.ScaleToFit, true, 10.0f);
	if(GUI.Button(Rect(Screen.width*.35,Screen.height*.4,Screen.width*.3,Screen.height*.15),"Play"))
	{
		Time.timeScale=1.0;
		Application.LoadLevel(1);
	}
	if(GUI.Button(Rect(Screen.width*.35,Screen.height*.6,Screen.width*.3,Screen.height*.15),"Quit"))
		Application.Quit();
	
}