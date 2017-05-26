#python ./tojs.py > ../js/dict.js

fname = "better.txt"

print ("var DICT = [")

with open(fname) as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content] 
for u in range(0, len(content)):
    #pair = (content[u]).split(" == ")
    #print ('["'+pair[0] + '","' + pair[1]+'"],')
    print ('"'+(content[u])+'",')
    
print ("]")