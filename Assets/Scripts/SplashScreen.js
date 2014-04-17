#pragma strict

function Start () {

}
var image:Texture;
var msg=["<tring> <tring> <tring>","Friend: Dude, Where are you??","Me: eh, why??","Friend: You forgot it again, did not you??","Friend: We have an exam in 10 minutes","Me: I will be there"];
var counter=0;
var skin:GUISkin;
function Update () {

}
function OnGUI(){
	GUI.skin=skin;
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), image, ScaleMode.StretchToFill, true, 10.0f);
	GUI.Box(Rect(0,Screen.height*.85,Screen.width,Screen.height*.15),msg[counter]);
	if(GUI.Button(Rect(Screen.width*.8,Screen.height*.9,Screen.width*.2,Screen.height*.1),"Next")){
		counter++;
		if(counter>5)
			{Application.LoadLevel(2);//counter=5;
				counter=5;
			}
	}
	if(Input.GetKey(KeyCode.Escape))
		Application.LoadLevel(0);
}