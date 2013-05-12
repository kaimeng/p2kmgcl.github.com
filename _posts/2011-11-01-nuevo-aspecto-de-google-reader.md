---
layout: post
title: Nuevo aspecto de google reader
Cover: http://3.bp.blogspot.com/-c3zv2frAK4c/Tq_-rF2pHSI/AAAAAAAAAi8/ymZ87LtJsuw/s1600/Sin+t%25C3%25ADtulo.png
image: Nuevo aspecto de Google Reader con pequeñas modificaciones
tags: [Google Reader, Noticias, RSS]
---

Yo, desde casita, apruebo el nuevo aspecto de google reader que la verdad me parece que encaja bastante con el nuevo aspecto de sus aplicaciones en general. No obstante, he creado una pequeña modificación con CSS3 que le da un aspecto para mi gusto más atractivo:

![](http://2.bp.blogspot.com/-Itq2yp7R5Tc/Tq_-qRHibaI/AAAAAAAAAi4/mfJJOtqXs-8/s640/Sin+t%25C3%25ADtulo3.png)

Aquí está el código que he usado para la modificación:

    #top-bar{
       border-bottom: none;
       margin-bottom: -10px;
    }
    #logo-container{
       display: none;
    }
    #search{
       margin-left: 10px;
    }
     
    #viewer-header{
       height: 40px;
       border: none;
       text-align: center;
       margin: auto;
    }
    #viewer-header-container{
       border-top: none;
       border-bottom: none;
       text-align: center;
       padding-left: 6px;
       margin: auto;
    }
    #title-and-status-holder{
       display: none;
    }
    #chrome-view-links{
       position: fixed;
       right: 3px;
       top: 45px;
    }
     
    #entries{
       text-align: justify;
    }
    .entry-title{
       text-align: left;
    }
    .entry-title-link, .entry-title-link *{
       padding-right: 10px;
       text-align: left;
    }
    .card.card-common{
       max-width: 660px;
       padding: 40px;
       margin: auto;
       border: dashed thin grey;
       border-radius: 5px;
    }
    .entry{
       -webkit-transition: all ease 0.3s;
    }
    .read:not(#current-entry), .entry:not(#current-entry){
       opacity: 0.4;
    }
     
    .card-actions.card-bottom{
       text-align: center;
    }
