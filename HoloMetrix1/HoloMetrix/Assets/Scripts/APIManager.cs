using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.VR.WSA.WebCam;

public class APIManager : MonoBehaviour {
    CameraManager cam;
    WebBehaviour web;


        public bool can_access_json_data = false;
    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update() {

    }

    public void StartGetText()
    {
        StartCoroutine(GetText());
    }

    public void StartUpload(PhotoCapture result)
    {
        StartCoroutine(UploadImages());

    }

    IEnumerator UploadImages()
    {
        byte[] bytes = UnityEngine.Windows.File.ReadAllBytes(cam.filename);

        WWW www = new WWW(web.url, bytes);

        yield return www;
        string responseData = www.text; // Save the response as JSON string
        Debug.Log(responseData);
    }

    IEnumerator Upload(PhotoCapture result)
    {
        UnityWebRequest www = UnityWebRequest.Post("http://apiroute.azurewebsites.net/api", result.ToString());
        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Upload complete!");
            can_access_json_data = true;
        }
    }

    IEnumerator GetText()
    {
            using (UnityWebRequest request = UnityWebRequest.Get("http://apiroute.azurewebsites.net/api"))
            {
                yield return request.Send();
                if (request.isError)
                {
                    Debug.Log(request.error);
                }
                else
                {
                    string x = process_json(request.downloadHandler.text);
                }
            }

        }

        string process_json(string json)
    {
            return json;
        }
    }
