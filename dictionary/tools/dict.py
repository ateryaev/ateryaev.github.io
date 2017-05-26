# -*- coding: utf-8 -*-
import urllib2
import re
import sys


def nrm(str):
    str = str.replace('\n', ' ')
    str = str.replace('  ', ' ')
    str = str.strip()
    return str

url = 'http://192.168.10.54/ateryaev.github.io/dictionary/example.html'
#view-source:http://www.fin2rus.ru/band/page-15/
#1..5338
#range(1, 5339):
#<b class='terms'>аборт</b></a> в переводе на финский <sup>*</sup>&nbsp;<b>abortti</b></div>
#...
#<br/><b>Варианты перевода</b>
#<ul><li><a href="http://www.fin2rus.ru/search/?words=raskaudenkeskeytys">raskaudenkeskeytys</a></li><li><a #href="http://www.fin2rus.ru/search/?words=keskenmeno">keskenmeno</a></li></ul>

#dict.py >> dict.txt
#cat dict.txt | LC_ALL='C' sort --ignore-case | uniq > dict.sort.txt
#./bin/tojs.py > dict.js

spl1 = "<b class='terms'>"
spl2 = "</b></a>"
spl3 = "</sup>&nbsp;<b>"
spl4 = "</b></div>"



for u in range(5000, 5339):
    url = "http://www.fin2rus.ru/band/page-"+str(u)+"/"
    print >>sys.stderr, url
    response = urllib2.urlopen(url)
    webContent = response.read()
    arr1 = webContent.split(spl1)
    for i in range(1,len(arr1)):

        arr2 = (arr1[i]).split(spl2)

        arr3 = (arr2[1]).split(spl3)
        arr4 = (arr3[1]).split(spl4)
        
        print(nrm(arr2[0]) + " == " +nrm(arr4[0]))
        
        others = re.search(r'Варианты перевода.*<ul><li><a [^>]*>(.*)</a></li></ul>', arr4[1],re.MULTILINE|re.DOTALL)
        if others: 
            arr5 = re.split('</a></li><li><a [^>]*>', others.group(1))
            for o in range(0,len(arr5)):
                print(nrm(arr2[0]) + " == " +nrm(arr5[o]))
        #print arr4[1]
        
        #break
        