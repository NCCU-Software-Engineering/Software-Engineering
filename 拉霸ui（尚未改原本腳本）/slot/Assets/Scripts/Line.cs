﻿using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Holoville.HOTween;
using Holoville.HOTween.Plugins;

/// <summary>
/// Tile Line effect.
/// </summary>
public class Line : MonoBehaviour {
    // line order
    public int idx = 0;

    // tile list in line
    public Tile[] items;

    // sort time order in line
    public void RollCells(bool isLinear)
    {
        List<Tile> tlist = new List<Tile>();
        int y = 0, t = 7;
        for (int i = 1; i < 7; i++)
        {
            tlist.Add(items[i]);
            items[i].idx = y++;
        }
        for (int i = 0; i < 1; i++)
        {
            tlist.Add(items[i]);
            items[i].idx = y++;
            items[i].MoveTo(t++);
            items[i].SetTileType(Random.Range(0, 9) % 9);
            //items[i].SetTileType(0);
        }
        items = tlist.ToArray();
        for (int i = 0; i < 7; i++) items[i].TweenMoveTo(i, isLinear ? EaseType.Linear : EaseType.EaseOutBack );
    }
}
