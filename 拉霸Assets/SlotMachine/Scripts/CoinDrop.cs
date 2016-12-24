using UnityEngine;
using System.Collections;

public class CoinDrop : MonoBehaviour {
    public float delayTime = 1f;
    SpriteRenderer sr;
    Animator animator;

	void Start () {
        sr = GetComponent<SpriteRenderer>();
        animator = GetComponent<Animator>();
	}

    public void ShowMotion()
    {
        sr.enabled = true;
        animator.Play("CoinDrop");
        StartCoroutine(DelayAction(delayTime, () =>
        {
            StopMotion();
        }));
    }

    public void StopMotion()
    {
        sr.enabled = false;
        animator.Play("Stop");
    }

    IEnumerator DelayAction(float dTime, System.Action callback)
    {
        yield return new WaitForSeconds(dTime);
        callback();
    }
}
