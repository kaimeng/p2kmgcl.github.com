#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Pablo Molina'
AUTHOR_PHOTO = 'http://dl.dropbox.com/u/6037255/perfil_75x75.jpg'
SITENAME = u'p2kmgcl'
SITESUBTITLE = u'Piensa, inventa, comparte'
SITEURL = 'http://p2kmgcl.com'
TIMEZONE = 'Europe/Madrid'
DATE_FORMATS = {
    'es': '%d/%m/%Y',
    'en': '%d %b %Y'
}
DEFAULT_LANG = u'es'
LOCALE = "C",

THEME = "theme"

DEFAULT_CATEGORY = 'General'
USE_FOLDER_AS_CATEGORY = False
DEFAULT_PAGINATION = 5
SUMMARY_MAX_LENGTH = 125

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}.html'
ARTICLE_LANG_URL = '{lang}/{date:%Y}/{date:%m}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'
ARTICLE_LANG_SAVE_AS = '{lang}/{date:%Y}/{date:%m}/{slug}.html'
FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'

FEED_DOMAIN = 'http://feeds.p2kmgcl.com'
FEED_RSS = 'feeds/main.rss.xml'
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/category-%s.rss.xml'
TRANSLATION_FEED_RSS = 'feeds/main-%s.rss.xml'
FEED_MAX_ITEMS = 10
FEED_ATOM = None
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

DISQUS_SITENAME = 'p2kmgcl'
GITHUB_URL = 'https://github.com/p2kmgcl/p2kmgcl.github.com'
GOOGLE_ANALYTICS = 'UA-17072152-2'

# Blogroll
LINKS =  ()

# Social widget
SOCIAL = (('Google+', 'https://plus.google.com/117214944861012231268/', 'google-plus'),
          ('GitHub', 'https://github.com/p2kmgcl', 'github'),
          ('Twitter', 'https://twitter.com/#!/p2kmgcl', 'twitter'),
          ('Facebook', 'https://www.facebook.com/p2kmgcl', 'facebook'),
          ('LinkedIn', 'http://es.linkedin.com/pub/pablo-molina/34/b06/180', 'linkedin',),
          ('LastFm', 'http://www.lastfm.es/user/p2kmgcl', 'music'),
          ('DeviantArt', 'http://p2kmgcl.deviantart.com/', 'pencil'),
          ('Youtube', 'http://www.youtube.com/p2kmgcl', 'facetime-video'),)
