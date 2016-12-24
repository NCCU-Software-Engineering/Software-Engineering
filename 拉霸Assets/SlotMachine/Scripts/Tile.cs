using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Holoville.HOTween;
using Holoville.HOTween.Plugins;

/// <summary>
/// Tile cell effect and touch/click event.
/// </summary>
public class Tile : MonoBehaviour {
    public SlotMachine slotMachine;

    // tile order
    public int idx = 0;

    public float height = 1f;

    // tile type
    int _type = 0;

    Transform tf;

    public Sprite[] sprites;
    SpriteRenderer shapeRenderer;
    SpriteRenderer choideRenderer;

    // Tile Line Component
    public Line lineScript;

    // Condition when tile is moving
    public bool isMove = false;

    void Awake()
    {
        tf = transform;
        shapeRenderer = tf.FindChild("Shape").GetComponent<SpriteRenderer>();
        choideRenderer = tf.FindChild("Choice").GetComponent<SpriteRenderer>();
        UnSetChoice();
    }

    // Setup Tile Type.
    public void SetTileType(int type)
    {
        _type = type;
        shapeRenderer.sprite = sprites[type];
    }

    public void SetChoice()
    {
        choideRenderer.enabled = true;
    }

    public void UnSetChoice()
    {
        choideRenderer.enabled = false;
    }

    // Get Tile Type.
    public int GetTileType()
    {
        return _type;
    }

    public void ShowChoice(float t)
    {
        SetChoice();
        StartCoroutine(DelayAction(t, () =>
        {
            UnSetChoice();
        }));
        shapeRenderer.transform.localScale = Vector3.one;
        TweenParms parms = new TweenParms().Prop("localScale", Vector3.one * 1.1f).Ease(EaseType.EaseOutElastic).Loops(2,LoopType.Yoyo);
        HOTween.To(shapeRenderer.transform, 0.1f, parms);
    }

    // Move To Order Position
    public void MoveTo(int seq)
    {
        tf.localPosition = Vector3.forward * (seq * height);
    }

    // Move with Tweening Animation
    public void TweenMoveTo(int seq, EaseType easeType)
    {
        TweenMove(tf, tf.localPosition, Vector3.forward * (seq * height), easeType);
    }

    // Move with Tweening Animation
    void TweenMove(Transform tr, Vector3 pos1, Vector3 pos2, EaseType easeType)
    {
        tr.localPosition = pos1;
        TweenParms parms = new TweenParms().Prop("localPosition", pos2).Ease(easeType);
        HOTween.To(tr, 0.1f, parms);
    }

    // Coroutine Delay Method
    IEnumerator DelayAction(float dTime, System.Action callback)
    {
        yield return new WaitForSeconds(dTime);
        callback();
    }
}
