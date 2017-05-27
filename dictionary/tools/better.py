# encoding=utf8
### -*- coding: utf-8 -*-

import re
import sys
reload(sys)
sys.setdefaultencoding('utf8')


#1 köyryselkäisyys << кифоз
#2 kyttyräselkäisyys << кифоз
#3PL << услуги третей стороны
#4PL << поставки с 4-й стороны
#50-vuotispäivä << пятидесятилетие
#a priori << априори
#a viso << авизо
#a-hinnan merkki << собака
#A-tila << резол

#python better.py  | LC_ALL='C' sort --ignore-case | uniq -i > better.txt
#python better.py  | uniq -i > better.txt
def nrm(str):
    str = re.sub('\([^\)]*\)','', str)
    str = re.sub('\[[^\]]*\]','', str)
    str = str.replace('&quot;', '')
    str = str.replace('.', ' ')
    str = str.replace('\n', ' ')
    str = str.replace('\t', ' ')
    str = str.replace(' :)', '')
    str = str.replace('  ', ' ')
    str = str.replace('  ', ' ')
    
    str = str.strip()
    return str

fname = "dict3.txt"

#print ("var DICT = [")

with open(fname) as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content] 
cnt = 1

result = []

for u in range(0, len(content)):
    str = content[u]
    str = str.replace('&qt;', '=')
    str = str.replace('&lt;', '=')
    pair = str.split(" == ")
    
    w12 = (nrm(pair[0])).split("=")
    w22 = (nrm(pair[1])).split("=")
    #if len(w12.split("="))==1: continue
    
    for n1 in range(0, len(w12)): 
        for n2 in range(0, len(w22)):
            w1 = w12[n1]
            w2 = w22[n2]
            if len(w1.split("+"))>1 or len(w2.split("+"))>1: continue
            w1 = nrm(w1)
            w2 = nrm(w2)
            if len(w1)==0 or len(w2)==0: continue
            if len(w1.split(" "))>1 and len(w2.split(" "))>1: continue
            if len(w1.split("-"))>1 and len(w2.split(" "))>1: continue
            if len(w1.split("-"))>1 and len(w2.split("-"))>1: continue
            if len(w1.split(" "))>1 and len(w2.split("-"))>1: continue
            if w2=="1 köyryselkäisyys" or w2=="2 kyttyräselkäisyys": continue
            if w2=="A-tila": continue
            if w2=="3PL" or w2=="4PL" or w2=="50-vuotispäivä": continue
            if w2=="a priori" or w2=="a viso" or w2=="a-hinnan merkki": continue
                
            #print (str(cnt)+' ["'+w1 + '","' + w2+'"],')
            result.append (w1 + ' >> ' + w2)
            result.append ( w2 + ' << ' + w1)

            
            #print (w1 + ' >> ' + w2)
            #print (w2 + ' << ' + w1)
        
    cnt = cnt+1
    #if cnt>200: break    
        
def comparator_norm(str):
    str = unicode(str,'utf-8').lower()
    str = str.replace('ё', 'е')
    str = str.replace('ö', 'o')
    str = str.replace('ä', 'a')
    str = str.replace('å', 'a')
    return str
def comparator(a,b):
    a = comparator_norm(a)
    b = comparator_norm(b)
    if (a>b): return 1
    else : return -1
    
    
result2 = result.sort(cmp=comparator)
for i in range(0, len(result)): 
    print result[i]

        
    
#print ("]")