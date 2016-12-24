using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PayTable : MonoBehaviour {
    public Sprite[] sprites;

    public void DrawPayTable(GameObject payItemPrefab)
    {
        for (int i = sprites.Length-1; i >=0 ; i--)
        {
            GameObject go = Instantiate(payItemPrefab) as GameObject;
            Transform tr = go.transform;
            tr.SetParent(transform);
            tr.localScale = Vector3.one;
            tr.localPosition = Vector3.zero;
            PayItem pItem = go.GetComponent<PayItem>();
            pItem.sprite.sprite = sprites[i];
            pItem.labels[0].text = "5x - " + PayData.table[i, 4];
            pItem.labels[1].text = "4x - " + PayData.table[i, 3];
            pItem.labels[2].text = "3x - " + PayData.table[i, 2];
            pItem.labels[3].text = "";
        }
    }
	
	void Update () {
	
	}
}
