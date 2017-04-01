using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.VR.WSA.Input;
using UnityEngine.VR.WSA.WebCam;

public class CameraManager : MonoBehaviour {

    GestureRecognizer recognizer;
    PhotoCapture photoCaptureObject = null;

    // Use this for initialization
    void Start () {
        recognizer = new GestureRecognizer();
        recognizer.SetRecognizableGestures(GestureSettings.Tap | GestureSettings.Hold);
        recognizer.TappedEvent += Recognizer_TappedEvent; ;
        recognizer.HoldStartedEvent += Recognizer_HoldStartedEvent;
        recognizer.HoldCompletedEvent += Recognizer_HoldCompletedEvent;
        recognizer.StartCapturingGestures();

        //later on or whenever you want - stop watching recognizer.StopCapturingGestures();
    }

    private void Recognizer_HoldCompletedEvent(InteractionSourceKind source, Ray headRay)
    {
        Debug.Log("Recognizer_HoldCompletedEvent");
    }

    private void Recognizer_TappedEvent(InteractionSourceKind source, int tapCount, Ray headRay)
    {
        Debug.Log("Recognizer_TappedEvent");
        //You want to grab a picture here
        PhotoCapture.CreateAsync(false, OnPhotoCaptureCreated);
    }

    private void Recognizer_HoldStartedEvent(InteractionSourceKind source, Ray headRay)
    {
        Debug.Log("Recognizer_HoldStartedEvent");
    }

    void OnDestroy()
    {
        recognizer.TappedEvent -= Recognizer_TappedEvent;
        recognizer.HoldStartedEvent -= Recognizer_HoldStartedEvent;
    }


    #region Camera Code
    void OnPhotoCaptureCreated(PhotoCapture captureObject)
    {
        photoCaptureObject = captureObject;

        Resolution cameraResolution = PhotoCapture.SupportedResolutions.OrderByDescending((res) => res.width * res.height).First();

        CameraParameters c = new CameraParameters();
        c.hologramOpacity = 0.0f;
        c.cameraResolutionWidth = cameraResolution.width;
        c.cameraResolutionHeight = cameraResolution.height;
        c.pixelFormat = CapturePixelFormat.BGRA32;

        captureObject.StartPhotoModeAsync(c, OnPhotoModeStarted);
    }


    void OnStoppedPhotoMode(PhotoCapture.PhotoCaptureResult result)
    {
        photoCaptureObject.Dispose();
        photoCaptureObject = null;
    }

    private void OnPhotoModeStarted(PhotoCapture.PhotoCaptureResult result)
    {
        if (result.success)
        {
            string filename = string.Format(@"CapturedImage{0}_n.jpg", Time.time);
            string filePath = System.IO.Path.Combine(Application.persistentDataPath, filename);

            photoCaptureObject.TakePhotoAsync(filePath, PhotoCaptureFileOutputFormat.JPG, OnCapturedPhotoToDisk);
        }
        else
        {
            Debug.LogError("Unable to start photo mode!");
        }
    }


    void OnCapturedPhotoToDisk(PhotoCapture.PhotoCaptureResult result)
    {
        if (result.success)
        {
            Debug.Log("Saved Photo to disk!");
            photoCaptureObject.StopPhotoModeAsync(OnStoppedPhotoMode);
        }
        else
        {
            Debug.Log("Failed to save Photo to disk");
        }
    }
    #endregion
}

