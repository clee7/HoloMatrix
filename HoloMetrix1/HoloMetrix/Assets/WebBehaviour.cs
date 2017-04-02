using System.Collections;
using System.Collections.Generic;
//#if WINDOWS_UWP
using System.IO;
using System.Net;
//#endif
using UnityEngine;

public class WebBehaviour : MonoBehaviour {
    public string url = null;

	// Use this for initialization
	void Start () {
        Debug.Log("UWP section");
//#if WINDOWS_UWP
        url = "http://apiroute.azurewebsites.net/api";
        
        //WebRequest request;
        //request = WebRequest.Create(url);
        //request.Method = "Post";
        //WebResponse response = request.GetResponse();
        //Stream stream = response.GetResponseStream();
        //StreamReader reader = new StreamReader(stream);
        //Debug.Log(reader.ReadToEnd());
//#endif
    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
